import { type ReactNode, useCallback } from 'react';
import { Pressable, Text, StyleSheet, type ViewStyle } from 'react-native';
import { usePlayerContext } from '../player/PlayerContext';

interface SeekButtonRenderState {
  seconds: number;
}

interface SeekButtonRenderProps {
  onPress: () => void;
}

interface SeekButtonProps {
  seconds: number;
  render?: (props: SeekButtonRenderProps, state: SeekButtonRenderState) => ReactNode;
  style?: ViewStyle;
  children?: ReactNode;
}

export function SeekButton({ seconds, render, style, children }: SeekButtonProps) {
  const { actions } = usePlayerContext();

  const onPress = useCallback(() => {
    actions.seekBy(seconds);
  }, [actions, seconds]);

  if (render) {
    return <>{render({ onPress }, { seconds })}</>;
  }

  return (
    <Pressable onPress={onPress} style={[styles.button, style]}>
      {children ?? (
        <Text style={styles.text}>
          {seconds < 0 ? `\u23EA${Math.abs(seconds)}` : `${seconds}\u23E9`}
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
    fontSize: 14,
    color: '#fff',
  },
});
