---
sidebar_label: Playback
---

# Playback Events

Events for playback state and progress.

## onPlaybackStateChange

```ts
onPlaybackStateChange: (data: onPlaybackStateChangeData) => void;
```

Fired when playback state changes.

```tsx
useEvent(player, 'onPlaybackStateChange', (data) => {
  console.log('Playing:', data.isPlaying);
  console.log('Buffering:', data.isBuffering);
});
```

### onPlaybackStateChangeData

| Property | Type | Description |
|----------|------|-------------|
| `isPlaying` | `boolean` | Currently playing |
| `isBuffering` | `boolean` | Currently buffering |

## onPlaybackRateChange

```ts
onPlaybackRateChange: (rate: number) => void;
```

Fired when playback speed changes.

```tsx
useEvent(player, 'onPlaybackRateChange', (rate) => {
  console.log('Speed:', rate);
});
```

## onProgress

```ts
onProgress: (data: onProgressData) => void;
```

Fired periodically during playback.

```tsx
useEvent(player, 'onProgress', (data) => {
  setCurrentTime(data.currentTime);
  setPlayableDuration(data.playableDuration);
});
```

### onProgressData

| Property | Type | Description |
|----------|------|-------------|
| `currentTime` | `number` | Current position (seconds) |
| `playableDuration` | `number` | Buffered duration |
| `seekableDuration` | `number` | Seekable duration |

## onSeek

```ts
onSeek: (seekTime: number) => void;
```

Fired when seek completes.

```tsx
useEvent(player, 'onSeek', (time) => {
  console.log('Seeked to:', time);
});
```

## onEnd

```ts
onEnd: () => void;
```

Fired when video reaches the end.

```tsx
useEvent(player, 'onEnd', () => {
  console.log('Video ended');
  // Auto-play next or show replay
});
```

## Example

```tsx
function ProgressPlayer() {
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const player = useVideoPlayer(source, (_player) => {
    _player.play();
  });

  useEvent(player, 'onProgress', (data) => {
    setCurrentTime(data.currentTime);
  });

  useEvent(player, 'onPlaybackStateChange', (data) => {
    setIsPlaying(data.isPlaying);
  });

  useEvent(player, 'onEnd', () => {
    // Replay
    player.seekTo(0);
    player.play();
  });

  return (
    <View>
      <VideoView player={player} style={{ width: '100%', height: 300 }} />
      <Text>{isPlaying ? 'Playing' : 'Paused'}</Text>
      <Text>{Math.floor(currentTime)}s</Text>
    </View>
  );
}
```
