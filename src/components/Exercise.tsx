import { useState } from 'react';
import Editor from '@monaco-editor/react';
import {
  Play,
  CheckCircle,
  XCircle,
  Lightbulb,
  ChevronDown,
  ChevronUp,
  RotateCcw
} from 'lucide-react';
import type { Exercise as ExerciseType } from '../types';
import { useProgress } from '../context/ProgressContext';

interface ExerciseProps {
  exercise: ExerciseType;
  onComplete: () => void;
}

export function Exercise({ exercise, onComplete }: ExerciseProps) {
  const [code, setCode] = useState(exercise.initialCode);
  const [output, setOutput] = useState<string>('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showHints, setShowHints] = useState(false);
  const [currentHintIndex, setCurrentHintIndex] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const { markExerciseComplete, isExerciseComplete } = useProgress();
  const completed = isExerciseComplete(exercise.id);

  const runCode = async () => {
    setIsRunning(true);
    setOutput('');
    setIsCorrect(null);

    try {
      // Simulate Python execution using Pyodide or mock
      const result = await executePythonCode(code);
      setOutput(result);

      // Check if output matches expected
      if (exercise.expectedOutput) {
        const normalizedResult = result.trim();
        const normalizedExpected = exercise.expectedOutput.trim();
        const correct = normalizedResult === normalizedExpected;
        setIsCorrect(correct);

        if (correct && !completed) {
          markExerciseComplete(exercise.id);
          onComplete();
        }
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'エラーが発生しました';
      setOutput(`Error: ${errorMessage}`);
      setIsCorrect(false);
    } finally {
      setIsRunning(false);
    }
  };

  const resetCode = () => {
    setCode(exercise.initialCode);
    setOutput('');
    setIsCorrect(null);
  };

  const showNextHint = () => {
    if (currentHintIndex < exercise.hints.length - 1) {
      setCurrentHintIndex(currentHintIndex + 1);
    }
  };

  return (
    <div className="exercise-container mb-8">
      {/* Header */}
      <div className="exercise-header flex items-center justify-between">
        <div className="flex items-center gap-3">
          {completed ? (
            <CheckCircle size={20} className="text-green-300" />
          ) : (
            <Play size={20} />
          )}
          <span>{exercise.title}</span>
        </div>
        {completed && (
          <span className="text-xs bg-green-500 px-2 py-1 rounded">完了</span>
        )}
      </div>

      {/* Description */}
      <div className="p-4 bg-gray-50 border-b border-gray-200">
        <p className="text-gray-700">{exercise.description}</p>
      </div>

      {/* Code Editor */}
      <div className="border-b border-gray-200">
        <Editor
          height="200px"
          language="python"
          value={code}
          onChange={(value) => setCode(value || '')}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: 'on',
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 4,
          }}
        />
      </div>

      {/* Action Buttons */}
      <div className="p-4 bg-gray-50 flex items-center gap-3">
        <button
          onClick={runCode}
          disabled={isRunning}
          className="btn-success flex items-center gap-2"
        >
          <Play size={18} />
          <span>{isRunning ? '実行中...' : '実行'}</span>
        </button>

        <button
          onClick={resetCode}
          className="btn-secondary flex items-center gap-2"
        >
          <RotateCcw size={18} />
          <span>リセット</span>
        </button>

        <button
          onClick={() => setShowHints(!showHints)}
          className="btn-secondary flex items-center gap-2 ml-auto"
        >
          <Lightbulb size={18} />
          <span>ヒント</span>
          {showHints ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
      </div>

      {/* Hints */}
      {showHints && exercise.hints.length > 0 && (
        <div className="p-4 bg-yellow-50 border-t border-yellow-200">
          <div className="flex items-start gap-2">
            <Lightbulb size={18} className="text-yellow-600 mt-0.5" />
            <div className="flex-1">
              <p className="text-yellow-800 font-medium mb-2">
                ヒント {currentHintIndex + 1}/{exercise.hints.length}
              </p>
              <p className="text-yellow-700">{exercise.hints[currentHintIndex]}</p>
              {currentHintIndex < exercise.hints.length - 1 && (
                <button
                  onClick={showNextHint}
                  className="mt-2 text-sm text-yellow-600 hover:text-yellow-800 underline"
                >
                  次のヒントを見る
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Output */}
      {output && (
        <div className={`p-4 border-t ${
          isCorrect === true ? 'bg-green-50 border-green-200' :
          isCorrect === false ? 'bg-red-50 border-red-200' :
          'bg-gray-100 border-gray-200'
        }`}>
          <div className="flex items-center gap-2 mb-2">
            {isCorrect === true && (
              <>
                <CheckCircle size={18} className="text-green-600" />
                <span className="font-medium text-green-600">正解です！</span>
              </>
            )}
            {isCorrect === false && (
              <>
                <XCircle size={18} className="text-red-600" />
                <span className="font-medium text-red-600">不正解です。もう一度試してみましょう。</span>
              </>
            )}
            {isCorrect === null && (
              <span className="font-medium text-gray-600">実行結果:</span>
            )}
          </div>
          <pre className="bg-gray-900 text-gray-100 p-3 rounded-lg overflow-x-auto text-sm">
            {output}
          </pre>
          {isCorrect === false && exercise.expectedOutput && (
            <div className="mt-3 text-sm text-gray-600">
              <span className="font-medium">期待される出力:</span>
              <pre className="bg-gray-200 p-2 rounded mt-1 text-gray-800">
                {exercise.expectedOutput}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Mock Python execution
async function executePythonCode(code: string): Promise<string> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        // Simple mock implementation for demo
        // In production, use Pyodide or a backend service
        const output = mockExecutePython(code);
        resolve(output);
      } catch (error) {
        reject(error);
      }
    }, 500);
  });
}

function mockExecutePython(code: string): string {
  const lines: string[] = [];

  // Very simple Python mock - handles basic print statements
  const printRegex = /print\s*\(\s*(.+)\s*\)/g;
  let match;

  while ((match = printRegex.exec(code)) !== null) {
    let arg = match[1].trim();

    // Handle f-strings
    if (arg.startsWith('f"') || arg.startsWith("f'")) {
      // Simple f-string handling
      arg = arg.slice(2, -1);
      // Look for variable substitutions
      const varRegex = /\{([^}]+)\}/g;
      arg = arg.replace(varRegex, (_, expr) => {
        // Try to evaluate simple expressions from the code
        const varMatch = code.match(new RegExp(`${expr.trim()}\\s*=\\s*(.+)`));
        if (varMatch) {
          let val = varMatch[1].trim();
          // Remove quotes from string values
          if ((val.startsWith('"') && val.endsWith('"')) ||
              (val.startsWith("'") && val.endsWith("'"))) {
            val = val.slice(1, -1);
          }
          return val;
        }
        // Try to evaluate math expressions
        try {
          // Safe eval for simple math
          const cleanExpr = expr.replace(/[^0-9+\-*/().]/g, '');
          if (cleanExpr && cleanExpr === expr.trim()) {
            return String(eval(cleanExpr));
          }
        } catch {}
        return `{${expr}}`;
      });
      lines.push(arg);
    } else if (arg.startsWith('"') || arg.startsWith("'")) {
      // String literal
      lines.push(arg.slice(1, -1));
    } else if (!isNaN(Number(arg))) {
      // Number
      lines.push(arg);
    } else {
      // Variable reference
      const varMatch = code.match(new RegExp(`${arg}\\s*=\\s*(.+)`));
      if (varMatch) {
        let val = varMatch[1].trim();
        // Evaluate simple expressions
        if (val.includes('*') || val.includes('+') || val.includes('-') || val.includes('/')) {
          try {
            // Replace variable names with values
            let evalExpr = val;
            const varRefs = val.match(/[a-zA-Z_][a-zA-Z0-9_]*/g) || [];
            for (const ref of varRefs) {
              const refMatch = code.match(new RegExp(`${ref}\\s*=\\s*([0-9.]+)`));
              if (refMatch) {
                evalExpr = evalExpr.replace(new RegExp(`\\b${ref}\\b`), refMatch[1]);
              }
            }
            val = String(eval(evalExpr));
          } catch {}
        }
        // Remove quotes if string
        if ((val.startsWith('"') && val.endsWith('"')) ||
            (val.startsWith("'") && val.endsWith("'"))) {
          val = val.slice(1, -1);
        }
        lines.push(val);
      } else {
        lines.push(arg);
      }
    }
  }

  // Handle for loops with print
  const forLoopRegex = /for\s+(\w+)\s+in\s+range\s*\(\s*(\d+)\s*(?:,\s*(\d+))?\s*\)\s*:\s*\n?\s*print\s*\(\s*(\w+)\s*\)/g;
  let forMatch;
  while ((forMatch = forLoopRegex.exec(code)) !== null) {
    const varName = forMatch[1];
    const start = forMatch[3] ? parseInt(forMatch[2]) : 0;
    const end = forMatch[3] ? parseInt(forMatch[3]) : parseInt(forMatch[2]);
    const printVar = forMatch[4];

    if (printVar === varName) {
      lines.length = 0; // Clear previous lines for loop output
      for (let i = start; i < end; i++) {
        lines.push(String(i));
      }
    }
  }

  // Handle simple type() calls
  const typeRegex = /print\s*\(\s*type\s*\(\s*(\w+)\s*\)\s*\)/g;
  let typeMatch;
  while ((typeMatch = typeRegex.exec(code)) !== null) {
    const varName = typeMatch[1];
    const varMatch = code.match(new RegExp(`${varName}\\s*=\\s*(.+)`));
    if (varMatch) {
      const val = varMatch[1].trim();
      if (!isNaN(Number(val)) && !val.includes('.')) {
        lines.push("<class 'int'>");
      } else if (!isNaN(Number(val))) {
        lines.push("<class 'float'>");
      } else if (val.startsWith('"') || val.startsWith("'")) {
        lines.push("<class 'str'>");
      }
    }
  }

  return lines.join('\n');
}
