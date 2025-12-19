# Mux Data

Video-specific analytics with automatic quality metrics.

:::tip Pro Feature
Mux Data integration is a Pro feature.
:::

## Overview

[Mux Data](https://mux.com/data) provides:

- **Automatic QoE scoring** - Real-time quality of experience
- **Video-specific metrics** - Startup time, rebuffering, bitrate
- **Real-time dashboards** - Monitor live streams and VOD
- **Alerting** - Get notified about quality issues
- **A/B testing** - Compare player configurations

## Installation

```bash
npm install @react-native-video/analytics-mux
```

## Configuration

```tsx
import { useVideoPlayer, VideoView } from 'react-native-video';
import { MuxAnalytics } from '@react-native-video/analytics-mux';

// Configure once at app startup
MuxAnalytics.configure({
  envKey: 'YOUR_MUX_ENV_KEY',
  playerName: 'React Native Video',
  playerVersion: '7.0.0',
});
```

## Usage

```tsx
function Player({ source, videoId, videoTitle }) {
  const player = useVideoPlayer(source, (_player) => {
    _player.play();
  });

  // Attach Mux tracking
  MuxAnalytics.track(player, {
    videoId,
    videoTitle,
    videoSeries: 'Season 1',
    videoDuration: 3600,
    viewerUserId: 'user-123',
  });

  return <VideoView player={player} />;
}
```

## Metadata

Provide rich metadata for better insights:

```tsx
MuxAnalytics.track(player, {
  // Video metadata
  videoId: 'abc123',
  videoTitle: 'Episode 1',
  videoSeries: 'My Show',
  videoDuration: 3600000, // ms
  videoIsLive: false,
  videoStreamType: 'on-demand',
  videoCdn: 'cloudfront',
  
  // Viewer metadata
  viewerUserId: 'user-456',
  viewerDeviceCategory: 'mobile',
  viewerApplicationName: 'My App',
  viewerApplicationVersion: '1.0.0',
  
  // Custom dimensions
  customDimension1: 'premium',
  customDimension2: 'organic',
});
```

## Events

Track custom events:

```tsx
// Track ad events
MuxAnalytics.trackAdBreakStart(player);
MuxAnalytics.trackAdStart(player, { adId: 'ad-123' });
MuxAnalytics.trackAdEnd(player);
MuxAnalytics.trackAdBreakEnd(player);

// Track errors
MuxAnalytics.trackError(player, {
  errorCode: 'MEDIA_ERR_NETWORK',
  errorMessage: 'Network error',
});
```

## Dashboard Metrics

Mux Data automatically tracks:

| Category | Metrics |
|----------|---------|
| **Playback** | Views, play rate, watch time |
| **Quality** | Startup time, rebuffer ratio, upscaling |
| **Engagement** | Completion rate, seek ratio |
| **Errors** | Error rate, error types |
| **Performance** | Bitrate, resolution, CDN |

## Example

```tsx
import React from 'react';
import { View } from 'react-native';
import { useVideoPlayer, VideoView } from 'react-native-video';
import { MuxAnalytics } from '@react-native-video/analytics-mux';

function MuxTrackedPlayer({ video }) {
  const player = useVideoPlayer(video.source, (_player) => {
    _player.play();
  });

  // Attach Mux tracking with metadata
  MuxAnalytics.track(player, {
    videoId: video.id,
    videoTitle: video.title,
    videoDuration: video.duration,
    videoIsLive: video.isLive,
    viewerUserId: getCurrentUserId(),
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
| Custom events | ✅ | ✅ |
| Ads tracking | ✅ | ✅ |

## See Also

- [Manual Analytics](./manual.md) - DIY analytics
- [Conviva](./conviva.md) - Alternative analytics
- [Events](../events/useEvent.md) - Event API

