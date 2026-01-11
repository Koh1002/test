import type { Chapter } from '../types';

// Chapter 1: 環境構築
import { chapter1 } from './chapter1-environment';
// Chapter 2: Python基礎（変数とprint文）
import { chapter2 } from './chapter2-basics';
// Chapter 3: 条件分岐（if文）
import { chapter3 } from './chapter3-conditionals';
// Chapter 4: 繰り返し処理（for文）
import { chapter4 } from './chapter4-loops';
// Chapter 5: 関数
import { chapter5 } from './chapter5-functions';
// Chapter 6: 再帰処理
import { chapter6 } from './chapter6-recursion';
// Chapter 7: クラスとオブジェクト
import { chapter7 } from './chapter7-classes';
// Chapter 8: NumPy入門
import { chapter8 } from './chapter8-numpy';
// Chapter 9: Pandas入門
import { chapter9 } from './chapter9-pandas';
// Chapter 10: Matplotlib入門
import { chapter10 } from './chapter10-matplotlib';
// Chapter 11: Polars入門
import { chapter11 } from './chapter11-polars';
// Chapter 12: 実践データ分析
import { chapter12 } from './chapter12-practice';

export const chapters: Chapter[] = [
  chapter1,
  chapter2,
  chapter3,
  chapter4,
  chapter5,
  chapter6,
  chapter7,
  chapter8,
  chapter9,
  chapter10,
  chapter11,
  chapter12,
];

export const getChapter = (id: string): Chapter | undefined => {
  return chapters.find(c => c.id === id);
};

export const getLesson = (chapterId: string, lessonId: string) => {
  const chapter = getChapter(chapterId);
  return chapter?.lessons.find(l => l.id === lessonId);
};

export const getNextLesson = (chapterId: string, lessonId: string): { chapterId: string; lessonId: string } | null => {
  const chapter = getChapter(chapterId);
  if (!chapter) return null;

  const lessonIndex = chapter.lessons.findIndex(l => l.id === lessonId);
  if (lessonIndex < chapter.lessons.length - 1) {
    return { chapterId, lessonId: chapter.lessons[lessonIndex + 1].id };
  }

  const chapterIndex = chapters.findIndex(c => c.id === chapterId);
  if (chapterIndex < chapters.length - 1) {
    const nextChapter = chapters[chapterIndex + 1];
    return { chapterId: nextChapter.id, lessonId: nextChapter.lessons[0].id };
  }

  return null;
};

export const getPrevLesson = (chapterId: string, lessonId: string): { chapterId: string; lessonId: string } | null => {
  const chapter = getChapter(chapterId);
  if (!chapter) return null;

  const lessonIndex = chapter.lessons.findIndex(l => l.id === lessonId);
  if (lessonIndex > 0) {
    return { chapterId, lessonId: chapter.lessons[lessonIndex - 1].id };
  }

  const chapterIndex = chapters.findIndex(c => c.id === chapterId);
  if (chapterIndex > 0) {
    const prevChapter = chapters[chapterIndex - 1];
    return { chapterId: prevChapter.id, lessonId: prevChapter.lessons[prevChapter.lessons.length - 1].id };
  }

  return null;
};
