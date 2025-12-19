# Video Analytics

Track playback quality, user engagement, and errors in real-time.

:::tip Pro Feature - Coming Soon
Video Analytics is a Pro feature currently in development.
:::

## Overview

Video Analytics provides insights into:

- **Quality of Service (QoS)** - Technical metrics like bitrate, buffering, errors
- **Quality of Experience (QoE)** - User-centric metrics like startup time, rebuffers
- **User Engagement** - Watch time, completion rate, seeks

## Quick Start

```tsx
const player = useVideoPlayer({
  uri: source,
  analytics: {
    enabled: true,
    userId: 'user-123',
    contentId: 'video-456',
  },
}, (_player) => {
  _player.play();
});
```

## Configuration

```ts
interface AnalyticsConfig {
  enabled: boolean;
  userId?: string;
  contentId?: string;
  contentTitle?: string;
  customData?: Record<string, string>;
  sampleRate?: number; // 0-1, default 1.0
}
```

## Quality Metrics

### Playback Quality

```tsx
useEvent(player, 'onAnalyticsUpdate', (data) => {
  console.log('Bitrate:', data.currentBitrate);
  console.log('Resolution:', data.currentResolution);
  console.log('Dropped frames:', data.droppedFrames);
  console.log('Buffer health:', data.bufferHealth);
});
```

### Available Metrics

| Metric | Type | Description |
|--------|------|-------------|
| `startupTime` | `number` | Time to first frame (ms) |
| `currentBitrate` | `number` | Current video bitrate (bps) |
| `currentResolution` | `string` | Current resolution (e.g., "1920x1080") |
| `bufferHealth` | `number` | Buffer duration ahead (seconds) |
| `droppedFrames` | `number` | Total dropped frames |
| `rebufferCount` | `number` | Number of rebuffer events |
| `rebufferDuration` | `number` | Total rebuffer time (ms) |
| `averageBitrate` | `number` | Average bitrate during session |
| `bandwidth` | `number` | Estimated network bandwidth |

## User Engagement

Track how users interact with content:

```tsx
useEvent(player, 'onEngagementUpdate', (data) => {
  console.log('Watch time:', data.watchTime);
  console.log('Completion:', data.completionPercent);
  console.log('Seek count:', data.seekCount);
});
```

### Engagement Metrics

| Metric | Type | Description |
|--------|------|-------------|
| `watchTime` | `number` | Total time watched (seconds) |
| `completionPercent` | `number` | Percentage of video watched (0-100) |
| `seekCount` | `number` | Number of seek operations |
| `pauseCount` | `number` | Number of pause events |
| `volumeChanges` | `number` | Number of volume adjustments |
| `qualityChanges` | `number` | Number of quality switches |

## Error Tracking

Monitor and react to playback errors:

```tsx
useEvent(player, 'onAnalyticsError', (error) => {
  console.log('Error type:', error.type);
  console.log('Error code:', error.code);
  console.log('Error message:', error.message);
  console.log('Recoverable:', error.recoverable);
});
```

## Custom Events

Track custom business events:

```tsx
// Track when user clicks "Add to Watchlist"
player.trackEvent('add_to_watchlist', {
  contentId: 'video-456',
  position: player.currentTime,
});

// Track ad interactions
player.trackEvent('ad_click', {
  adId: 'ad-789',
  provider: 'google-ima',
});
```

## Session Summary

Get complete session data when playback ends:

```tsx
useEvent(player, 'onSessionEnd', (session) => {
  console.log('Session ID:', session.id);
  console.log('Duration:', session.duration);
  console.log('Quality score:', session.qualityScore); // 0-100
  
  // Send to your analytics backend
  sendToAnalytics(session);
});
```

### Session Data

```ts
interface AnalyticsSession {
  id: string;
  userId?: string;
  contentId?: string;
  startTime: number;
  endTime: number;
  duration: number;
  watchTime: number;
  completionPercent: number;
  qualityScore: number;
  startupTime: number;
  rebufferCount: number;
  rebufferDuration: number;
  averageBitrate: number;
  errorCount: number;
  seekCount: number;
}
```

## Third-Party Integrations

### Mux Data

```tsx
analytics: {
  enabled: true,
  provider: 'mux',
  muxConfig: {
    envKey: 'YOUR_MUX_ENV_KEY',
    playerName: 'React Native Video',
    playerVersion: '7.0.0',
  },
}
```

### Conviva

```tsx
analytics: {
  enabled: true,
  provider: 'conviva',
  convivaConfig: {
    customerKey: 'YOUR_CONVIVA_KEY',
    gatewayUrl: 'https://your-gateway.conviva.com',
  },
}
```

### NPAW (Youbora)

```tsx
analytics: {
  enabled: true,
  provider: 'npaw',
  npawConfig: {
    accountCode: 'YOUR_ACCOUNT_CODE',
  },
}
```

### Custom Backend

```tsx
analytics: {
  enabled: true,
  provider: 'custom',
  endpoint: 'https://your-api.com/analytics',
  headers: {
    'Authorization': 'Bearer token',
  },
  batchSize: 10,
  flushInterval: 30000, // 30 seconds
}
```

## Complete Example

```tsx
import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { useVideoPlayer, VideoView, useEvent } from 'react-native-video';

function AnalyticsPlayer({ source, userId }) {
  const [metrics, setMetrics] = useState({
    bitrate: 0,
    buffer: 0,
    quality: 'Loading...',
  });

  const player = useVideoPlayer({
    uri: source,
    analytics: {
      enabled: true,
      userId,
      contentId: source,
    },
  }, (_player) => {
    _player.play();
  });

  useEvent(player, 'onAnalyticsUpdate', (data) => {
    setMetrics({
      bitrate: Math.round(data.currentBitrate / 1000000),
      buffer: data.bufferHealth.toFixed(1),
      quality: data.currentResolution,
    });
  });

  useEvent(player, 'onSessionEnd', (session) => {
    // Send to your analytics service
    fetch('https://api.example.com/analytics', {
      method: 'POST',
      body: JSON.stringify(session),
    });
  });

  return (
    <View>
      <VideoView player={player} style={{ width: '100%', aspectRatio: 16/9 }} />
      
      <View style={styles.statsOverlay}>
        <Text>Quality: {metrics.quality}</Text>
        <Text>Bitrate: {metrics.bitrate} Mbps</Text>
        <Text>Buffer: {metrics.buffer}s</Text>
      </View>
    </View>
  );
}
```

## Platform Support

| Feature | iOS | Android |
|---------|-----|---------|
| Quality metrics | ✅ | ✅ |
| Engagement tracking | ✅ | ✅ |
| Error tracking | ✅ | ✅ |
| Custom events | ✅ | ✅ |
| Mux integration | ✅ | ✅ |
| Conviva integration | ✅ | ✅ |

## See Also

- [Events](../events/useEvent.md) - Event handling
- [Status](./status.md) - Player status
- [Playback](./playback.md) - Playback controls

