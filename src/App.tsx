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
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center p-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl">
            <h1 className="text-2xl font-bold text-red-600 mb-4">エラーが発生しました</h1>
            <p className="text-gray-700 mb-4">アプリケーションの読み込み中にエラーが発生しました。</p>
            <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-auto">
              {this.state.error?.message}
            </pre>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all"
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
    <div className="h-screen flex flex-col bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar
          onSelectLesson={handleSelectLesson}
          currentChapterId={currentChapterId}
          currentLessonId={currentLessonId}
        />

        {/* Main Content with padding */}
        <div className="flex-1 flex overflow-hidden">
          <div className="flex-1 p-6 overflow-hidden">
            <div className="h-full bg-white rounded-2xl shadow-lg overflow-hidden">
              {currentLesson && (
                <LessonContent
                  lesson={currentLesson}
                  chapterId={currentChapterId}
                  onNavigate={handleSelectLesson}
                />
              )}
            </div>
          </div>

          {/* AI Chat Pane */}
          {isChatOpen && (
            <div className="w-96 p-6 pl-0 overflow-hidden">
              <AIChat />
            </div>
          )}
        </div>
      </div>

      {/* Floating button when chat is closed */}
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
