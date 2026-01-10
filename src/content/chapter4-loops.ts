import type { Chapter } from '../types';

export const chapter4: Chapter = {
  id: 'chapter4',
  title: '繰り返し処理：for文',
  description: '同じ処理を繰り返すfor文とwhile文を学びます',
  order: 4,
  lessons: [
    {
      id: 'lesson4-1',
      title: 'for文の基本',
      order: 1,
      content: `
# for文の基本

## 繰り返しとは

同じ処理を何度も実行したいとき、for文を使います。

\`\`\`python
for i in range(5):
    print(i)
\`\`\`

出力:
\`\`\`
0
1
2
3
4
\`\`\`

## for文の構造

\`\`\`python
for 変数 in イテラブル:
    繰り返す処理
\`\`\`

- **変数**: ループごとに値が変わる変数
- **イテラブル**: 繰り返し可能なもの（リスト、range等）

## range関数

\`range()\` は連続した数値を生成します。

\`\`\`python
# range(終了値) - 0から終了値-1まで
for i in range(3):
    print(i)  # 0, 1, 2

# range(開始値, 終了値)
for i in range(1, 4):
    print(i)  # 1, 2, 3

# range(開始値, 終了値, ステップ)
for i in range(0, 10, 2):
    print(i)  # 0, 2, 4, 6, 8
\`\`\`

## リストを繰り返す

\`\`\`python
fruits = ["りんご", "みかん", "バナナ"]

for fruit in fruits:
    print(fruit)
\`\`\`

出力:
\`\`\`
りんご
みかん
バナナ
\`\`\`

## ビジネス例: 売上合計

\`\`\`python
daily_sales = [10000, 15000, 8000, 12000, 20000]
total = 0

for sales in daily_sales:
    total = total + sales

print(f"合計売上: {total}円")
\`\`\`

出力: \`合計売上: 65000円\`
`,
      exercises: [
        {
          id: 'ex4-1-1',
          title: '1から5まで出力',
          description: 'for文を使って1から5までの数字を順番に出力してください。',
          initialCode: '# 1から5までを出力してください\n',
          expectedOutput: '1\n2\n3\n4\n5',
          hints: [
            'range(1, 6)で1から5までの数列が作れます',
            'for i in range(1, 6): と書きます',
            'ループ内で print(i) を実行'
          ]
        }
      ]
    },
    {
      id: 'lesson4-2',
      title: 'リストの操作',
      order: 2,
      content: `
# リストの操作

## リストとは

複数のデータをまとめて扱うためのデータ構造です。

\`\`\`python
# リストの作成
numbers = [1, 2, 3, 4, 5]
names = ["田中", "佐藤", "鈴木"]
mixed = [1, "hello", 3.14, True]
\`\`\`

## リストの基本操作

### 要素へのアクセス（インデックス）

\`\`\`python
fruits = ["りんご", "みかん", "バナナ"]
print(fruits[0])  # りんご（最初の要素）
print(fruits[1])  # みかん（2番目）
print(fruits[-1]) # バナナ（最後の要素）
\`\`\`

### 要素の追加

\`\`\`python
fruits = ["りんご", "みかん"]
fruits.append("バナナ")
print(fruits)  # ['りんご', 'みかん', 'バナナ']
\`\`\`

### リストの長さ

\`\`\`python
fruits = ["りんご", "みかん", "バナナ"]
print(len(fruits))  # 3
\`\`\`

## enumerate: インデックス付きループ

\`\`\`python
fruits = ["りんご", "みかん", "バナナ"]

for index, fruit in enumerate(fruits):
    print(f"{index}: {fruit}")
\`\`\`

出力:
\`\`\`
0: りんご
1: みかん
2: バナナ
\`\`\`

## ビジネス例: 商品リスト

\`\`\`python
products = [
    {"name": "商品A", "price": 1000},
    {"name": "商品B", "price": 1500},
    {"name": "商品C", "price": 800}
]

for i, product in enumerate(products, 1):
    print(f"{i}. {product['name']}: {product['price']}円")
\`\`\`

出力:
\`\`\`
1. 商品A: 1000円
2. 商品B: 1500円
3. 商品C: 800円
\`\`\`
`,
      exercises: [
        {
          id: 'ex4-2-1',
          title: 'リストの合計',
          description: 'numbersリストの全要素の合計を計算して出力してください。',
          initialCode: 'numbers = [10, 20, 30, 40, 50]\ntotal = 0\n\n# for文で合計を計算してください\n\nprint(total)',
          expectedOutput: '150',
          hints: [
            'for num in numbers: でリストをループ',
            'total = total + num または total += num',
            'ループ終了後にprintで合計を出力'
          ]
        }
      ]
    },
    {
      id: 'lesson4-3',
      title: 'while文',
      order: 3,
      content: `
# while文

## while文とは

条件がTrueの間、処理を繰り返します。

\`\`\`python
count = 0

while count < 5:
    print(count)
    count += 1
\`\`\`

出力:
\`\`\`
0
1
2
3
4
\`\`\`

## for文との違い

- **for文**: 回数や要素が決まっているとき
- **while文**: 条件が満たされる間続けたいとき

## 注意: 無限ループ

条件が永遠にTrueだと、プログラムが止まりません。

\`\`\`python
# 危険な例（実行しないでください）
# while True:
#     print("無限ループ")
\`\`\`

**必ず条件がFalseになるようにしましょう。**

## break: ループを抜ける

\`\`\`python
count = 0

while True:
    print(count)
    count += 1
    if count >= 5:
        break  # ループを抜ける
\`\`\`

## continue: 次のループへ

\`\`\`python
for i in range(5):
    if i == 2:
        continue  # 2はスキップ
    print(i)
\`\`\`

出力:
\`\`\`
0
1
3
4
\`\`\`

## ビジネス例: 目標達成までの積み上げ

\`\`\`python
target = 100000
monthly_saving = 15000
months = 0
total = 0

while total < target:
    total += monthly_saving
    months += 1

print(f"{months}ヶ月で目標達成！")
\`\`\`

出力: \`7ヶ月で目標達成！\`
`,
      exercises: [
        {
          id: 'ex4-3-1',
          title: 'while文の基本',
          description: 'while文を使って1から5までの数字を出力してください。',
          initialCode: 'num = 1\n\n# while文で1から5まで出力してください\n',
          expectedOutput: '1\n2\n3\n4\n5',
          hints: [
            'while num <= 5: で条件を設定',
            'print(num) で出力',
            'num += 1 で変数を増やす（忘れると無限ループ！）'
          ]
        }
      ]
    },
    {
      id: 'lesson4-4',
      title: 'ネストしたループ',
      order: 4,
      content: `
# ネストしたループ

## ループの中にループ

ループの中にさらにループを書くことができます。

\`\`\`python
for i in range(3):
    for j in range(2):
        print(f"i={i}, j={j}")
\`\`\`

出力:
\`\`\`
i=0, j=0
i=0, j=1
i=1, j=0
i=1, j=1
i=2, j=0
i=2, j=1
\`\`\`

## 九九の表

\`\`\`python
for i in range(1, 10):
    for j in range(1, 10):
        print(f"{i*j:3}", end="")
    print()  # 改行
\`\`\`

## ビジネス例: 月別・商品別売上

\`\`\`python
months = ["1月", "2月", "3月"]
products = ["商品A", "商品B"]

for month in months:
    print(f"=== {month} ===")
    for product in products:
        # 実際にはデータベースから取得
        print(f"  {product}: 売上集計")
\`\`\`

出力:
\`\`\`
=== 1月 ===
  商品A: 売上集計
  商品B: 売上集計
=== 2月 ===
  商品A: 売上集計
  商品B: 売上集計
=== 3月 ===
  商品A: 売上集計
  商品B: 売上集計
\`\`\`

## リスト内包表記（応用）

シンプルなループは1行で書けます。

\`\`\`python
# 通常のfor文
squares = []
for i in range(5):
    squares.append(i ** 2)
print(squares)  # [0, 1, 4, 9, 16]

# リスト内包表記
squares = [i ** 2 for i in range(5)]
print(squares)  # [0, 1, 4, 9, 16]
\`\`\`

### 条件付きリスト内包表記

\`\`\`python
# 偶数だけを抽出
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
evens = [n for n in numbers if n % 2 == 0]
print(evens)  # [2, 4, 6, 8, 10]
\`\`\`
`,
      exercises: [
        {
          id: 'ex4-4-1',
          title: '掛け算表',
          description: '2の段（2×1から2×5まで）を出力してください。形式は「2 x 1 = 2」のように。',
          initialCode: '# 2の段を出力してください\n',
          expectedOutput: '2 x 1 = 2\n2 x 2 = 4\n2 x 3 = 6\n2 x 4 = 8\n2 x 5 = 10',
          hints: [
            'for i in range(1, 6): で1から5まで',
            '計算結果は 2 * i',
            'print(f"2 x {i} = {2 * i}") で出力'
          ]
        }
      ]
    }
  ]
};
