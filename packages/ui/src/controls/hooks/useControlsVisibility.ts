import {useCallback, useEffect, useRef, type RefObject} from 'react';
import {useSharedValue, withTiming, type SharedValue} from 'react-native-reanimated';

const FADE_DURATION = 200;
const DEFAULT_HIDE_TIMEOUT = 3000;

interface UseControlsVisibilityOptions {
  autoHideTimeout?: number;
  /** Ref with lock count — when > 0, hide is blocked synchronously */
  isLocked: RefObject<number>;
}

interface UseControlsVisibilityReturn {
  opacity: SharedValue<number>;
  show: () => void;
  hide: () => void;
  toggle: () => void;
  resetTimer: () => void;
}

export function useControlsVisibility({
  autoHideTimeout = DEFAULT_HIDE_TIMEOUT,
  isLocked,
}: UseControlsVisibilityOptions): UseControlsVisibilityReturn {
  const opacity = useSharedValue(1);
  const isVisible = useRef(true);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimer = useCallback(() => {
    if (hideTimer.current) {
      clearTimeout(hideTimer.current);
      hideTimer.current = null;
    }
  }, []);

  const show = useCallback(() => {
    isVisible.current = true;
    opacity.value = withTiming(1, {duration: FADE_DURATION});
  }, [opacity]);

  const hide = useCallback(() => {
    // Synchronous check — if locked, don't hide
    if (isLocked.current > 0) return;

    isVisible.current = false;
    opacity.value = withTiming(0, {duration: FADE_DURATION});
  }, [opacity, isLocked]);

  const startHideTimer = useCallback(() => {
    clearTimer();
    if (autoHideTimeout > 0) {
      hideTimer.current = setTimeout(hide, autoHideTimeout);
    }
  }, [autoHideTimeout, hide, clearTimer]);

  const toggle = useCallback(() => {
    if (isLocked.current > 0) return;

    if (isVisible.current) {
      clearTimer();
      hide();
    } else {
      show();
      startHideTimer();
    }
  }, [isLocked, show, hide, clearTimer, startHideTimer]);

  const resetTimer = useCallback(() => {
    if (isVisible.current) {
      startHideTimer();
    }
  }, [startHideTimer]);

  // Start initial hide timer
  useEffect(() => {
    startHideTimer();
    return clearTimer;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {opacity, show, hide, toggle, resetTimer};
}
