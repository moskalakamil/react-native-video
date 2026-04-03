import {type ReactNode, useCallback, useMemo} from 'react';
import {Pressable, Text, StyleSheet, type ViewStyle} from 'react-native';
import {usePlayerContext} from '../player/PlayerContext';

const DEFAULT_RATES = [0.5, 1, 1.25, 1.5, 2];

interface PlaybackRateButtonRenderState {
  rate: number;
  rates: number[];
}

interface PlaybackRateButtonRenderProps {
  onPress: () => void;
}

interface PlaybackRateButtonProps {
  rates?: number[];
  render?: (
    props: PlaybackRateButtonRenderProps,
    state: PlaybackRateButtonRenderState,
  ) => ReactNode;
  style?: ViewStyle;
  children?: ReactNode;
}

export function PlaybackRateButton({
  rates = DEFAULT_RATES,
  render,
  style,
  children,
}: PlaybackRateButtonProps) {
  const {state, actions} = usePlayerContext();
  const sortedRates = useMemo(() => [...rates].sort((a, b) => a - b), [rates]);

  const onPress = useCallback(() => {
    const currentIndex = sortedRates.indexOf(state.rate);
    const nextIndex = (currentIndex + 1) % sortedRates.length;
    actions.setRate(sortedRates[nextIndex]!);
  }, [state.rate, sortedRates, actions]);

  if (render) {
    return <>{render({onPress}, {rate: state.rate, rates: sortedRates})}</>;
  }

  return (
    <Pressable onPress={onPress} style={[styles.button, style]}>
      {children ?? <Text style={styles.text}>{state.rate}x</Text>}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {padding: 8, justifyContent: 'center', alignItems: 'center'},
  text: {fontSize: 14, fontWeight: '600', color: '#fff'},
});
