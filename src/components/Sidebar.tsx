import { useState } from 'react';
import {
  ChevronDown,
  ChevronRight,
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
    <div className="w-72 bg-gray-900 text-white h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
            <GraduationCap size={24} />
          </div>
          <div>
            <h1 className="font-bold text-lg">Python学習</h1>
            <p className="text-xs text-gray-400">ゼロから始めるデータ分析</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="flex justify-between text-xs text-gray-400 mb-1">
            <span>学習進捗</span>
            <span>{progressPercentage}%</span>
          </div>
          <div className="progress-bar">
            <div
              className="progress-bar-fill"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Chapter List */}
      <div className="flex-1 overflow-y-auto py-2">
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
      <div className="p-4 border-t border-gray-700">
        <p className="text-xs text-gray-500 text-center">
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
        className="w-full px-4 py-3 flex items-center gap-2 hover:bg-gray-800 transition-colors text-left"
      >
        {isExpanded ? (
          <ChevronDown size={16} className="text-gray-400" />
        ) : (
          <ChevronRight size={16} className="text-gray-400" />
        )}
        <BookOpen size={16} className={isAllComplete ? 'text-green-500' : 'text-indigo-400'} />
        <div className="flex-1">
          <div className="text-sm font-medium">{chapter.title}</div>
          <div className="text-xs text-gray-500">
            {completedCount}/{totalCount} レッスン完了
          </div>
        </div>
      </button>

      {isExpanded && (
        <div className="ml-6 border-l border-gray-700">
          {chapter.lessons.map((lesson) => {
            const isComplete = isLessonComplete(lesson.id);
            const isCurrent = lesson.id === currentLessonId;

            return (
              <button
                key={lesson.id}
                onClick={() => onSelectLesson(chapter.id, lesson.id)}
                className={`w-full px-4 py-2 flex items-center gap-2 text-left transition-colors ${
                  isCurrent
                    ? 'bg-indigo-600 text-white'
                    : 'hover:bg-gray-800 text-gray-300'
                }`}
              >
                {isComplete ? (
                  <CheckCircle size={14} className="text-green-500" />
                ) : (
                  <Circle size={14} className="text-gray-500" />
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
