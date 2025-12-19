# Audio

Control audio volume, muting, and audio mixing behavior.

## Volume

### volume

```ts
get volume(): number;
set volume(value: number): void;
```

Volume level from `0.0` (silent) to `1.0` (full).

**Set on creation:**
```tsx
const player = useVideoPlayer(source, (_player) => {
  _player.volume = 0.5; // 50%
});
```

**Change dynamically:**
```tsx
<Slider
  value={player.volume}
  onValueChange={(v) => player.volume = v}
/>
```

:::note
If the player is muted, effective volume is `0.0` regardless of this property.
:::

### muted

```ts
get muted(): boolean;
set muted(value: boolean): void;
```

Whether audio is muted.

**Set on creation:**
```tsx
const player = useVideoPlayer(source, (_player) => {
  _player.muted = true;
});
```

**Toggle dynamically:**
```tsx
<Button 
  title={player.muted ? '🔇' : '🔊'} 
  onPress={() => player.muted = !player.muted} 
/>
```

## Audio Mixing

### mixAudioMode

```ts
get mixAudioMode(): MixAudioMode;
set mixAudioMode(value: MixAudioMode): void;
```

Controls how audio interacts with other apps.

| Value | Description |
|-------|-------------|
| `'auto'` | Platform default (default) |
| `'mixWithOthers'` | Play alongside other apps |
| `'doNotMix'` | Stop other audio |
| `'duckOthers'` | Lower other audio volume |

**Set on creation:**
```tsx
const player = useVideoPlayer(source, (_player) => {
  _player.mixAudioMode = 'mixWithOthers';
});
```

**Use cases:**
- `'mixWithOthers'` - Social media videos that shouldn't interrupt music
- `'duckOthers'` - Navigation audio
- `'doNotMix'` - Full-screen video player

### ignoreSilentSwitchMode

```ts
get ignoreSilentSwitchMode(): IgnoreSilentSwitchMode;
set ignoreSilentSwitchMode(value: IgnoreSilentSwitchMode): void;
```

**iOS only.** Controls behavior when hardware mute switch is on.

| Value | Description |
|-------|-------------|
| `'auto'` | Platform default (default) |
| `'ignore'` | Play audio even when muted |
| `'obey'` | Respect silent switch |

```tsx
const player = useVideoPlayer(source, (_player) => {
  _player.ignoreSilentSwitchMode = 'ignore'; // Music app
});
```

---

## Types

### MixAudioMode

```ts
type MixAudioMode = 'mixWithOthers' | 'doNotMix' | 'duckOthers' | 'auto';
```

### IgnoreSilentSwitchMode

```ts
type IgnoreSilentSwitchMode = 'auto' | 'ignore' | 'obey';
```

---

## Events

### onVolumeChange

```tsx
useEvent(player, 'onVolumeChange', (data) => {
  console.log('Volume:', data.volume, 'Muted:', data.muted);
});
```

### onAudioBecomingNoisy

Fired when headphones are unplugged.

```tsx
useEvent(player, 'onAudioBecomingNoisy', () => {
  player.pause();
});
```

### onAudioFocusChange

Fired when another app takes audio focus.

```tsx
useEvent(player, 'onAudioFocusChange', (hasAudioFocus) => {
  if (!hasAudioFocus) player.pause();
});
```

---

## Complete Example

```tsx
import React, { useState } from 'react';
import { View, Button, Slider, Text, Platform } from 'react-native';
import { useVideoPlayer, useEvent, VideoView } from 'react-native-video';

function AudioControls() {
  const player = useVideoPlayer(source, (_player) => {
    _player.volume = 0.8;
    _player.mixAudioMode = 'mixWithOthers';
  });

  const [volume, setVolume] = useState(0.8);
  const [muted, setMuted] = useState(false);

  // Pause when headphones unplugged
  useEvent(player, 'onAudioBecomingNoisy', () => player.pause());

  useEvent(player, 'onVolumeChange', (data) => {
    setVolume(data.volume);
    setMuted(data.muted);
  });

  return (
    <View>
      <VideoView player={player} style={{ width: '100%', height: 300 }} />
      
      <Slider
        value={volume}
        onValueChange={(v) => player.volume = v}
      />
      
      <Button
        title={muted ? '🔇 Unmute' : '🔊 Mute'}
        onPress={() => player.muted = !muted}
      />

      {Platform.OS === 'ios' && (
        <Button
          title="Ignore Silent Switch"
          onPress={() => player.ignoreSilentSwitchMode = 'ignore'}
        />
      )}
    </View>
  );
}
```
