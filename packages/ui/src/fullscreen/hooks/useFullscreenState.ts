import {useCallback, useMemo, useRef, useState} from 'react';
import {StatusBar, type LayoutRectangle} from 'react-native';
import type {FullscreenContextValue} from '../../types';

export interface FullscreenStateExtended extends FullscreenContextValue {
  inlineLayout: React.RefObject<LayoutRectangle | null>;
  onInlineLayout: (layout: LayoutRectangle) => void;
}

export function useFullscreenState(): FullscreenStateExtended {
  const [isCustomFullscreen, setIsCustomFullscreen] = useState(false);
  const inlineLayout = useRef<LayoutRectangle | null>(null);

  const onInlineLayout = useCallback((layout: LayoutRectangle) => {
    inlineLayout.current = layout;
  }, []);

  const enterFullscreen = useCallback(() => {
    setIsCustomFullscreen(true);
    StatusBar.setHidden(true, 'fade');
  }, []);

  const exitFullscreen = useCallback(() => {
    setIsCustomFullscreen(false);
    StatusBar.setHidden(false, 'fade');
  }, []);

  const toggleFullscreen = useCallback(() => {
    setIsCustomFullscreen((prev) => {
      const next = !prev;
      StatusBar.setHidden(next, 'fade');
      return next;
    });
  }, []);

  return useMemo(
    () => ({isCustomFullscreen, enterFullscreen, exitFullscreen, toggleFullscreen, inlineLayout, onInlineLayout}),
    [isCustomFullscreen, enterFullscreen, exitFullscreen, toggleFullscreen, onInlineLayout],
  );
}
