# Google Analytics

Track video events with Google Analytics 4.

:::tip Pro Feature
Google Analytics integration is a Pro feature.
:::

## Overview

Google Analytics 4 provides:

- **Universal tracking** - Part of Google Marketing Platform
- **Event-based model** - Flexible video event tracking
- **Audience insights** - User behavior and demographics
- **BigQuery export** - Raw data for custom analysis
- **Free tier available** - With premium options

## Installation

```bash
npm install @react-native-video/analytics-google
```

## Configuration

```tsx
import { GoogleAnalytics } from '@react-native-video/analytics-google';

// Configure at app startup (uses Firebase)
GoogleAnalytics.configure({
  // Uses existing Firebase/Google Analytics setup
  // or provide manual configuration
  measurementId: 'G-XXXXXXXXXX', // Optional if Firebase is configured
});
```

## Usage

```tsx
import { useVideoPlayer, VideoView } from 'react-native-video';
import { GoogleAnalytics } from '@react-native-video/analytics-google';

function Player({ source, video }) {
  const player = useVideoPlayer(source, (_player) => {
    _player.play();
  });

  // Attach GA4 tracking
  GoogleAnalytics.track(player, {
    videoId: video.id,
    videoTitle: video.title,
    videoCategory: video.category,
  });

  return <VideoView player={player} />;
}
```

## Video Events

GA4 recommended video events are tracked automatically:

| Event | When | Parameters |
|-------|------|------------|
| `video_start` | Playback begins | video_title, video_provider |
| `video_progress` | 10%, 25%, 50%, 75%, 90% | video_percent |
| `video_complete` | Video ends | video_duration |

## Custom Parameters

```tsx
GoogleAnalytics.track(player, {
  // Video metadata
  videoId: 'video-123',
  videoTitle: 'Episode 1',
  videoCategory: 'Entertainment',
  videoProvider: 'My Platform',
  videoDuration: 3600,
  
  // Custom parameters
  contentType: 'series',
  subscriptionType: 'premium',
  seasonNumber: 1,
  episodeNumber: 1,
});
```

## Manual Event Tracking

Track custom events:

```tsx
// Track custom milestones
GoogleAnalytics.trackEvent('video_chapter_complete', {
  videoId: 'video-123',
  chapterName: 'Introduction',
  chapterNumber: 1,
});

// Track user actions
GoogleAnalytics.trackEvent('video_share', {
  videoId: 'video-123',
  shareMethod: 'twitter',
});

// Track quality changes
GoogleAnalytics.trackEvent('video_quality_change', {
  videoId: 'video-123',
  quality: '1080p',
  bitrate: 4500000,
});
```

## Enhanced Measurement

Enable detailed tracking:

```tsx
GoogleAnalytics.track(player, {
  videoId: video.id,
  videoTitle: video.title,
  
  // Enhanced options
  trackProgress: true, // 10%, 25%, 50%, 75%, 90%
  trackBuffering: true,
  trackSeeks: true,
  trackQuality: true,
  trackErrors: true,
});
```

## E-commerce Integration

Track video-related purchases:

```tsx
// Track video purchase
GoogleAnalytics.trackEvent('purchase', {
  transactionId: 'txn-123',
  value: 4.99,
  currency: 'USD',
  items: [{
    itemId: video.id,
    itemName: video.title,
    itemCategory: 'Video Rental',
    price: 4.99,
  }],
});

// Track subscription from video
GoogleAnalytics.trackEvent('subscribe', {
  method: 'video_cta',
  videoId: video.id,
});
```

## Example

```tsx
import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useVideoPlayer, VideoView, useEvent } from 'react-native-video';
import { GoogleAnalytics } from '@react-native-video/analytics-google';

function GAPlayer({ video }) {
  const player = useVideoPlayer(video.source, (_player) => {
    _player.play();
  });

  useEffect(() => {
    // Initialize tracking
    GoogleAnalytics.track(player, {
      videoId: video.id,
      videoTitle: video.title,
      videoCategory: video.category,
      videoDuration: video.duration,
      trackProgress: true,
      trackBuffering: true,
    });
  }, []);

  // Track custom events
  useEvent(player, 'onSeek', () => {
    GoogleAnalytics.trackEvent('video_seek', {
      videoId: video.id,
    });
  });

  return (
    <View>
      <VideoView player={player} style={{ width: '100%', aspectRatio: 16/9 }} />
    </View>
  );
}
```

## Debug Mode

```tsx
GoogleAnalytics.configure({
  debugMode: __DEV__, // Enable in development
});

// View events in GA4 DebugView
```

## Platform Support

| Feature | iOS | Android |
|---------|-----|---------|
| Basic tracking | ✅ | ✅ |
| Progress events | ✅ | ✅ |
| Custom events | ✅ | ✅ |
| E-commerce | ✅ | ✅ |

## See Also

- [Manual Analytics](./manual.md) - DIY analytics
- [Adobe Analytics](./adobe.md) - Enterprise alternative
- [Events](../events/useEvent.md) - Event API

