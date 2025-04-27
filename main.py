import operator
import logging
from typing import Annotated, Any, Optional, List
from pathlib import Path
import os
import json
import pandas as pd
from datetime import datetime

from dotenv import load_dotenv
from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import ChatPromptTemplate
from langchain_openai import ChatOpenAI
from pydantic import BaseModel, Field, ConfigDict

# ロギングの設定
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# .envファイルから環境変数を読み込む
load_dotenv()

# 設定クラス
class Settings(BaseModel):
    openai_api_key: str = Field(default=os.getenv("OPENAI_API_KEY"))
    max_iterations: int = 2
    default_k: int = 10
    temperature: float = 0.7

settings = Settings()

# 調査対象を表すデータモデル
class Persona(BaseModel):
    name: str = Field(..., description="調査対象の名前")
    background: str = Field(..., description="調査対象の持つ背景")
    age: str = Field(..., description="調査対象の年代")
    gender: str = Field(..., description="調査対象の性別")
    position: str = Field(..., description="調査対象の会社内ポジション")

# 調査対象のリストを表すデータモデル
class Personas(BaseModel):
    personas: list[Persona] = Field(
        default_factory=list, description="調査対象のリスト"
    )

    @classmethod
    def from_json(cls, json_str: str) -> "Personas":
        try:
            data = json.loads(json_str)
            return cls(personas=data["personas"])
        except (json.JSONDecodeError, KeyError) as e:
            raise ValueError(f"Invalid JSON format: {str(e)}")

# インタビュー内容を表すデータモデル
class Interview(BaseModel):
    persona: Persona = Field(..., description="インタビュー対象の調査対象")
    question: str = Field(..., description="インタビューでの質問")
    answer: str = Field(..., description="インタビューでの回答")

# インタビュー結果のリストを表すデータモデル
class InterviewResult(BaseModel):
    interviews: List[Interview] = Field(
        default_factory=list, description="インタビュー結果のリスト"
    )

# 評価の結果を表すデータモデル
class EvaluationResult(BaseModel):
    reason: str = Field(..., description="判断の理由")
    is_sufficient: bool = Field(..., description="情報が十分かどうか")

# 調査生成AIエージェントのステート
class InterviewState(BaseModel):
    user_request: str = Field(..., description="ユーザーからのリクエスト")
    personas: Annotated[List[Persona], operator.add] = Field(
        default_factory=list, description="生成されたペルソナのリスト"
    )
    interviews: Annotated[List[Interview], operator.add] = Field(
        default_factory=list, description="実施された調査のリスト"
    )
    requirements_doc: str = Field(default="", description="生成された定義")
    iteration: int = Field(
        default=0, description="調査対象生成と調査の反復回数"
    )
    is_information_sufficient: bool = Field(
        default=False, description="調査結果が十分かどうか"
    )
    max_iterations: int = Field(
        default=settings.max_iterations, description="最大反復回数"
    )

# ペルソナを生成するクラス
class PersonaGenerator:
    def __init__(self, llm: ChatOpenAI, k: int = 30):
        self.llm = llm
        self.k = k

    def run(self, user_request: str) -> list[Persona]:
        # プロンプトテンプレートを定義
        prompt = ChatPromptTemplate.from_messages(
            [
                (
                    "system",
                    "あなたは講演会に参加する予定の住友商事株式会社ライフスタイルグループに所属しているビジネスマンです。",
                ),
                (
                    "human",
                    "以下のユーザーリクエストに関するアンケート用に、{k}人のペルソナを生成してください。\n\n"
                    "ユーザーリクエスト: {user_request}\n\n"
                    "各ペルソナには名前、年代（20代～60代）、性別、職業を含めてください。\n"
                    "各ペルソナはスーパーマーケットやドラッグストアでお買い物をする一般消費者です。\n\n"
                    "以下の形式で出力してください：\n"
                    "1. 各ペルソナの情報を1行ずつ出力\n"
                    "2. 各行は以下の形式で出力：\n"
                    "名前,背景,年代,性別,職業\n"
                    "3. 最後に空行を入れてください\n\n"
                    "例：\n"
                    "山田太郎,一人暮らし,40代,男性,マーケティング部長\n"
                    "佐藤花子,子供が3人いる,30代,女性,専業主婦\n"
                ),
            ]
        )
        # ペルソナ生成のためのチェーンを作成
        chain = prompt | self.llm | StrOutputParser()
        # ペルソナを生成
        result = chain.invoke({
            "user_request": user_request,
            "k": self.k
        })
        
        # 結果をパース
        personas = []
        for line in result.strip().split('\n'):
            if not line.strip():  # 空行をスキップ
                continue
            try:
                name, background, age, gender, position = line.strip().split(',')
                personas.append(Persona(
                    name=name.strip(),
                    background=background.strip(),
                    age=age.strip(),
                    gender=gender.strip(),
                    position=position.strip()
                ))
            except ValueError as e:
                print(f"Warning: Skipping invalid line: {line}")
                continue
        
        return personas

