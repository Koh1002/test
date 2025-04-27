import streamlit as st
import requests
import json
import os

# ページ設定
st.set_page_config(
    page_title="インタビュー結果生成アプリ",
    page_icon="📊",
    layout="wide"
)

# タイトル
st.title("インタビュー結果生成アプリ")

# サイドバー
with st.sidebar:
    st.header("設定")
    user_request = st.text_area(
        "ユーザーリクエスト",
        placeholder="例：炭酸飲料の新商品インタビュー",
        help="インタビューの目的や対象を入力してください"
    )

# メインコンテンツ
if user_request:
    if st.button("インタビュー結果を生成"):
        with st.spinner("インタビュー結果を生成中..."):
            try:
                # APIリクエスト
                response = requests.post(
                    "http://localhost:8000/generate_documentation",
                    json={"request": user_request}
                )
                response.raise_for_status()
                result = response.json()

                # 結果の表示
                st.header("生成結果")
                
                # サマリーの表示
                st.subheader("サマリー")
                st.write(result["summary"])

                # Excelダウンロードボタン
                if "excel_path" in result:
                    excel_filename = os.path.basename(result["excel_path"])
                    st.download_button(
                        label="Excelファイルをダウンロード",
                        data=requests.get(f"http://localhost:8000/download_excel/{excel_filename}").content,
                        file_name=excel_filename,
                        mime="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                    )

                # インタビュー結果の表示
                st.subheader("インタビュー結果")
                for interview in result["interviews"]:
                    with st.expander(f"{interview['persona']['name']} - {interview['persona']['position']}"):
                        st.write("**背景:**", interview["persona"]["background"])
                        st.write("**年代:**", interview["persona"]["age"])
                        st.write("**性別:**", interview["persona"]["gender"])
                        st.write("**質問:**", interview["question"])
                        st.write("**回答:**", interview["answer"])

            except requests.exceptions.RequestException as e:
                st.error(f"APIリクエストエラー: {str(e)}")
            except Exception as e:
                st.error(f"エラーが発生しました: {str(e)}")
else:
    st.info("👈 サイドバーからユーザーリクエストを入力してください") 