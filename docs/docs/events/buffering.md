---
sidebar_label: Buffering & Status
---

# Buffering & Status Events

Events for buffering, player status, and bandwidth.

## onBuffer

```ts
onBuffer: (buffering: boolean) => void;
```

Fired when buffering state changes.

```tsx
useEvent(player, 'onBuffer', (buffering) => {
  setIsBuffering(buffering);
});
```

## onStatusChange

```ts
onStatusChange: (status: VideoPlayerStatus) => void;
```

Fired when player status changes.

```tsx
useEvent(player, 'onStatusChange', (status) => {
  console.log('Status:', status);
  // 'idle' | 'loading' | 'ready' | 'playing' | 'paused' | 'buffering' | 'ended' | 'error'
});
```

## onBandwidthUpdate

```ts
onBandwidthUpdate: (data: BandwidthData) => void;
```

Fired when estimated bandwidth changes.

```tsx
useEvent(player, 'onBandwidthUpdate', (data) => {
  console.log('Bandwidth:', data.bitrate, 'bps');
});
```

## Example

```tsx
function BufferingPlayer() {
  const [status, setStatus] = useState('idle');
  const [buffering, setBuffering] = useState(false);

  const player = useVideoPlayer(source, (_player) => {
    _player.play();
  });

  useEvent(player, 'onStatusChange', setStatus);
  useEvent(player, 'onBuffer', setBuffering);

  return (
    <View>
      <VideoView player={player} style={{ width: '100%', height: 300 }} />
      {buffering && <ActivityIndicator />}
      <Text>Status: {status}</Text>
    </View>
  );
}
```
