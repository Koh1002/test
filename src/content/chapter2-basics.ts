import type { Chapter } from '../types';

export const chapter2: Chapter = {
  id: 'chapter2',
  title: 'Python基礎：変数とprint文',
  description: 'Pythonの基本である変数の使い方とprint文を学びます',
  order: 2,
  lessons: [
    {
      id: 'lesson2-1',
      title: '変数とは何か',
      order: 1,
      content: `
# 変数とは何か

## 変数 = データを入れる箱

プログラミングにおいて、**変数**はデータを一時的に保存するための「箱」のようなものです。

\`\`\`python
name = "田中"
age = 30
\`\`\`

この例では：
- \`name\` という箱に「田中」という文字列を入れています
- \`age\` という箱に「30」という数値を入れています

## なぜ変数を使うのか？

### 1. 同じ値を何度も使える

\`\`\`python
price = 1000
tax = price * 0.1
total = price + tax
print(total)  # 1100.0
\`\`\`

### 2. コードが読みやすくなる

悪い例：
\`\`\`python
print(1000 * 1.1)
\`\`\`

良い例：
\`\`\`python
product_price = 1000
tax_rate = 1.1
total_price = product_price * tax_rate
print(total_price)
\`\`\`

### 3. 値の変更が簡単

\`\`\`python
discount_rate = 0.2  # 20%オフ
# この値を変更するだけで、全体の計算が変わる
\`\`\`

## 変数の命名ルール

Pythonで変数名を付けるときのルール：

| ルール | OK例 | NG例 |
|-------|------|------|
| 英字・数字・アンダースコアが使える | user_name | user-name |
| 数字で始められない | name1 | 1name |
| 予約語は使えない | my_class | class |
| 大文字と小文字は区別される | Name ≠ name | - |

### 良い変数名の付け方

\`\`\`python
# 良い例（意味がわかる）
customer_count = 100
total_sales = 50000
average_price = 500

# 悪い例（意味がわからない）
x = 100
y = 50000
z = 500
\`\`\`

> **ビジネスでのポイント**: 変数名は他の人（将来の自分を含む）が読んでもわかるようにしましょう。
`,
      exercises: [
        {
          id: 'ex2-1-1',
          title: '変数の作成',
          description: '変数 greeting に「こんにちは」という文字列を代入し、それをprint文で出力してください。',
          initialCode: '# greeting変数を作成し、「こんにちは」を代入してください\n\n# greeting を出力してください\n',
          expectedOutput: 'こんにちは',
          hints: [
            '変数への代入は = を使います',
            '文字列はクォートで囲みます',
            'greeting = "こんにちは" と書きます',
            '出力は print(greeting) です'
          ]
        }
      ]
    },
    {
      id: 'lesson2-2',
      title: 'データ型を理解する',
      order: 2,
      content: `
# データ型を理解する

## 主なデータ型

Pythonには様々なデータ型がありますが、まずは基本的な4つを覚えましょう。

### 1. 整数（int）

小数点のない数値です。

\`\`\`python
age = 30
count = -5
year = 2024
\`\`\`

### 2. 浮動小数点数（float）

小数点を含む数値です。

\`\`\`python
price = 1980.5
rate = 0.08
temperature = -2.5
\`\`\`

### 3. 文字列（str）

テキストデータです。シングルクォート(')またはダブルクォート(")で囲みます。

\`\`\`python
name = "田中太郎"
message = 'Hello, World!'
address = "東京都渋谷区"
\`\`\`

### 4. ブール値（bool）

真（True）か偽（False）のどちらかです。

\`\`\`python
is_active = True
has_permission = False
\`\`\`

## データ型を確認する

\`type()\` 関数を使うとデータ型を確認できます。

\`\`\`python
x = 100
print(type(x))  # <class 'int'>

y = 3.14
print(type(y))  # <class 'float'>

z = "Python"
print(type(z))  # <class 'str'>
\`\`\`

## 型変換

データ型を変換することもできます。

\`\`\`python
# 文字列を整数に
age_str = "25"
age_int = int(age_str)
print(age_int + 5)  # 30

# 整数を文字列に
num = 100
num_str = str(num)
print("価格: " + num_str + "円")  # 価格: 100円

# 整数を浮動小数点に
x = 10
x_float = float(x)
print(x_float)  # 10.0
\`\`\`

> **注意**: 数字以外の文字列を整数に変換しようとするとエラーになります。
`,
      exercises: [
        {
          id: 'ex2-2-1',
          title: 'データ型の確認',
          description: '変数 x に 42 を代入し、その型を表示してください。type()関数を使います。',
          initialCode: '# x に 42 を代入してください\n\n# x の型を出力してください\n',
          expectedOutput: "<class 'int'>",
          hints: [
            'x = 42 で整数を代入します',
            'type(x) で型を取得できます',
            'print(type(x)) で出力します'
          ]
        }
      ]
    },
    {
      id: 'lesson2-3',
      title: 'print文をマスターする',
      order: 3,
      content: `
# print文をマスターする

## 基本的なprint文

\`print()\` 関数は画面に出力するための関数です。

\`\`\`python
print("Hello!")
print(100)
print(3.14)
\`\`\`

## 複数の値を出力する

カンマで区切ると、複数の値を一度に出力できます。

\`\`\`python
name = "田中"
age = 30
print(name, age)  # 田中 30
\`\`\`

## 文字列の連結

### + 演算子を使う

\`\`\`python
first_name = "太郎"
last_name = "田中"
full_name = last_name + first_name
print(full_name)  # 田中太郎
\`\`\`

**注意**: 文字列と数値は直接連結できません。

\`\`\`python
age = 30
# print("年齢: " + age)  # エラー！
print("年齢: " + str(age))  # OK: 年齢: 30
\`\`\`

## f文字列（推奨）

Python 3.6以降で使える便利な書き方です。

\`\`\`python
name = "田中"
age = 30
print(f"名前: {name}, 年齢: {age}")
# 出力: 名前: 田中, 年齢: 30
\`\`\`

### f文字列で計算もできる

\`\`\`python
price = 1000
tax = 0.1
print(f"税込価格: {price * (1 + tax)}円")
# 出力: 税込価格: 1100.0円
\`\`\`

### 小数点の桁数を指定

\`\`\`python
value = 3.141592653
print(f"円周率: {value:.2f}")  # 小数点以下2桁
# 出力: 円周率: 3.14
\`\`\`

## 改行とタブ

\`\`\`python
# 改行: \\n
print("1行目\\n2行目")

# タブ: \\t
print("名前\\t年齢")
print("田中\\t30")
\`\`\`

出力:
\`\`\`
1行目
2行目
名前	年齢
田中	30
\`\`\`
`,
      exercises: [
        {
          id: 'ex2-3-1',
          title: 'f文字列の練習',
          description: '変数 product に「りんご」、price に 150 を代入し、f文字列を使って「りんごは150円です」と出力してください。',
          initialCode: '# product と price を定義してください\n\n# f文字列で「〇〇は△△円です」と出力してください\n',
          expectedOutput: 'りんごは150円です',
          hints: [
            'product = "りんご" と price = 150 を定義',
            'f文字列は f"..." の形式で書きます',
            '{product} と {price} で変数の値を埋め込みます',
            'print(f"{product}は{price}円です")'
          ]
        }
      ]
    },
    {
      id: 'lesson2-4',
      title: '計算してみよう',
      order: 4,
      content: `
# 計算してみよう

## 算術演算子

Pythonでは電卓のように計算ができます。

| 演算子 | 意味 | 例 | 結果 |
|-------|------|-----|------|
| + | 足し算 | 5 + 3 | 8 |
| - | 引き算 | 5 - 3 | 2 |
| * | 掛け算 | 5 * 3 | 15 |
| / | 割り算 | 5 / 3 | 1.666... |
| // | 整数除算 | 5 // 3 | 1 |
| % | 余り | 5 % 3 | 2 |
| ** | べき乗 | 5 ** 3 | 125 |

## 計算の優先順位

数学と同じ優先順位が適用されます。

\`\`\`python
result = 2 + 3 * 4
print(result)  # 14（掛け算が先）

result = (2 + 3) * 4
print(result)  # 20（括弧が先）
\`\`\`

## ビジネスでよく使う計算例

### 売上計算

\`\`\`python
unit_price = 500    # 単価
quantity = 120      # 数量
sales = unit_price * quantity
print(f"売上: {sales}円")  # 売上: 60000円
\`\`\`

### 消費税計算

\`\`\`python
price = 10000
tax_rate = 0.10
tax = price * tax_rate
total = price + tax
print(f"税込価格: {total}円")  # 税込価格: 11000.0円
\`\`\`

### 割引計算

\`\`\`python
original_price = 5000
discount_rate = 0.20  # 20%オフ
discount = original_price * discount_rate
final_price = original_price - discount
print(f"割引後価格: {final_price}円")  # 割引後価格: 4000.0円
\`\`\`

### 平均計算

\`\`\`python
scores = [85, 90, 78, 92, 88]
total = sum(scores)
count = len(scores)
average = total / count
print(f"平均点: {average}点")  # 平均点: 86.6点
\`\`\`

## 代入演算子

変数の値を更新する便利な書き方があります。

\`\`\`python
x = 10
x = x + 5  # x は 15
# 上と同じ意味
x += 5     # x は 20

# 他の演算子も同様
x -= 3   # x = x - 3
x *= 2   # x = x * 2
x /= 4   # x = x / 4
\`\`\`
`,
      exercises: [
        {
          id: 'ex2-4-1',
          title: '消費税の計算',
          description: '税抜価格 1980円 に消費税10%を加えた税込価格を計算し、「税込価格: ○○円」の形式で出力してください。',
          initialCode: '# 税抜価格を定義\nprice = 1980\n\n# 消費税率を定義\ntax_rate = 0.10\n\n# 税込価格を計算して出力してください\n',
          expectedOutput: '税込価格: 2178.0円',
          hints: [
            '税込価格 = 税抜価格 * (1 + 税率) で計算できます',
            'または税込価格 = 税抜価格 + (税抜価格 * 税率)',
            'f文字列で出力するとき: f"税込価格: {total}円"',
            '答え: print(f"税込価格: {price * (1 + tax_rate)}円")'
          ]
        }
      ]
    }
  ]
};
