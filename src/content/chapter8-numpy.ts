import type { Chapter } from '../types';

export const chapter8: Chapter = {
  id: 'chapter8',
  title: 'NumPy入門',
  description: '数値計算ライブラリNumPyの基本を学びます',
  order: 8,
  lessons: [
    {
      id: 'lesson8-1',
      title: 'NumPyとは',
      order: 1,
      content: `
# NumPyとは

## NumPyの概要

**NumPy**（Numerical Python）は、Pythonで高速な数値計算を行うためのライブラリです。

### なぜNumPyを使うのか

1. **高速**: Pythonのリストより圧倒的に速い
2. **便利**: 配列操作や数学関数が豊富
3. **基盤**: Pandas、scikit-learnなどの基礎

## インポート方法

\`\`\`python
import numpy as np  # npという別名で使うのが慣例
\`\`\`

Google Colabではすでにインストールされています。

## 配列（ndarray）の作成

### リストから作成

\`\`\`python
import numpy as np

# 1次元配列
arr = np.array([1, 2, 3, 4, 5])
print(arr)        # [1 2 3 4 5]
print(type(arr))  # <class 'numpy.ndarray'>
\`\`\`

### 便利な配列作成関数

\`\`\`python
# 0で埋めた配列
zeros = np.zeros(5)
print(zeros)  # [0. 0. 0. 0. 0.]

# 1で埋めた配列
ones = np.ones(5)
print(ones)  # [1. 1. 1. 1. 1.]

# 連続した数値
arange = np.arange(0, 10, 2)  # 0から10まで2刻み
print(arange)  # [0 2 4 6 8]

# 等間隔の数値
linspace = np.linspace(0, 1, 5)  # 0から1まで5分割
print(linspace)  # [0.   0.25 0.5  0.75 1.  ]
\`\`\`

## 配列の属性

\`\`\`python
arr = np.array([[1, 2, 3], [4, 5, 6]])

print(arr.shape)  # (2, 3) - 形状
print(arr.ndim)   # 2 - 次元数
print(arr.size)   # 6 - 要素数
print(arr.dtype)  # int64 - データ型
\`\`\`
`,
      exercises: [
        {
          id: 'ex8-1-1',
          title: 'NumPy配列の作成',
          description: 'NumPyを使って [10, 20, 30, 40, 50] という配列を作成し、出力してください。',
          initialCode: 'import numpy as np\n\n# 配列を作成してください\n\n# 配列を出力\n',
          expectedOutput: '[10 20 30 40 50]',
          hints: [
            'np.array() で配列を作成',
            'リストを引数に渡す',
            'arr = np.array([10, 20, 30, 40, 50])',
            'print(arr) で出力'
          ]
        }
      ]
    },
    {
      id: 'lesson8-2',
      title: '配列の計算',
      order: 2,
      content: `
# 配列の計算

## 要素ごとの演算

NumPyでは、配列同士の演算が要素ごとに行われます。

\`\`\`python
import numpy as np

a = np.array([1, 2, 3])
b = np.array([4, 5, 6])

print(a + b)   # [5 7 9]  - 足し算
print(a - b)   # [-3 -3 -3] - 引き算
print(a * b)   # [4 10 18] - 掛け算
print(a / b)   # [0.25 0.4 0.5] - 割り算
print(a ** 2)  # [1 4 9] - べき乗
\`\`\`

## ブロードキャスト

異なるサイズの配列でも計算できます。

\`\`\`python
arr = np.array([1, 2, 3, 4, 5])

# スカラー値との演算
print(arr * 10)  # [10 20 30 40 50]
print(arr + 100) # [101 102 103 104 105]
\`\`\`

## 集計関数

\`\`\`python
data = np.array([23, 45, 12, 67, 34, 89, 56])

print(np.sum(data))   # 326 - 合計
print(np.mean(data))  # 46.57... - 平均
print(np.std(data))   # 24.27... - 標準偏差
print(np.min(data))   # 12 - 最小値
print(np.max(data))   # 89 - 最大値
print(np.median(data))# 45.0 - 中央値
\`\`\`

## ビジネス例: 売上分析

\`\`\`python
import numpy as np

# 日別売上（万円）
daily_sales = np.array([120, 95, 145, 110, 180, 200, 165])

print(f"合計: {np.sum(daily_sales)}万円")
print(f"平均: {np.mean(daily_sales):.1f}万円")
print(f"最高: {np.max(daily_sales)}万円")
print(f"最低: {np.min(daily_sales)}万円")

# 目標達成率を計算
target = 130
achievement = daily_sales / target * 100
print(f"達成率: {achievement.round(1)}")
\`\`\`
`,
      exercises: [
        {
          id: 'ex8-2-1',
          title: '配列の統計',
          description: 'データの平均値を計算して出力してください。',
          initialCode: 'import numpy as np\n\ndata = np.array([85, 90, 78, 92, 88])\n\n# 平均を計算して出力してください\n',
          expectedOutput: '86.6',
          hints: [
            'np.mean() で平均を計算',
            'print(np.mean(data)) で出力',
            '結果は 86.6 になるはず'
          ]
        }
      ]
    },
    {
      id: 'lesson8-3',
      title: '配列の操作',
      order: 3,
      content: `
# 配列の操作

## インデックスとスライス

\`\`\`python
import numpy as np

arr = np.array([10, 20, 30, 40, 50])

# インデックス
print(arr[0])    # 10 - 最初
print(arr[-1])   # 50 - 最後
print(arr[2])    # 30 - 3番目

# スライス
print(arr[1:4])  # [20 30 40] - 2番目から4番目
print(arr[:3])   # [10 20 30] - 最初から3番目
print(arr[2:])   # [30 40 50] - 3番目から最後
\`\`\`

## 条件による抽出

\`\`\`python
arr = np.array([15, 28, 42, 8, 33, 19])

# 条件に合う要素を抽出
over_20 = arr[arr > 20]
print(over_20)  # [28 42 33]

# 条件を変数に
mask = arr >= 20
print(mask)      # [False  True  True False  True False]
print(arr[mask]) # [28 42 33]
\`\`\`

## 2次元配列

\`\`\`python
matrix = np.array([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
])

print(matrix[0, 0])  # 1 - 1行1列
print(matrix[1, 2])  # 6 - 2行3列
print(matrix[0])     # [1 2 3] - 1行目
print(matrix[:, 1])  # [2 5 8] - 2列目
\`\`\`

## 形状の変更

\`\`\`python
arr = np.arange(12)
print(arr)  # [ 0  1  2  3  4  5  6  7  8  9 10 11]

# 3行4列に変形
reshaped = arr.reshape(3, 4)
print(reshaped)
# [[ 0  1  2  3]
#  [ 4  5  6  7]
#  [ 8  9 10 11]]
\`\`\`

## ビジネス例: 月別データの抽出

\`\`\`python
# 月別売上（1月〜12月）
monthly_sales = np.array([100, 120, 95, 110, 145, 160,
                          180, 175, 150, 130, 140, 200])

# 上半期（1-6月）
first_half = monthly_sales[:6]
print(f"上半期合計: {np.sum(first_half)}")

# 目標（120万円）以上の月
good_months = np.where(monthly_sales >= 120)[0] + 1
print(f"好調な月: {good_months}")
\`\`\`
`,
      exercises: [
        {
          id: 'ex8-3-1',
          title: '条件抽出',
          description: 'scoresから80点以上の要素だけを抽出して出力してください。',
          initialCode: 'import numpy as np\n\nscores = np.array([65, 82, 90, 74, 88, 95, 70])\n\n# 80点以上を抽出して出力\n',
          expectedOutput: '[82 90 88 95]',
          hints: [
            'scores[scores >= 80] で条件抽出',
            '結果をprintで出力',
            '82, 90, 88, 95 の4つが抽出される'
          ]
        }
      ]
    }
  ]
};
