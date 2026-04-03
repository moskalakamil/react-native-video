import {type ReactNode, useCallback, useEffect, useRef, useMemo} from 'react';
import {usePlayerContext} from '../player/PlayerContext';
import {ChaptersContext} from './ChaptersContext';
import {useChapterTracking} from './hooks/useChapterTracking';
import type {Chapter} from '../types';

interface ChaptersProviderProps {
  chapters: Chapter[];
  onChapterChange?: (chapter: Chapter | null) => void;
  children: ReactNode;
}

export function ChaptersProvider({
  chapters,
  onChapterChange,
  children,
}: ChaptersProviderProps) {
  const {state, actions} = usePlayerContext();
  const {currentChapter} = useChapterTracking(chapters, state.currentTime, state.seekPreviewTime);
  const hasEmittedRef = useRef(false);

  useEffect(() => {
    // Skip initial null (mount before first poll)
    if (currentChapter === null && !hasEmittedRef.current) return;
    hasEmittedRef.current = true;
    onChapterChange?.(currentChapter);
  }, [currentChapter, onChapterChange]);

  const goToChapter = useCallback(
    (chapter: Chapter) => {
      actions.seekTo(chapter.startTime);
    },
    [actions],
  );

  const contextValue = useMemo(
    () => ({chapters, currentChapter, goToChapter}),
    [chapters, currentChapter, goToChapter],
  );

  return (
    <ChaptersContext value={contextValue}>
      {children}
    </ChaptersContext>
  );
}
