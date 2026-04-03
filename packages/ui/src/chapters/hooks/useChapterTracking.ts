import {useCallback, useRef, useState} from 'react';
import {useDerivedValue, runOnJS, type SharedValue} from 'react-native-reanimated';
import type {Chapter} from '../../types';

interface UseChapterTrackingReturn {
  currentChapter: Chapter | null;
}

export function useChapterTracking(
  chapters: Chapter[],
  currentTime: SharedValue<number>,
  seekPreviewTime: SharedValue<number>,
): UseChapterTrackingReturn {
  const [currentChapter, setCurrentChapter] = useState<Chapter | null>(null);
  const prevTitleRef = useRef<string | null>(null);

  const updateChapter = useCallback(
    (time: number) => {
      let found: Chapter | null = null;
      for (const chapter of chapters) {
        if (time >= chapter.startTime && time < chapter.endTime) {
          found = chapter;
          break;
        }
      }

      const title = found?.title ?? null;
      if (title !== prevTitleRef.current) {
        prevTitleRef.current = title;
        setCurrentChapter(found);
      }
    },
    [chapters],
  );

  // Runs on UI thread whenever currentTime or seekPreviewTime changes
  useDerivedValue(() => {
    const time = seekPreviewTime.value >= 0
      ? seekPreviewTime.value
      : currentTime.value;
    runOnJS(updateChapter)(time);
    return time;
  });

  return {currentChapter};
}
