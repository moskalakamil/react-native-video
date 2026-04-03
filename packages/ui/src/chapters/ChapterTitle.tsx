import {type ReactNode} from 'react';
import {Text, StyleSheet, type TextStyle} from 'react-native';
import {useChapters} from './ChaptersContext';
import type {Chapter} from '../types';

interface ChapterTitleRenderState {
  title: string | null;
  chapter: Chapter | null;
}

interface ChapterTitleProps {
  render?: (props: object, state: ChapterTitleRenderState) => ReactNode;
  style?: TextStyle;
}

export function ChapterTitle({render, style}: ChapterTitleProps) {
  const {currentChapter} = useChapters();

  if (!currentChapter) return null;

  if (render) {
    return (
      <>{render({}, {title: currentChapter.title, chapter: currentChapter})}</>
    );
  }

  return <Text style={[styles.title, style]}>{currentChapter.title}</Text>;
}

const styles = StyleSheet.create({
  title: {fontSize: 14, fontWeight: '600', color: '#fff'},
});
