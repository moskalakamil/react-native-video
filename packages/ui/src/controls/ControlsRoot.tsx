import {type ReactNode, useCallback, useRef, useMemo} from 'react';
import {Pressable, View, StyleSheet, type ViewStyle} from 'react-native';
import Animated, {useAnimatedStyle} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useControlsVisibility} from './hooks/useControlsVisibility';
import {ControlsContext} from './ControlsContext';
import {useFullscreen} from '../fullscreen/FullscreenContext';

interface ControlsRootProps {
  children: ReactNode;
  autoHideTimeout?: number;
  style?: ViewStyle;
}

export function ControlsRoot({
  children,
  autoHideTimeout,
  style,
}: ControlsRootProps) {
  const lockCount = useRef(0);
  const fullscreen = useFullscreen();
  const insets = useSafeAreaInsets();

  const safeAreaStyle = useMemo<ViewStyle | undefined>(() => {
    if (!fullscreen?.isCustomFullscreen) return undefined;
    return {
      paddingTop: insets.top,
      paddingBottom: insets.bottom,
      paddingLeft: insets.left,
      paddingRight: insets.right,
    };
  }, [fullscreen?.isCustomFullscreen, insets]);

  const {opacity, show, hide, toggle, resetTimer} = useControlsVisibility({
    autoHideTimeout,
    isLocked: lockCount,
  });

  const lockAutoHide = useCallback(() => {
    lockCount.current += 1;
  }, []);

  const unlockAutoHide = useCallback(() => {
    lockCount.current = Math.max(0, lockCount.current - 1);
    if (lockCount.current === 0) {
      resetTimer();
    }
  }, [resetTimer]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const handleTouchCapture = useCallback(() => {
    resetTimer();
    return false;
  }, [resetTimer]);

  return (
    <ControlsContext value={{lockAutoHide, unlockAutoHide, show, hide}}>
      <View
        style={styles.overlay}
        onStartShouldSetResponderCapture={handleTouchCapture}>
        <Pressable onPress={toggle} style={styles.pressable}>
          <Animated.View style={[styles.inner, style, safeAreaStyle, animatedStyle]}>
            {children}
          </Animated.View>
        </Pressable>
      </View>
    </ControlsContext>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  pressable: {
    flex: 1,
  },
  inner: {
    flex: 1,
  },
});
