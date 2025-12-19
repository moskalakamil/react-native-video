---
sidebar_label: Loading
---

# Loading Events

Events for video loading and initialization.

## onLoadStart

```ts
onLoadStart: (data: onLoadStartData) => void;
```

Fired when video starts loading.

```tsx
useEvent(player, 'onLoadStart', (data) => {
  console.log('Loading:', data.uri);
  setLoading(true);
});
```

## onLoad

```ts
onLoad: (data: onLoadData) => void;
```

Fired when video is loaded and ready to play.

```tsx
useEvent(player, 'onLoad', (data) => {
  console.log('Duration:', data.duration);
  console.log('Size:', data.naturalSize.width, 'x', data.naturalSize.height);
  setLoading(false);
});
```

### onLoadData

| Property | Type | Description |
|----------|------|-------------|
| `duration` | `number` | Duration in seconds |
| `currentTime` | `number` | Current position |
| `naturalSize` | `{ width, height }` | Video dimensions |
| `audioTracks` | `AudioTrack[]` | Available audio tracks |
| `textTracks` | `TextTrack[]` | Available text tracks |

## onReadyToDisplay

```ts
onReadyToDisplay: () => void;
```

Fired when first frame is ready to render.

```tsx
useEvent(player, 'onReadyToDisplay', () => {
  console.log('First frame ready');
  hidePosterImage();
});
```

## Example

```tsx
function LoadingPlayer() {
  const [loading, setLoading] = useState(true);
  const [duration, setDuration] = useState(0);

  const player = useVideoPlayer(source, (_player) => {
    _player.play();
  });

  useEvent(player, 'onLoadStart', () => setLoading(true));
  
  useEvent(player, 'onLoad', (data) => {
    setLoading(false);
    setDuration(data.duration);
  });

  return (
    <View>
      <VideoView player={player} style={{ width: '100%', height: 300 }} />
      {loading && <ActivityIndicator />}
      <Text>Duration: {duration}s</Text>
    </View>
  );
}
```
