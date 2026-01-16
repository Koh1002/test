import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ChevronLeft, ChevronRight, CheckCircle, BookOpen } from 'lucide-react';
import type { Lesson } from '../types';
import { Exercise } from './Exercise';
import { useProgress } from '../context/ProgressContext';
import { getNextLesson, getPrevLesson } from '../content/chapters';
import { ScrollArea } from './ui/scroll-area';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

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
    <ScrollArea className="h-full">
      <div className="max-w-4xl mx-auto p-8 pb-12">
        {/* Lesson Title */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl flex items-center justify-center">
              <BookOpen size={20} className="text-indigo-600" />
            </div>
            {isComplete && (
              <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-600 px-3 py-1.5 rounded-full text-xs font-medium border border-emerald-200">
                <CheckCircle size={14} />
                <span>完了済み</span>
              </div>
            )}
          </div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">{lesson.title}</h1>
        </div>

        {/* Lesson Content */}
        <div className="markdown-content prose prose-slate prose-lg max-w-none
          prose-headings:text-slate-900 prose-headings:font-bold
          prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:border-b prose-h2:border-slate-200 prose-h2:pb-2
          prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
          prose-p:text-slate-600 prose-p:leading-relaxed
          prose-code:bg-slate-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-indigo-600 prose-code:before:content-none prose-code:after:content-none
          prose-pre:bg-slate-900 prose-pre:text-slate-100 prose-pre:rounded-xl prose-pre:shadow-lg
          prose-a:text-indigo-600 prose-a:no-underline hover:prose-a:underline
          prose-strong:text-slate-900
          prose-ul:text-slate-600 prose-ol:text-slate-600
          prose-li:marker:text-indigo-400
        ">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {lesson.content}
          </ReactMarkdown>
        </div>

        {/* Exercises */}
        {lesson.exercises.length > 0 && (
          <div className="mt-12">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-200">
              <div className="w-8 h-8 bg-gradient-to-br from-amber-100 to-orange-100 rounded-lg flex items-center justify-center">
                <span className="text-lg">✏️</span>
              </div>
              <h2 className="text-2xl font-bold text-slate-900">演習問題</h2>
            </div>
            <div className="space-y-6">
              {lesson.exercises.map((exercise) => (
                <Exercise
                  key={exercise.id}
                  exercise={exercise}
                  onComplete={() => {}}
                />
              ))}
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="mt-12 pt-8 border-t border-slate-200">
          <div className="flex justify-between items-center gap-4">
            <div className="flex-1">
              {prevLesson && (
                <Button
                  variant="ghost"
                  onClick={() => onNavigate(prevLesson.chapterId, prevLesson.lessonId)}
                  className="gap-2 text-slate-600 hover:text-indigo-600"
                >
                  <ChevronLeft size={18} />
                  <span>前のレッスン</span>
                </Button>
              )}
            </div>

            <Button
              onClick={handleComplete}
              variant={isComplete ? "secondary" : "default"}
              size="lg"
              className={cn(
                "gap-2 px-6",
                isComplete && "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
              )}
            >
              {isComplete ? (
                <>
                  <CheckCircle size={18} />
                  <span>完了済み</span>
                </>
              ) : (
                <>
                  <span>レッスンを完了して次へ</span>
                  <ChevronRight size={18} />
                </>
              )}
            </Button>

            <div className="flex-1 flex justify-end">
              {nextLesson && (
                <Button
                  variant="ghost"
                  onClick={() => onNavigate(nextLesson.chapterId, nextLesson.lessonId)}
                  className="gap-2 text-slate-600 hover:text-indigo-600"
                >
                  <span>次のレッスン</span>
                  <ChevronRight size={18} />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}
