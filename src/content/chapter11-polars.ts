import type { Chapter } from '../types';

export const chapter11: Chapter = {
  id: 'chapter11',
  title: 'Polars入門',
  description: '高速なデータ処理ライブラリPolarsを学びます',
  order: 11,
  lessons: [
    {
      id: 'lesson11-1',
      title: 'Polarsとは',
      order: 1,
      content: `
# Polarsとは

## Polarsの概要

**Polars**は、Rustで書かれた高速なデータ処理ライブラリです。Pandasと似たAPIを持ちながら、大規模データでも高速に動作します。

### Polarsのメリット
1. **高速**: Pandasより数倍〜数十倍速い
2. **メモリ効率が良い**: 大規模データも扱える
3. **並列処理**: マルチコアを自動活用
4. **型安全**: 明確なデータ型

## インストールとインポート

\`\`\`python
# Google Colabでインストール
!pip install polars

import polars as pl
\`\`\`

## DataFrameの作成

\`\`\`python
import polars as pl

# 辞書から作成
df = pl.DataFrame({
    '商品名': ['りんご', 'みかん', 'バナナ'],
    '価格': [150, 100, 120],
    '在庫': [50, 80, 30]
})
print(df)
\`\`\`

出力:
\`\`\`
shape: (3, 3)
┌──────────┬───────┬───────┐
│ 商品名   ┆ 価格  ┆ 在庫  │
│ ---      ┆ ---   ┆ ---   │
│ str      ┆ i64   ┆ i64   │
╞══════════╪═══════╪═══════╡
│ りんご   ┆ 150   ┆ 50    │
│ みかん   ┆ 100   ┆ 80    │
│ バナナ   ┆ 120   ┆ 30    │
└──────────┴───────┴───────┘
\`\`\`

## CSVの読み書き

\`\`\`python
# 読み込み
df = pl.read_csv('data.csv')

# 書き出し
df.write_csv('output.csv')

# Parquet形式（推奨）
df = pl.read_parquet('data.parquet')
df.write_parquet('output.parquet')
\`\`\`

## Pandasとの違い

| 特徴 | Pandas | Polars |
|-----|--------|--------|
| 速度 | 遅め | 非常に速い |
| メモリ | 多め | 効率的 |
| インデックス | あり | なし |
| 遅延評価 | なし | あり |
| 普及度 | 高い | 成長中 |
`,
      exercises: [
        {
          id: 'ex11-1-1',
          title: 'Polars DataFrame作成',
          description: '商品名と価格のDataFrameを作成して出力してください。',
          initialCode: 'import polars as pl\n\n# DataFrameを作成してください\ndata = {\n    "商品": ["A", "B", "C"],\n    "価格": [100, 200, 150]\n}\n\n# DataFrameを作成して出力\n',
          expectedOutput: 'shape: (3, 2)\n┌──────┬───────┐\n│ 商品 ┆ 価格  │\n│ ---  ┆ ---   │\n│ str  ┆ i64   │\n╞══════╪═══════╡\n│ A    ┆ 100   │\n│ B    ┆ 200   │\n│ C    ┆ 150   │\n└──────┴───────┘',
          hints: [
            'pl.DataFrame(data) でDataFrameを作成',
            'print(df) で出力',
            'Pandasと似た書き方'
          ]
        }
      ]
    },
    {
      id: 'lesson11-2',
      title: 'データの選択とフィルタリング',
      order: 2,
      content: `
# データの選択とフィルタリング

## 列の選択

\`\`\`python
import polars as pl

df = pl.DataFrame({
    '商品名': ['りんご', 'みかん', 'バナナ'],
    '価格': [150, 100, 120],
    '在庫': [50, 80, 30]
})

# 1列を選択
print(df.select('価格'))

# 複数列を選択
print(df.select(['商品名', '価格']))

# 列の除外
print(df.select(pl.exclude('在庫')))
\`\`\`

## フィルタリング

\`\`\`python
# 条件でフィルタ
high_price = df.filter(pl.col('価格') >= 120)
print(high_price)

# 複数条件
filtered = df.filter(
    (pl.col('価格') >= 100) & (pl.col('在庫') >= 40)
)
print(filtered)
\`\`\`

## 列の追加・変換

\`\`\`python
# 新しい列を追加
df = df.with_columns(
    (pl.col('価格') * pl.col('在庫')).alias('売上')
)
print(df)

# 複数の列を同時に追加
df = df.with_columns([
    (pl.col('価格') * 1.1).alias('税込価格'),
    pl.when(pl.col('在庫') < 40)
      .then(pl.lit('少'))
      .otherwise(pl.lit('適正'))
      .alias('在庫状況')
])
\`\`\`

## Expression API

Polarsの強力なExpression APIを使うと、複雑な操作も簡潔に書けます。

\`\`\`python
# 文字列操作
df = df.with_columns(
    pl.col('商品名').str.to_uppercase().alias('商品名_大文字')
)

# 条件分岐
df = df.with_columns(
    pl.when(pl.col('価格') >= 150)
      .then(pl.lit('高'))
      .when(pl.col('価格') >= 100)
      .then(pl.lit('中'))
      .otherwise(pl.lit('低'))
      .alias('価格帯')
)
\`\`\`
`,
      exercises: [
        {
          id: 'ex11-2-1',
          title: 'フィルタリング',
          description: '価格が120以上の商品だけを抽出してください。',
          initialCode: 'import polars as pl\n\ndf = pl.DataFrame({\n    "商品": ["A", "B", "C", "D"],\n    "価格": [100, 150, 120, 80]\n})\n\n# 価格が120以上を抽出して出力\n',
          expectedOutput: 'shape: (2, 2)\n┌──────┬───────┐\n│ 商品 ┆ 価格  │\n│ ---  ┆ ---   │\n│ str  ┆ i64   │\n╞══════╪═══════╡\n│ B    ┆ 150   │\n│ C    ┆ 120   │\n└──────┴───────┘',
          hints: [
            "df.filter(pl.col('価格') >= 120)",
            'pl.col()で列を指定',
            '結果をprintで出力'
          ]
        }
      ]
    },
    {
      id: 'lesson11-3',
      title: '集計とグループ化',
      order: 3,
      content: `
# 集計とグループ化

## 基本的な集計

\`\`\`python
import polars as pl

df = pl.DataFrame({
    'カテゴリ': ['A', 'B', 'A', 'B', 'A'],
    '売上': [100, 200, 150, 180, 120]
})

# 集計関数
print(df.select([
    pl.col('売上').sum().alias('合計'),
    pl.col('売上').mean().alias('平均'),
    pl.col('売上').max().alias('最大'),
    pl.col('売上').min().alias('最小'),
    pl.col('売上').count().alias('件数')
]))
\`\`\`

## グループ化

\`\`\`python
# カテゴリ別集計
result = df.group_by('カテゴリ').agg([
    pl.col('売上').sum().alias('売上合計'),
    pl.col('売上').mean().alias('売上平均'),
    pl.col('売上').count().alias('件数')
])
print(result)
\`\`\`

## ソート

\`\`\`python
# 昇順
df_sorted = df.sort('売上')

# 降順
df_sorted_desc = df.sort('売上', descending=True)

# 複数列でソート
df_multi_sort = df.sort(['カテゴリ', '売上'], descending=[False, True])
\`\`\`

## 遅延評価（Lazy API）

大規模データでは遅延評価を使うとさらに高速になります。

\`\`\`python
# 遅延評価モード
lazy_df = df.lazy()

# 複数の操作をチェーン
result = (
    lazy_df
    .filter(pl.col('売上') >= 100)
    .group_by('カテゴリ')
    .agg(pl.col('売上').sum())
    .sort('売上', descending=True)
    .collect()  # ここで実際に実行
)
print(result)
\`\`\`

## ビジネス例: 売上分析

\`\`\`python
sales = pl.DataFrame({
    '日付': ['2024-01-01', '2024-01-01', '2024-01-02', '2024-01-02'],
    '商品': ['A', 'B', 'A', 'B'],
    '売上': [1000, 1500, 1200, 1800],
    '個数': [10, 15, 12, 18]
})

# 商品別・日付別の集計
summary = (
    sales
    .group_by(['商品', '日付'])
    .agg([
        pl.col('売上').sum().alias('売上合計'),
        pl.col('個数').sum().alias('販売個数'),
        (pl.col('売上') / pl.col('個数')).mean().alias('平均単価')
    ])
    .sort(['商品', '日付'])
)
print(summary)
\`\`\`
`,
      exercises: [
        {
          id: 'ex11-3-1',
          title: 'グループ集計',
          description: '部門ごとの売上合計を計算してください。',
          initialCode: 'import polars as pl\n\ndf = pl.DataFrame({\n    "部門": ["営業", "開発", "営業", "開発"],\n    "売上": [100, 80, 120, 90]\n})\n\n# 部門ごとの売上合計を出力\n',
          expectedOutput: 'shape: (2, 2)\n┌──────┬──────────┐\n│ 部門 ┆ 売上合計 │\n│ ---  ┆ ---      │\n│ str  ┆ i64      │\n╞══════╪══════════╡\n│ 営業 ┆ 220      │\n│ 開発 ┆ 170      │\n└──────┴──────────┘',
          hints: [
            "df.group_by('部門').agg()",
            "pl.col('売上').sum().alias('売上合計')",
            '結果をprintで出力'
          ]
        }
      ]
    }
  ]
};