# インタビューを実施するクラス
class InterviewConductor:
    def __init__(self, llm: ChatOpenAI):
        self.llm = llm

    def run(self, user_request: str, personas: list[Persona]) -> InterviewResult:
        # 質問を生成
        questions = self._generate_questions(
            user_request=user_request, personas=personas
        )
        # 回答を生成
        answers = self._generate_answers(personas=personas, questions=questions)
        # 質問と回答の組み合わせからインタビューリストを作成
        interviews = self._create_interviews(
            personas=personas, questions=questions, answers=answers
        )
        # インタビュー結果を返す
        return InterviewResult(interviews=interviews)

    def _generate_questions(
        self, user_request: str, personas: list[Persona]
    ) -> list[str]:
        # 質問生成のためのプロンプトを定義
        question_prompt = ChatPromptTemplate.from_messages(
            [
                (
                    "system",
                    "あなたはユーザー要件に基づいて適切な質問を生成する専門家です。",
                ),
                (
                    "human",
                    "以下のペルソナに関連するユーザーリクエストについて、1つの質問を生成してください。\n\n"
                    "ユーザーリクエスト: {user_request}\n"
                    "ペルソナ: {persona_name} - {persona_background}\n\n"
                    "質問は具体的で、このペルソナから個性的な意見がヒアリングできるように考えてください。",
                ),
            ]
        )
        # 質問生成のためのチェーンを作成
        question_chain = question_prompt | self.llm | StrOutputParser()

        # 各ペルソナに対する質問クエリを作成
        question_queries = [
            {
                "user_request": user_request,
                "persona_name": persona.name,
                "persona_background": persona.background,
            }
            for persona in personas
        ]
        # 質問をバッチ処理で生成
        return question_chain.batch(question_queries)

    def _generate_answers(
        self, personas: list[Persona], questions: list[str]
    ) -> list[str]:
        # 回答生成のためのプロンプトを定義
        answer_prompt = ChatPromptTemplate.from_messages(
            [
                (
                    "system",
                    "あなたは以下のペルソナとして回答しています: {persona_name} - {persona_background}",
                ),
                ("human", "質問: {question}"),
            ]
        )
        # 回答生成のためのチェーンを作成
        answer_chain = answer_prompt | self.llm | StrOutputParser()

        # 各ペルソナに対する回答クエリを作成
        answer_queries = [
            {
                "persona_name": persona.name,
                "persona_background": persona.background,
                "question": question,
            }
            for persona, question in zip(personas, questions)
        ]
        # 回答をバッチ処理で生成
        return answer_chain.batch(answer_queries)

    def _create_interviews(
        self, personas: list[Persona], questions: list[str], answers: list[str]
    ) -> list[Interview]:
        # ペルソナ毎に質問と回答の組み合わせからインタビューオブジェクトを作成
        return [
            Interview(persona=persona, question=question, answer=answer)
            for persona, question, answer in zip(personas, questions, answers)
        ]

