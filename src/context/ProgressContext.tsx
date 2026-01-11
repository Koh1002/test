import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { UserProgress } from '../types';

interface ProgressContextType {
  progress: UserProgress;
  markLessonComplete: (lessonId: string) => void;
  markExerciseComplete: (exerciseId: string) => void;
  setCurrentLesson: (chapterId: string, lessonId: string) => void;
  isLessonComplete: (lessonId: string) => boolean;
  isExerciseComplete: (exerciseId: string) => boolean;
  getProgressPercentage: () => number;
}

const defaultProgress: UserProgress = {
  completedLessons: [],
  completedExercises: [],
  currentChapter: 'chapter1',
  currentLesson: 'lesson1-1',
};

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<UserProgress>(() => {
    const saved = localStorage.getItem('python-learning-progress');
    return saved ? JSON.parse(saved) : defaultProgress;
  });

  useEffect(() => {
    localStorage.setItem('python-learning-progress', JSON.stringify(progress));
  }, [progress]);

  const markLessonComplete = (lessonId: string) => {
    setProgress((prev) => {
      if (prev.completedLessons.includes(lessonId)) return prev;
      return {
        ...prev,
        completedLessons: [...prev.completedLessons, lessonId],
      };
    });
  };

  const markExerciseComplete = (exerciseId: string) => {
    setProgress((prev) => {
      if (prev.completedExercises.includes(exerciseId)) return prev;
      return {
        ...prev,
        completedExercises: [...prev.completedExercises, exerciseId],
      };
    });
  };

  const setCurrentLesson = (chapterId: string, lessonId: string) => {
    setProgress((prev) => ({
      ...prev,
      currentChapter: chapterId,
      currentLesson: lessonId,
    }));
  };

  const isLessonComplete = (lessonId: string) => {
    return progress.completedLessons.includes(lessonId);
  };

  const isExerciseComplete = (exerciseId: string) => {
    return progress.completedExercises.includes(exerciseId);
  };

  const getProgressPercentage = () => {
    const totalLessons = 40; // Approximate total lessons
    return Math.round((progress.completedLessons.length / totalLessons) * 100);
  };

  return (
    <ProgressContext.Provider
      value={{
        progress,
        markLessonComplete,
        markExerciseComplete,
        setCurrentLesson,
        isLessonComplete,
        isExerciseComplete,
        getProgressPercentage,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
}
