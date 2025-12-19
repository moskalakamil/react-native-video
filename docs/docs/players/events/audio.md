---
sidebar_label: Audio
---

# Audio Events

Events for audio state changes.

## onVolumeChange

```ts
onVolumeChange: (data: onVolumeChangeData) => void;
```

Fired when volume changes.

```tsx
useEvent(player, 'onVolumeChange', (data) => {
  console.log('Volume:', data.volume);
  console.log('Muted:', data.muted);
});
```

### onVolumeChangeData

| Property | Type | Description |
|----------|------|-------------|
| `volume` | `number` | Volume level (0.0 - 1.0) |
| `muted` | `boolean` | Is muted |

## onAudioBecomingNoisy

```ts
onAudioBecomingNoisy: () => void;
```

Fired when headphones are unplugged. Typically used to pause playback.

```tsx
useEvent(player, 'onAudioBecomingNoisy', () => {
  player.pause();
});
```

## onAudioFocusChange

```ts
onAudioFocusChange: (hasAudioFocus: boolean) => void;
```

Fired when audio focus changes (another app playing audio).

```tsx
useEvent(player, 'onAudioFocusChange', (hasFocus) => {
  if (!hasFocus) player.pause();
});
```

## Example

```tsx
function AudioAwarePlayer() {
  const player = useVideoPlayer(source, (_player) => {
    _player.play();
  });

  // Pause when headphones unplugged
  useEvent(player, 'onAudioBecomingNoisy', () => {
    player.pause();
  });

  // Pause when another app takes audio focus
  useEvent(player, 'onAudioFocusChange', (hasFocus) => {
    if (!hasFocus) player.pause();
  });

  return <VideoView player={player} style={{ width: '100%', height: 300 }} />;
}
```
