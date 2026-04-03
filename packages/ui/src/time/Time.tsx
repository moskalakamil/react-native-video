import {type ReactNode} from 'react';
import {View, Text, StyleSheet, type ViewStyle, type TextStyle} from 'react-native';
import {usePlayerContext} from '../player/PlayerContext';
import {useCurrentTime} from '../hooks/useCurrentTime';

function formatTime(totalSeconds: number): string {
  if (isNaN(totalSeconds) || totalSeconds < 0) return '0:00';
  const hours = Math.floor(totalSeconds / 3600);
  const mins = Math.floor((totalSeconds % 3600) / 60);
  const secs = Math.floor(totalSeconds % 60);
  if (hours > 0) {
    return `${hours}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function TimeGroup({children, style}: {children: ReactNode; style?: ViewStyle}) {
  return <View style={[styles.group, style]}>{children}</View>;
}

interface TimeValueProps {
  type: 'current' | 'duration' | 'remaining';
  style?: TextStyle;
  render?: (props: object, state: {formattedTime: string; seconds: number}) => ReactNode;
}

function TimeValue({type, style, render}: TimeValueProps) {
  const {state} = usePlayerContext();
  const currentTime = useCurrentTime(state.currentTime);
  const seekPreview = useCurrentTime(state.seekPreviewTime);

  const effectiveTime = seekPreview >= 0 ? seekPreview : currentTime;

  let seconds: number;
  if (type === 'current') {
    seconds = effectiveTime;
  } else if (type === 'remaining') {
    seconds = state.duration - effectiveTime;
  } else {
    seconds = state.duration;
  }

  const formatted = type === 'remaining' ? `-${formatTime(seconds)}` : formatTime(seconds);

  if (render) {
    return <>{render({}, {formattedTime: formatted, seconds})}</>;
  }

  return <Text style={[styles.text, style]}>{formatted}</Text>;
}

function TimeSeparator({children, style}: {children?: ReactNode; style?: TextStyle}) {
  return <Text style={[styles.separator, style]}>{children ?? '/'}</Text>;
}

export const Time = {
  Group: TimeGroup,
  Value: TimeValue,
  Separator: TimeSeparator,
};

const styles = StyleSheet.create({
  group: {flexDirection: 'row', alignItems: 'center', gap: 4},
  text: {fontSize: 12, color: '#fff', fontVariant: ['tabular-nums']},
  separator: {fontSize: 12, color: 'rgba(255, 255, 255, 0.7)'},
});
