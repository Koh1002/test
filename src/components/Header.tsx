import { Sparkles, Code2 } from 'lucide-react';
import { useAI } from '../context/AIContext';
import { useProgress } from '../context/ProgressContext';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { cn } from '@/lib/utils';

export function Header() {
  const { toggleChat, isChatOpen } = useAI();
  const { getProgressPercentage } = useProgress();

  const progress = getProgressPercentage();

  return (
    <header className="h-16 bg-white/90 backdrop-blur-xl border-b border-slate-200/50 flex items-center justify-between px-6 flex-shrink-0 shadow-sm">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
            <Code2 size={20} className="text-white" />
          </div>
          <div>
            <span className="font-bold text-slate-800">Python学習</span>
            <span className="text-slate-300 mx-2">|</span>
            <span className="text-sm text-slate-500">ゼロから始めるデータ分析</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Progress Badge */}
        <div className="hidden sm:flex items-center gap-3 bg-slate-50 px-4 py-2.5 rounded-xl border border-slate-200">
          <div className="w-28">
            <Progress value={progress} className="h-2" />
          </div>
          <span className="text-xs font-bold text-indigo-600">{progress}%</span>
        </div>

        {/* AI Chat Toggle */}
        <Button
          onClick={toggleChat}
          variant={isChatOpen ? "default" : "outline"}
          className={cn(
            "gap-2",
            isChatOpen && "shadow-lg shadow-indigo-200"
          )}
        >
          <Sparkles size={16} />
          <span className="text-sm font-medium">AI質問</span>
        </Button>
      </div>
    </header>
  );
}
