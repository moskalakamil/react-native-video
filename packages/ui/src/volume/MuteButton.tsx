import {type ReactNode, useCallback} from 'react';
import {Pressable, Text, StyleSheet, type ViewStyle} from 'react-native';
import {usePlayerContext} from '../player/PlayerContext';
import type {VolumeLevel} from '../types';

interface MuteButtonRenderState {
  muted: boolean;
  volumeLevel: VolumeLevel;
  volume: number;
}

interface MuteButtonRenderProps {
  onPress: () => void;
}

interface MuteButtonProps {
  render?: (
    props: MuteButtonRenderProps,
    state: MuteButtonRenderState,
  ) => ReactNode;
  style?: ViewStyle;
  children?: ReactNode;
}

function getVolumeLevel(volume: number, muted: boolean): VolumeLevel {
  if (muted || volume === 0) return 'off';
  if (volume < 0.5) return 'low';
  return 'high';
}

export function MuteButton({render, style, children}: MuteButtonProps) {
  const {state, actions} = usePlayerContext();
  const volumeLevel = getVolumeLevel(state.volume, state.muted);

  const onPress = useCallback(() => {
    actions.toggleMuted();
  }, [actions]);

  if (render) {
    return (
      <>
        {render(
          {onPress},
          {muted: state.muted, volumeLevel, volume: state.volume},
        )}
      </>
    );
  }

  return (
    <Pressable onPress={onPress} style={[styles.button, style]}>
      {children ?? (
        <Text style={styles.text}>
          {volumeLevel === 'off'
            ? '🔇'
            : volumeLevel === 'low'
              ? '🔉'
              : '🔊'}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {padding: 8, justifyContent: 'center', alignItems: 'center'},
  text: {fontSize: 20, color: '#fff'},
});
