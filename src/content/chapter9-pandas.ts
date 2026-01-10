import type { Chapter } from '../types';

export const chapter9: Chapter = {
  id: 'chapter9',
  title: 'Pandas入門',
  description: 'データ分析の定番ライブラリPandasを学びます',
  order: 9,
  lessons: [
    {
      id: 'lesson9-1',
      title: 'Pandasとは',
      order: 1,
      content: `
# Pandasとは

## Pandasの概要

**Pandas**は、表形式のデータを扱うためのライブラリです。ExcelやSQLのようなデータ操作をPythonで行えます。

### 主なデータ構造

1. **Series**: 1次元のデータ（1列）
2. **DataFrame**: 2次元のデータ（表）

## インポート方法

\`\`\`python
import pandas as pd  # pdという別名で使うのが慣例
\`\`\`

## Seriesの基本

\`\`\`python
import pandas as pd

# Seriesの作成
s = pd.Series([10, 20, 30, 40, 50])
print(s)
\`\`\`

出力:
\`\`\`
0    10
1    20
2    30
3    40
4    50
dtype: int64
\`\`\`

### インデックス付きSeries

\`\`\`python
sales = pd.Series(
    [120, 95, 150],
    index=['1月', '2月', '3月']
)
print(sales['1月'])  # 120
\`\`\`

## DataFrameの基本

\`\`\`python
# 辞書から作成
data = {
    '商品名': ['りんご', 'みかん', 'バナナ'],
    '価格': [150, 100, 120],
    '在庫': [50, 80, 30]
}
df = pd.DataFrame(data)
print(df)
\`\`\`

出力:
\`\`\`
   商品名  価格  在庫
0  りんご  150   50
1  みかん  100   80
2  バナナ  120   30
\`\`\`

## CSVファイルの読み込み

\`\`\`python
# CSVを読み込む
df = pd.read_csv('sales_data.csv')

# 最初の5行を表示
print(df.head())

# データの情報
print(df.info())

# 統計情報
print(df.describe())
\`\`\`
`,
      exercises: [
        {
          id: 'ex9-1-1',
          title: 'DataFrameの作成',
          description: '与えられた辞書からDataFrameを作成し、出力してください。',
          initialCode: 'import pandas as pd\n\ndata = {\n    "名前": ["田中", "佐藤", "鈴木"],\n    "年齢": [25, 30, 28]\n}\n\n# DataFrameを作成して出力してください\n',
          expectedOutput: '    名前  年齢\n0  田中   25\n1  佐藤   30\n2  鈴木   28',
          hints: [
            'pd.DataFrame(data) でDataFrameを作成',
            '結果をprintで出力',
            'df = pd.DataFrame(data) と書く'
          ]
        }
      ]
    },
    {
      id: 'lesson9-2',
      title: 'データの選択と抽出',
      order: 2,
      content: `
# データの選択と抽出

## 列の選択

\`\`\`python
import pandas as pd

df = pd.DataFrame({
    '商品名': ['りんご', 'みかん', 'バナナ'],
    '価格': [150, 100, 120],
    '在庫': [50, 80, 30]
})

# 1列を選択（Seriesで返る）
print(df['価格'])

# 複数列を選択（DataFrameで返る）
print(df[['商品名', '価格']])
\`\`\`

## 行の選択

\`\`\`python
# インデックスで選択
print(df.loc[0])      # 0行目
print(df.loc[0:1])    # 0-1行目

# 位置で選択
print(df.iloc[0])     # 最初の行
print(df.iloc[-1])    # 最後の行
\`\`\`

## 条件による抽出

\`\`\`python
# 価格が120以上の商品
expensive = df[df['価格'] >= 120]
print(expensive)

# 複数条件（&: かつ、|: または）
condition = (df['価格'] >= 100) & (df['在庫'] >= 40)
filtered = df[condition]
print(filtered)
\`\`\`

## 新しい列の追加

\`\`\`python
# 計算で新列を作成
df['売上'] = df['価格'] * df['在庫']
print(df)

# 条件で新列を作成
df['ステータス'] = df['在庫'].apply(
    lambda x: '少' if x < 40 else '適正'
)
print(df)
\`\`\`

## ビジネス例: 顧客データ分析

\`\`\`python
customers = pd.DataFrame({
    '顧客名': ['A社', 'B社', 'C社', 'D社'],
    '売上': [1000000, 500000, 1500000, 800000],
    '地域': ['東京', '大阪', '東京', '名古屋']
})

# 売上100万以上の顧客
vip = customers[customers['売上'] >= 1000000]
print("VIP顧客:")
print(vip)

# 東京の顧客
tokyo = customers[customers['地域'] == '東京']
print("\\n東京の顧客:")
print(tokyo)
\`\`\`
`,
      exercises: [
        {
          id: 'ex9-2-1',
          title: '条件抽出',
          description: '年齢が27歳以上のデータだけを抽出して出力してください。',
          initialCode: 'import pandas as pd\n\ndf = pd.DataFrame({\n    "名前": ["田中", "佐藤", "鈴木", "高橋"],\n    "年齢": [25, 30, 28, 22]\n})\n\n# 27歳以上を抽出して出力\n',
          expectedOutput: '    名前  年齢\n1  佐藤   30\n2  鈴木   28',
          hints: [
            'df[df["年齢"] >= 27] で条件抽出',
            '結果をprintで出力',
            '佐藤と鈴木が抽出される'
          ]
        }
      ]
    },
    {
      id: 'lesson9-3',
      title: 'データの集計',
      order: 3,
      content: `
# データの集計

## 基本的な集計

\`\`\`python
import pandas as pd

df = pd.DataFrame({
    '商品': ['A', 'B', 'A', 'B', 'A'],
    '売上': [100, 200, 150, 180, 120],
    '個数': [10, 15, 12, 20, 8]
})

# 列ごとの集計
print(df['売上'].sum())    # 合計: 750
print(df['売上'].mean())   # 平均: 150
print(df['売上'].max())    # 最大: 200
print(df['売上'].min())    # 最小: 100
print(df['売上'].count())  # 件数: 5
\`\`\`

## グループ化（groupby）

商品ごとに集計したい場合：

\`\`\`python
# 商品ごとの売上合計
grouped = df.groupby('商品')['売上'].sum()
print(grouped)
\`\`\`

出力:
\`\`\`
商品
A    370
B    380
Name: 売上, dtype: int64
\`\`\`

### 複数の集計

\`\`\`python
# 複数の集計を同時に
summary = df.groupby('商品').agg({
    '売上': ['sum', 'mean'],
    '個数': 'sum'
})
print(summary)
\`\`\`

## ピボットテーブル

\`\`\`python
sales_data = pd.DataFrame({
    '月': ['1月', '1月', '2月', '2月'],
    '地域': ['東京', '大阪', '東京', '大阪'],
    '売上': [100, 80, 120, 90]
})

pivot = pd.pivot_table(
    sales_data,
    values='売上',
    index='月',
    columns='地域',
    aggfunc='sum'
)
print(pivot)
\`\`\`

## ビジネス例: 月別売上分析

\`\`\`python
df = pd.DataFrame({
    '日付': pd.date_range('2024-01-01', periods=90, freq='D'),
    '売上': [100 + i * 2 + (i % 7) * 10 for i in range(90)]
})

# 月を抽出
df['月'] = df['日付'].dt.month

# 月別集計
monthly = df.groupby('月')['売上'].agg(['sum', 'mean', 'max'])
print(monthly)
\`\`\`
`,
      exercises: [
        {
          id: 'ex9-3-1',
          title: 'グループ集計',
          description: 'カテゴリごとの売上合計を計算して出力してください。',
          initialCode: 'import pandas as pd\n\ndf = pd.DataFrame({\n    "カテゴリ": ["食品", "家電", "食品", "家電"],\n    "売上": [1000, 5000, 2000, 3000]\n})\n\n# カテゴリごとの売上合計を出力\n',
          expectedOutput: 'カテゴリ\n家電    8000\n食品    3000\nName: 売上, dtype: int64',
          hints: [
            'df.groupby("カテゴリ")["売上"].sum()',
            '結果をprintで出力',
            '食品: 3000、家電: 8000'
          ]
        }
      ]
    },
    {
      id: 'lesson9-4',
      title: 'データの加工',
      order: 4,
      content: `
# データの加工

## 欠損値の処理

\`\`\`python
import pandas as pd
import numpy as np

df = pd.DataFrame({
    '名前': ['田中', '佐藤', '鈴木'],
    '年齢': [25, np.nan, 30],
    '売上': [100, 200, np.nan]
})

# 欠損値の確認
print(df.isnull().sum())

# 欠損値の削除
df_dropped = df.dropna()

# 欠損値の穴埋め
df_filled = df.fillna({
    '年齢': df['年齢'].mean(),
    '売上': 0
})
\`\`\`

## 重複の処理

\`\`\`python
df = pd.DataFrame({
    '商品': ['A', 'B', 'A', 'C'],
    '価格': [100, 200, 100, 300]
})

# 重複の確認
print(df.duplicated())

# 重複の削除
df_unique = df.drop_duplicates()
\`\`\`

## データ型の変換

\`\`\`python
df = pd.DataFrame({
    '日付': ['2024-01-01', '2024-01-02'],
    '金額': ['1000', '2000']
})

# 文字列を日付に
df['日付'] = pd.to_datetime(df['日付'])

# 文字列を数値に
df['金額'] = df['金額'].astype(int)
\`\`\`

## 文字列操作

\`\`\`python
df = pd.DataFrame({
    '名前': ['田中 太郎', '佐藤 花子', '鈴木 一郎']
})

# 分割
df[['姓', '名']] = df['名前'].str.split(' ', expand=True)

# 置換
df['名前'] = df['名前'].str.replace(' ', '_')
\`\`\`

## ソート

\`\`\`python
df = pd.DataFrame({
    '商品': ['A', 'B', 'C'],
    '売上': [300, 100, 200]
})

# 昇順
df_asc = df.sort_values('売上')

# 降順
df_desc = df.sort_values('売上', ascending=False)

# 複数列でソート
df_multi = df.sort_values(['売上', '商品'])
\`\`\`
`,
      exercises: [
        {
          id: 'ex9-4-1',
          title: 'ソート',
          description: '売上の降順（大きい順）でソートして出力してください。',
          initialCode: 'import pandas as pd\n\ndf = pd.DataFrame({\n    "商品": ["A", "B", "C"],\n    "売上": [150, 300, 200]\n})\n\n# 売上の降順でソートして出力\n',
          expectedOutput: '  商品   売上\n1   B  300\n2   C  200\n0   A  150',
          hints: [
            'df.sort_values("売上", ascending=False)',
            '降順なので ascending=False',
            '結果をprintで出力'
          ]
        }
      ]
    }
  ]
};