# 調査結果の十分性を評価するクラス
class InformationEvaluator:
    def __init__(self, llm: ChatOpenAI):
        self.llm = llm
        logger.info("InformationEvaluator initialized")

    def run(self, user_request: str, interviews: list[Interview]) -> EvaluationResult:
        try:
            logger.info("Evaluating information sufficiency")
            
            # インタビュー結果の文字列を生成
            interview_texts = []
            for i in interviews:
                interview_text = (
                    f"調査対象: {i.persona.name} - {i.persona.background}\n"
                    f"質問: {i.question}\n"
                    f"回答: {i.answer}"
                )
                interview_texts.append(interview_text)
            
            interview_results = "\n\n".join(interview_texts)
            
            # 評価のためのプロンプトを定義
            prompt = ChatPromptTemplate.from_messages([
                (
                    "system",
                    "あなたは優秀なビジネスマンで、流通業界にかかわる内容をマーケティング調査する担当者です。"
                ),
                (
                    "human",
                    "以下のユーザーリクエストとインタビュー結果に基づいて、内容について資料作成を行ううえで十分な情報が集まったかどうかを判断してください。\n\n"
                    "ユーザーリクエスト: {user_request}\n\n"
                    "調査結果:\n{interview_results}\n\n"
                    "以下の形式で出力してください：\n"
                    "1. 判断の理由（reason）\n"
                    "2. 情報が十分かどうか（is_sufficient: true/false）\n\n"
                    "例：\n"
                    "reason: インタビュー結果から、ユーザーのニーズが明確に把握でき、具体的な改善案も提案できる状態です。\n"
                    "is_sufficient: true"
                )
            ])
            
            # 評価を生成
            chain = prompt | self.llm | StrOutputParser()
            result = chain.invoke({
                "user_request": user_request,
                "interview_results": interview_results
            })
            
            # 結果をパース
            lines = result.strip().split('\n')
            reason = ""
            is_sufficient = False
            
            for line in lines:
                if line.startswith("reason:"):
                    reason = line.replace("reason:", "").strip()
                elif line.startswith("is_sufficient:"):
                    is_sufficient = line.replace("is_sufficient:", "").strip().lower() == "true"
            
            return EvaluationResult(
                reason=reason,
                is_sufficient=is_sufficient
            )
            
        except Exception as e:
            logger.error(f"Error evaluating information: {str(e)}")
            raise

# インタビュー結果のサマリを生成するクラス
class RequirementsDocumentGenerator:
    def __init__(self, llm: ChatOpenAI):
        self.llm = llm
        logger.info("RequirementsDocumentGenerator initialized")

    def run(self, user_request: str, interviews: List[Interview]) -> str:
        try:
            logger.info("Generating requirements document")
            prompt = ChatPromptTemplate.from_messages([
                (
                    "system",
                    "あなたは収集した情報に基づいて資料作成・企画を行う専門家です。",
                ),
                (
                    "human",
                    "以下のユーザーリクエストと複数のペルソナからのインタビュー結果に基づいて、調査結果を定量数値も用いてまとめてください。\n\n"
                    "ユーザーリクエスト: {user_request}\n\n"
                    "調査結果:\n{interview_results}\n"
                    "調査結果報告には以下の内容も含めてください:\n"
                    "1. 調査概要\n"
                    "2. 調査対象に関する情報（調査対象の性年代分布）\n"
                    "3. 調査結果に関する情報（調査結果のペルソナの性年代分布）\n"
                    "4. 調査結果の全体サマリ\n"
                    "5. 調査で出てきた回数が多いテーマ上位5個（各テーマを答えた調査対象数も性年代別に記載）\n"
                    "6. 調査で出てきたユニークな内容5個\n",
                ),
            ])
            chain = prompt | self.llm | StrOutputParser()
            result = chain.invoke(
                {
                    "user_request": user_request,
                    "interview_results": "\n".join(
                        f"調査対象: {i.persona.name} - {i.persona.background}\n"
                        f"質問: {i.question}\n回答: {i.answer}\n"
                        for i in interviews
                    ),
                }
            )
            logger.info("Requirements document generated successfully")
            return result
        except Exception as e:
            logger.error(f"Error generating requirements document: {str(e)}")
            raise

