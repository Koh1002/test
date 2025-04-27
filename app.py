from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from pydantic import BaseModel
import pandas as pd
from typing import List, Dict, Any
import json
import os
from main import DocumentationAgent, ChatOpenAI, settings
from dotenv import load_dotenv
import logging

# ロギングの設定
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# .envファイルから環境変数を読み込む
load_dotenv()

app = FastAPI()

# CORSミドルウェアの設定
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class InterviewRequest(BaseModel):
    prompt: str

class InterviewResponse(BaseModel):
    summary: str
    interviews: List[Dict[str, Any]]
    personas: List[Dict[str, Any]]

# OpenAI APIキーの直接設定
os.environ["OPENAI_API_KEY"] = "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"
api_key = os.getenv("OPENAI_API_KEY")
if not api_key:
    raise ValueError("OPENAI_API_KEY environment variable is not set")

# インタビューエージェントのインスタンス化
try:
    llm = ChatOpenAI(
        model="gpt-4-turbo-preview",
        temperature=settings.temperature,
        api_key=settings.openai_api_key,
    )
    agent = DocumentationAgent(llm=llm)
except Exception as e:
    raise ValueError(f"Failed to initialize OpenAI client: {str(e)}")

@app.post("/generate-interview", response_model=InterviewResponse)
async def generate_interview(request: InterviewRequest):
    try:
        # インタビューを生成
        result = agent.run(request.prompt)
        
        # 結果をパース
        if isinstance(result, str):
            try:
                result_dict = json.loads(result)
            except json.JSONDecodeError:
                # 文字列の場合はそのままsummaryとして使用
                result_dict = {
                    "summary": result,
                    "interviews": [],
                    "personas": []
                }
        else:
            result_dict = result
        
        return InterviewResponse(
            summary=result_dict.get("summary", ""),
            interviews=result_dict.get("interviews", []),
            personas=result_dict.get("personas", [])
        )
    except Exception as e:
        logger.error(f"Error in generate_interview: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/download-excel")
async def download_excel():
    try:
        # インタビュー結果をExcelファイルに変換
        df = pd.DataFrame(agent.state.interviews)
        excel_file = "interview_results.xlsx"
        df.to_excel(excel_file, index=False)
        return {"file_path": excel_file}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# リクエストモデル
class UserRequest(BaseModel):
    request: str

@app.post("/generate_documentation")
async def generate_documentation(user_request: UserRequest):
    try:
        result = agent.run(user_request.request)
        return json.loads(result)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/download_excel/{filename}")
async def download_excel(filename: str):
    try:
        file_path = os.path.join("output", filename)
        if not os.path.exists(file_path):
            raise HTTPException(status_code=404, detail="File not found")
        return FileResponse(
            file_path,
            media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            filename=filename
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 