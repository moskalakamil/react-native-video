import {useEffect, useState} from 'react';
import type {SharedValue} from 'react-native-reanimated';

/**
 * Polls a Reanimated SharedValue and returns it as React state.
 * Useful for components that need to display time as text
 * (shared values don't trigger React re-renders on their own).
 */
export function useCurrentTime(
  sharedValue: SharedValue<number>,
  intervalMs = 250,
): number {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(sharedValue.value);
    }, intervalMs);

    return () => clearInterval(interval);
  }, [sharedValue, intervalMs]);

  return time;
}
