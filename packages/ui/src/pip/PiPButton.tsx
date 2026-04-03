import {type ReactNode, useCallback} from 'react';
import {Pressable, Text, StyleSheet, type ViewStyle} from 'react-native';
import {usePlayerContext} from '../player/PlayerContext';

interface PiPButtonRenderState {
  isPiP: boolean;
}

interface PiPButtonRenderProps {
  onPress: () => void;
}

interface PiPButtonProps {
  render?: (
    props: PiPButtonRenderProps,
    state: PiPButtonRenderState,
  ) => ReactNode;
  style?: ViewStyle;
  children?: ReactNode;
}

export function PiPButton({render, style, children}: PiPButtonProps) {
  const {state, actions} = usePlayerContext();

  const onPress = useCallback(() => {
    if (state.isPiP) {
      actions.exitPiP();
    } else {
      actions.enterPiP();
    }
  }, [state.isPiP, actions]);

  if (render) {
    return <>{render({onPress}, {isPiP: state.isPiP})}</>;
  }

  return (
    <Pressable onPress={onPress} style={[styles.button, style]}>
      {children ?? <Text style={styles.text}>PiP</Text>}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {padding: 8, justifyContent: 'center', alignItems: 'center'},
  text: {fontSize: 14, fontWeight: '600', color: '#fff'},
});
