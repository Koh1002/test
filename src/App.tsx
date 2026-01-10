import { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { LessonContent } from './components/LessonContent';
import { AIChat } from './components/AIChat';
import { Header } from './components/Header';
import { ProgressProvider, useProgress } from './context/ProgressContext';
import { AIProvider } from './context/AIContext';
import { getLesson, chapters } from './content/chapters';
import type { Lesson } from './types';

function AppContent() {
  const { progress, setCurrentLesson } = useProgress();
  const [currentChapterId, setCurrentChapterId] = useState(progress.currentChapter);
  const [currentLessonId, setCurrentLessonId] = useState(progress.currentLesson);
  const [currentLesson, setCurrentLessonData] = useState<Lesson | null>(null);

  useEffect(() => {
    const lesson = getLesson(currentChapterId, currentLessonId);
    if (lesson) {
      setCurrentLessonData(lesson);
    } else {
      // Default to first lesson if not found
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
    <div className="h-screen flex flex-col bg-gray-50">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          onSelectLesson={handleSelectLesson}
          currentChapterId={currentChapterId}
          currentLessonId={currentLessonId}
        />
        {currentLesson && (
          <LessonContent
            lesson={currentLesson}
            chapterId={currentChapterId}
            onNavigate={handleSelectLesson}
          />
        )}
      </div>
      <AIChat />
    </div>
  );
}

function App() {
  return (
    <ProgressProvider>
      <AIProvider>
        <AppContent />
      </AIProvider>
    </ProgressProvider>
  );
}

export default App;
