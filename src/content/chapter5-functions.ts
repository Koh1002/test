import type { Chapter } from '../types';

export const chapter5: Chapter = {
  id: 'chapter5',
  title: '関数',
  description: '処理をまとめて再利用できる関数を学びます',
  order: 5,
  lessons: [
    {
      id: 'lesson5-1',
      title: '関数の基本',
      order: 1,
      content: `
# 関数の基本

## 関数とは

関数は、**処理をまとめて名前をつけたもの**です。何度も使う処理を関数にすると便利です。

\`\`\`python
def greet():
    print("こんにちは！")

greet()  # 関数を呼び出す
greet()  # 何度でも呼び出せる
\`\`\`

出力:
\`\`\`
こんにちは！
こんにちは！
\`\`\`

## 関数の定義

\`\`\`python
def 関数名():
    処理
\`\`\`

- \`def\` キーワードで関数を定義
- 関数名の後に \`()\` と \`:\` が必要
- 処理はインデントする

## なぜ関数を使うのか

### 1. コードの再利用

\`\`\`python
def calculate_tax(price):
    return price * 1.1

print(calculate_tax(1000))  # 1100.0
print(calculate_tax(2000))  # 2200.0
print(calculate_tax(500))   # 550.0
\`\`\`

### 2. コードの整理

複雑な処理を小さな関数に分けることで、読みやすくなります。

### 3. 変更が簡単

税率が変わったら、関数を1箇所変更するだけでOK。

## 組み込み関数

Pythonには最初から使える関数があります。

\`\`\`python
print("Hello")      # 出力
len([1, 2, 3])      # 長さを取得 → 3
max([1, 5, 3])      # 最大値 → 5
min([1, 5, 3])      # 最小値 → 1
sum([1, 2, 3])      # 合計 → 6
abs(-5)             # 絶対値 → 5
round(3.7)          # 四捨五入 → 4
\`\`\`
`,
      exercises: [
        {
          id: 'ex5-1-1',
          title: '関数の定義',
          description: '「おはようございます」と出力する関数 good_morning を定義し、呼び出してください。',
          initialCode: '# good_morning関数を定義してください\n\n# 関数を呼び出してください\n',
          expectedOutput: 'おはようございます',
          hints: [
            'def good_morning(): で関数を定義',
            '中で print("おはようございます") を実行',
            '関数名() で呼び出し'
          ]
        }
      ]
    },
    {
      id: 'lesson5-2',
      title: '引数と戻り値',
      order: 2,
      content: `
# 引数と戻り値

## 引数（ひきすう）

関数に値を渡すことができます。

\`\`\`python
def greet(name):
    print(f"こんにちは、{name}さん！")

greet("田中")  # こんにちは、田中さん！
greet("佐藤")  # こんにちは、佐藤さん！
\`\`\`

### 複数の引数

\`\`\`python
def introduce(name, age):
    print(f"{name}さんは{age}歳です")

introduce("田中", 30)  # 田中さんは30歳です
\`\`\`

## 戻り値（return）

関数から値を返すことができます。

\`\`\`python
def add(a, b):
    return a + b

result = add(3, 5)
print(result)  # 8
\`\`\`

### 戻り値を使った計算

\`\`\`python
def calculate_tax(price):
    return price * 0.1

def calculate_total(price):
    tax = calculate_tax(price)
    return price + tax

total = calculate_total(1000)
print(f"税込価格: {total}円")  # 税込価格: 1100.0円
\`\`\`

## デフォルト引数

引数にデフォルト値を設定できます。

\`\`\`python
def greet(name, greeting="こんにちは"):
    print(f"{greeting}、{name}さん！")

greet("田中")                    # こんにちは、田中さん！
greet("田中", "おはよう")        # おはよう、田中さん！
\`\`\`

## キーワード引数

引数名を指定して渡すこともできます。

\`\`\`python
def create_user(name, age, city):
    print(f"{name}, {age}歳, {city}在住")

# 順番通り
create_user("田中", 30, "東京")

# キーワード引数（順番自由）
create_user(city="大阪", name="佐藤", age=25)
\`\`\`
`,
      exercises: [
        {
          id: 'ex5-2-1',
          title: '引数と戻り値',
          description: '2つの数を受け取り、その積（掛け算の結果）を返す関数 multiply を作成してください。',
          initialCode: '# multiply関数を定義してください\n\n# テスト\nresult = multiply(4, 5)\nprint(result)',
          expectedOutput: '20',
          hints: [
            'def multiply(a, b): で2つの引数を受け取る',
            'return a * b で積を返す',
            '関数を呼び出して結果を確認'
          ]
        }
      ]
    },
    {
      id: 'lesson5-3',
      title: '実践的な関数',
      order: 3,
      content: `
# 実践的な関数

## ビジネスで使える関数例

### 売上計算関数

\`\`\`python
def calculate_sales(unit_price, quantity, discount_rate=0):
    """売上を計算する関数"""
    subtotal = unit_price * quantity
    discount = subtotal * discount_rate
    return subtotal - discount

# 使用例
sales1 = calculate_sales(1000, 10)
print(f"通常売上: {sales1}円")  # 10000円

sales2 = calculate_sales(1000, 10, 0.2)
print(f"20%割引後: {sales2}円")  # 8000円
\`\`\`

### データ検証関数

\`\`\`python
def validate_email(email):
    """メールアドレスの簡易検証"""
    if "@" in email and "." in email:
        return True
    return False

print(validate_email("test@example.com"))  # True
print(validate_email("invalid-email"))      # False
\`\`\`

### 統計関数

\`\`\`python
def calculate_stats(numbers):
    """リストの統計情報を返す"""
    return {
        "count": len(numbers),
        "sum": sum(numbers),
        "average": sum(numbers) / len(numbers),
        "max": max(numbers),
        "min": min(numbers)
    }

data = [85, 90, 78, 92, 88]
stats = calculate_stats(data)
print(f"平均: {stats['average']}")  # 平均: 86.6
\`\`\`

## ドキュメンテーション文字列

関数の説明を書くことが推奨されます。

\`\`\`python
def calculate_bmi(weight, height):
    """
    BMIを計算する関数

    Args:
        weight: 体重（kg）
        height: 身長（m）

    Returns:
        BMI値（float）
    """
    return weight / (height ** 2)

# 使用例
bmi = calculate_bmi(70, 1.75)
print(f"BMI: {bmi:.1f}")  # BMI: 22.9
\`\`\`

## 複数の戻り値

\`\`\`python
def get_min_max(numbers):
    """最小値と最大値を返す"""
    return min(numbers), max(numbers)

data = [3, 1, 4, 1, 5, 9, 2, 6]
minimum, maximum = get_min_max(data)
print(f"最小: {minimum}, 最大: {maximum}")
\`\`\`
`,
      exercises: [
        {
          id: 'ex5-3-1',
          title: '平均計算関数',
          description: 'リストを受け取り、その平均値を返す関数 calculate_average を作成してください。',
          initialCode: '# calculate_average関数を定義してください\n\n# テスト\nscores = [80, 90, 70, 85, 95]\navg = calculate_average(scores)\nprint(avg)',
          expectedOutput: '84.0',
          hints: [
            'def calculate_average(numbers): で定義',
            '合計は sum(numbers) で計算',
            '要素数は len(numbers) で取得',
            'return sum(numbers) / len(numbers)'
          ]
        }
      ]
    }
  ]
};
