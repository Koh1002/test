import { useState } from 'react';
import {
  ChevronDown,
  BookOpen,
  CheckCircle,
  Circle,
  GraduationCap
} from 'lucide-react';
import { chapters } from '../content/chapters';
import { useProgress } from '../context/ProgressContext';
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
    <div className="w-80 bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900 text-white h-full flex flex-col shadow-xl">
      {/* Header */}
      <div className="p-5 border-b border-white/10">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
            <GraduationCap size={26} />
          </div>
          <div>
            <h1 className="font-bold text-lg">Python学習</h1>
            <p className="text-xs text-indigo-300">ゼロから始めるデータ分析</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4 bg-white/5 rounded-xl p-4">
          <div className="flex justify-between text-xs mb-2">
            <span className="text-indigo-300">学習進捗</span>
            <span className="text-white font-medium">{progressPercentage}%</span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Chapter List */}
      <div className="flex-1 overflow-y-auto py-3">
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

      {/* Footer */}
      <div className="p-4 border-t border-white/10">
        <p className="text-xs text-indigo-400/60 text-center">
          Powered by React + TypeScript
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
        className="w-full px-5 py-3.5 flex items-center gap-3 hover:bg-white/5 transition-colors text-left group"
      >
        <span className={`transition-transform duration-200 ${isExpanded ? 'rotate-0' : '-rotate-90'}`}>
          <ChevronDown size={16} className="text-indigo-400" />
        </span>
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
          isAllComplete
            ? 'bg-gradient-to-br from-green-500 to-emerald-600'
            : 'bg-gradient-to-br from-indigo-500/20 to-purple-500/20'
        }`}>
          <BookOpen size={16} className={isAllComplete ? 'text-white' : 'text-indigo-400'} />
        </div>
        <div className="flex-1">
          <div className="text-sm font-medium group-hover:text-white transition-colors">{chapter.title}</div>
          <div className="text-xs text-indigo-400/60">
            {completedCount}/{totalCount} レッスン完了
          </div>
        </div>
      </button>

      {isExpanded && (
        <div className="ml-8 pl-4 border-l border-indigo-500/20">
          {chapter.lessons.map((lesson) => {
            const isComplete = isLessonComplete(lesson.id);
            const isCurrent = lesson.id === currentLessonId;

            return (
              <button
                key={lesson.id}
                onClick={() => onSelectLesson(chapter.id, lesson.id)}
                className={`w-full px-4 py-2.5 flex items-center gap-3 text-left transition-all rounded-lg my-0.5 ${
                  isCurrent
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                    : 'hover:bg-white/5 text-indigo-200'
                }`}
              >
                {isComplete ? (
                  <CheckCircle size={14} className={isCurrent ? 'text-white' : 'text-green-400'} />
                ) : (
                  <Circle size={14} className={isCurrent ? 'text-white/70' : 'text-indigo-500/50'} />
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
