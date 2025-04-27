import streamlit as st
import requests
import pandas as pd
from typing import Dict, Any
import json

# ページ設定
st.set_page_config(
    page_title="インタビュー結果自動生成システム",
    page_icon="📝",
    layout="wide"
)

# スタイル設定
st.markdown("""
    <style>
    .stTextInput>div>div>input {
        background-color: #f0f2f6;
    }
    .stButton>button {
        background-color: #4CAF50;
        color: white;
        border-radius: 5px;
        padding: 10px 24px;
    }
    </style>
""", unsafe_allow_html=True)

# タイトル
st.title("📝 インタビュー結果自動生成システム")

# サイドバー
with st.sidebar:
    st.header("設定")
    api_url = st.text_input("API URL", value="http://localhost:8000")

# メインコンテンツ
col1, col2 = st.columns([2, 1])

with col1:
    # プロンプト入力
    prompt = st.text_area(
        "インタビューテーマを入力してください",
        height=150,
        placeholder="例：新商品の開発に関するインタビュー"
    )

    if st.button("インタビューを生成", key="generate"):
        if prompt:
            with st.spinner("インタビューを生成中..."):
                try:
                    # APIリクエスト
                    response = requests.post(
                        f"{api_url}/generate-interview",
                        json={"prompt": prompt}
                    )
                    response.raise_for_status()
                    result = response.json()

                    # 結果の表示
                    st.session_state.interview_result = result
                    st.success("インタビュー生成が完了しました！")
                except Exception as e:
                    st.error(f"エラーが発生しました: {str(e)}")
        else:
            st.warning("プロンプトを入力してください")

with col2:
    # Excelダウンロードボタン
    if st.button("Excelダウンロード", key="download"):
        try:
            response = requests.get(f"{api_url}/download-excel")
            response.raise_for_status()
            file_path = response.json()["file_path"]
            
            with open(file_path, "rb") as f:
                st.download_button(
                    label="Excelファイルをダウンロード",
                    data=f,
                    file_name="interview_results.xlsx",
                    mime="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                )
        except Exception as e:
            st.error(f"ダウンロードエラー: {str(e)}")

# 結果の表示
if "interview_result" in st.session_state:
    result = st.session_state.interview_result
    
    # サマリーの表示
    st.header("📊 インタビュー結果サマリー")
    st.write(result["summary"])
    
    # インタビュー結果の表示
    st.header("💬 インタビュー詳細")
    for interview in result["interviews"]:
        with st.expander(f"インタビュー: {interview['persona']['name']}"):
            st.write(f"**質問:** {interview['question']}")
            st.write(f"**回答:** {interview['answer']}")
    
    # ペルソナ情報の表示
    st.header("👥 ペルソナ情報")
    personas_df = pd.DataFrame(result["personas"])
    st.dataframe(personas_df) 