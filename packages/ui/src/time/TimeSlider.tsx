import {type ReactNode, useCallback} from 'react';
import {View, StyleSheet, type ViewStyle} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  type SharedValue,
} from 'react-native-reanimated';
import {usePlayerContext} from '../player/PlayerContext';
import {useSlider} from '../hooks/useSlider';
import {useChaptersOptional} from '../chapters/ChaptersContext';
import {Slider} from '../shared/Slider';

function TimeSliderRoot({children, style, isDragging: externalIsDragging}: {children: ReactNode; style?: ViewStyle; isDragging?: SharedValue<boolean>}) {
  const {state, actions} = usePlayerContext();

  const progress = useDerivedValue(() => {
    if (state.duration <= 0) return 0;
    return state.currentTime.value / state.duration;
  });

  const onSeeking = useCallback(
    (fraction: number) => {
      state.seekPreviewTime.value = fraction * state.duration;
    },
    [state.seekPreviewTime, state.duration],
  );

  const onSeekDone = useCallback(
    (fraction: number) => {
      actions.seekTo(fraction * state.duration);
      state.seekPreviewTime.value = -1;
    },
    [actions, state.duration, state.seekPreviewTime],
  );

  const {isDragging, dragProgress, gesture, handleLayout} = useSlider({
    currentProgress: progress,
    onSeek: onSeekDone,
    onSeeking,
    isDragging: externalIsDragging,
  });

  const buffer = useDerivedValue(() => {
    if (state.duration <= 0) return 0;
    return state.bufferedPosition.value / state.duration;
  });

  return (
    <Slider.Root
      style={style}
      context={{progress, isDragging, dragProgress}}
      gesture={gesture}
      onLayout={handleLayout}>
      <TimeSliderExtra.Provider value={{buffer}}>
        {children}
      </TimeSliderExtra.Provider>
    </Slider.Root>
  );
}

// Extra context for TimeSlider-specific data (buffer)
import {createContext, use} from 'react';

interface TimeSliderExtraValue {
  buffer: SharedValue<number>;
}

const TimeSliderExtraContext = createContext<TimeSliderExtraValue | null>(null);
const TimeSliderExtra = {
  Provider: TimeSliderExtraContext,
};

function TimeSliderBuffer({style}: {style?: ViewStyle}) {
  const ctx = use(TimeSliderExtraContext);
  if (!ctx) return null;
  const animatedStyle = useAnimatedStyle(() => ({
    width: `${ctx.buffer.value * 100}%`,
  }));
  return <Animated.View style={[styles.buffer, style, animatedStyle]} />;
}

function TimeSliderChapterMarkers({style}: {style?: ViewStyle}) {
  const chaptersCtx = useChaptersOptional();
  const {state} = usePlayerContext();

  if (!chaptersCtx || chaptersCtx.chapters.length === 0 || state.duration <= 0) {
    return null;
  }

  return (
    <>
      {chaptersCtx.chapters.map((chapter, i) => {
        if (i === 0) return null;
        const position = (chapter.startTime / state.duration) * 100;
        return (
          <View
            key={`${chapter.startTime}`}
            style={[styles.chapterMarker, style, {left: `${position}%`}]}
          />
        );
      })}
    </>
  );
}

export const TimeSlider = {
  Root: TimeSliderRoot,
  Track: Slider.Track,
  Fill: Slider.Fill,
  Buffer: TimeSliderBuffer,
  ChapterMarkers: TimeSliderChapterMarkers,
};

const styles = StyleSheet.create({
  buffer: {position: 'absolute', left: 0, top: 0, bottom: 0, backgroundColor: 'rgba(255, 255, 255, 0.5)', borderRadius: 2},
  chapterMarker: {position: 'absolute', top: -2, bottom: -2, width: 2, backgroundColor: 'rgba(255, 255, 255, 0.6)', marginLeft: -1, zIndex: 10},
});
