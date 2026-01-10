import type { Chapter } from '../types';

export const chapter12: Chapter = {
  id: 'chapter12',
  title: '実践データ分析',
  description: '学んだ知識を使って実際のデータ分析を行います',
  order: 12,
  lessons: [
    {
      id: 'lesson12-1',
      title: 'データ分析のプロセス',
      order: 1,
      content: `
# データ分析のプロセス

## データ分析の流れ

1. **課題設定**: 何を明らかにしたいか
2. **データ収集**: 必要なデータを集める
3. **データ理解**: データの構造を把握
4. **データクリーニング**: 欠損値や異常値の処理
5. **探索的分析**: データの特徴を把握
6. **分析・モデリング**: 統計分析や機械学習
7. **結果の解釈**: ビジネスへの示唆を導く
8. **レポート作成**: 結果を共有

## データ理解の基本

\`\`\`python
import pandas as pd
import numpy as np

# サンプルデータの作成
np.random.seed(42)
n = 100

df = pd.DataFrame({
    '顧客ID': range(1, n + 1),
    '年齢': np.random.randint(20, 60, n),
    '性別': np.random.choice(['男性', '女性'], n),
    '購入金額': np.random.randint(1000, 50000, n),
    '購入回数': np.random.randint(1, 20, n),
    '地域': np.random.choice(['東京', '大阪', '名古屋', '福岡'], n)
})

# データの概要
print("=== データの形状 ===")
print(df.shape)

print("\\n=== 最初の5行 ===")
print(df.head())

print("\\n=== データ型 ===")
print(df.dtypes)

print("\\n=== 基本統計量 ===")
print(df.describe())

print("\\n=== 欠損値の確認 ===")
print(df.isnull().sum())
\`\`\`

## データクリーニングの例

\`\`\`python
# 重複の削除
df = df.drop_duplicates()

# 欠損値の処理
df['年齢'] = df['年齢'].fillna(df['年齢'].median())

# 外れ値の処理（IQR法）
Q1 = df['購入金額'].quantile(0.25)
Q3 = df['購入金額'].quantile(0.75)
IQR = Q3 - Q1
lower = Q1 - 1.5 * IQR
upper = Q3 + 1.5 * IQR
df = df[(df['購入金額'] >= lower) & (df['購入金額'] <= upper)]
\`\`\`
`,
      exercises: [
        {
          id: 'ex12-1-1',
          title: 'データ概要の確認',
          description: 'DataFrameの行数と列数を「行数: X, 列数: Y」の形式で出力してください。',
          initialCode: 'import pandas as pd\n\ndf = pd.DataFrame({\n    "A": [1, 2, 3, 4, 5],\n    "B": [10, 20, 30, 40, 50],\n    "C": [100, 200, 300, 400, 500]\n})\n\n# 行数と列数を出力してください\n',
          expectedOutput: '行数: 5, 列数: 3',
          hints: [
            'df.shape で (行数, 列数) のタプルが取得できる',
            'rows, cols = df.shape で分解',
            'print(f"行数: {rows}, 列数: {cols}")'
          ]
        }
      ]
    },
    {
      id: 'lesson12-2',
      title: '探索的データ分析',
      order: 2,
      content: `
# 探索的データ分析（EDA）

## EDAとは

Exploratory Data Analysis（EDA）は、データの特徴やパターンを把握するための分析です。

## カテゴリ変数の分析

\`\`\`python
import pandas as pd
import matplotlib.pyplot as plt

# 性別ごとの集計
gender_counts = df['性別'].value_counts()
print(gender_counts)

# 可視化
plt.figure(figsize=(8, 5))
gender_counts.plot(kind='bar')
plt.title('性別分布')
plt.xlabel('性別')
plt.ylabel('人数')
plt.show()
\`\`\`

## 数値変数の分析

\`\`\`python
# ヒストグラム
plt.figure(figsize=(10, 6))
df['購入金額'].hist(bins=20, edgecolor='white')
plt.title('購入金額の分布')
plt.xlabel('購入金額（円）')
plt.ylabel('頻度')
plt.show()

# 基本統計量
print(df['購入金額'].describe())
\`\`\`

## クロス集計

\`\`\`python
# 性別×地域のクロス集計
cross = pd.crosstab(df['性別'], df['地域'])
print(cross)

# ヒートマップで可視化
plt.figure(figsize=(8, 5))
plt.imshow(cross, cmap='Blues')
plt.colorbar(label='人数')
plt.xticks(range(len(cross.columns)), cross.columns)
plt.yticks(range(len(cross.index)), cross.index)
plt.title('性別×地域のクロス集計')
plt.show()
\`\`\`

## 相関分析

\`\`\`python
# 相関係数
correlation = df[['年齢', '購入金額', '購入回数']].corr()
print(correlation)

# 散布図
plt.figure(figsize=(8, 6))
plt.scatter(df['購入回数'], df['購入金額'], alpha=0.5)
plt.xlabel('購入回数')
plt.ylabel('購入金額')
plt.title('購入回数と購入金額の関係')
plt.show()
\`\`\`

## グループ別分析

\`\`\`python
# 地域別の購入金額統計
regional_stats = df.groupby('地域')['購入金額'].agg(['mean', 'median', 'std'])
print(regional_stats)

# 箱ひげ図
df.boxplot(column='購入金額', by='地域', figsize=(10, 6))
plt.title('地域別購入金額の分布')
plt.suptitle('')  # 自動タイトルを消す
plt.ylabel('購入金額（円）')
plt.show()
\`\`\`
`,
      exercises: [
        {
          id: 'ex12-2-1',
          title: 'グループ別平均',
          description: '地域ごとの売上平均を計算して出力してください。',
          initialCode: 'import pandas as pd\n\ndf = pd.DataFrame({\n    "地域": ["東京", "大阪", "東京", "大阪", "東京"],\n    "売上": [100, 80, 120, 90, 110]\n})\n\n# 地域ごとの売上平均を出力\n',
          expectedOutput: '地域\n大阪     85.0\n東京    110.0\nName: 売上, dtype: float64',
          hints: [
            'df.groupby("地域")["売上"].mean()',
            '結果をprintで出力',
            '東京: 110、大阪: 85'
          ]
        }
      ]
    },
    {
      id: 'lesson12-3',
      title: '実践演習：売上分析',
      order: 3,
      content: `
# 実践演習：売上分析

## シナリオ

あなたはECサイトの分析担当者です。過去3ヶ月の売上データを分析し、経営陣に報告するレポートを作成します。

## 分析の流れ

### 1. データの準備

\`\`\`python
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

# サンプルデータ生成
np.random.seed(42)
n = 500

dates = pd.date_range('2024-01-01', periods=90, freq='D')
data = {
    '日付': np.random.choice(dates, n),
    'カテゴリ': np.random.choice(['家電', '食品', '衣類', '書籍'], n),
    '商品名': [f'商品{i}' for i in np.random.randint(1, 50, n)],
    '単価': np.random.randint(500, 10000, n),
    '数量': np.random.randint(1, 10, n),
    '顧客年代': np.random.choice(['20代', '30代', '40代', '50代以上'], n)
}
df = pd.DataFrame(data)
df['売上'] = df['単価'] * df['数量']
df = df.sort_values('日付').reset_index(drop=True)
\`\`\`

### 2. 全体概要

\`\`\`python
print("=== 売上サマリー ===")
print(f"期間: {df['日付'].min()} 〜 {df['日付'].max()}")
print(f"総売上: {df['売上'].sum():,}円")
print(f"取引件数: {len(df):,}件")
print(f"平均単価: {df['売上'].mean():,.0f}円")
\`\`\`

### 3. カテゴリ別分析

\`\`\`python
category_sales = df.groupby('カテゴリ')['売上'].agg(['sum', 'mean', 'count'])
category_sales.columns = ['売上合計', '平均売上', '件数']
category_sales = category_sales.sort_values('売上合計', ascending=False)
print("\\n=== カテゴリ別売上 ===")
print(category_sales)

# 可視化
fig, axes = plt.subplots(1, 2, figsize=(14, 5))

category_sales['売上合計'].plot(kind='bar', ax=axes[0], color='steelblue')
axes[0].set_title('カテゴリ別売上')
axes[0].set_ylabel('売上（円）')

category_sales['売上合計'].plot(kind='pie', ax=axes[1], autopct='%1.1f%%')
axes[1].set_title('売上構成比')
axes[1].set_ylabel('')

plt.tight_layout()
plt.show()
\`\`\`

### 4. 時系列分析

\`\`\`python
# 日別売上
daily_sales = df.groupby('日付')['売上'].sum()

plt.figure(figsize=(14, 5))
daily_sales.plot()
plt.title('日別売上推移')
plt.xlabel('日付')
plt.ylabel('売上（円）')
plt.grid(True, alpha=0.3)
plt.show()

# 曜日別分析
df['曜日'] = df['日付'].dt.day_name()
weekday_order = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
weekday_sales = df.groupby('曜日')['売上'].mean().reindex(weekday_order)
print("\\n=== 曜日別平均売上 ===")
print(weekday_sales)
\`\`\`

### 5. 顧客層分析

\`\`\`python
# 年代別売上
age_sales = df.groupby('顧客年代')['売上'].agg(['sum', 'mean', 'count'])
print("\\n=== 年代別売上 ===")
print(age_sales)

# 年代×カテゴリのクロス分析
cross = pd.pivot_table(df, values='売上', index='顧客年代',
                       columns='カテゴリ', aggfunc='sum')
print("\\n=== 年代×カテゴリ売上 ===")
print(cross)
\`\`\`
`,
      exercises: [
        {
          id: 'ex12-3-1',
          title: '総合分析',
          description: 'カテゴリごとの売上合計と平均を計算し、売上合計の降順で表示してください。',
          initialCode: 'import pandas as pd\n\ndf = pd.DataFrame({\n    "カテゴリ": ["A", "B", "A", "C", "B", "A"],\n    "売上": [100, 200, 150, 80, 180, 120]\n})\n\n# カテゴリ別集計を売上合計の降順で出力\n',
          expectedOutput: '        売上合計    平均売上\nカテゴリ                   \nA          370  123.333333\nB          380  190.000000\nC           80   80.000000',
          hints: [
            'groupby("カテゴリ")["売上"].agg()',
            '["sum", "mean"]または独自の名前を指定',
            'sort_values()で降順ソート'
          ]
        }
      ]
    }
  ]
};
