# Python学習プラットフォーム

ゼロから始めるPythonプログラミングとデータ分析の学習Webアプリケーションです。

## 概要

このアプリケーションは、プログラミング未経験のビジネスパーソンが、Pythonを使ったデータ分析ができるようになることを目標としています。

### 対象者
- プログラミング経験ゼロのビジネスマン
- データ分析に興味がある方
- Pythonを学びたい方

### ゴール
- VS Code上でPythonプログラミングができる
- Jupyter Notebook形式で統計的なデータ分析がPythonで実行できる

## 学習コンテンツ

### 基礎編
1. **環境構築** - VS CodeとPythonのセットアップ
2. **Python基礎** - 変数とprint文
3. **条件分岐** - if文
4. **繰り返し処理** - for文・while文
5. **関数** - 関数の定義と使い方
6. **再帰処理** - 再帰関数
7. **クラス** - オブジェクト指向プログラミング

### データ分析編
8. **NumPy入門** - 数値計算ライブラリ
9. **Pandas入門** - データ分析ライブラリ
10. **Matplotlib入門** - データ可視化
11. **Polars入門** - 高速データ処理
12. **実践データ分析** - 総合演習

## 機能

- **インタラクティブな学習** - 各レッスンに演習問題付き
- **コードエディタ** - ブラウザ上でPythonコードを実行
- **進捗管理** - 学習の進捗を自動保存
- **AI学習アシスタント** - GPT/Claude/Geminiに質問可能

## 技術スタック

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Monaco Editor

## セットアップ

```bash
# 依存パッケージのインストール
npm install

# 開発サーバーの起動
npm run dev

# ビルド
npm run build
```

## コンテンツの追加・編集

学習コンテンツは `src/content/` ディレクトリにあります。

### 新しい章を追加する

1. `src/content/chapter{N}-{name}.ts` を作成
2. `src/content/chapters.ts` でインポートして配列に追加

### レッスンの構造

```typescript
{
  id: 'lesson1-1',
  title: 'レッスンタイトル',
  order: 1,
  content: `
    # マークダウン形式のコンテンツ
    ...
  `,
  exercises: [
    {
      id: 'ex1-1-1',
      title: '演習タイトル',
      description: '演習の説明',
      initialCode: '// 初期コード',
      expectedOutput: '期待される出力',
      hints: ['ヒント1', 'ヒント2']
    }
  ]
}
```

## ライセンス

MIT License
