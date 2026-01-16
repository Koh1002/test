import { useState } from 'react';
import {
  ChevronDown,
  BookOpen,
  CheckCircle,
  Circle,
  GraduationCap,
  Sparkles
} from 'lucide-react';
import { chapters } from '../content/chapters';
import { useProgress } from '../context/ProgressContext';
import { ScrollArea } from './ui/scroll-area';
import { Progress } from './ui/progress';
import { cn } from '@/lib/utils';
import type { Chapter } from '../types';

interface SidebarProps {
  onSelectLesson: (chapterId: string, lessonId: string) => void;
  currentChapterId: string;
  currentLessonId: string;
}

export function Sidebar({ onSelectLesson, currentChapterId, currentLessonId }: SidebarProps) {
  const [expandedChapters, setExpandedChapters] = useState<string[]>([currentChapterId]);
  const { isLessonComplete, getProgressPercentage } = useProgress();

  const toggleChapter = (chapterId: string) => {
    setExpandedChapters((prev) =>
      prev.includes(chapterId)
        ? prev.filter((id) => id !== chapterId)
        : [...prev, chapterId]
    );
  };

  const progressPercentage = getProgressPercentage();

  return (
    <div className="w-80 bg-gradient-to-b from-slate-900 via-slate-900 to-indigo-950 text-white flex flex-col h-full">
      {/* Header */}
      <div className="p-6 border-b border-white/5">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <GraduationCap size={24} />
          </div>
          <div>
            <h1 className="font-bold text-lg tracking-tight">Python学習</h1>
            <p className="text-xs text-slate-400">ゼロから始めるデータ分析</p>
          </div>
        </div>

        {/* Progress Card */}
        <div className="bg-white/5 backdrop-blur rounded-2xl p-4 border border-white/5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Sparkles size={14} className="text-indigo-400" />
              <span className="text-xs text-slate-300">学習進捗</span>
            </div>
            <span className="text-sm font-bold text-white">{progressPercentage}%</span>
          </div>
          <Progress value={progressPercentage} className="h-2 bg-white/10" />
        </div>
      </div>

      {/* Chapter List */}
      <ScrollArea className="flex-1">
        <div className="py-4">
          {chapters.map((chapter) => (
            <ChapterItem
              key={chapter.id}
              chapter={chapter}
              isExpanded={expandedChapters.includes(chapter.id)}
              onToggle={() => toggleChapter(chapter.id)}
              onSelectLesson={onSelectLesson}
              currentLessonId={currentLessonId}
              isLessonComplete={isLessonComplete}
            />
          ))}
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="p-4 border-t border-white/5">
        <p className="text-[10px] text-slate-500 text-center">
          Powered by React + TypeScript + shadcn/ui
        </p>
      </div>
    </div>
  );
}

interface ChapterItemProps {
  chapter: Chapter;
  isExpanded: boolean;
  onToggle: () => void;
  onSelectLesson: (chapterId: string, lessonId: string) => void;
  currentLessonId: string;
  isLessonComplete: (lessonId: string) => boolean;
}

function ChapterItem({
  chapter,
  isExpanded,
  onToggle,
  onSelectLesson,
  currentLessonId,
  isLessonComplete,
}: ChapterItemProps) {
  const completedCount = chapter.lessons.filter((l) => isLessonComplete(l.id)).length;
  const totalCount = chapter.lessons.length;
  const isAllComplete = completedCount === totalCount;

  return (
    <div className="mb-1">
      <button
        onClick={onToggle}
        className="w-full px-5 py-3 flex items-center gap-3 hover:bg-white/5 transition-all text-left group"
      >
        <span className={cn(
          "transition-transform duration-200",
          isExpanded ? "rotate-0" : "-rotate-90"
        )}>
          <ChevronDown size={16} className="text-slate-500 group-hover:text-slate-300" />
        </span>
        <div className={cn(
          "w-9 h-9 rounded-xl flex items-center justify-center transition-all",
          isAllComplete
            ? "bg-gradient-to-br from-emerald-500 to-green-600 shadow-lg shadow-emerald-500/20"
            : "bg-white/5 group-hover:bg-white/10"
        )}>
          <BookOpen size={16} className={isAllComplete ? "text-white" : "text-slate-400"} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium text-slate-200 group-hover:text-white transition-colors truncate">
            {chapter.title}
          </div>
          <div className="text-xs text-slate-500 mt-0.5">
            {completedCount}/{totalCount} レッスン
          </div>
        </div>
      </button>

      {isExpanded && (
        <div className="ml-7 pl-5 border-l border-white/10">
          {chapter.lessons.map((lesson) => {
            const isComplete = isLessonComplete(lesson.id);
            const isCurrent = lesson.id === currentLessonId;

            return (
              <button
                key={lesson.id}
                onClick={() => onSelectLesson(chapter.id, lesson.id)}
                className={cn(
                  "w-full px-4 py-2.5 flex items-center gap-3 text-left transition-all rounded-xl my-0.5",
                  isCurrent
                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/30"
                    : "hover:bg-white/5 text-slate-400 hover:text-slate-200"
                )}
              >
                {isComplete ? (
                  <CheckCircle size={14} className={isCurrent ? "text-white" : "text-emerald-500"} />
                ) : (
                  <Circle size={14} className={isCurrent ? "text-white/70" : "text-slate-600"} />
                )}
                <span className="text-sm truncate">{lesson.title}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
