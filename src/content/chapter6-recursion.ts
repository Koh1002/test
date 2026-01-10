import type { Chapter } from '../types';

export const chapter6: Chapter = {
  id: 'chapter6',
  title: '再帰処理',
  description: '関数が自分自身を呼び出す再帰処理を学びます',
  order: 6,
  lessons: [
    {
      id: 'lesson6-1',
      title: '再帰とは',
      order: 1,
      content: `
# 再帰とは

## 再帰処理の概念

**再帰**とは、関数が自分自身を呼び出すプログラミング技法です。

\`\`\`python
def countdown(n):
    if n <= 0:
        print("発射！")
    else:
        print(n)
        countdown(n - 1)  # 自分自身を呼び出す

countdown(5)
\`\`\`

出力:
\`\`\`
5
4
3
2
1
発射！
\`\`\`

## 再帰の構造

再帰関数には2つの要素が必要です：

1. **ベースケース（終了条件）**: 再帰を止める条件
2. **再帰ケース**: 自分自身を呼び出す部分

\`\`\`python
def recursive_function(n):
    # ベースケース
    if n <= 0:
        return

    # 何かの処理
    print(n)

    # 再帰ケース
    recursive_function(n - 1)
\`\`\`

## なぜ再帰を使うのか

### 1. 問題を小さく分割できる

複雑な問題を、同じ形式の小さな問題に分割できる場合に有効です。

### 2. コードがシンプルになる

特定の問題（木構造の探索など）では、ループより直感的に書けます。

## 注意点

### 終了条件を忘れない

終了条件がないと無限ループになります。

\`\`\`python
# 危険！終了条件がない
def infinite(n):
    print(n)
    infinite(n)  # 永遠に呼び出される
\`\`\`

### 再帰の深さ制限

Pythonでは再帰の深さに制限があります（デフォルト約1000回）。
`,
      exercises: [
        {
          id: 'ex6-1-1',
          title: 'カウントダウン',
          description: '3からカウントダウンして最後に「スタート！」と表示する再帰関数を完成させてください。',
          initialCode: 'def countdown(n):\n    # ベースケース: n が 0 以下なら「スタート！」を出力\n    \n    # 再帰ケース: n を出力して countdown(n-1) を呼ぶ\n    pass\n\ncountdown(3)',
          expectedOutput: '3\n2\n1\nスタート！',
          hints: [
            'if n <= 0: でベースケースを判定',
            'print("スタート！") で終了メッセージ',
            'else: で再帰ケース',
            'print(n) して countdown(n - 1) を呼ぶ'
          ]
        }
      ]
    },
    {
      id: 'lesson6-2',
      title: '階乗の計算',
      order: 2,
      content: `
# 階乗の計算

## 階乗とは

n! = n × (n-1) × (n-2) × ... × 2 × 1

例：
- 5! = 5 × 4 × 3 × 2 × 1 = 120
- 3! = 3 × 2 × 1 = 6
- 1! = 1
- 0! = 1（定義）

## ループでの実装

\`\`\`python
def factorial_loop(n):
    result = 1
    for i in range(1, n + 1):
        result *= i
    return result

print(factorial_loop(5))  # 120
\`\`\`

## 再帰での実装

階乗は再帰的に定義できます：
- n! = n × (n-1)!
- 0! = 1（ベースケース）

\`\`\`python
def factorial(n):
    # ベースケース
    if n <= 1:
        return 1

    # 再帰ケース: n * (n-1)!
    return n * factorial(n - 1)

print(factorial(5))  # 120
\`\`\`

## 動作の流れ

\`factorial(5)\` の計算過程：

\`\`\`
factorial(5)
= 5 * factorial(4)
= 5 * 4 * factorial(3)
= 5 * 4 * 3 * factorial(2)
= 5 * 4 * 3 * 2 * factorial(1)
= 5 * 4 * 3 * 2 * 1
= 120
\`\`\`

## ビジネスでの応用

階乗は組み合わせ計算に使われます。

\`\`\`python
def combinations(n, r):
    """n個からr個選ぶ組み合わせ数"""
    return factorial(n) // (factorial(r) * factorial(n - r))

# 10人から3人を選ぶ組み合わせ
print(combinations(10, 3))  # 120通り
\`\`\`
`,
      exercises: [
        {
          id: 'ex6-2-1',
          title: '階乗を計算',
          description: '再帰を使って階乗を計算する関数を完成させてください。factorial(4) は 24 を返すべきです。',
          initialCode: 'def factorial(n):\n    # ベースケース: n が 1 以下なら 1 を返す\n    \n    # 再帰ケース: n * factorial(n-1) を返す\n    pass\n\nprint(factorial(4))',
          expectedOutput: '24',
          hints: [
            'if n <= 1: return 1 がベースケース',
            'return n * factorial(n - 1) が再帰ケース',
            '4! = 4 × 3 × 2 × 1 = 24'
          ]
        }
      ]
    },
    {
      id: 'lesson6-3',
      title: 'フィボナッチ数列',
      order: 3,
      content: `
# フィボナッチ数列

## フィボナッチ数列とは

各項が前2項の和となる数列です。

0, 1, 1, 2, 3, 5, 8, 13, 21, 34, ...

- F(0) = 0
- F(1) = 1
- F(n) = F(n-1) + F(n-2)

## 再帰での実装

\`\`\`python
def fibonacci(n):
    # ベースケース
    if n <= 0:
        return 0
    if n == 1:
        return 1

    # 再帰ケース
    return fibonacci(n - 1) + fibonacci(n - 2)

# 最初の10項を表示
for i in range(10):
    print(fibonacci(i), end=" ")
# 出力: 0 1 1 2 3 5 8 13 21 34
\`\`\`

## 問題点と改善

単純な再帰は同じ計算を何度もするため遅いです。

### メモ化（改善版）

\`\`\`python
def fibonacci_memo(n, memo={}):
    if n in memo:
        return memo[n]
    if n <= 0:
        return 0
    if n == 1:
        return 1

    memo[n] = fibonacci_memo(n-1, memo) + fibonacci_memo(n-2, memo)
    return memo[n]

print(fibonacci_memo(50))  # 高速に計算できる
\`\`\`

## ビジネスでの応用

フィボナッチ数列はアジャイル開発のストーリーポイントなどで使われます。

\`\`\`python
# ストーリーポイント候補
story_points = [fibonacci_memo(i) for i in range(1, 10)]
print(story_points)  # [1, 1, 2, 3, 5, 8, 13, 21, 34]
\`\`\`

## 再帰 vs ループ

| 観点 | 再帰 | ループ |
|-----|------|--------|
| コードの読みやすさ | 問題によっては直感的 | 一般的にシンプル |
| パフォーマンス | 遅くなることがある | 通常は効率的 |
| メモリ使用量 | スタックを消費 | 少ない |
| 適した問題 | 木構造、分割統治 | 線形な繰り返し |
`,
      exercises: [
        {
          id: 'ex6-3-1',
          title: 'フィボナッチ数',
          description: 'fibonacci(6) が 8 を返すような再帰関数を作成してください。（0,1,1,2,3,5,8...）',
          initialCode: 'def fibonacci(n):\n    # ベースケース\n    \n    # 再帰ケース\n    pass\n\nprint(fibonacci(6))',
          expectedOutput: '8',
          hints: [
            'n <= 0 なら 0 を返す',
            'n == 1 なら 1 を返す',
            'それ以外は fibonacci(n-1) + fibonacci(n-2)',
            'F(6) = F(5) + F(4) = 5 + 3 = 8'
          ]
        }
      ]
    }
  ]
};
