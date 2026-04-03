import {useCallback} from 'react';
import {
  useSharedValue,
  runOnJS,
  type SharedValue,
} from 'react-native-reanimated';
import {Gesture} from 'react-native-gesture-handler';
import {useControlsContext} from '../controls/ControlsContext';

interface UseSliderOptions {
  /** Current progress as a fraction 0–1 (SharedValue for worklet access) */
  currentProgress: SharedValue<number>;
  /** Called when user finishes dragging — final fraction 0–1 */
  onSeek: (fraction: number) => void;
  /** Called during drag — current fraction 0–1 */
  onSeeking?: (fraction: number) => void;
  /** Optional external isDragging SharedValue — parent can read it for animations */
  isDragging?: SharedValue<boolean>;
}

interface UseSliderReturn {
  sliderWidth: SharedValue<number>;
  isDragging: SharedValue<boolean>;
  dragProgress: SharedValue<number>;
  gesture: ReturnType<typeof Gesture.Pan>;
  handleLayout: (e: {nativeEvent: {layout: {width: number}}}) => void;
}

export function useSlider({currentProgress, onSeek, onSeeking, isDragging: externalIsDragging}: UseSliderOptions): UseSliderReturn {
  const controls = useControlsContext();
  const sliderWidth = useSharedValue(0);
  const internalIsDragging = useSharedValue(false);
  const isDragging = externalIsDragging ?? internalIsDragging;
  const dragProgress = useSharedValue(0);
  const startProgress = useSharedValue(0);
  const startX = useSharedValue(0);

  const handleDragStart = useCallback(() => {
    controls?.lockAutoHide();
  }, [controls]);

  const handleDragEnd = useCallback(() => {
    controls?.unlockAutoHide();
  }, [controls]);

  const finishDrag = useCallback(() => {
    const target = dragProgress.value;
    const check = () => {
      const diff = Math.abs(currentProgress.value - target);
      if (diff < 0.01) {
        isDragging.value = false;
      } else {
        setTimeout(check, 50);
      }
    };
    setTimeout(check, 50);
  }, [currentProgress, dragProgress, isDragging]);

  const gesture = Gesture.Pan()
    .onStart((e) => {
      isDragging.value = true;
      startProgress.value = currentProgress.value;
      startX.value = e.x;
      dragProgress.value = currentProgress.value;
      runOnJS(handleDragStart)();
    })
    .onUpdate((e) => {
      const delta = (e.x - startX.value) / sliderWidth.value;
      const fraction = Math.max(0, Math.min(1, startProgress.value + delta));
      dragProgress.value = fraction;
      if (onSeeking) {
        runOnJS(onSeeking)(fraction);
      }
    })
    .onEnd(() => {
      runOnJS(onSeek)(dragProgress.value);
      runOnJS(finishDrag)();
      runOnJS(handleDragEnd)();
    });

  const handleLayout = useCallback(
    (e: {nativeEvent: {layout: {width: number}}}) => {
      sliderWidth.value = e.nativeEvent.layout.width;
    },
    [sliderWidth],
  );

  return {sliderWidth, isDragging, dragProgress, gesture, handleLayout};
}
