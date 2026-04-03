import {type ReactNode, useCallback} from 'react';
import {type ViewStyle} from 'react-native';
import {useDerivedValue, withTiming} from 'react-native-reanimated';
import {usePlayerContext} from '../player/PlayerContext';
import {useSlider} from '../hooks/useSlider';
import {Slider} from '../shared/Slider';

function VolumeSliderRoot({children, style}: {children: ReactNode; style?: ViewStyle}) {
  const {state, actions} = usePlayerContext();

  const progress = useDerivedValue(() => {
    const target = state.muted ? 0 : state.volume;
    return withTiming(target, {duration: 200});
  });

  const setVolumeFraction = useCallback(
    (fraction: number) => {
      if (state.muted) {
        actions.toggleMuted();
      }
      actions.setVolume(fraction);
    },
    [actions, state.muted],
  );

  const {isDragging, dragProgress, gesture, handleLayout} = useSlider({
    currentProgress: progress,
    onSeek: setVolumeFraction,
    onSeeking: setVolumeFraction,
  });

  return (
    <Slider.Root
      style={style}
      context={{progress, isDragging, dragProgress}}
      gesture={gesture}
      onLayout={handleLayout}>
      {children}
    </Slider.Root>
  );
}

export const VolumeSlider = {
  Root: VolumeSliderRoot,
  Track: Slider.Track,
  Fill: Slider.Fill,
};
