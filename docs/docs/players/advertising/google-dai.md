# Google DAI

Server-side ad insertion with Google Dynamic Ad Insertion.

:::tip Pro Feature - Coming Soon
Google DAI integration is a Pro feature currently in development.
:::

## Overview

Google DAI (Dynamic Ad Insertion) provides:
- **Server-Side Ad Insertion (SSAI)** - Ads stitched into stream
- **Seamless Playback** - No buffering between ads and content
- **Ad-Blocker Resistant** - Ads part of the stream
- **DVR Support** - Ads work with live DVR
- **Better Tracking** - Server-side metrics
- **Live & VOD** - Support for both

## How It Works

1. Server stitches ads into video stream
2. Client plays single continuous stream
3. SDK tracks ad breaks via metadata
4. No client-side ad insertion needed

## Basic Setup

### VOD (Video on Demand)

```tsx
import { useVideoPlayer, VideoView } from 'react-native-video';

const player = useVideoPlayer({
  source: {
    uri: 'https://dai.google.com/...',
    type: 'dai',
  },
  ads: {
    enabled: true,
    provider: 'dai',
    contentSourceId: '2528370',
    videoId: 'tears-of-steel',
  },
});

return <VideoView player={player} />;
```

### Live Stream

```tsx
const player = useVideoPlayer({
  source: {
    uri: 'https://dai.google.com/...',
    type: 'dai',
  },
  ads: {
    enabled: true,
    provider: 'dai',
    assetKey: 'sN_IYUG8STe1ZzhIIE_ksA',
  },
});
```

## Configuration

### VOD Stream

```tsx
ads: {
  enabled: true,
  provider: 'dai',
  contentSourceId: 'your-content-source-id',
  videoId: 'your-video-id',
  apiKey: 'your-api-key', // Optional
  authToken: 'your-auth-token', // Optional
}
```

### Live Stream

```tsx
ads: {
  enabled: true,
  provider: 'dai',
  assetKey: 'your-asset-key',
  apiKey: 'your-api-key', // Optional
}
```

## Ad Events

DAI provides similar events to IMA:

```tsx
// Cue points (ad break markers)
player.addEventListener('adCuePoints', (cuePoints) => {
  console.log('Ad breaks at:', cuePoints);
});

// Ad break started
player.addEventListener('adBreakStart', (adBreak) => {
  console.log('Ad break started:', adBreak);
  console.log('Duration:', adBreak.duration);
  console.log('Position:', adBreak.position); // Time in content
});

// Ad break ended
player.addEventListener('adBreakEnd', () => {
  console.log('Ad break ended');
});

// Individual ad started
player.addEventListener('adStart', (ad) => {
  console.log('Ad started:', ad.title);
  console.log('Duration:', ad.duration);
});

// Ad completed
player.addEventListener('adComplete', () => {
  console.log('Ad completed');
});

// Ad progress
player.addEventListener('adProgress', (progress) => {
  console.log('Ad time:', progress.currentTime);
});
```

## Snapback

Handle seeking during ads:

```tsx
ads: {
  enabled: true,
  provider: 'dai',
  contentSourceId: '...',
  videoId: '...',
  snapback: true, // Prevent seeking through ads
}

// Snapback event
player.addEventListener('adSnapback', (position) => {
  console.log('Seeked during ad, snapped back to:', position);
});
```

## Companion Ads

Display companion banners with DAI:

```tsx
ads: {
  enabled: true,
  provider: 'dai',
  contentSourceId: '...',
  videoId: '...',
  companionSlots: [
    { id: 'companion-1', width: 300, height: 250 },
  ],
}

// Companion ad event
player.addEventListener('companionAdReady', (companion) => {
  console.log('Companion ad:', companion.slotId);
  console.log('HTML content:', companion.content);
  // Display companion in WebView
});
```

## Stream Information

Get DAI stream info:

