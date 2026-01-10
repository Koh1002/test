import type { Chapter } from '../types';

export const chapter3: Chapter = {
  id: 'chapter3',
  title: '条件分岐：if文',
  description: '条件によって処理を分岐させるif文を学びます',
  order: 3,
  lessons: [
    {
      id: 'lesson3-1',
      title: 'if文の基本',
      order: 1,
      content: `
# if文の基本

## 条件分岐とは

プログラムで「もし〇〇なら△△する」という処理を行うのが条件分岐です。

\`\`\`python
age = 20

if age >= 18:
    print("成人です")
\`\`\`

## if文の書き方

\`\`\`python
if 条件式:
    実行する処理
\`\`\`

**重要ポイント:**
1. 条件式の後に **コロン(:)** が必要
2. 実行する処理は **インデント（字下げ）** が必要（スペース4つ推奨）

## 比較演算子

条件を書くときに使う演算子です。

| 演算子 | 意味 | 例 |
|-------|------|-----|
| == | 等しい | x == 5 |
| != | 等しくない | x != 5 |
| > | より大きい | x > 5 |
| < | より小さい | x < 5 |
| >= | 以上 | x >= 5 |
| <= | 以下 | x <= 5 |

## 実例

\`\`\`python
score = 85

if score >= 80:
    print("合格です！")
\`\`\`

### 文字列の比較

\`\`\`python
status = "active"

if status == "active":
    print("アカウントは有効です")
\`\`\`

> **注意**: = は代入、== は比較です。間違えやすいので注意しましょう。
`,
      exercises: [
        {
          id: 'ex3-1-1',
          title: '点数判定',
          description: 'score変数が70以上のとき「合格」と出力するif文を書いてください。',
          initialCode: 'score = 75\n\n# scoreが70以上なら「合格」と出力してください\n',
          expectedOutput: '合格',
          hints: [
            'if score >= 70: と条件を書きます',
            'インデント（字下げ）を忘れずに',
            'print("合格") で出力します'
          ]
        }
      ]
    },
    {
      id: 'lesson3-2',
      title: 'if-else文',
      order: 2,
      content: `
# if-else文

## else: 条件を満たさないとき

\`if\` の条件を満たさない場合に実行する処理を \`else\` で書けます。

\`\`\`python
age = 15

if age >= 18:
    print("成人です")
else:
    print("未成年です")
\`\`\`

出力: \`未成年です\`

## ビジネスでの活用例

### 在庫チェック

\`\`\`python
stock = 0

if stock > 0:
    print("在庫あり")
else:
    print("在庫切れ")
\`\`\`

### 会員判定

\`\`\`python
is_member = True

if is_member:
    print("会員価格: 800円")
else:
    print("通常価格: 1000円")
\`\`\`

### 売上目標達成チェック

\`\`\`python
sales = 950000
target = 1000000

if sales >= target:
    print("目標達成！")
else:
    print(f"あと{target - sales}円で目標達成")
\`\`\`

出力: \`あと50000円で目標達成\`

## 注意点

- \`else\` の後にもコロン(:)が必要
- \`else\` 内の処理もインデントが必要

\`\`\`python
x = 5

if x > 10:
    print("10より大きい")
else:
    print("10以下")  # これが実行される
\`\`\`
`,
      exercises: [
        {
          id: 'ex3-2-1',
          title: '合否判定',
          description: 'scoreが60以上なら「合格」、そうでなければ「不合格」と出力してください。',
          initialCode: 'score = 55\n\n# 60以上なら「合格」、そうでなければ「不合格」を出力\n',
          expectedOutput: '不合格',
          hints: [
            'if score >= 60: で条件判定',
            'else: で条件を満たさない場合を処理',
            '両方のprint文にインデントが必要'
          ]
        }
      ]
    },
    {
      id: 'lesson3-3',
      title: 'elif：複数の条件',
      order: 3,
      content: `
# elif：複数の条件

## elifとは

複数の条件を順番にチェックしたいときに \`elif\` を使います。

\`\`\`python
score = 75

if score >= 90:
    print("評価: A")
elif score >= 80:
    print("評価: B")
elif score >= 70:
    print("評価: C")
elif score >= 60:
    print("評価: D")
else:
    print("評価: F")
\`\`\`

出力: \`評価: C\`

## ポイント

1. **上から順番に判定**される
2. 最初にTrueになった条件の処理だけ実行
3. どれも満たさない場合は \`else\` が実行

## ビジネス活用例

### 顧客ランク判定

\`\`\`python
purchase_amount = 150000  # 購入金額

if purchase_amount >= 500000:
    rank = "プラチナ"
elif purchase_amount >= 200000:
    rank = "ゴールド"
elif purchase_amount >= 100000:
    rank = "シルバー"
else:
    rank = "ブロンズ"

print(f"顧客ランク: {rank}")
\`\`\`

出力: \`顧客ランク: シルバー\`

### 配送料計算

\`\`\`python
order_amount = 4500

if order_amount >= 10000:
    shipping = 0
elif order_amount >= 5000:
    shipping = 300
else:
    shipping = 500

print(f"配送料: {shipping}円")
\`\`\`

出力: \`配送料: 500円\`

### 時間帯メッセージ

\`\`\`python
hour = 14

if hour < 12:
    print("おはようございます")
elif hour < 18:
    print("こんにちは")
else:
    print("こんばんは")
\`\`\`

出力: \`こんにちは\`
`,
      exercises: [
        {
          id: 'ex3-3-1',
          title: '成績評価',
          description: 'scoreに応じてA(90以上), B(80以上), C(70以上), D(60以上), F(それ以外)を出力してください。',
          initialCode: 'score = 82\n\n# 成績を判定して出力してください\n',
          expectedOutput: 'B',
          hints: [
            'if score >= 90: からスタート',
            'elif で次々と条件を追加',
            '最後は else:',
            '各条件で対応する文字を print()'
          ]
        }
      ]
    },
    {
      id: 'lesson3-4',
      title: '論理演算子',
      order: 4,
      content: `
# 論理演算子

## 複数の条件を組み合わせる

複数の条件を組み合わせるには論理演算子を使います。

| 演算子 | 意味 | 例 |
|-------|------|-----|
| and | かつ（両方True） | a > 0 and b > 0 |
| or | または（どちらかTrue） | a > 0 or b > 0 |
| not | 否定（反転） | not a > 0 |

## and の使い方

両方の条件がTrueのときだけTrueになります。

\`\`\`python
age = 25
income = 3000000

if age >= 20 and income >= 2000000:
    print("ローン審査通過")
else:
    print("審査不可")
\`\`\`

出力: \`ローン審査通過\`

## or の使い方

どちらか一方でもTrueならTrueになります。

\`\`\`python
is_member = False
has_coupon = True

if is_member or has_coupon:
    print("割引適用")
else:
    print("割引なし")
\`\`\`

出力: \`割引適用\`

## not の使い方

TrueとFalseを反転させます。

\`\`\`python
is_closed = False

if not is_closed:
    print("営業中")
else:
    print("閉店中")
\`\`\`

出力: \`営業中\`

## 複雑な条件

括弧で優先順位を明確にできます。

\`\`\`python
age = 15
is_with_parent = True

# 18歳以上、または保護者同伴
if age >= 18 or (age >= 12 and is_with_parent):
    print("入場可")
else:
    print("入場不可")
\`\`\`

出力: \`入場可\`

## ビジネス例: 割引条件

\`\`\`python
is_member = True
purchase_amount = 8000
is_campaign = True

# 会員かつ1万円以上、またはキャンペーン中
if (is_member and purchase_amount >= 10000) or is_campaign:
    discount = 0.1
else:
    discount = 0

print(f"割引率: {discount * 100}%")
\`\`\`

出力: \`割引率: 10.0%\`
`,
      exercises: [
        {
          id: 'ex3-4-1',
          title: '複合条件判定',
          description: 'ageが18以上かつ65未満のとき「働き盛り世代」と出力してください。',
          initialCode: 'age = 35\n\n# ageが18以上かつ65未満なら「働き盛り世代」と出力\n',
          expectedOutput: '働き盛り世代',
          hints: [
            'and を使って2つの条件を組み合わせます',
            'age >= 18 and age < 65 と書きます',
            'if の後にこの条件を入れてprint文を実行'
          ]
        }
      ]
    }
  ]
};
