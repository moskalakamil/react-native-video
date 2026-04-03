import {useCallback, useMemo, useRef, useState} from 'react';
import {type View, type LayoutRectangle} from 'react-native';

interface UsePopoverStateReturn {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  triggerRef: React.RefObject<View | null>;
  triggerLayout: LayoutRectangle | null;
}

export function usePopoverState(): UsePopoverStateReturn {
  const [isOpen, setIsOpen] = useState(false);
  const [triggerLayout, setTriggerLayout] = useState<LayoutRectangle | null>(null);
  const triggerRef = useRef<View>(null);

  const open = useCallback(() => {
    triggerRef.current?.measure((_x, _y, width, height, pageX, pageY) => {
      setTriggerLayout({x: pageX, y: pageY, width, height});
      setIsOpen(true);
    });
  }, []);

  const close = useCallback(() => setIsOpen(false), []);

  return useMemo(
    () => ({isOpen, open, close, triggerRef, triggerLayout}),
    [isOpen, open, close, triggerLayout],
  );
}
