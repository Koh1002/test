import { BookOpen, MessageCircle } from 'lucide-react';
import { useAI } from '../context/AIContext';
import { useProgress } from '../context/ProgressContext';

export function Header() {
  const { toggleChat, isChatOpen } = useAI();
  const { getProgressPercentage } = useProgress();

  const progress = getProgressPercentage();

  return (
    <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-6 flex-shrink-0">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-gray-600">
          <BookOpen size={20} />
          <span className="font-medium">Python学習プラットフォーム</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Progress Badge */}
        <div className="flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-full">
          <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-500 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-xs text-gray-600 font-medium">{progress}%</span>
        </div>

        {/* AI Chat Toggle */}
        <button
          onClick={toggleChat}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            isChatOpen
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <MessageCircle size={18} />
          <span className="text-sm font-medium">AI質問</span>
        </button>
      </div>
    </header>
  );
}
