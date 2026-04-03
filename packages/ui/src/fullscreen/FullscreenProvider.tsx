import {type ReactNode, useEffect, useRef, useCallback} from 'react';
import {Modal, StyleSheet, View, Dimensions, StatusBar, type LayoutChangeEvent} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
  runOnJS,
} from 'react-native-reanimated';
import {Gesture, GestureDetector, GestureHandlerRootView} from 'react-native-gesture-handler';
import {FullscreenContext} from './FullscreenContext';
import {useControlsContext} from '../controls/ControlsContext';
import {useFullscreenState} from './hooks/useFullscreenState';

const ANIMATION_DURATION = 300;
const SCREEN = Dimensions.get('screen');
const DISMISS_THRESHOLD = 80;

interface FullscreenProviderProps {
  children: ReactNode;
}

export function FullscreenProvider({children}: FullscreenProviderProps) {
  const fullscreenState = useFullscreenState();
  const {isCustomFullscreen, onInlineLayout} = fullscreenState;
  const controls = useControlsContext();

  // Enter/exit animation
  const animProgress = useSharedValue(0);
  const inlineX = useSharedValue(0);
  const inlineY = useSharedValue(0);
  const inlineW = useSharedValue(0);
  const inlineH = useSharedValue(0);

  // Dismiss gesture
  const dragX = useSharedValue(0);
  const dragY = useSharedValue(0);
  const isDragging = useSharedValue(false);

  const handleInlineLayout = (e: LayoutChangeEvent) => {
    const {x, y, width, height} = e.nativeEvent.layout;
    onInlineLayout({x, y, width, height});
  };

  const inlineRef = useRef<View>(null);

  const handleDismiss = useCallback(() => {
    fullscreenState.exitFullscreen();
  }, [fullscreenState]);

  useEffect(() => {
    if (isCustomFullscreen) {
      dragX.value = 0;
      dragY.value = 0;
      inlineRef.current?.measureInWindow((x, y, w, h) => {
        inlineX.value = x;
        inlineY.value = y;
        inlineW.value = w;
        inlineH.value = h;
        console.log('[Fullscreen] measured inline:', {x, y, w, h});
        animProgress.value = 0;
        animProgress.value = withTiming(1, {duration: ANIMATION_DURATION});
      });
    } else {
      animProgress.value = withTiming(0, {duration: ANIMATION_DURATION});
      dragY.value = 0;
    }
  }, [isCustomFullscreen, animProgress, inlineX, inlineY, inlineW, inlineH, dragY]);

  // Pan gesture for dismiss
  const hideControlsForDismiss = useCallback(() => {
    controls?.lockAutoHide();
    controls?.hide();
  }, [controls]);

  const restoreControlsAfterDismiss = useCallback(() => {
    controls?.unlockAutoHide();
  }, [controls]);

  const dismissGesture = Gesture.Pan()
    .onStart(() => {
      'worklet';
      isDragging.value = true;
      runOnJS(hideControlsForDismiss)();
    })
    .onUpdate((e) => {
      'worklet';
      dragX.value = e.translationX;
      dragY.value = Math.max(0, e.translationY);
    })
    .onEnd((e) => {
      'worklet';
      isDragging.value = false;
      if (e.translationY > DISMISS_THRESHOLD) {
        dragY.value = withTiming(SCREEN.height, {duration: 200});
        dragX.value = withTiming(dragX.value * 2, {duration: 200});
        runOnJS(handleDismiss)();
      } else {
        dragX.value = withTiming(0, {duration: 150});
        dragY.value = withTiming(0, {duration: 150});
        runOnJS(restoreControlsAfterDismiss)();
      }
    });

  // Backdrop style — black bg, fades on drag
  const backdropStyle = useAnimatedStyle(() => {
    const p = animProgress.value;
    const dy = dragY.value;
    const dragProgress = interpolate(dy, [0, DISMISS_THRESHOLD * 2], [0, 1]);
    const bgOpacity = interpolate(dragProgress, [0, 0.5, 0.75, 1], [1, 0.25, 0.1, 0]);

    return {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: `rgba(0, 0, 0, ${Math.round(p * Math.max(0, bgOpacity) * 100) / 100})`,
    };
  });

  // Content style — enter/exit + drag dismiss
  const animatedStyle = useAnimatedStyle(() => {
    const p = animProgress.value;
    const dy = dragY.value;
    const dx = dragX.value;

    // Drag progress: 0 = no drag, 1 = at threshold
    const dragProgress = interpolate(dy, [0, DISMISS_THRESHOLD * 2], [0, 1]);

    // Scale: 1 → 0.7 as drag progresses
    const scale = interpolate(dragProgress, [0, 1], [1, 0.7]);
    // Border radius appears when dragging
    const borderRadius = interpolate(dragProgress, [0, 0.2], [0, 16]);

    // Base position (enter/exit animation)
    const baseLeft = inlineX.value * (1 - p);
    const baseTop = inlineY.value * (1 - p);
    const baseWidth = inlineW.value + (SCREEN.width - inlineW.value) * p;
    const baseHeight = inlineH.value + (SCREEN.height - inlineH.value) * p;

    return {
      position: 'absolute' as const,
      left: baseLeft + dx,
      top: baseTop + dy,
      width: baseWidth,
      height: baseHeight,
      transform: [{scale}],
      borderRadius,
      overflow: 'hidden' as const,
    };
  });

  return (
    <FullscreenContext value={fullscreenState}>
      {/* Inline container */}
      <View
        ref={inlineRef}
        style={isCustomFullscreen ? styles.inlinePlaceholder : undefined}
        onLayout={handleInlineLayout}
      >
        {!isCustomFullscreen && children}
      </View>

      {/* Fullscreen modal */}
      <Modal
        visible={isCustomFullscreen}
        transparent
        animationType="none"
        statusBarTranslucent
        supportedOrientations={['portrait', 'landscape-left', 'landscape-right']}
        onRequestClose={fullscreenState.exitFullscreen}
      >
        <GestureHandlerRootView style={styles.gestureRoot}>
          <Animated.View style={backdropStyle} pointerEvents="none" />
          <SafeAreaProvider>
            <StatusBar hidden={isCustomFullscreen} />
            <GestureDetector gesture={dismissGesture}>
              <Animated.View style={[styles.gestureRoot, animatedStyle]}>
                {isCustomFullscreen && children}
              </Animated.View>
            </GestureDetector>
          </SafeAreaProvider>
        </GestureHandlerRootView>
      </Modal>
    </FullscreenContext>
  );
}

const styles = StyleSheet.create({
  inlinePlaceholder: {
    backgroundColor: '#000',
  },
  gestureRoot: {
    flex: 1,
  },
  fullscreenContent: {
    flex: 1,
  },
});
