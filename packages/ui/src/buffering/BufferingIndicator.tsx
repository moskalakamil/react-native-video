import {type ReactNode} from 'react';
import {ActivityIndicator, StyleSheet, type ViewStyle} from 'react-native';
import {usePlayerContext} from '../player/PlayerContext';

interface BufferingIndicatorRenderProps {
  isBuffering: boolean;
}

interface BufferingIndicatorProps {
  render?: (
    props: object,
    state: BufferingIndicatorRenderProps,
  ) => ReactNode;
  style?: ViewStyle;
  children?: ReactNode;
}

export function BufferingIndicator({
  render,
  style,
  children,
}: BufferingIndicatorProps) {
  const {state} = usePlayerContext();
  if (!state.isBuffering) return null;

  if (render) {
    return <>{render({}, {isBuffering: state.isBuffering})}</>;
  }

  return (
    children ?? (
      <ActivityIndicator
        style={[styles.indicator, style]}
        color="#fff"
        size="large"
      />
    )
  );
}

const styles = StyleSheet.create({
  indicator: {position: 'absolute', alignSelf: 'center'},
});
