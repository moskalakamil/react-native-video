import {type ReactNode, useRef, useCallback, createContext, use} from 'react';
import {View, Pressable, StyleSheet, type ViewStyle, type LayoutChangeEvent} from 'react-native';
import Animated, {useSharedValue, useAnimatedStyle, withTiming, type SharedValue} from 'react-native-reanimated';

// Lazy import — @react-native-community/blur is optional
type BlurViewType = typeof import('@react-native-community/blur')['BlurView'];
let BlurView: BlurViewType | null = null;

try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  BlurView = require('@react-native-community/blur').BlurView;
} catch {
  // Fallback to semi-transparent background
}

const PRESS_DURATION = 120;

// Context — children can highlight the entire GlassSurface
const GlassHighlightContext = createContext<SharedValue<boolean> | null>(null);

export function useGlassHighlight(): SharedValue<boolean> | null {
  return use(GlassHighlightContext);
}

interface GlassSurfaceProps {
  children: ReactNode;
  style?: ViewStyle;
  contentStyle?: ViewStyle;
  blurAmount?: number;
  /** Enables scale+brightness animation. Children can trigger via useGlassHighlight(). */
  animated?: boolean;
  /** Self-managed press — wraps in Pressable, highlight on press */
  pressable?: boolean;
  onPress?: () => void;
}

export function GlassSurface({
  children,
  style,
  contentStyle,
  blurAmount = 20,
  animated = false,
  pressable = false,
  onPress,
}: GlassSurfaceProps) {
  const highlight = useSharedValue(false);
  const measuredHeight = useRef(28);
  const isAnimated = animated || pressable;

  const handleLayout = useCallback((e: LayoutChangeEvent) => {
    measuredHeight.current = e.nativeEvent.layout.height;
  }, []);

  // Scale proportional to size: small elements scale more
  const scaleAnimStyle = useAnimatedStyle(() => {
    if (!isAnimated) return {};
    const h = measuredHeight.current;
    const scaleFactor = Math.min(Math.max(1 + 0.08 * (28 / h), 1.02), 1.08);
    return {
      transform: [{scale: withTiming(highlight.value ? scaleFactor : 1, {duration: PRESS_DURATION})}],
    };
  });

  // Brightness overlay
  const brightnessStyle = useAnimatedStyle(() => {
    if (!isAnimated) return {opacity: 0};
    return {opacity: withTiming(highlight.value ? 1 : 0, {duration: PRESS_DURATION})};
  });

  const content = (
    <>
      <View style={[styles.content, contentStyle]}>{children}</View>
      {isAnimated && (
        <Animated.View style={[styles.brightnessOverlay, brightnessStyle]} pointerEvents="none" />
      )}
    </>
  );

  const renderInner = () => {
    if (BlurView) {
      return (
        <View style={[styles.glass, style]}>
          <BlurView
            blurType="dark"
            blurAmount={blurAmount}
            style={StyleSheet.absoluteFillObject}
          />
          {content}
        </View>
      );
    }

    return (
      <View style={[styles.fallback, style]}>
        {content}
      </View>
    );
  };

  const renderWithAnimation = (inner: ReactNode) => {
    if (!isAnimated) return inner;
    return (
      <Animated.View style={scaleAnimStyle} onLayout={handleLayout}>
        {inner}
      </Animated.View>
    );
  };

  const renderWithContext = (inner: ReactNode) => {
    if (!isAnimated) return inner;
    return (
      <GlassHighlightContext value={highlight}>
        {inner}
      </GlassHighlightContext>
    );
  };

  if (pressable) {
    return renderWithContext(
      <Pressable
        onPress={onPress}
        onPressIn={() => { highlight.value = true; }}
        onPressOut={() => { highlight.value = false; }}
      >
        {renderWithAnimation(renderInner())}
      </Pressable>
    );
  }

  return renderWithContext(
    renderWithAnimation(renderInner())
  );
}

const styles = StyleSheet.create({
  glass: {
    overflow: 'hidden',
    borderRadius: 16,
  },
  fallback: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    borderRadius: 16,
    overflow: 'hidden',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 4,
    gap: 2,
  },
  brightnessOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 16,
  },
});
