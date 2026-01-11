import type { Chapter } from '../types';

export const chapter7: Chapter = {
  id: 'chapter7',
  title: 'クラスとオブジェクト',
  description: 'オブジェクト指向プログラミングの基礎を学びます',
  order: 7,
  lessons: [
    {
      id: 'lesson7-1',
      title: 'クラスとは',
      order: 1,
      content: `
# クラスとは

## オブジェクト指向の考え方

**クラス**は、データ（属性）と処理（メソッド）をまとめた「設計図」です。

例えば「顧客」を表現する場合：
- **属性**: 名前、年齢、メールアドレス
- **メソッド**: 挨拶する、購入する

## クラスの定義

\`\`\`python
class Customer:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def greet(self):
        print(f"こんにちは、{self.name}です。{self.age}歳です。")
\`\`\`

## インスタンスの作成

クラスから実際のオブジェクト（インスタンス）を作ります。

\`\`\`python
# インスタンスを作成
customer1 = Customer("田中", 30)
customer2 = Customer("佐藤", 25)

# メソッドを呼び出す
customer1.greet()  # こんにちは、田中です。30歳です。
customer2.greet()  # こんにちは、佐藤です。25歳です。
\`\`\`

## 用語の整理

| 用語 | 説明 | 例 |
|-----|------|-----|
| クラス | 設計図 | Customer |
| インスタンス | 実体 | customer1 |
| 属性 | データ | name, age |
| メソッド | 処理 | greet() |

## __init__メソッド

インスタンス作成時に自動的に呼ばれる特殊メソッドです。

\`\`\`python
class Product:
    def __init__(self, name, price):
        self.name = name    # 属性を設定
        self.price = price

product = Product("りんご", 150)
print(product.name)   # りんご
print(product.price)  # 150
\`\`\`

## selfとは

\`self\` は「そのインスタンス自身」を指します。

\`\`\`python
class Counter:
    def __init__(self):
        self.count = 0

    def increment(self):
        self.count += 1  # 自分の count を増やす
\`\`\`
`,
      exercises: [
        {
          id: 'ex7-1-1',
          title: 'クラスの作成',
          description: 'name属性を持ち、「私の名前は○○です」と出力するintroduce()メソッドを持つPersonクラスを作成してください。',
          initialCode: '# Personクラスを定義してください\n\n# テスト\nperson = Person("太郎")\nperson.introduce()',
          expectedOutput: '私の名前は太郎です',
          hints: [
            'class Person: でクラスを定義',
            '__init__(self, name) で名前を受け取る',
            'self.name = name で属性を設定',
            'introduce(self) メソッドで print()'
          ]
        }
      ]
    },
    {
      id: 'lesson7-2',
      title: 'メソッドの活用',
      order: 2,
      content: `
# メソッドの活用

## 様々なメソッド

### 計算を行うメソッド

\`\`\`python
class Rectangle:
    def __init__(self, width, height):
        self.width = width
        self.height = height

    def area(self):
        return self.width * self.height

    def perimeter(self):
        return 2 * (self.width + self.height)

rect = Rectangle(5, 3)
print(f"面積: {rect.area()}")      # 面積: 15
print(f"周囲: {rect.perimeter()}")  # 周囲: 16
\`\`\`

### 状態を変更するメソッド

\`\`\`python
class BankAccount:
    def __init__(self, owner, balance=0):
        self.owner = owner
        self.balance = balance

    def deposit(self, amount):
        self.balance += amount
        print(f"{amount}円を入金。残高: {self.balance}円")

    def withdraw(self, amount):
        if amount > self.balance:
            print("残高不足です")
        else:
            self.balance -= amount
            print(f"{amount}円を出金。残高: {self.balance}円")

account = BankAccount("田中", 10000)
account.deposit(5000)   # 5000円を入金。残高: 15000円
account.withdraw(3000)  # 3000円を出金。残高: 12000円
\`\`\`

## ビジネス例: 商品クラス

\`\`\`python
class Product:
    def __init__(self, name, price, stock):
        self.name = name
        self.price = price
        self.stock = stock

    def is_available(self):
        return self.stock > 0

    def sell(self, quantity):
        if quantity > self.stock:
            print("在庫が足りません")
            return False
        self.stock -= quantity
        revenue = self.price * quantity
        print(f"{self.name}を{quantity}個販売。売上: {revenue}円")
        return True

    def restock(self, quantity):
        self.stock += quantity
        print(f"{self.name}を{quantity}個補充。在庫: {self.stock}個")

apple = Product("りんご", 150, 10)
apple.sell(3)      # りんごを3個販売。売上: 450円
apple.restock(5)   # りんごを5個補充。在庫: 12個
\`\`\`
`,
      exercises: [
        {
          id: 'ex7-2-1',
          title: '銀行口座クラス',
          description: 'depositメソッドで入金し、get_balanceメソッドで残高を返すBankAccountクラスを作成してください。',
          initialCode: '# BankAccountクラスを定義してください\n\n# テスト\naccount = BankAccount(1000)\naccount.deposit(500)\nprint(account.get_balance())',
          expectedOutput: '1500',
          hints: [
            '__init__(self, balance) で初期残高を設定',
            'deposit(self, amount) で self.balance += amount',
            'get_balance(self) で return self.balance'
          ]
        }
      ]
    },
    {
      id: 'lesson7-3',
      title: 'クラスの継承',
      order: 3,
      content: `
# クラスの継承

## 継承とは

既存のクラスを拡張して新しいクラスを作ることです。

\`\`\`python
# 親クラス（基底クラス）
class Animal:
    def __init__(self, name):
        self.name = name

    def speak(self):
        pass

# 子クラス（派生クラス）
class Dog(Animal):
    def speak(self):
        return f"{self.name}がワンワン！"

class Cat(Animal):
    def speak(self):
        return f"{self.name}がニャー！"

dog = Dog("ポチ")
cat = Cat("タマ")
print(dog.speak())  # ポチがワンワン！
print(cat.speak())  # タマがニャー！
\`\`\`

## superを使う

親クラスのメソッドを呼び出せます。

\`\`\`python
class Employee:
    def __init__(self, name, salary):
        self.name = name
        self.salary = salary

    def get_info(self):
        return f"{self.name}: {self.salary}円"

class Manager(Employee):
    def __init__(self, name, salary, department):
        super().__init__(name, salary)  # 親の__init__を呼ぶ
        self.department = department

    def get_info(self):
        return f"{self.name} ({self.department}部門マネージャー): {self.salary}円"

emp = Employee("田中", 400000)
mgr = Manager("佐藤", 600000, "営業")

print(emp.get_info())  # 田中: 400000円
print(mgr.get_info())  # 佐藤 (営業部門マネージャー): 600000円
\`\`\`

## ビジネス例: 顧客の種類

\`\`\`python
class Customer:
    def __init__(self, name):
        self.name = name
        self.discount_rate = 0

    def get_price(self, original_price):
        return original_price * (1 - self.discount_rate)

class PremiumCustomer(Customer):
    def __init__(self, name):
        super().__init__(name)
        self.discount_rate = 0.1  # 10%割引

class VIPCustomer(Customer):
    def __init__(self, name):
        super().__init__(name)
        self.discount_rate = 0.2  # 20%割引

regular = Customer("一般さん")
premium = PremiumCustomer("プレミアムさん")
vip = VIPCustomer("VIPさん")

price = 10000
print(f"一般: {regular.get_price(price)}円")      # 10000円
print(f"プレミアム: {premium.get_price(price)}円")  # 9000円
print(f"VIP: {vip.get_price(price)}円")           # 8000円
\`\`\`
`,
      exercises: [
        {
          id: 'ex7-3-1',
          title: '継承の練習',
          description: 'Animalクラスを継承したCatクラスを作り、speak()メソッドで「ニャー」と返すようにしてください。',
          initialCode: 'class Animal:\n    def __init__(self, name):\n        self.name = name\n    \n    def speak(self):\n        return "..."\n\n# Catクラスを定義してください\n\n# テスト\ncat = Cat("タマ")\nprint(cat.speak())',
          expectedOutput: 'ニャー',
          hints: [
            'class Cat(Animal): で継承',
            'speak(self) メソッドをオーバーライド',
            'return "ニャー" で猫の鳴き声を返す'
          ]
        }
      ]
    }
  ]
};
