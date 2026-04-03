import { type ReactNode, useCallback } from 'react';
import { Pressable, Text, StyleSheet, type ViewStyle } from 'react-native';
import { usePlayerContext } from '../player/PlayerContext';

interface PlayButtonRenderState {
  isPlaying: boolean;
  ended: boolean;
}

interface PlayButtonRenderProps {
  onPress: () => void;
}

interface PlayButtonProps {
  render?: (props: PlayButtonRenderProps, state: PlayButtonRenderState) => ReactNode;
  style?: ViewStyle;
  children?: ReactNode;
}

export function PlayButton({ render, style, children }: PlayButtonProps) {
  const { state, actions } = usePlayerContext();
  const ended = state.status === 'idle' && !state.isPlaying;

  const onPress = useCallback(() => {
    actions.togglePlayback();
  }, [actions]);

  if (render) {
    return <>{render({ onPress }, { isPlaying: state.isPlaying, ended })}</>;
  }

  return (
    <Pressable onPress={onPress} style={[styles.button, style]}>
      {children ?? (
        <Text style={styles.text}>
          {ended ? '\u21BA' : state.isPlaying ? '\u23F8' : '\u25B6'}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    color: '#fff',
  },
});
