import {type ReactNode} from 'react';
import {Pressable, StyleSheet, type ViewStyle, Modal} from 'react-native';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';

interface OverlayRootProps {
  children: ReactNode;
  visible?: boolean;
  onClose?: () => void;
}

function OverlayRoot({children, visible = false, onClose}: OverlayRootProps) {
  if (!visible) return null;
  return (
    <Modal transparent visible onRequestClose={onClose}>
      {children}
    </Modal>
  );
}

function OverlayBackdrop({onPress, style}: {onPress?: () => void; style?: ViewStyle}) {
  return (
    <Animated.View entering={FadeIn.duration(200)} exiting={FadeOut.duration(150)}>
      <Pressable style={[overlayStyles.backdrop, style]} onPress={onPress} />
    </Animated.View>
  );
}

function OverlayContent({children, style}: {children?: ReactNode; style?: ViewStyle}) {
  return (
    <Animated.View
      entering={FadeIn.duration(200)}
      exiting={FadeOut.duration(150)}
      style={[overlayStyles.content, style]}>
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      {children as any}
    </Animated.View>
  );
}

export const Overlay = {
  Root: OverlayRoot,
  Backdrop: OverlayBackdrop,
  Content: OverlayContent,
};

const overlayStyles = StyleSheet.create({
  backdrop: {...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0, 0, 0, 0.5)'},
  content: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});
