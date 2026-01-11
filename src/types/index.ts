export interface Chapter {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
  order: number;
}

export interface Lesson {
  id: string;
  title: string;
  content: string;
  exercises: Exercise[];
  order: number;
}

export interface Exercise {
  id: string;
  title: string;
  description: string;
  initialCode: string;
  expectedOutput?: string;
  validateFn?: string;
  hints: string[];
}

export interface UserProgress {
  completedLessons: string[];
  completedExercises: string[];
  currentChapter: string;
  currentLesson: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface AIProvider {
  id: 'openai' | 'anthropic' | 'google';
  name: string;
  apiKeyPlaceholder: string;
}

export interface AISettings {
  provider: AIProvider['id'];
  apiKey: string;
}
