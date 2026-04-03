import {
  type ReactNode,
  useState,
  useCallback,
  useEffect,
  createContext,
  use,
} from 'react';
import {View, Pressable, StyleSheet, type ViewStyle} from 'react-native';
import {useControlsContext} from './ControlsContext';

export interface PopupContextValue {
  isOpen: boolean;
  toggle: () => void;
  close: () => void;
}

const PopupContext = createContext<PopupContextValue | null>(null);

function usePopup(): PopupContextValue {
  const ctx = use(PopupContext);
  if (!ctx) throw new Error('Controls.Popup components must be inside Controls.Popup.Root');
  return ctx;
}

export interface PopupRootProps {
  children: ReactNode;
}

function PopupRoot({children}: PopupRootProps) {
  const [isOpen, setIsOpen] = useState(false);
  const controls = useControlsContext();

  const toggle = useCallback(() => setIsOpen((v) => !v), []);
  const close = useCallback(() => setIsOpen(false), []);

  // Notify Controls.Root about open/close
  useEffect(() => {
    if (isOpen) {
      controls?.lockAutoHide();
    } else {
      controls?.unlockAutoHide();
    }
  }, [isOpen, controls]);

  return (
    <PopupContext value={{isOpen, toggle, close}}>
      <View collapsable={false}>
        {children}
      </View>
    </PopupContext>
  );
}

export interface PopupTriggerProps {
  children: ReactNode;
}

function PopupTrigger({children}: PopupTriggerProps) {
  const {toggle} = usePopup();

  return (
    <Pressable onPress={toggle}>
      {children}
    </Pressable>
  );
}

export interface PopupContentProps {
  children: ReactNode;
  style?: ViewStyle;
}

function PopupContent({children, style}: PopupContentProps) {
  const {isOpen, close} = usePopup();

  if (!isOpen) return null;

  return (
    <>
      <Pressable style={styles.backdrop} onPress={close} />
      <View style={[styles.content, style]}>
        {children}
      </View>
    </>
  );
}

export const ControlsPopup = {
  Root: PopupRoot,
  Trigger: PopupTrigger,
  Content: PopupContent,
  usePopup,
};

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
  },
  content: {
    position: 'absolute',
    bottom: '100%',
    right: 0,
    marginBottom: 4,
    zIndex: 2,
  },
});
