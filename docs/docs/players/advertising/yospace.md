# Yospace

Server-side ad insertion with Yospace platform.

:::tip Pro Feature - Coming Soon
Yospace integration is a Pro feature currently in development.
:::

## Overview

Yospace provides:
- **Server-Side Ad Insertion (SSAI)** - Seamless ad integration
- **Live & VOD** - Support for both formats
- **DVR Support** - Ads work with time-shifting
- **Ad-Blocker Proof** - Ads part of the stream
- **Low Latency** - Minimal impact on playback
- **Advanced Analytics** - Detailed tracking

## How It Works

1. Yospace server stitches ads into video stream
2. Client receives single manifest with ads
3. SDK tracks ad markers for UI updates
4. Seamless transitions between content and ads

## Basic Setup

### VOD Stream

```tsx
import { useVideoPlayer, VideoView } from 'react-native-video';

const player = useVideoPlayer({
  source: {
    uri: 'https://your-yospace-url/manifest.m3u8',
    type: 'yospace',
  },
  ads: {
    enabled: true,
    provider: 'yospace',
  },
});

return <VideoView player={player} />;
```

### Live Stream

```tsx
const player = useVideoPlayer({
  source: {
    uri: 'https://your-yospace-url/live.m3u8',
    type: 'yospace-live',
  },
  ads: {
    enabled: true,
    provider: 'yospace',
    isLive: true,
  },
});
```

## Configuration

### VOD Configuration

```tsx
ads: {
  enabled: true,
  provider: 'yospace',
  manifestUrl: 'https://csm-e-sdk-validation.bln1.yospace.com/...',
  isLive: false,
}
```

### Live Configuration

```tsx
ads: {
  enabled: true,
  provider: 'yospace',
  manifestUrl: 'https://csm-e-sdk-validation.bln1.yospace.com/...',
  isLive: true,
  dvrWindowSize: 7200, // 2 hours in seconds
}
```

## Ad Events

```tsx
// Ad break started
player.addEventListener('yospaceAdBreakStart', (adBreak) => {
  console.log('Ad break started');
  console.log('Break ID:', adBreak.id);
  console.log('Duration:', adBreak.duration);
  console.log('Position:', adBreak.position);
});

// Ad break ended
player.addEventListener('yospaceAdBreakEnd', (adBreak) => {
  console.log('Ad break ended:', adBreak.id);
});

// Individual ad started
player.addEventListener('yospaceAdStart', (ad) => {
  console.log('Ad started:', ad.title);
  console.log('Duration:', ad.duration);
  console.log('Ad ID:', ad.id);
});

// Ad ended
player.addEventListener('yospaceAdEnd', (ad) => {
  console.log('Ad ended:', ad.id);
});

// Ad analytics
player.addEventListener('yospaceAdTracking', (event) => {
  console.log('Tracking event:', event.type);
  console.log('URL:', event.url);
});

// Error
player.addEventListener('yospaceError', (error) => {
  console.error('Yospace error:', error);
});
```

## Timeline Management

Handle DVR and seeking:

```tsx
// Get timeline
const timeline = player.getYospaceTimeline();

console.log('Content duration:', timeline.contentDuration);
console.log('Total duration:', timeline.totalDuration); // Content + ads
console.log('Ad breaks:', timeline.adBreaks);

// Convert between timeline positions
const contentTime = 120; // 2 minutes
const playheadTime = player.contentTimeToPlayheadTime(contentTime);

console.log('Content time:', contentTime);
console.log('Playhead time:', playheadTime); // Includes ads
```

## Seeking Control

Control seeking behavior during ads:

```tsx
ads: {
  enabled: true,
  provider: 'yospace',
  manifestUrl: '...',
  seekThroughAds: false, // Prevent seeking through ads
}

// Seek event
player.addEventListener('yospaceSeekBlocked', (position) => {
  console.log('Seek blocked during ad at:', position);
});
```

## Ad Markers

Display ad markers on seekbar:

