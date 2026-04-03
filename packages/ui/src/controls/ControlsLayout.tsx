import {type ReactNode} from 'react';
import {View, StyleSheet, type ViewStyle} from 'react-native';

interface LayoutProps {
  children: ReactNode;
  style?: ViewStyle;
}

export function ControlsTop({children, style}: LayoutProps) {
  return <View style={[styles.top, style]}>{children}</View>;
}

export function ControlsCenter({children, style}: LayoutProps) {
  return <View style={[styles.center, style]}>{children}</View>;
}

export function ControlsBottom({children, style}: LayoutProps) {
  return <View style={[styles.bottom, style]}>{children}</View>;
}

export function ControlsLeft({children, style}: LayoutProps) {
  return <View style={[styles.left, style]}>{children}</View>;
}

export function ControlsRight({children, style}: LayoutProps) {
  return <View style={[styles.right, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  top: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingTop: 10,
  },
  center: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 32,
    pointerEvents: 'box-none',
  },
  bottom: {
    // Column: chapter title, bar, speed menu stacked vertically
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});
