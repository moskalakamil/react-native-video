# Low Latency

Minimize delay between live video capture and playback for real-time experiences.

:::tip Pro Feature
Low Latency streaming is a Pro feature that enables sub-5-second latency for live content.
:::

## Overview

Traditional live streaming has 15-45 second delays. Low Latency reduces this to:

| Mode | Latency | Use Case |
|------|---------|----------|
| Standard | 15-45s | Regular broadcasts |
| Low Latency | 3-5s | Sports, news, events |
| Ultra Low Latency | < 1s | Auctions, gaming, interactive |

## Supported Protocols

### Low-Latency HLS (LL-HLS)

Apple's extension to HLS with reduced segment sizes and partial segments.

```tsx
const player = useVideoPlayer({
  uri: 'https://example.com/live/master.m3u8',
  lowLatency: {
    enabled: true,
    targetLatency: 3, // seconds
  },
}, (_player) => {
  _player.play();
});
```

### Low-Latency DASH (LL-DASH)

DASH-IF specification for low latency with chunked transfer encoding.

```tsx
const player = useVideoPlayer({
  uri: 'https://example.com/live/manifest.mpd',
  lowLatency: {
    enabled: true,
    targetLatency: 2,
    minLatency: 1,
    maxLatency: 5,
  },
});
```

## Configuration

### lowLatency

```ts
interface LowLatencyConfig {
  enabled: boolean;
  targetLatency?: number;
  minLatency?: number;
  maxLatency?: number;
  catchupRate?: number;
  fallbackRate?: number;
}
```

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `enabled` | `boolean` | `false` | Enable low latency mode |
| `targetLatency` | `number` | `3` | Target latency in seconds |
| `minLatency` | `number` | `1` | Minimum allowed latency |
| `maxLatency` | `number` | `8` | Maximum before catchup |
| `catchupRate` | `number` | `1.1` | Playback speed to catch up |
| `fallbackRate` | `number` | `0.95` | Playback speed when too close |

## Latency Control

### getLatency()

```ts
getLatency(): number;
```

Get current live latency in seconds.

```tsx
useEvent(player, 'onProgress', () => {
  const latency = player.getLatency();
  console.log(`Current latency: ${latency}s`);
});
```

### seekToLive()

```ts
seekToLive(): void;
```

Jump to the live edge of the stream.

```tsx
<Button title="Go Live" onPress={() => player.seekToLive()} />
```

### isAtLiveEdge

```ts
get isAtLiveEdge(): boolean;
```

Whether playback is at the live edge.

```tsx
const [atLive, setAtLive] = useState(true);

useEvent(player, 'onProgress', () => {
  setAtLive(player.isAtLiveEdge);
});

return (
  <View>
    {!atLive && (
      <Button title="⏩ Go Live" onPress={() => player.seekToLive()} />
    )}
  </View>
);
```

## Events

### onLatencyChange

Fired when latency changes significantly.

```tsx
useEvent(player, 'onLatencyChange', (data) => {
  console.log('Latency:', data.latency);
  console.log('Target:', data.targetLatency);
  console.log('At live edge:', data.isAtLiveEdge);
});
```

### onLiveEdgeChange

Fired when playback enters or leaves the live edge.

```tsx
useEvent(player, 'onLiveEdgeChange', (atLiveEdge) => {
  if (!atLiveEdge) {
    showToast('You are behind live');
  }
});
```

## Best Practices

### 1. Server Configuration

Low latency requires server support:

```
# LL-HLS requirements
- Part duration: 0.2-0.5s
- Partial segments enabled
- Preload hints
- Delta updates

# LL-DASH requirements  
- Segment duration: 1-2s
- Chunked transfer encoding
- availabilityTimeOffset
```

### 2. Adaptive Latency

Adjust target based on network conditions:

```tsx
const player = useVideoPlayer({
  uri: liveStreamUrl,
  lowLatency: {
    enabled: true,
    targetLatency: 3,
    minLatency: 2,
    maxLatency: 6,
    // Speed up playback slightly to catch up when behind
    catchupRate: 1.05,
    // Slow down when too close to live edge
    fallbackRate: 0.95,
  },
});
```

### 3. Live Indicator UI

Show users their position relative to live:

```tsx
function LiveIndicator({ player }) {
  const [latency, setLatency] = useState(0);
  const [atLive, setAtLive] = useState(true);

  useEvent(player, 'onProgress', () => {
    setLatency(player.getLatency());
    setAtLive(player.isAtLiveEdge);
  });

  return (
    <View style={styles.indicator}>
      {atLive ? (
        <View style={styles.liveBadge}>
          <Text style={styles.liveText}>● LIVE</Text>
        </View>
      ) : (
        <TouchableOpacity onPress={() => player.seekToLive()}>
          <Text style={styles.behindText}>
            {Math.round(latency)}s behind • Tap to go live
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
```

## Complete Example

```tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useVideoPlayer, useEvent, VideoView } from 'react-native-video';

function LowLatencyPlayer({ streamUrl }) {
  const player = useVideoPlayer({
    uri: streamUrl,
    lowLatency: {
      enabled: true,
      targetLatency: 3,
      minLatency: 2,
      maxLatency: 8,
    },
  }, (_player) => {
    _player.play();
  });

  const [latency, setLatency] = useState(0);
  const [atLive, setAtLive] = useState(true);

  useEvent(player, 'onProgress', () => {
    setLatency(player.getLatency());
    setAtLive(player.isAtLiveEdge);
  });

  return (
    <View>
      <VideoView player={player} style={{ width: '100%', height: 300 }} />
      
      <View style={styles.controls}>
        {atLive ? (
          <View style={styles.liveBadge}>
            <Text style={styles.liveText}>● LIVE</Text>
          </View>
        ) : (
          <TouchableOpacity 
            style={styles.goLiveButton}
            onPress={() => player.seekToLive()}
          >
            <Text>⏩ Go Live ({Math.round(latency)}s behind)</Text>
          </TouchableOpacity>
        )}
        
        <Text style={styles.latencyText}>
          Latency: {latency.toFixed(1)}s
        </Text>
      </View>
    </View>
  );
}
```

## Platform Support

| Feature | iOS | Android |
|---------|-----|---------|
| LL-HLS | ✅ iOS 14+ | ✅ ExoPlayer |
| LL-DASH | ❌ | ✅ ExoPlayer |
| `getLatency()` | ✅ | ✅ |
| `seekToLive()` | ✅ | ✅ |
| Auto catchup | ✅ | ✅ |

## Use Cases

- **Live Sports** - Sync with real-time action
- **Live Auctions** - Fair bidding with minimal delay
- **Interactive Shows** - Real-time audience participation
- **Live Gaming** - Watch esports with crowd
- **Breaking News** - Immediate updates
- **Live Commerce** - Shop during live streams

## See Also

- [Source](./source.md) - Video configuration
- [Playback](./playback.md) - Playback controls
- [Events](../events/useEvent.md) - Event handling

