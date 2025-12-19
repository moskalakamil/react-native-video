# Playback

Control video playback including play, pause, seeking, and playback rate.

## Autoplay

Start playback immediately when the player is created using the callback:

```tsx
const player = useVideoPlayer(source, (_player) => {
  _player.play();
});
```

## play()

```ts
play(): void;
```

Start playback.

```tsx
// On button press
<Button title="Play" onPress={() => player.play()} />
```

## pause()

```ts
pause(): void;
```

Pause playback.

```tsx
<Button title="Pause" onPress={() => player.pause()} />
```

## isPlaying

```ts
get isPlaying(): boolean;
```

Whether the player is currently playing. Read-only.

```tsx
// Toggle play/pause
<Button 
  title={player.isPlaying ? 'Pause' : 'Play'} 
  onPress={() => player.isPlaying ? player.pause() : player.play()} 
/>
```

## Playback Speed

### rate

```ts
get rate(): number;
set rate(value: number): void;
```

Playback speed. Default is `1.0`.

| Value | Speed |
|-------|-------|
| `0.5` | Half speed |
| `1.0` | Normal |
| `2.0` | Double speed |

**Set on creation:**
```tsx
const player = useVideoPlayer(source, (_player) => {
  _player.rate = 1.5;
});
```

**Change dynamically:**
```tsx
<Button title="2x" onPress={() => player.rate = 2.0} />
```

:::note
Setting rate to `0` will pause the video.
:::

### loop

```ts
get loop(): boolean;
set loop(value: boolean): void;
```

Whether the video restarts when it ends.

**Set on creation:**
```tsx
const player = useVideoPlayer(source, (_player) => {
  _player.loop = true;
});
```

**Toggle dynamically:**
```tsx
<Button 
  title={`Loop: ${player.loop ? 'ON' : 'OFF'}`} 
  onPress={() => player.loop = !player.loop} 
/>
```

## Seeking

### seekTo()

```ts
seekTo(time: number): void;
```

Seek to a specific time in seconds.

```tsx
// Jump to 30 seconds
player.seekTo(30);

// Jump to 2 minutes
player.seekTo(120);
```

### seekBy()

```ts
seekBy(time: number): void;
```

Seek forward or backward by seconds. Negative values seek backward.

```tsx
// Skip controls
<Button title="-10s" onPress={() => player.seekBy(-10)} />
<Button title="+10s" onPress={() => player.seekBy(10)} />
```

:::note
Time is automatically clamped to valid range (0 to duration).
:::

## Time Properties

### currentTime

```ts
get currentTime(): number;
set currentTime(value: number): void;
```

Current playback position in seconds.

```tsx
// Get current time
console.log(player.currentTime);

// Set current time (same as seekTo)
player.currentTime = 60;
```

### duration

```ts
get duration(): number;
```

Total duration in seconds. Read-only.

```tsx
useEvent(player, 'onLoad', (data) => {
  console.log('Duration:', data.duration);
});
```

:::note
Returns `NaN` before `onLoad` event fires.
:::

## Complete Example

```tsx
import React, { useState } from 'react';
import { View, Button, Text, Slider } from 'react-native';
import { useVideoPlayer, useEvent, VideoView } from 'react-native-video';

function PlayerControls() {
  const player = useVideoPlayer(source, (_player) => {
    _player.play(); // Autoplay
    _player.loop = true;
  });

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEvent(player, 'onLoad', (data) => setDuration(data.duration));
  useEvent(player, 'onProgress', (data) => setCurrentTime(data.currentTime));

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <View>
      <VideoView player={player} style={{ width: '100%', height: 300 }} />
      
      <Slider
        value={currentTime}
        maximumValue={duration}
        onSlidingComplete={(v) => player.seekTo(v)}
      />
      
      <Text>{formatTime(currentTime)} / {formatTime(duration)}</Text>
      
      <View style={{ flexDirection: 'row' }}>
        <Button title="-10s" onPress={() => player.seekBy(-10)} />
        <Button 
          title={player.isPlaying ? 'Pause' : 'Play'} 
          onPress={() => player.isPlaying ? player.pause() : player.play()} 
        />
        <Button title="+10s" onPress={() => player.seekBy(10)} />
      </View>
      
      <View style={{ flexDirection: 'row' }}>
        {[0.5, 1, 1.5, 2].map(speed => (
          <Button key={speed} title={`${speed}x`} onPress={() => player.rate = speed} />
        ))}
      </View>
    </View>
  );
}
```
