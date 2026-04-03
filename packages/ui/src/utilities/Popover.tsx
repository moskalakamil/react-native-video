import {type ReactNode, useMemo, createContext, use} from 'react';
import {View, Pressable, StyleSheet, type ViewStyle, type LayoutRectangle, Modal} from 'react-native';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';
import {usePopoverState} from './hooks/usePopoverState';

interface PopoverContextValue {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  triggerRef: React.RefObject<View | null>;
  triggerLayout: LayoutRectangle | null;
  side: 'top' | 'bottom';
}

const PopoverContext = createContext<PopoverContextValue | null>(null);

function usePopover(): PopoverContextValue {
  const ctx = use(PopoverContext);
  if (!ctx) throw new Error('Popover sub-components must be inside Popover.Root');
  return ctx;
}

function PopoverRoot({children, side = 'top'}: {children: ReactNode; side?: 'top' | 'bottom'}) {
  const popoverState = usePopoverState();

  const contextValue = useMemo(
    () => ({...popoverState, side}),
    [popoverState, side],
  );

  return <PopoverContext value={contextValue}>{children}</PopoverContext>;
}

function PopoverTrigger({render, children}: {render?: ReactNode; children?: ReactNode}) {
  const {open, triggerRef} = usePopover();
  return (
    <Pressable onPress={open} ref={triggerRef}>
      {render ?? children}
    </Pressable>
  );
}

function PopoverContent({children, style}: {children?: ReactNode; style?: ViewStyle}) {
  const {isOpen, close, triggerLayout, side} = usePopover();
  if (!isOpen || !triggerLayout) return null;

  const top = side === 'top'
    ? triggerLayout.y - 8
    : triggerLayout.y + triggerLayout.height + 8;

  return (
    <Modal transparent visible onRequestClose={close}>
      <Pressable style={StyleSheet.absoluteFill} onPress={close}>
        <Animated.View
          entering={FadeIn.duration(150)}
          exiting={FadeOut.duration(100)}
          style={[popoverStyles.content, style, {position: 'absolute', top, left: triggerLayout.x}]}>
          <Pressable>{children}</Pressable>
        </Animated.View>
      </Pressable>
    </Modal>
  );
}

function PopoverArrow({style}: {style?: ViewStyle}) {
  return <View style={[popoverStyles.arrow, style]} />;
}

export const Popover = {
  Root: PopoverRoot,
  Trigger: PopoverTrigger,
  Content: PopoverContent,
  Arrow: PopoverArrow,
};

const popoverStyles = StyleSheet.create({
  content: {backgroundColor: 'rgba(0, 0, 0, 0.9)', borderRadius: 8, padding: 8, minWidth: 120},
  arrow: {width: 12, height: 6, backgroundColor: 'rgba(0, 0, 0, 0.9)', alignSelf: 'center'},
});
