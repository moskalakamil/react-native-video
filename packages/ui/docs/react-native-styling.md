# React Native Styling Reference

How React Native layout works and where it differs from web CSS. Written for developers (and agents) coming from web backgrounds working on `@react-native-video/ui`.

## Flexbox Defaults

RN uses Yoga layout engine, not browser CSS. Key default differences:

| Property | React Native | Web CSS |
|---|---|---|
| `flexDirection` | `'column'` | `row` |
| `alignContent` | `'flex-start'` | `stretch` |
| `flexShrink` | `0` | `1` |
| `flex` | Single number only | Shorthand string (`1 1 0%`) |
| `display` | Only `'flex'`, `'none'`, `'contents'` | Full CSS display values |
| `position` | Default `'relative'` on ALL elements | Default `static` |

**`flex: 1`** in RN equals `flexGrow: 1, flexShrink: 1, flexBasis: 0`.

## Position: Absolute

```tsx
// Takes element OUT of normal flow — siblings ignore it
<View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} />

// Shorthand (spreadable for overrides):
<View style={{ ...StyleSheet.absoluteFillObject }} />

// Frozen style (not spreadable, use directly):
<View style={StyleSheet.absoluteFill} />
```

**Containing block**: Since RN defaults ALL elements to `position: 'relative'`, every parent is a containing block. No need to explicitly set `relative` like in CSS.

## flex: 1 Inside Absolute Parents

`flex: 1` distributes **available space**. If the parent has 0 size, the child gets 0.

```tsx
// BROKEN — absolute parent with no dimensions = 0 size
<View style={{ position: 'absolute' }}>
  <View style={{ flex: 1 }} /> {/* gets 0 height */}
</View>

// WORKS — insets define the parent's size
<View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
  <View style={{ flex: 1 }} /> {/* fills parent */}
</View>

// WORKS — explicit dimensions
<View style={{ position: 'absolute', width: 300, height: 200 }}>
  <View style={{ flex: 1 }} /> {/* fills 300x200 */}
</View>
```

## Percentage Dimensions

- `width: '100%'` = 100% of parent's width
- `height: '100%'` = 100% of parent's height
- If parent has no computed size in that axis, percentage resolves to 0

Unlike CSS, percentage heights in RN work reliably against `flex: 1` parents — Yoga computes heights before resolving percentages.

## Overlay Pattern

The correct way to layer controls over video content:

```tsx
// Pattern: container with relative position, content + overlay as siblings
<View style={styles.container}>
  {/* Content — in normal flow, defines container size */}
  <Video style={styles.video} />

  {/* Overlay — absolute, fills container, does NOT affect flow */}
  <View style={StyleSheet.absoluteFill}>
    <Controls />
  </View>
</View>

const styles = StyleSheet.create({
  container: {
    // position: 'relative' is the DEFAULT — no need to set it
    // Container gets its size from Video (normal flow child)
  },
  video: {
    width: '100%',
    height: '100%',
  },
});
```

**Key rule**: The content that defines the container's dimensions must be in **normal flow** (not absolute). The overlay is absolute and gets its size from the container.

### Anti-pattern: Both content and overlay in normal flow

```tsx
// BROKEN — overlay is in flow, Video pushes it down
<View style={styles.container}>
  <Video style={{ width: '100%', height: '100%' }} />
  <View style={styles.controls}> {/* NOT absolute = pushed below Video */}
    <PlayButton />
  </View>
</View>
```

### Anti-pattern: Overlay absolute but missing insets

```tsx
// BROKEN — absolute but no insets = 0 size
<View style={styles.container}>
  <Video />
  <View style={{ position: 'absolute' }}>
    <View style={{ flex: 1 }}> {/* parent has 0 size, flex: 1 = 0 */}
      <PlayButton />
    </View>
  </View>
</View>
```

## Pressable as Layout Container

`Pressable` renders a `View` underneath. It behaves **identically** to `View` for layout:

```tsx
// These are layout-equivalent:
<View style={styles.overlay}>{children}</View>
<Pressable style={styles.overlay}>{children}</Pressable>
```

One difference: `Pressable` has `collapsable={false}` hardcoded, so Android never optimizes away its native view node.

## Stacking Order (z-index)

- Default: **render order** determines stacking (later siblings render on top)
- `zIndex` works but **only between siblings** (especially on iOS)
- No CSS stacking contexts that cross parent boundaries

```tsx
// Later sibling renders on top — no zIndex needed
<View style={styles.container}>
  <Video />           {/* bottom layer */}
  <GradientOverlay /> {/* middle layer */}
  <Controls />        {/* top layer */}
</View>
```

## Common Pitfalls

### No inline display
Every `View` is a flex container. No `display: block/inline/inline-block/grid`.

### flexShrink: 0 by default
Items overflow instead of shrinking. Add `flexShrink: 1` or use `flex: 1` (which sets shrink to 1).

### No style inheritance
Styles don't cascade. Exception: nested `<Text>` inherits font styles from parent `<Text>`.

### No shorthand properties
```tsx
// Web: margin: '10px 20px'
// RN:
{ marginVertical: 10, marginHorizontal: 20 }

// Web: border: '1px solid red'
// RN:
{ borderWidth: 1, borderColor: 'red' }
```

### Units are unitless dp
All numeric values are density-independent pixels. No `px`, `em`, `rem`, `vh`, `vw`.
Percentage strings (`'50%'`) work for some properties.

## Animated.View Considerations

`Animated.View` from Reanimated behaves like a regular `View` for layout. The animated style is merged with static styles:

```tsx
// Correct: static layout styles separate from animated styles
<Animated.View style={[styles.staticLayout, animatedStyle]}>

// Avoid: putting layout-critical styles in animatedStyle
// (they won't be available on first render)
```
