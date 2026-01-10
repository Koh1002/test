import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';
import type { Lesson } from '../types';
import { Exercise } from './Exercise';
import { useProgress } from '../context/ProgressContext';
import { getNextLesson, getPrevLesson } from '../content/chapters';

interface LessonContentProps {
  lesson: Lesson;
  chapterId: string;
  onNavigate: (chapterId: string, lessonId: string) => void;
}

export function LessonContent({ lesson, chapterId, onNavigate }: LessonContentProps) {
  const { markLessonComplete, isLessonComplete } = useProgress();

  const prevLesson = getPrevLesson(chapterId, lesson.id);
  const nextLesson = getNextLesson(chapterId, lesson.id);
  const isComplete = isLessonComplete(lesson.id);

  const handleComplete = () => {
    markLessonComplete(lesson.id);
    if (nextLesson) {
      onNavigate(nextLesson.chapterId, nextLesson.lessonId);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto bg-white">
      <div className="max-w-4xl mx-auto p-8">
        {/* Lesson Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{lesson.title}</h1>
          {isComplete && (
            <div className="flex items-center gap-2 text-green-600">
              <CheckCircle size={20} />
              <span className="text-sm font-medium">完了済み</span>
            </div>
          )}
        </div>

        {/* Lesson Content */}
        <div className="markdown-content prose prose-lg max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {lesson.content}
          </ReactMarkdown>
        </div>

        {/* Exercises */}
        {lesson.exercises.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-indigo-200">
              演習問題
            </h2>
            {lesson.exercises.map((exercise) => (
              <Exercise
                key={exercise.id}
                exercise={exercise}
                onComplete={() => {}}
              />
            ))}
          </div>
        )}

        {/* Navigation */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <div>
              {prevLesson && (
                <button
                  onClick={() => onNavigate(prevLesson.chapterId, prevLesson.lessonId)}
                  className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 transition-colors"
                >
                  <ChevronLeft size={20} />
                  <span>前のレッスン</span>
                </button>
              )}
            </div>

            <button
              onClick={handleComplete}
              className={`btn-primary flex items-center gap-2 ${
                isComplete ? 'bg-green-500' : ''
              }`}
            >
              {isComplete ? (
                <>
                  <CheckCircle size={20} />
                  <span>完了済み</span>
                </>
              ) : (
                <>
                  <span>レッスンを完了して次へ</span>
                  <ChevronRight size={20} />
                </>
              )}
            </button>

            <div>
              {nextLesson && (
                <button
                  onClick={() => onNavigate(nextLesson.chapterId, nextLesson.lessonId)}
                  className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 transition-colors"
                >
                  <span>次のレッスン</span>
                  <ChevronRight size={20} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
