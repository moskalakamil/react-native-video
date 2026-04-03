import {type ReactNode, createContext, use} from 'react';
import {View, StyleSheet, type ViewStyle} from 'react-native';
import Animated, {
  useAnimatedStyle,
  withTiming,
  type SharedValue,
} from 'react-native-reanimated';
import {GestureDetector} from 'react-native-gesture-handler';
import type {useSlider} from '../hooks/useSlider';

export interface SliderContextValue {
  progress: SharedValue<number>;
  isDragging: SharedValue<boolean>;
  dragProgress: SharedValue<number>;
}

const SliderContext = createContext<SliderContextValue | null>(null);

export function useSliderContext(): SliderContextValue {
  const ctx = use(SliderContext);
  if (!ctx) throw new Error('Slider sub-components must be inside Slider.Root');
  return ctx;
}

interface SliderRootProps {
  children: ReactNode;
  style?: ViewStyle;
  context: SliderContextValue;
  gesture: ReturnType<typeof useSlider>['gesture'];
  onLayout: ReturnType<typeof useSlider>['handleLayout'];
}

function SliderRoot({children, style, context, gesture, onLayout}: SliderRootProps) {
  return (
    <SliderContext value={context}>
      <GestureDetector gesture={gesture}>
        <View style={[styles.root, style]} onLayout={onLayout}>
          {children}
        </View>
      </GestureDetector>
    </SliderContext>
  );
}

function SliderTrack({children, style}: {children?: ReactNode; style?: ViewStyle}) {
  const {isDragging} = useSliderContext();
  const animatedStyle = useAnimatedStyle(() => ({
    height: withTiming(isDragging.value ? 5 : 3, {duration: 150}),
    borderRadius: withTiming(isDragging.value ? 2.5 : 1.5, {duration: 150}),
  }));
  return (
    <Animated.View style={[styles.track, style, animatedStyle]}>
      {children}
    </Animated.View>
  );
}

function SliderFill({style}: {style?: ViewStyle}) {
  const {progress, isDragging, dragProgress} = useSliderContext();
  const animatedStyle = useAnimatedStyle(() => {
    const value = isDragging.value ? dragProgress.value : progress.value;
    return {width: `${value * 100}%`};
  });
  return <Animated.View style={[styles.fill, style, animatedStyle]} />;
}

function SliderThumb({style}: {style?: ViewStyle}) {
  const {progress, isDragging, dragProgress} = useSliderContext();
  const animatedStyle = useAnimatedStyle(() => {
    const value = isDragging.value ? dragProgress.value : progress.value;
    return {left: `${value * 100}%`};
  });
  return <Animated.View style={[styles.thumb, style, animatedStyle]} />;
}

export const Slider = {
  Root: SliderRoot,
  Track: SliderTrack,
  Fill: SliderFill,
  Thumb: SliderThumb,
  useSliderContext,
};

const styles = StyleSheet.create({
  root: {height: 40, justifyContent: 'center'},
  track: {height: 3, backgroundColor: 'rgba(255, 255, 255, 0.3)', borderRadius: 1.5, overflow: 'hidden'},
  fill: {position: 'absolute', left: 0, top: 0, bottom: 0, backgroundColor: '#fff', borderRadius: 2},
  thumb: {position: 'absolute', width: 14, height: 14, borderRadius: 7, backgroundColor: '#fff', marginLeft: -7},
});