```tsx
import React, { useState, useEffect } from 'react';
import { View } from 'react-native';

function SeekBarWithAdMarkers({ player }) {
  const [adMarkers, setAdMarkers] = useState([]);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const timeline = player.getYospaceTimeline();
    setDuration(timeline.totalDuration);
    
    // Convert ad breaks to marker positions (0-1)
    const markers = timeline.adBreaks.map(adBreak => ({
      position: adBreak.position / timeline.totalDuration,
      duration: adBreak.duration / timeline.totalDuration,
    }));
    
    setAdMarkers(markers);
  }, []);

  return (
    <View style={styles.seekBar}>
      {/* Progress bar */}
      
      {/* Ad markers */}
      {adMarkers.map((marker, index) => (
        <View
          key={index}
          style={[
            styles.adMarker,
            {
              left: `${marker.position * 100}%`,
              width: `${marker.duration * 100}%`,
            },
          ]}
        />
      ))}
    </View>
  );
}
```

## Complete Example

```tsx
import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { useVideoPlayer, VideoView } from 'react-native-video';

function YospaceVideoPlayer({ manifestUrl, isLive }) {
  const [isInAdBreak, setIsInAdBreak] = useState(false);
  const [currentAd, setCurrentAd] = useState(null);
  const [timeline, setTimeline] = useState(null);

  const player = useVideoPlayer({
    source: {
      uri: manifestUrl,
      type: isLive ? 'yospace-live' : 'yospace',
    },
    ads: {
      enabled: true,
      provider: 'yospace',
      isLive,
      seekThroughAds: false,
    },
  });

  useEffect(() => {
    // Get timeline for ad markers
    const tl = player.getYospaceTimeline();
    setTimeline(tl);

    // Ad break events
    player.addEventListener('yospaceAdBreakStart', () => {
      setIsInAdBreak(true);
    });

    player.addEventListener('yospaceAdBreakEnd', () => {
      setIsInAdBreak(false);
      setCurrentAd(null);
    });

    // Individual ad events
    player.addEventListener('yospaceAdStart', (ad) => {
      setCurrentAd({
        title: ad.title,
        duration: ad.duration,
      });
    });

    return () => {
      // Cleanup
    };
  }, []);

  return (
    <View style={styles.container}>
      <VideoView player={player} style={styles.video} />
      
      {isInAdBreak && (
        <View style={styles.adOverlay}>
          <Text style={styles.adBadge}>Ad</Text>
          {currentAd && (
            <Text style={styles.adTitle}>{currentAd.title}</Text>
          )}
        </View>
      )}

      {timeline && (
        <SeekBarWithAdMarkers player={player} timeline={timeline} />
      )}
    </View>
  );
}
```

## Advanced Features

### Custom Analytics

```tsx
ads: {
  enabled: true,
  provider: 'yospace',
  manifestUrl: '...',
  analytics: {
    enabled: true,
    customParams: {
      userId: 'user123',
      deviceId: 'device456',
    },
  },
}
```

### Ad Replacement

Replace specific ads dynamically:

```tsx
player.addEventListener('yospaceAdBreakStart', (adBreak) => {
  // Replace ads based on user preferences
  if (userHasPremium) {
    player.skipAdBreak(adBreak.id);
  }
});
```

## Platform Support

| Platform | VOD | Live | DVR |
|----------|-----|------|-----|
| iOS | ✅ | ✅ | ✅ |
| Android | ✅ | ✅ | ✅ |
| Android TV | ✅ | ✅ | ✅ |
| Apple TV | ✅ | ✅ | ✅ |

## Best Practices

1. **Timeline** - Use timeline for accurate UI
2. **Seek Control** - Prevent seeking through ads
3. **Ad Markers** - Show ad breaks on seekbar
4. **Error Handling** - Gracefully handle SSAI errors
5. **Analytics** - Track ad impressions
6. **Testing** - Test with Yospace validation URLs

## Testing

Use Yospace validation streams:

```tsx
// VOD test
const TEST_VOD = 'https://csm-e-sdk-validation.bln1.yospace.com/csm/access/156611618/c2FtcGxlL21hc3Rlci5tM3U4?yo.br=true';

// Live test
const TEST_LIVE = 'https://csm-e-sdk-validation.bln1.yospace.com/csm/access/207411697/c2FtcGxlL21hc3Rlci5tM3U4?yo.br=true';

ads: {
  enabled: true,
  provider: 'yospace',
  manifestUrl: TEST_VOD,
}
```

## See Also

- [Getting Started](./getting-started.md) - Ads overview
- [Google DAI](./google-dai.md) - Server-side ads *(Pro)*
- [Events](../events/overview.md) - Event handling

