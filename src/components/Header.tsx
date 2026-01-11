import { Sparkles } from 'lucide-react';
import { useAI } from '../context/AIContext';
import { useProgress } from '../context/ProgressContext';

export function Header() {
  const { toggleChat, isChatOpen } = useAI();
  const { getProgressPercentage } = useProgress();

  const progress = getProgressPercentage();

  return (
    <header className="h-16 bg-white/80 backdrop-blur-md border-b border-indigo-100 flex items-center justify-between px-6 flex-shrink-0">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md">
            <span className="text-white text-lg">🐍</span>
          </div>
          <div>
            <span className="font-bold text-gray-800">Python学習</span>
            <span className="text-gray-400 mx-2">|</span>
            <span className="text-sm text-gray-500">ゼロから始めるデータ分析</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Progress Badge */}
        <div className="flex items-center gap-3 bg-gradient-to-r from-indigo-50 to-purple-50 px-4 py-2 rounded-xl border border-indigo-100">
          <div className="w-24 h-2 bg-indigo-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-xs text-indigo-600 font-semibold">{progress}%</span>
        </div>

        {/* AI Chat Toggle */}
        <button
          onClick={toggleChat}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all font-medium ${
            isChatOpen
              ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-200'
              : 'bg-white text-gray-700 hover:bg-indigo-50 border border-indigo-200'
          }`}
        >
          <Sparkles size={18} />
          <span className="text-sm">AI質問</span>
        </button>
      </div>
    </header>
  );
}
