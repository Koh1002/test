import type { Chapter } from '../types';

export const chapter1: Chapter = {
  id: 'chapter1',
  title: '環境構築',
  description: 'VS CodeとPythonをインストールしてプログラミングを始める準備をしましょう',
  order: 1,
  lessons: [
    {
      id: 'lesson1-1',
      title: 'VS Codeとは',
      order: 1,
      content: `
# VS Codeとは

## はじめに

**Visual Studio Code**（通称: VS Code）は、Microsoftが開発した無料のコードエディタです。世界中のプログラマーに愛用されており、Pythonの開発にも最適です。

## なぜVS Codeを使うのか？

データビジネスに携わる方がPythonを学ぶ際、VS Codeには多くのメリットがあります：

### 1. 無料で高機能
- 完全無料で利用可能
- プロの開発者も使う本格的なエディタ
- 軽量で動作が速い

### 2. Python開発に最適
- Python拡張機能で強力なサポート
- コード補完（入力候補の表示）
- エラーの自動検出
- デバッグ機能

### 3. Jupyter Notebook対応
- VS Code内でNotebook形式のファイルを編集・実行可能
- データ分析に最適な環境

### 4. 拡張機能が豊富
- 必要な機能を後から追加できる
- 日本語化も可能

## Notebook形式とは？

Jupyter Notebookとも呼ばれるこの形式は、**セル**という単位でコードや文章を書きます。

- **コードセル**: Pythonコードを書いて実行
- **マークダウンセル**: 説明文やメモを記述

この形式はデータ分析において非常に人気があり、分析過程をドキュメントとして残しながら作業できます。

> **ポイント**: VS Codeは実務でも広く使われているツールです。これをマスターすれば、本格的な開発環境が手に入ります。
`,
      exercises: []
    },
    {
      id: 'lesson1-2',
      title: 'VS Codeのインストール',
      order: 2,
      content: `
# VS Codeのインストール

## ダウンロードとインストール

### Step 1: VS Codeをダウンロード

公式サイトからダウンロードします：

1. ブラウザで **https://code.visualstudio.com/** にアクセス
2. 「Download」ボタンをクリック（自動でOSに合ったバージョンが選ばれます）
3. ダウンロードが完了するまで待つ

### Step 2: インストール

#### Windowsの場合
1. ダウンロードした \`.exe\` ファイルをダブルクリック
2. 「同意する」を選択して「次へ」
3. インストール先はそのままで「次へ」
4. **「PATHへの追加」にチェック**を入れる（重要！）
5. 「インストール」をクリック

#### Macの場合
1. ダウンロードした \`.zip\` ファイルを展開
2. \`Visual Studio Code.app\` を「アプリケーション」フォルダにドラッグ
3. アプリケーションフォルダからVS Codeを起動

### Step 3: 日本語化（オプション）

1. VS Codeを起動
2. 左側の拡張機能アイコン（四角が4つ）をクリック
3. 検索欄に「Japanese」と入力
4. 「Japanese Language Pack for Visual Studio Code」をインストール
5. VS Codeを再起動

## VS Codeの画面構成

| 要素 | 説明 |
|------|------|
| サイドバー | ファイル一覧、検索、拡張機能など |
| エディタ | コードを書く領域 |
| ターミナル | コマンドを実行する領域 |
| ステータスバー | 現在の状態を表示 |

> **次のレッスンで**: Pythonをインストールします！
`,
      exercises: []
    },
    {
      id: 'lesson1-3',
      title: 'Pythonのインストール',
      order: 3,
      content: `
# Pythonのインストール

## Pythonをダウンロード

### Step 1: Python公式サイトにアクセス

1. ブラウザで **https://www.python.org/** にアクセス
2. 「Downloads」メニューをクリック
3. 最新版のPythonをダウンロード（例: Python 3.12.x）

### Step 2: インストール

#### Windowsの場合

1. ダウンロードした \`.exe\` ファイルをダブルクリック
2. **「Add Python to PATH」にチェックを入れる**（とても重要！）
3. 「Install Now」をクリック
4. インストール完了まで待つ

#### Macの場合

1. ダウンロードした \`.pkg\` ファイルをダブルクリック
2. 画面の指示に従ってインストール
3. インストール完了

### Step 3: インストール確認

ターミナル（コマンドプロンプト）を開いて確認します。

**Windowsの場合**:
1. スタートメニューで「cmd」と検索
2. 「コマンドプロンプト」を開く
3. 以下を入力してEnter:

\`\`\`
python --version
\`\`\`

**Macの場合**:
1. 「ターミナル」アプリを開く
2. 以下を入力してEnter:

\`\`\`
python3 --version
\`\`\`

### 期待される出力

\`\`\`
Python 3.12.x
\`\`\`

バージョン番号が表示されればインストール成功です！

> **トラブルシューティング**: 「コマンドが見つかりません」と表示された場合は、Pythonのインストール時に「Add Python to PATH」にチェックを入れ忘れた可能性があります。再インストールしてください。
`,
      exercises: []
    },
    {
      id: 'lesson1-4',
      title: 'VS Code拡張機能のインストール',
      order: 4,
      content: `
# VS Code拡張機能のインストール

VS CodeでPythonを快適に使うために、必要な拡張機能をインストールします。

## Python拡張機能

### Step 1: 拡張機能を開く

1. VS Codeを起動
2. 左側のサイドバーで拡張機能アイコン（四角が4つ）をクリック
3. または \`Ctrl + Shift + X\`（Mac: \`Cmd + Shift + X\`）

### Step 2: Python拡張機能をインストール

1. 検索欄に「Python」と入力
2. **「Python」**（Microsoft製）を見つける
3. 「Install」ボタンをクリック

この拡張機能により以下が使えるようになります：
- コード補完（IntelliSense）
- 構文エラーの検出
- コードの実行
- デバッグ

## Jupyter拡張機能

Notebook形式（.ipynb）を使うために必要です。

### Step 1: Jupyter拡張機能をインストール

1. 検索欄に「Jupyter」と入力
2. **「Jupyter」**（Microsoft製）を見つける
3. 「Install」ボタンをクリック

## インストール確認

インストールが完了したら、VS Codeを再起動してください。

### 確認方法

1. VS Codeで新しいファイルを作成
2. ファイル名を \`test.py\` として保存
3. 以下のコードを入力：

\`\`\`python
print("Hello, Python!")
\`\`\`

4. 右上の「▶」ボタンをクリック、または \`Ctrl + F5\`

ターミナルに「Hello, Python!」と表示されれば成功です！

## 推奨拡張機能（オプション）

| 拡張機能 | 説明 |
|---------|------|
| Pylance | より高度なPython言語サポート |
| Python Indent | インデントを自動調整 |
| autoDocstring | ドキュメント文字列を自動生成 |
`,
      exercises: []
    },
    {
      id: 'lesson1-5',
      title: 'はじめてのコード実行',
      order: 5,
      content: `
# はじめてのコード実行

## Pythonファイルでコードを実行

### Step 1: フォルダを開く

1. VS Codeを起動
2. 「ファイル」→「フォルダーを開く」
3. 作業用のフォルダを選択（なければ新規作成）

### Step 2: Pythonファイルを作成

1. 左側のエクスプローラーで右クリック
2. 「新しいファイル」を選択
3. ファイル名を \`hello.py\` と入力

### Step 3: コードを入力

\`\`\`python
print("Hello, Python!")
\`\`\`

### Step 4: コードを実行

実行方法は3つあります：

1. **右上の▶ボタン**をクリック
2. **Ctrl + F5**（Mac: \`Ctrl + F5\`）
3. **右クリック → 「Pythonファイルを実行」**

### 実行結果

ターミナルに以下が表示されます：

\`\`\`
Hello, Python!
\`\`\`

おめでとうございます！これがあなたの最初のPythonプログラムです！

## 複数行のコードを実行

\`\`\`python
print("1行目")
print("2行目")
print("3行目")
\`\`\`

実行結果：
\`\`\`
1行目
2行目
3行目
\`\`\`

## 便利なショートカット

| ショートカット | 動作 |
|--------------|------|
| Ctrl + F5 | ファイルを実行 |
| Ctrl + S | ファイルを保存 |
| Ctrl + / | コメントアウト |
| Ctrl + Space | 入力候補を表示 |

> **練習**: 下の演習で実際にコードを実行してみましょう！
`,
      exercises: [
        {
          id: 'ex1-5-1',
          title: 'はじめてのPythonコード',
          description: '「Hello, Python!」と出力するコードを書いて実行してみましょう。',
          initialCode: '# ここにコードを書いてください\n',
          expectedOutput: 'Hello, Python!',
          hints: [
            'print()関数を使います',
            '文字列はダブルクォート(")またはシングルクォート(\')で囲みます',
            '正解: print("Hello, Python!")'
          ]
        }
      ]
    },
    {
      id: 'lesson1-6',
      title: 'Jupyter Notebookの使い方',
      order: 6,
      content: `
# Jupyter Notebookの使い方

データ分析では、Notebook形式がよく使われます。VS CodeでもNotebookを使えます。

## Notebookファイルの作成

### Step 1: 新しいNotebookを作成

1. コマンドパレットを開く: \`Ctrl + Shift + P\`（Mac: \`Cmd + Shift + P\`）
2. 「Create: New Jupyter Notebook」と入力
3. Enterを押す

または：
1. 新しいファイルを作成
2. ファイル名を \`analysis.ipynb\` として保存

## Notebookの画面構成

- **セル**: コードやテキストを入力する領域
- **コードセル**: Pythonコードを実行
- **マークダウンセル**: 説明文を記述

## セルの操作

### コードの入力と実行

1. セルにコードを入力
2. **Shift + Enter** で実行（次のセルに移動）
3. または **Ctrl + Enter** で実行（移動なし）

\`\`\`python
# これはコードセルです
x = 10
print(x)
\`\`\`

### セルの追加

- **上に追加**: セルを選択して \`A\` キー
- **下に追加**: セルを選択して \`B\` キー
- または「+ Code」「+ Markdown」ボタン

### セルの削除

- セルを選択して \`D\` キーを2回押す
- または右クリック →「Delete Cell」

### セルタイプの変更

- **コード → マークダウン**: \`M\` キー
- **マークダウン → コード**: \`Y\` キー

## カーネルの選択

Notebookを開くと、右上に「カーネルを選択」と表示されます。

1. 「カーネルを選択」をクリック
2. インストールしたPythonを選択

## Notebookの保存

- **Ctrl + S**（Mac: \`Cmd + S\`）で保存
- ファイルは \`.ipynb\` 形式で保存されます

## 便利なショートカット（編集モード以外）

| ショートカット | 動作 |
|--------------|------|
| Shift + Enter | セルを実行して次へ |
| Ctrl + Enter | セルを実行 |
| A | 上にセルを追加 |
| B | 下にセルを追加 |
| D, D | セルを削除 |
| M | マークダウンセルに変更 |
| Y | コードセルに変更 |

> **ヒント**: Notebookはデータ分析の結果を共有する際にも便利です。コードと結果、説明が一つのファイルにまとまります。
`,
      exercises: [
        {
          id: 'ex1-6-1',
          title: '複数行の出力',
          description: '3行にわたって「1」「2」「3」と出力するコードを書いてください。',
          initialCode: '# 3行にわたって1, 2, 3を出力してください\n',
          expectedOutput: '1\n2\n3',
          hints: [
            'print()を3回使います',
            '各行でprint(1)、print(2)、print(3)と書きます',
            '数字はクォートで囲む必要はありません'
          ]
        }
      ]
    }
  ]
};
