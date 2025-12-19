# Lifecycle

Manage the player's lifecycle including initialization, preloading, and cleanup.

## Overview

| State | Description |
|-------|-------------|
| **Created** | Player exists, may not be initialized |
| **Initialized** | Native player ready, source loading |
| **Ready** | Media loaded, ready to play |
| **Released** | Resources freed, instance unusable |

## initialize()

```ts
initialize(): Promise<void>;
```

Manually initialize the native player. Only needed with deferred initialization.

```tsx
const player = useVideoPlayer({
  uri: source,
  initializeOnCreation: false,
});

// Later, on user action
await player.initialize();
player.play();
```

**When to use:**
- Batch-creating players without immediate network cost
- Attaching event handlers before network requests
- Explicit control over when buffering begins

## preload()

```ts
preload(): Promise<void>;
```

Start buffering without playing. Initializes if needed.

```tsx
// Preload next video for instant playback
await player.preload();

// Later
player.play(); // Instant start
```

:::warning
Preloading too many videos can cause memory issues. Limit to 2-3.
:::

## release()

```ts
release(): void;
```

Release all native resources. **Player becomes unusable after this.**

```tsx
// ❌ Wrong
player.release();
player.play(); // Throws error!

// ✅ Correct - clear source, keep player
await player.replaceSourceAsync(null);
await player.replaceSourceAsync({ uri: newSource }); // Works!
```

### When to Use

| Scenario | Use |
|----------|-----|
| Done with player permanently | `release()` |
| Might play another video later | `replaceSourceAsync(null)` |
| Switching videos | `replaceSourceAsync(newSource)` |
| Using `useVideoPlayer` hook | Automatic cleanup |

:::danger
After `release()`, any access to the player throws an error.
:::

## With useVideoPlayer

Hook manages lifecycle automatically:

```tsx
function Player() {
  // Created on mount, released on unmount
  const player = useVideoPlayer(source);
  
  return <VideoView player={player} />;
}
```

## Complete Example

```tsx
import React, { useState, useEffect } from 'react';
import { View, Button, Text } from 'react-native';
import { VideoPlayer, VideoView } from 'react-native-video';

function ManualLifecycle() {
  const [player, setPlayer] = useState<VideoPlayer | null>(null);
  const [status, setStatus] = useState('No player');

  const create = () => {
    const p = new VideoPlayer({
      uri: source,
      initializeOnCreation: false,
    });
    setPlayer(p);
    setStatus('Created');
  };

  const init = async () => {
    await player?.initialize();
    setStatus('Initialized');
  };

  const preload = async () => {
    await player?.preload();
    setStatus('Preloaded');
  };

  const release = () => {
    player?.release();
    setPlayer(null);
    setStatus('Released');
  };

  useEffect(() => {
    return () => player?.release();
  }, [player]);

  return (
    <View>
      {player && <VideoView player={player} style={{ width: '100%', height: 300 }} />}
      <Text>Status: {status}</Text>
      <Button title="Create" onPress={create} disabled={!!player} />
      <Button title="Initialize" onPress={init} disabled={!player} />
      <Button title="Preload" onPress={preload} disabled={!player} />
      <Button title="Play" onPress={() => player?.play()} disabled={!player} />
      <Button title="Release" onPress={release} disabled={!player} />
    </View>
  );
}
```

## See Also

- [Player](../player.md) - Main documentation
- [Player](../AdvancedPlayer.md) - Detailed lifecycle
- [Source](./source.md) - Source management
