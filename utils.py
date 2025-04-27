import pandas as pd
from typing import List, Dict, Any
import json

def format_interview_results(interviews: List[Dict[str, Any]]) -> pd.DataFrame:
    """インタビュー結果をDataFrame形式に変換"""
    formatted_data = []
    for interview in interviews:
        formatted_data.append({
            "ペルソナ名": interview["persona"]["name"],
            "背景": interview["persona"]["background"],
            "質問": interview["question"],
            "回答": interview["answer"]
        })
    return pd.DataFrame(formatted_data)

def save_to_excel(df: pd.DataFrame, filename: str = "interview_results.xlsx") -> str:
    """DataFrameをExcelファイルとして保存"""
    df.to_excel(filename, index=False, engine="openpyxl")
    return filename

def parse_interview_response(response: str) -> Dict[str, Any]:
    """インタビュー応答をパース"""
    try:
        return json.loads(response)
    except json.JSONDecodeError:
        # JSONとしてパースできない場合は、テキストとして処理
        return {
            "summary": response,
            "interviews": [],
            "personas": []
        } 