import {type ReactNode, useCallback} from 'react';
import {Pressable, Text, StyleSheet, type ViewStyle} from 'react-native';
import {usePlayerContext} from '../player/PlayerContext';

interface CaptionsButtonRenderState {
  hasActiveCaptions: boolean;
  availableTracks: number;
}

interface CaptionsButtonRenderProps {
  onPress: () => void;
}

interface CaptionsButtonProps {
  render?: (
    props: CaptionsButtonRenderProps,
    state: CaptionsButtonRenderState,
  ) => ReactNode;
  style?: ViewStyle;
  children?: ReactNode;
}

export function CaptionsButton({render, style, children}: CaptionsButtonProps) {
  const {state, actions} = usePlayerContext();
  const hasActiveCaptions = state.selectedTextTrack !== null;
  const availableTracks = state.textTracks.length;

  const onPress = useCallback(() => {
    if (hasActiveCaptions) {
      actions.selectTextTrack(null);
    } else if (state.textTracks.length > 0) {
      actions.selectTextTrack(state.textTracks[0]!);
    }
  }, [hasActiveCaptions, state.textTracks, actions]);

  if (availableTracks === 0) return null;

  if (render) {
    return <>{render({onPress}, {hasActiveCaptions, availableTracks})}</>;
  }

  return (
    <Pressable onPress={onPress} style={[styles.button, style]}>
      {children ?? (
        <Text style={[styles.text, hasActiveCaptions && styles.active]}>
          CC
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {padding: 8, justifyContent: 'center', alignItems: 'center'},
  text: {fontSize: 14, fontWeight: '700', color: 'rgba(255, 255, 255, 0.5)'},
  active: {color: '#fff'},
});
