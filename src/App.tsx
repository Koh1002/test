import { useState, useEffect, Component, type ReactNode } from 'react';
import { Sidebar } from './components/Sidebar';
import { LessonContent } from './components/LessonContent';
import { AIChat } from './components/AIChat';
import { Header } from './components/Header';
import { ProgressProvider, useProgress } from './context/ProgressContext';
import { AIProvider, useAI } from './context/AIContext';
import { getLesson, chapters } from './content/chapters';
import type { Lesson } from './types';

// Error Boundary Component
interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<{ children: ReactNode }, ErrorBoundaryState> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-100 flex items-center justify-center p-8">
          <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-2xl border border-slate-100">
            <h1 className="text-2xl font-bold text-red-600 mb-4">エラーが発生しました</h1>
            <p className="text-slate-600 mb-4">アプリケーションの読み込み中にエラーが発生しました。</p>
            <pre className="bg-slate-50 p-4 rounded-xl text-sm overflow-auto border border-slate-200 text-slate-700">
              {this.state.error?.message}
            </pre>
            <button
              onClick={() => window.location.reload()}
              className="mt-6 px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-indigo-200 transition-all"
            >
              ページを再読み込み
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

function AppContent() {
  const { progress, setCurrentLesson } = useProgress();
  const { isChatOpen } = useAI();
  const [currentChapterId, setCurrentChapterId] = useState(progress.currentChapter);
  const [currentLessonId, setCurrentLessonId] = useState(progress.currentLesson);
  const [currentLesson, setCurrentLessonData] = useState<Lesson | null>(null);

  useEffect(() => {
    const lesson = getLesson(currentChapterId, currentLessonId);
    if (lesson) {
      setCurrentLessonData(lesson);
    } else {
      const firstChapter = chapters[0];
      const firstLesson = firstChapter.lessons[0];
      setCurrentChapterId(firstChapter.id);
      setCurrentLessonId(firstLesson.id);
      setCurrentLessonData(firstLesson);
    }
  }, [currentChapterId, currentLessonId]);

  const handleSelectLesson = (chapterId: string, lessonId: string) => {
    setCurrentChapterId(chapterId);
    setCurrentLessonId(lessonId);
    setCurrentLesson(chapterId, lessonId);
  };

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-slate-100 via-indigo-50 to-purple-100 overflow-hidden">
      <Header />
      <div className="flex flex-1 min-h-0">
        {/* Sidebar */}
        <Sidebar
          onSelectLesson={handleSelectLesson}
          currentChapterId={currentChapterId}
          currentLessonId={currentLessonId}
        />

        {/* Main Content Area */}
        <main className="flex-1 flex min-h-0 p-6 gap-6">
          {/* Lesson Content */}
          <div className="flex-1 min-h-0 min-w-0 bg-white rounded-3xl shadow-xl shadow-indigo-100/50 border border-white/50 overflow-hidden">
            {currentLesson && (
              <LessonContent
                lesson={currentLesson}
                chapterId={currentChapterId}
                onNavigate={handleSelectLesson}
              />
            )}
          </div>

          {/* AI Chat Panel */}
          {isChatOpen && (
            <div className="w-[420px] min-h-0 flex-shrink-0">
              <AIChat />
            </div>
          )}
        </main>
      </div>

      {/* Floating AI Button */}
      {!isChatOpen && <AIChat />}
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ProgressProvider>
        <AIProvider>
          <AppContent />
        </AIProvider>
      </ProgressProvider>
    </ErrorBoundary>
  );
}

export default App;
