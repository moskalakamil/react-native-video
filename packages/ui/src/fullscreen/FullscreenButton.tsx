import {type ReactNode, useCallback} from 'react';
import {Pressable, Text, StyleSheet, type ViewStyle} from 'react-native';
import {usePlayerContext} from '../player/PlayerContext';
import {useFullscreen} from './FullscreenContext';

interface FullscreenButtonRenderState {
  isFullscreen: boolean;
}

interface FullscreenButtonRenderProps {
  onPress: () => void;
}

interface FullscreenButtonProps {
  render?: (
    props: FullscreenButtonRenderProps,
    state: FullscreenButtonRenderState,
  ) => ReactNode;
  style?: ViewStyle;
  children?: ReactNode;
}

export function FullscreenButton({
  render,
  style,
  children,
}: FullscreenButtonProps) {
  const {state, actions} = usePlayerContext();
  const customFullscreen = useFullscreen();

  const isFullscreen =
    customFullscreen?.isCustomFullscreen ?? state.isFullscreen;

  const onPress = useCallback(() => {
    if (customFullscreen) {
      customFullscreen.toggleFullscreen();
    } else if (state.isFullscreen) {
      actions.exitFullscreen();
    } else {
      actions.enterFullscreen();
    }
  }, [customFullscreen, state.isFullscreen, actions]);

  if (render) {
    return <>{render({onPress}, {isFullscreen})}</>;
  }

  return (
    <Pressable onPress={onPress} style={[styles.button, style]}>
      {children ?? (
        <Text style={styles.text}>{isFullscreen ? '\u2291' : '\u229E'}</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {padding: 8, justifyContent: 'center', alignItems: 'center'},
  text: {fontSize: 20, color: '#fff'},
});
