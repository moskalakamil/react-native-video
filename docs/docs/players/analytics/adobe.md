# Adobe Analytics

Enterprise video analytics with Adobe Experience Platform.

:::tip Pro Feature
Adobe Analytics integration is a Pro feature.
:::

## Overview

Adobe Analytics for Media provides:

- **Enterprise-grade analytics** - Part of Adobe Experience Cloud
- **Cross-platform tracking** - Web, mobile, OTT
- **Audience insights** - Deep user segmentation
- **Marketing integration** - Connect with Adobe Campaign
- **Custom reporting** - Flexible report builder

## Installation

```bash
npm install @react-native-video/analytics-adobe
```

## Configuration

```tsx
import { AdobeAnalytics } from '@react-native-video/analytics-adobe';

// Configure at app startup
AdobeAnalytics.configure({
  trackingServer: 'your-company.sc.omtrdc.net',
  reportSuiteId: 'your-report-suite',
  marketingCloudOrgId: 'YOUR_ORG_ID@AdobeOrg',
  visitorId: 'visitor-123', // Optional
});
```

## Usage

```tsx
import { useVideoPlayer, VideoView } from 'react-native-video';
import { AdobeAnalytics } from '@react-native-video/analytics-adobe';

function Player({ source, video }) {
  const player = useVideoPlayer(source, (_player) => {
    _player.play();
  });

  // Initialize Adobe Media tracking
  AdobeAnalytics.trackMedia(player, {
    name: video.title,
    mediaId: video.id,
    length: video.duration,
    streamType: 'VOD', // 'VOD' | 'LIVE' | 'LINEAR'
    mediaType: 'Video', // 'Video' | 'Audio'
  });

  return <VideoView player={player} />;
}
```

## Media Metadata

```tsx
AdobeAnalytics.trackMedia(player, {
  // Required
  name: 'Episode 1',
  mediaId: 'video-123',
  length: 3600,
  streamType: 'VOD',
  mediaType: 'Video',
  
  // Standard metadata
  show: 'My Show',
  season: '1',
  episode: '1',
  genre: 'Drama',
  firstAirDate: '2024-01-01',
  rating: 'TV-14',
  originator: 'My Network',
  network: 'Streaming',
  dayPart: 'primetime',
  
  // Custom metadata
  customMetadata: {
    subscription: 'premium',
    contentType: 'series',
  },
});
```

## Chapter Tracking

```tsx
// Start chapter
AdobeAnalytics.trackChapterStart(player, {
  name: 'Chapter 1',
  position: 1,
  length: 600,
  startTime: 0,
});

// End chapter
AdobeAnalytics.trackChapterComplete(player);

// Skip chapter
AdobeAnalytics.trackChapterSkip(player);
```

## Ad Tracking

```tsx
// Ad break
AdobeAnalytics.trackAdBreakStart(player, {
  name: 'Pre-roll',
  position: 1,
  startTime: 0,
});

// Individual ad
AdobeAnalytics.trackAdStart(player, {
  name: 'Product Ad',
  adId: 'ad-123',
  position: 1,
  length: 15,
});

AdobeAnalytics.trackAdComplete(player);
AdobeAnalytics.trackAdBreakComplete(player);
```

## Quality Metrics

```tsx
// Report quality events
AdobeAnalytics.trackBitrateChange(player, {
  bitrate: 4500000,
});

AdobeAnalytics.trackDroppedFrames(player, {
  droppedFrames: 10,
});

// Report errors
AdobeAnalytics.trackError(player, {
  errorId: 'NETWORK_ERROR',
  errorSource: 'player',
});
```

## Example

```tsx
import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useVideoPlayer, VideoView, useEvent } from 'react-native-video';
import { AdobeAnalytics } from '@react-native-video/analytics-adobe';

function AdobePlayer({ video }) {
  const player = useVideoPlayer(video.source, (_player) => {
    _player.play();
  });

  useEffect(() => {
    // Start media tracking
    AdobeAnalytics.trackMedia(player, {
      name: video.title,
      mediaId: video.id,
      length: video.duration,
      streamType: video.isLive ? 'LIVE' : 'VOD',
      mediaType: 'Video',
      show: video.showName,
      season: video.season,
      episode: video.episode,
    });

    return () => {
      AdobeAnalytics.trackComplete(player);
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
| Media tracking | ✅ | ✅ |
| Chapter tracking | ✅ | ✅ |
| Ad tracking | ✅ | ✅ |
| Quality metrics | ✅ | ✅ |

## See Also

- [Manual Analytics](./manual.md) - DIY analytics
- [Google Analytics](./google-analytics.md) - Alternative analytics