```tsx
const streamInfo = player.getDAIStreamInfo();

console.log('Stream ID:', streamInfo.streamId);
console.log('Stream URL:', streamInfo.url);
console.log('Is Live:', streamInfo.isLive);
console.log('Ad breaks:', streamInfo.adBreaks);
```

## Ad Pods

Handle multiple ads in sequence:

```tsx
player.addEventListener('adPodInfo', (podInfo) => {
  console.log('Pod index:', podInfo.podIndex);
  console.log('Total ads:', podInfo.totalAds);
  console.log('Current ad:', podInfo.adPosition);
  console.log('Pod duration:', podInfo.duration);
});
```

## UI Integration

```tsx
import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';

function DAIVideoPlayer({ contentSourceId, videoId }) {
  const [isInAdBreak, setIsInAdBreak] = useState(false);
  const [adInfo, setAdInfo] = useState(null);

  const player = useVideoPlayer({
    source: {
      uri: 'https://dai.google.com/...',
      type: 'dai',
    },
    ads: {
      enabled: true,
      provider: 'dai',
      contentSourceId,
      videoId,
      snapback: true,
    },
  });

  useEffect(() => {
    player.addEventListener('adBreakStart', () => {
      setIsInAdBreak(true);
    });

    player.addEventListener('adBreakEnd', () => {
      setIsInAdBreak(false);
      setAdInfo(null);
    });

    player.addEventListener('adStart', (ad) => {
      setAdInfo({
        title: ad.title,
        duration: ad.duration,
      });
    });

    return () => {
      // Cleanup listeners
    };
  }, []);

  return (
    <View style={styles.container}>
      <VideoView player={player} style={styles.video} />
      
      {isInAdBreak && (
        <View style={styles.adOverlay}>
          <Text style={styles.adBadge}>Ad</Text>
          {adInfo && (
            <Text style={styles.adTitle}>{adInfo.title}</Text>
          )}
        </View>
      )}
    </View>
  );
}
```

## Advanced Configuration

### Custom Request Parameters

```tsx
ads: {
  enabled: true,
  provider: 'dai',
  contentSourceId: '...',
  videoId: '...',
  customAssetKey: 'custom-key',
  customParams: {
    ppid: 'user123',
    vid: 'video456',
  },
}
```

### Ad Tracking

```tsx
ads: {
  enabled: true,
  provider: 'dai',
  contentSourceId: '...',
  videoId: '...',
  omidVersion: '1.3.7',
  omidPartnerName: 'MyApp',
  omidPartnerVersion: '1.0',
}
```

## Platform Support

| Platform | VOD | Live | DVR |
|----------|-----|------|-----|
| iOS | ✅ | ✅ | ✅ |
| Android | ✅ | ✅ | ✅ |
| Android TV | ✅ | ✅ | ✅ |
| Apple TV | ✅ | ✅ | ✅ |

## Best Practices

1. **Snapback** - Enable to prevent ad skipping
2. **Error Handling** - Handle DAI stream errors
3. **Cue Points** - Use for UI indicators
4. **Analytics** - Track ad impressions server-side
5. **Testing** - Test with Google's sample streams

## Testing

Use Google's test streams:

```tsx
// VOD test
ads: {
  enabled: true,
  provider: 'dai',
  contentSourceId: '2528370',
  videoId: 'tears-of-steel',
}

// Live test
ads: {
  enabled: true,
  provider: 'dai',
  assetKey: 'sN_IYUG8STe1ZzhIIE_ksA',
}
```

## Troubleshooting

### Stream Not Loading

- Verify content source ID and video ID
- Check API key if required
- Review network connectivity

### Ads Not Playing

- Ensure stream has ad metadata
- Check DAI console for stream status
- Verify ad insertion setup

## See Also

- [Getting Started](./getting-started.md) - Ads overview
- [Google IMA](./google-ima.md) - Client-side ads
- [Events](../events/overview.md) - Event handling

