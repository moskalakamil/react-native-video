# Props

All available props for the `VideoView` component.

## player

```ts
player: VideoPlayer;
```

The player instance that controls video playback. Create it using `useVideoPlayer`.

```tsx
const player = useVideoPlayer(source);

return <VideoView player={player} />;
```

## style

```ts
optional style: ViewStyle;
```

Standard React Native view style. Use it to set dimensions, positioning, and other layout properties.

```tsx
<VideoView 
  player={player} 
  style={{ width: '100%', aspectRatio: 16/9 }} 
/>
```

## controls

```ts
optional controls: boolean;
```

Whether to show native video controls. Defaults to `false`.

```tsx
<VideoView player={player} controls />
```

:::tip
For custom controls, use the [UI components](../ui/getting-started.md) instead.
:::

## resizeMode

```ts
optional resizeMode: ResizeMode;
```

How the video should be resized to fit the view. Defaults to `'none'`.

```tsx
<VideoView player={player} resizeMode="cover" />
```

### ResizeMode

```ts
type ResizeMode = 'contain' | 'cover' | 'stretch' | 'none';
```

| Value | Description |
|-------|-------------|
| `'contain'` | Scale uniformly to fit entirely within the view (letterboxing) |
| `'cover'` | Scale uniformly to fill the view (may crop) |
| `'stretch'` | Stretch to fill the view (may distort) |
| `'none'` | No resizing, uses default behavior (contain) |

## keepScreenAwake

```ts
optional keepScreenAwake: boolean;
```

Whether to keep the screen awake while the video view is mounted. Defaults to `true`.

```tsx
<VideoView player={player} keepScreenAwake={false} />
```

## surfaceType

```ts
optional surfaceType: SurfaceType;
```

The type of underlying native view. **Android only.** Defaults to `'surface'`.

```tsx
<VideoView player={player} surfaceType="texture" />
```

### SurfaceType

```ts
type SurfaceType = 'surface' | 'texture';
```

| Value | Description |
|-------|-------------|
| `'surface'` | Uses SurfaceView. More performant, but cannot be animated or transformed |
| `'texture'` | Uses TextureView. Less performant, but can be animated and transformed |

:::note
Use `'texture'` when you need to apply animations or transforms to the video view (e.g., rotation, scale).
:::

## Complete Example

```tsx
import { useVideoPlayer, VideoView } from 'react-native-video';

function VideoPlayer({ source }) {
  const player = useVideoPlayer(source, (_player) => {
    _player.play();
  });

  return (
    <VideoView
      player={player}
      style={{ width: '100%', aspectRatio: 16/9 }}
      controls
      resizeMode="contain"
      keepScreenAwake
    />
  );
}
```

## See Also

- [Getting Started](./getting-started.md) - VideoView basics
- [Fullscreen](./fullscreen.md) - Fullscreen mode
- [Picture in Picture](./picture-in-picture.md) - PiP mode

