# Conviva

Real-time streaming intelligence and quality analytics.

:::tip Pro Feature
Conviva integration is a Pro feature.
:::

## Overview

[Conviva](https://www.conviva.com/) provides:

- **Real-time monitoring** - Live quality dashboards
- **AI-powered insights** - Automatic issue detection
- **Benchmarking** - Compare against industry standards
- **Alerting** - Proactive issue notification
- **Root cause analysis** - Diagnose quality issues

## Installation

```bash
npm install @react-native-video/analytics-conviva
```

## Configuration

```tsx
import { ConvivaAnalytics } from '@react-native-video/analytics-conviva';

// Configure at app startup
ConvivaAnalytics.configure({
  customerKey: 'YOUR_CONVIVA_CUSTOMER_KEY',
  gatewayUrl: 'https://your-gateway.conviva.com', // Optional
  logLevel: 'DEBUG', // 'DEBUG' | 'INFO' | 'WARNING' | 'ERROR' | 'NONE'
});
```

## Usage

```tsx
import { useVideoPlayer, VideoView } from 'react-native-video';
import { ConvivaAnalytics } from '@react-native-video/analytics-conviva';

function Player({ source, video }) {
  const player = useVideoPlayer(source, (_player) => {
    _player.play();
  });

  // Create Conviva session
  ConvivaAnalytics.createSession(player, {
    assetName: video.title,
    streamUrl: source,
    isLive: video.isLive,
    defaultResource: 'CDN_NAME',
    viewerId: 'user-123',
  });

  return <VideoView player={player} />;
}
```

## Content Metadata

```tsx
ConvivaAnalytics.createSession(player, {
  // Required
  assetName: 'Episode 1 - Pilot',
  
  // Recommended
  streamUrl: 'https://cdn.example.com/video.m3u8',
  isLive: false,
  viewerId: 'user-456',
  defaultResource: 'Cloudfront',
  
  // Optional
  applicationName: 'My Streaming App',
  duration: 3600, // seconds
  encodedFramerate: 30,
  streamType: 'VOD', // 'VOD' | 'LIVE'
  
  // Custom tags
  customTags: {
    show: 'My Show',
    season: '1',
    genre: 'Drama',
    subscription: 'premium',
  },
});
```

## Session Control

```tsx
// Update metadata during playback
ConvivaAnalytics.updateContentMetadata(player, {
  customTags: {
    currentChapter: 'Chapter 2',
  },
});

// Report custom events
ConvivaAnalytics.reportPlaybackEvent(player, 'USER_SEEK');

// Report errors
ConvivaAnalytics.reportPlaybackError(player, 'FATAL', 'Network timeout');

// End session
ConvivaAnalytics.endSession(player);
```

## Ad Tracking

```tsx
// Ad break start
ConvivaAnalytics.adBreakStart(player, {
  podPosition: 'PRE_ROLL',
  podDuration: 30,
  podIndex: 0,
});

// Individual ad
ConvivaAnalytics.adStart(player, {
  adId: 'ad-123',
  adTitle: 'Product Ad',
  adDuration: 15,
  adPosition: 1,
});

ConvivaAnalytics.adEnd(player);
ConvivaAnalytics.adBreakEnd(player);
```

## Dashboard Metrics

Conviva automatically tracks:

| Category | Metrics |
|----------|---------|
| **Engagement** | Concurrent plays, attempts, exits |
| **Quality** | Video start failures, buffering ratio, bitrate |
| **Experience** | QoE score, video restart time |
| **Errors** | Fatal errors, warning events |
| **Ads** | Ad attempts, completion, errors |

## Example

```tsx
import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useVideoPlayer, VideoView, useEvent } from 'react-native-video';
import { ConvivaAnalytics } from '@react-native-video/analytics-conviva';

function ConvivaPlayer({ video }) {
  const player = useVideoPlayer(video.source, (_player) => {
    _player.play();
  });

  useEffect(() => {
    // Create session on mount
    ConvivaAnalytics.createSession(player, {
      assetName: video.title,
      streamUrl: video.source,
      isLive: video.isLive,
      viewerId: getCurrentUserId(),
      customTags: {
        contentType: video.type,
        subscription: getUserSubscription(),
      },
    });

    // Cleanup on unmount
    return () => {
      ConvivaAnalytics.endSession(player);
    };
  }, []);

  // Track seeks
  useEvent(player, 'onSeek', () => {
    ConvivaAnalytics.reportPlaybackEvent(player, 'USER_SEEK');
  });

  return (
    <View>
      <VideoView player={player} style={{ width: '100%', aspectRatio: 16/9 }} />
    </View>
  );
}
```

## Platform Support

| Feature | iOS | Android |
|---------|-----|---------|
| Basic tracking | ✅ | ✅ |
| Live streaming | ✅ | ✅ |
| Ad tracking | ✅ | ✅ |
| Custom events | ✅ | ✅ |

## See Also

- [Manual Analytics](./manual.md) - DIY analytics
- [Mux Data](./mux.md) - Alternative analytics
- [Events](../events/useEvent.md) - Event API