# Excel出力用のクラス
class ExcelExporter:
    def __init__(self, output_dir: str = "output"):
        self.output_dir = output_dir
        os.makedirs(output_dir, exist_ok=True)
        logger.info(f"ExcelExporter initialized with output directory: {output_dir}")

    def export_interviews(self, interviews: list[Interview], user_request: str) -> str:
        try:
            # インタビュー結果をDataFrameに変換
            data = []
            for interview in interviews:
                data.append({
                    "名前": interview.persona.name,
                    "背景": interview.persona.background,
                    "年代": interview.persona.age,
                    "性別": interview.persona.gender,
                    "ポジション": interview.persona.position,
                    "質問": interview.question,
                    "回答": interview.answer
                })
            
            df = pd.DataFrame(data)
            
            # ファイル名を生成（タイムスタンプ付き）
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            filename = f"interview_results_{timestamp}.xlsx"
            filepath = os.path.join(self.output_dir, filename)
            
            # Excelファイルに出力
            with pd.ExcelWriter(filepath, engine='openpyxl') as writer:
                # インタビュー結果シート
                df.to_excel(writer, sheet_name='インタビュー結果', index=False)
                
                # サマリーシート
                summary_data = {
                    "項目": ["調査対象数", "男性", "女性", "20代", "30代", "40代", "50代", "60代"],
                    "人数": [
                        len(interviews),
                        len([p for p in interviews if p.persona.gender == "男性"]),
                        len([p for p in interviews if p.persona.gender == "女性"]),
                        len([p for p in interviews if p.persona.age == "20代"]),
                        len([p for p in interviews if p.persona.age == "30代"]),
                        len([p for p in interviews if p.persona.age == "40代"]),
                        len([p for p in interviews if p.persona.age == "50代"]),
                        len([p for p in interviews if p.persona.age == "60代"])
                    ]
                }
                pd.DataFrame(summary_data).to_excel(writer, sheet_name='サマリー', index=False)
                
                # ユーザーリクエストシート
                pd.DataFrame({"ユーザーリクエスト": [user_request]}).to_excel(
                    writer, sheet_name='リクエスト', index=False
                )
            
            logger.info(f"Excel file exported successfully: {filepath}")
            return filepath
            
        except Exception as e:
            logger.error(f"Error exporting to Excel: {str(e)}")
            raise

# ドキュメント生成エージェント
class DocumentationAgent:
    def __init__(self, llm: ChatOpenAI, k: Optional[int] = None):
        self.llm = llm
        self.k = k or settings.default_k
        self.persona_generator = PersonaGenerator(llm=self.llm, k=self.k)
        self.interview_conductor = InterviewConductor(llm=self.llm)
        self.information_evaluator = InformationEvaluator(llm=self.llm)
        self.requirements_generator = RequirementsDocumentGenerator(llm=self.llm)
        self.excel_exporter = ExcelExporter()
        logger.info(f"DocumentationAgent initialized with k={self.k}")

    def run(self, user_request: str) -> str:
        try:
            logger.info(f"Starting documentation process for request: {user_request}")
            state = InterviewState(user_request=user_request)
            
            while not state.is_information_sufficient and state.iteration < state.max_iterations:
                # Generate personas
                personas_result = self.persona_generator.run(state.user_request)
                state.personas.extend(personas_result)
                state.iteration += 1
                
                # Conduct interviews
                result = self.interview_conductor.run(state.user_request, state.personas)
                state.interviews.extend(result.interviews)
                
                # Evaluate information
                evaluation = self.information_evaluator.run(state.user_request, state.interviews)
                state.is_information_sufficient = evaluation.is_sufficient
            
            # Generate requirements document
            requirements = self.requirements_generator.run(state.user_request, state.interviews)
            
            # Export to Excel
            excel_path = self.excel_exporter.export_interviews(state.interviews, user_request)
            
            # 結果をJSON形式に変換
            result_dict = {
                "summary": requirements,
                "excel_path": excel_path,
                "interviews": [
                    {
                        "persona": {
                            "name": interview.persona.name,
                            "background": interview.persona.background,
                            "age": interview.persona.age,
                            "gender": interview.persona.gender,
                            "position": interview.persona.position
                        },
                        "question": interview.question,
                        "answer": interview.answer
                    }
                    for interview in state.interviews
                ],
                "personas": [
                    {
                        "name": persona.name,
                        "background": persona.background,
                        "age": persona.age,
                        "gender": persona.gender,
                        "position": persona.position
                    }
                    for persona in personas_result
                ]
            }
            
            logger.info("Documentation process completed successfully")
            return json.dumps(result_dict, ensure_ascii=False)
        except Exception as e:
            logger.error(f"Error in run: {str(e)}")
            raise

def main():
    try:
        logger.info("Initializing main process")
        llm = ChatOpenAI(
            model="gpt-4-turbo-preview",
            temperature=settings.temperature,
            api_key=settings.openai_api_key,
        )
        agent = DocumentationAgent(llm=llm)
        user_request = "大学院の講演会の内容"
        result = agent.run(user_request)
        logger.info("Process completed successfully")
        print(result)
        return result
    except Exception as e:
        logger.error(f"Error in main: {str(e)}")
        raise

if __name__ == "__main__":
    main()
