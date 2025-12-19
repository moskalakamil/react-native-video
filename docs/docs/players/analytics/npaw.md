# NPAW (Youbora)

Comprehensive video analytics suite for streaming platforms.

:::tip Pro Feature
NPAW integration is a Pro feature.
:::

## Overview

[NPAW](https://npaw.com/) (formerly Youbora) provides:

- **360° Analytics** - Complete visibility into video performance
- **Smart alerts** - AI-powered anomaly detection
- **Content analytics** - Understand what users watch
- **Advertising insights** - Track ad performance
- **CDN analytics** - Optimize delivery

## Installation

```bash
npm install @react-native-video/analytics-npaw
```

## Configuration

```tsx
import { NPAWAnalytics } from '@react-native-video/analytics-npaw';

// Configure at app startup
NPAWAnalytics.configure({
  accountCode: 'YOUR_ACCOUNT_CODE',
  username: 'user-123', // Optional
  userType: 'premium', // Optional
});
```

## Usage

```tsx
import { useVideoPlayer, VideoView } from 'react-native-video';
import { NPAWAnalytics } from '@react-native-video/analytics-npaw';

function Player({ source, video }) {
  const player = useVideoPlayer(source, (_player) => {
    _player.play();
  });

  // Initialize NPAW tracking
  NPAWAnalytics.track(player, {
    'content.title': video.title,
    'content.id': video.id,
    'content.duration': video.duration,
    'content.isLive': video.isLive,
  });

  return <VideoView player={player} />;
}
```

## Content Options

```tsx
NPAWAnalytics.track(player, {
  // Content info
  'content.title': 'Episode 1',
  'content.id': 'video-123',
  'content.program': 'My Show',
  'content.season': 'Season 1',
  'content.episodeTitle': 'Pilot',
  'content.duration': 3600,
  'content.isLive': false,
  'content.resource': 'https://cdn.example.com/video.m3u8',
  'content.cdn': 'Cloudfront',
  'content.encoding.videoCodec': 'h264',
  'content.encoding.audioCodec': 'aac',
  
  // Custom dimensions
  'content.customDimension.1': 'premium',
  'content.customDimension.2': 'mobile',
  
  // Device info (auto-detected, but can override)
  'device.brand': 'Apple',
  'device.model': 'iPhone 15',
});
```

## Ad Tracking

```tsx
// Configure ad options
NPAWAnalytics.setAdOptions(player, {
  'ad.campaign': 'Summer Sale',
  'ad.provider': 'Google IMA',
});

// Ad break
NPAWAnalytics.adBreakStart(player, {
  position: 'pre', // 'pre' | 'mid' | 'post'
});

// Individual ad
NPAWAnalytics.adStart(player, {
  title: 'Product Ad',
  duration: 15,
  position: 1,
});

NPAWAnalytics.adEnd(player);
NPAWAnalytics.adBreakEnd(player);
```

## Session Control

```tsx
// Report custom events
NPAWAnalytics.fireEvent(player, 'like', { contentId: 'video-123' });

// Update options during playback
NPAWAnalytics.setContentOptions(player, {
  'content.customDimension.3': 'chapter-2',
});

// Report errors
NPAWAnalytics.fireError(player, {
  code: 'NETWORK_ERROR',
  message: 'Connection timeout',
  isFatal: true,
});

// Stop tracking
NPAWAnalytics.stop(player);
```

## Dashboard Metrics

NPAW automatically tracks:

| Category | Metrics |
|----------|---------|
| **Views** | Plays, unique users, concurrent views |
| **Engagement** | Play time, completion rate, sessions |
| **Quality** | Buffer ratio, join time, bitrate |
| **Errors** | Fatal errors, playback failures |
| **Ads** | Impressions, completion, errors |
| **Content** | Popular content, trends |

## Example

```tsx
import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useVideoPlayer, VideoView } from 'react-native-video';
import { NPAWAnalytics } from '@react-native-video/analytics-npaw';

function NPAWPlayer({ video, user }) {
  const player = useVideoPlayer(video.source, (_player) => {
    _player.play();
  });

  useEffect(() => {
    // Start tracking
    NPAWAnalytics.track(player, {
      'content.title': video.title,
      'content.id': video.id,
      'content.duration': video.duration,
      'content.isLive': video.isLive,
      'content.customDimension.1': video.category,
      'content.customDimension.2': user.subscriptionType,
    });

    // Cleanup
    return () => {
      NPAWAnalytics.stop(player);
    };
  }, []);

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
| Offline views | ✅ | ✅ |

## See Also

- [Manual Analytics](./manual.md) - DIY analytics
- [Mux Data](./mux.md) - Alternative analytics
- [Conviva](./conviva.md) - Alternative analytics

