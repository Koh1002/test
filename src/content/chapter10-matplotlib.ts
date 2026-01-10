import type { Chapter } from '../types';

export const chapter10: Chapter = {
  id: 'chapter10',
  title: 'Matplotlib入門',
  description: 'データ可視化ライブラリMatplotlibを学びます',
  order: 10,
  lessons: [
    {
      id: 'lesson10-1',
      title: 'Matplotlibとは',
      order: 1,
      content: `
# Matplotlibとは

## Matplotlibの概要

**Matplotlib**は、Pythonでグラフを描画するための標準的なライブラリです。

### できること
- 折れ線グラフ、棒グラフ、散布図など
- グラフのカスタマイズ
- 画像として保存

## インポート方法

\`\`\`python
import matplotlib.pyplot as plt
\`\`\`

Google Colabでは、グラフが自動的に表示されます。

## 基本的なグラフ

### 折れ線グラフ

\`\`\`python
import matplotlib.pyplot as plt

x = [1, 2, 3, 4, 5]
y = [10, 25, 15, 30, 20]

plt.plot(x, y)
plt.title('売上推移')
plt.xlabel('月')
plt.ylabel('売上（万円）')
plt.show()
\`\`\`

### 棒グラフ

\`\`\`python
categories = ['りんご', 'みかん', 'バナナ']
values = [30, 45, 25]

plt.bar(categories, values)
plt.title('果物の売上')
plt.show()
\`\`\`

## 日本語表示

Google Colabで日本語を表示するには：

\`\`\`python
import matplotlib.pyplot as plt

# 日本語フォントの設定
plt.rcParams['font.family'] = 'Noto Sans CJK JP'

# または以下でも可
# !pip install japanize-matplotlib
# import japanize_matplotlib
\`\`\`

## グラフの保存

\`\`\`python
plt.plot([1, 2, 3], [1, 4, 9])
plt.savefig('my_graph.png', dpi=300, bbox_inches='tight')
\`\`\`
`,
      exercises: [
        {
          id: 'ex10-1-1',
          title: '折れ線グラフ',
          description: '月別売上データの折れ線グラフを作成してください（タイトル: 月別売上）。',
          initialCode: 'import matplotlib.pyplot as plt\n\nmonths = [1, 2, 3, 4, 5]\nsales = [100, 120, 90, 150, 130]\n\n# 折れ線グラフを作成してください\n# タイトルを設定してください\n\nplt.show()\nprint("グラフを表示しました")',
          expectedOutput: 'グラフを表示しました',
          hints: [
            'plt.plot(months, sales) で折れ線グラフ',
            'plt.title("月別売上") でタイトル',
            'plt.show() で表示'
          ]
        }
      ]
    },
    {
      id: 'lesson10-2',
      title: '様々なグラフ',
      order: 2,
      content: `
# 様々なグラフ

## 散布図

2つの変数の関係を見るのに適しています。

\`\`\`python
import matplotlib.pyplot as plt
import numpy as np

# データ
x = np.random.randn(100)
y = 2 * x + np.random.randn(100)

plt.scatter(x, y, alpha=0.6)
plt.title('相関関係')
plt.xlabel('X')
plt.ylabel('Y')
plt.show()
\`\`\`

## ヒストグラム

データの分布を見るのに適しています。

\`\`\`python
data = np.random.randn(1000)

plt.hist(data, bins=30, edgecolor='white')
plt.title('正規分布')
plt.xlabel('値')
plt.ylabel('頻度')
plt.show()
\`\`\`

## 円グラフ

割合を示すのに適しています。

\`\`\`python
labels = ['A部門', 'B部門', 'C部門', 'D部門']
sizes = [35, 25, 25, 15]

plt.pie(sizes, labels=labels, autopct='%1.1f%%')
plt.title('部門別売上構成')
plt.show()
\`\`\`

## 箱ひげ図

データのばらつきを見るのに適しています。

\`\`\`python
data = [
    np.random.normal(100, 10, 100),
    np.random.normal(90, 20, 100),
    np.random.normal(110, 15, 100)
]

plt.boxplot(data, labels=['A', 'B', 'C'])
plt.title('グループ別分布')
plt.ylabel('値')
plt.show()
\`\`\`

## ビジネス例: 売上分析ダッシュボード

\`\`\`python
import matplotlib.pyplot as plt
import numpy as np

fig, axes = plt.subplots(2, 2, figsize=(12, 10))

# 月別売上推移
months = range(1, 13)
sales = [100, 120, 115, 130, 145, 160, 155, 170, 165, 180, 190, 210]
axes[0, 0].plot(months, sales, marker='o')
axes[0, 0].set_title('月別売上推移')

# 部門別売上
departments = ['営業', '製造', 'マーケ', '開発']
dept_sales = [450, 320, 180, 250]
axes[0, 1].bar(departments, dept_sales, color=['blue', 'green', 'orange', 'red'])
axes[0, 1].set_title('部門別売上')

# 売上分布
daily_sales = np.random.normal(50, 10, 365)
axes[1, 0].hist(daily_sales, bins=20, edgecolor='white')
axes[1, 0].set_title('日別売上分布')

# 構成比
axes[1, 1].pie(dept_sales, labels=departments, autopct='%1.1f%%')
axes[1, 1].set_title('売上構成比')

plt.tight_layout()
plt.show()
\`\`\`
`,
      exercises: [
        {
          id: 'ex10-2-1',
          title: '棒グラフ',
          description: '地域別売上の棒グラフを作成してください。',
          initialCode: 'import matplotlib.pyplot as plt\n\nregions = ["Tokyo", "Osaka", "Nagoya"]\nsales = [500, 350, 200]\n\n# 棒グラフを作成してください\n\nplt.show()\nprint("棒グラフを表示しました")',
          expectedOutput: '棒グラフを表示しました',
          hints: [
            'plt.bar(regions, sales) で棒グラフ',
            'plt.title() でタイトルも追加すると良い',
            'plt.show() で表示'
          ]
        }
      ]
    },
    {
      id: 'lesson10-3',
      title: 'グラフのカスタマイズ',
      order: 3,
      content: `
# グラフのカスタマイズ

## 色とスタイル

\`\`\`python
import matplotlib.pyplot as plt

x = [1, 2, 3, 4, 5]
y1 = [1, 4, 9, 16, 25]
y2 = [1, 2, 3, 4, 5]

plt.plot(x, y1, color='red', linestyle='--', linewidth=2, label='二乗')
plt.plot(x, y2, color='blue', linestyle='-', linewidth=1, label='線形')
plt.legend()
plt.show()
\`\`\`

### 色の指定方法
- 名前: 'red', 'blue', 'green'
- 16進数: '#FF5733'
- RGB: (0.5, 0.2, 0.8)

### 線のスタイル
- '-' 実線
- '--' 破線
- ':' 点線
- '-.' 一点鎖線

## マーカー

\`\`\`python
plt.plot(x, y, marker='o', markersize=10, markerfacecolor='red')
\`\`\`

マーカーの種類: 'o', 's', '^', 'D', '*', '+'

## 軸の設定

\`\`\`python
plt.xlim(0, 10)    # x軸の範囲
plt.ylim(0, 100)   # y軸の範囲

plt.xticks([0, 2, 4, 6, 8, 10])  # x軸の目盛り
plt.yticks([0, 25, 50, 75, 100]) # y軸の目盛り

# 対数スケール
plt.yscale('log')
\`\`\`

## グリッドと凡例

\`\`\`python
plt.grid(True, alpha=0.3)  # グリッド線
plt.legend(loc='upper left')  # 凡例の位置
\`\`\`

## 複数グラフ（サブプロット）

\`\`\`python
fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(12, 5))

ax1.plot(x, y1)
ax1.set_title('グラフ1')

ax2.bar(x, y2)
ax2.set_title('グラフ2')

plt.tight_layout()
plt.show()
\`\`\`

## ビジネス例: 見やすい売上レポート

\`\`\`python
import matplotlib.pyplot as plt
import numpy as np

# データ
months = ['1月', '2月', '3月', '4月', '5月', '6月']
actual = [95, 110, 125, 118, 140, 155]
target = [100, 105, 120, 130, 135, 150]

fig, ax = plt.subplots(figsize=(10, 6))

# 棒グラフ（実績）
bars = ax.bar(months, actual, color='steelblue', label='実績', alpha=0.8)

# 折れ線グラフ（目標）
ax.plot(months, target, color='red', marker='o', linewidth=2,
        label='目標', linestyle='--')

# 目標達成/未達成の色分け
for bar, a, t in zip(bars, actual, target):
    if a >= t:
        bar.set_color('green')

ax.set_title('月別売上 vs 目標', fontsize=14, fontweight='bold')
ax.set_ylabel('売上（万円）')
ax.legend()
ax.grid(axis='y', alpha=0.3)

plt.tight_layout()
plt.show()
\`\`\`
`,
      exercises: [
        {
          id: 'ex10-3-1',
          title: 'カスタマイズ',
          description: '赤色の折れ線グラフを作成し、丸いマーカーをつけてください。',
          initialCode: 'import matplotlib.pyplot as plt\n\nx = [1, 2, 3, 4, 5]\ny = [10, 15, 13, 18, 20]\n\n# 赤色で丸いマーカー付きの折れ線グラフを作成\n\nplt.show()\nprint("カスタマイズしたグラフを表示しました")',
          expectedOutput: 'カスタマイズしたグラフを表示しました',
          hints: [
            "plt.plot(x, y, color='red', marker='o')",
            "color='red' で赤色",
            "marker='o' で丸いマーカー"
          ]
        }
      ]
    }
  ]
};
