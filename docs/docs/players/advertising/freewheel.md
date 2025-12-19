# FreeWheel

Enterprise-grade ad management with FreeWheel platform.

:::tip Pro Feature - Coming Soon
FreeWheel integration is a Pro feature currently in development.
:::

## Overview

FreeWheel provides:
- **Enterprise Ad Management** - Complete ad workflow
- **Multi-Platform** - Web, mobile, CTV, STB
- **Advanced Targeting** - Sophisticated audience targeting
- **Yield Optimization** - Maximize ad revenue
- **Real-Time Decisioning** - Dynamic ad insertion
- **Comprehensive Analytics** - Detailed reporting

## Basic Setup

```tsx
import { useVideoPlayer, VideoView } from 'react-native-video';

const player = useVideoPlayer({
  source: {
    uri: 'https://example.com/video.mp4',
  },
  ads: {
    enabled: true,
    provider: 'freewheel',
    networkId: 'your-network-id',
    serverUrl: 'https://your-freewheel-server.com',
  },
});

return <VideoView player={player} />;
```

## Configuration

### Network Configuration

```tsx
ads: {
  enabled: true,
  provider: 'freewheel',
  networkId: '123456',
  serverUrl: 'https://demo.v.fwmrm.net/ad/g/1',
  profileId: 'your-profile-id',
  sectionId: 'your-section-id',
}
```

### Video Asset

Provide video asset information:

```tsx
ads: {
  enabled: true,
  provider: 'freewheel',
  networkId: '123456',
  serverUrl: '...',
  videoAsset: {
    id: 'video_123',
    duration: 300, // seconds
    url: 'https://example.com/video.mp4',
  },
}
```

### Site Section

Configure site section for targeting:

```tsx
ads: {
  enabled: true,
  provider: 'freewheel',
  networkId: '123456',
  serverUrl: '...',
  siteSection: {
    id: 'homepage',
    pageViewRandom: Math.random(),
    networkId: '123456',
  },
}
```

## Temporal Slots

Define ad break positions:

```tsx
ads: {
  enabled: true,
  provider: 'freewheel',
  networkId: '123456',
  serverUrl: '...',
  temporalSlots: [
    {
      customId: 'preroll',
      adUnit: 'preroll',
      timePosition: 0,
      maxDuration: 30,
    },
    {
      customId: 'midroll-1',
      adUnit: 'midroll',
      timePosition: 120, // 2 minutes
      maxDuration: 60,
    },
    {
      customId: 'postroll',
      adUnit: 'postroll',
      timePosition: 300, // end
      maxDuration: 30,
    },
  ],
}
```

## Custom Parameters

Pass targeting parameters:

```tsx
ads: {
  enabled: true,
  provider: 'freewheel',
  networkId: '123456',
  serverUrl: '...',
  parameters: {
    _fw_player_profile: 'react-native',
    _fw_app_name: 'MyApp',
    _fw_app_version: '1.0.0',
    _fw_device_category: 'mobile',
    custom_param1: 'value1',
    custom_param2: 'value2',
  },
}
```

## Ad Events

```tsx
// Request complete
player.addEventListener('freeWheelRequestComplete', (response) => {
  console.log('Ad request complete:', response);
  console.log('Total ads:', response.totalAds);
});

// Slot started
player.addEventListener('freeWheelSlotStarted', (slot) => {
  console.log('Slot started:', slot.customId);
  console.log('Time position:', slot.timePosition);
});

// Slot ended
player.addEventListener('freeWheelSlotEnded', (slot) => {
  console.log('Slot ended:', slot.customId);
});

// Ad impression
player.addEventListener('freeWheelAdImpression', (ad) => {
  console.log('Ad impression:', ad.adId);
  console.log('Creative ID:', ad.creativeId);
  console.log('Duration:', ad.duration);
});

// Ad clicked
player.addEventListener('freeWheelAdClick', (ad) => {
  console.log('Ad clicked:', ad.adId);
});

// Ad error
player.addEventListener('freeWheelAdError', (error) => {
  console.error('FreeWheel error:', error);
});
```

## Slot Controls

Control ad slot playback:

```tsx
// Play slot
player.playAdSlot('midroll-1');

// Skip slot (if allowed)
player.skipAdSlot('midroll-1');

// Get slot info
const slotInfo = player.getAdSlotInfo('midroll-1');
console.log('Slot:', slotInfo);
```

## Complete Example

```tsx
import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { useVideoPlayer, VideoView } from 'react-native-video';

function VideoWithFreeWheelAds({ video }) {
  const [currentSlot, setCurrentSlot] = useState(null);
  const [totalAds, setTotalAds] = useState(0);

  const player = useVideoPlayer({
    source: { uri: video.url },
    ads: {
      enabled: true,
      provider: 'freewheel',
      networkId: 'your-network-id',
      serverUrl: 'https://demo.v.fwmrm.net/ad/g/1',
      profileId: 'your-profile',
      videoAsset: {
        id: video.id,
        duration: video.duration,
        url: video.url,
      },
      temporalSlots: [
        {
          customId: 'preroll',
          adUnit: 'preroll',
          timePosition: 0,
          maxDuration: 30,
        },
        {
          customId: 'midroll',
          adUnit: 'midroll',
          timePosition: video.duration / 2,
          maxDuration: 60,
        },
      ],
      parameters: {
        _fw_player_profile: 'react-native-video',
        _fw_app_name: 'MyApp',
      },
    },
  });

  useEffect(() => {
    player.addEventListener('freeWheelRequestComplete', (response) => {
      setTotalAds(response.totalAds);
    });

    player.addEventListener('freeWheelSlotStarted', (slot) => {
      setCurrentSlot(slot.customId);
    });

    player.addEventListener('freeWheelSlotEnded', () => {
      setCurrentSlot(null);
    });

    return () => {
      // Cleanup
    };
  }, []);

  return (
    <View>
      <VideoView player={player} style={styles.video} />
      
      {currentSlot && (
        <View style={styles.adOverlay}>
          <Text>Ad Break: {currentSlot}</Text>
          <Text>Total Ads: {totalAds}</Text>
        </View>
      )}
    </View>
  );
}
```

## Advanced Features

### Ad Scheduling

Dynamic ad scheduling:

```tsx
// Add slot dynamically
player.addTemporalSlot({
  customId: 'dynamic-slot',
  adUnit: 'midroll',
  timePosition: 180,
  maxDuration: 30,
});

// Remove slot
player.removeTemporalSlot('dynamic-slot');
```

### Key-Value Targeting

```tsx
ads: {
  enabled: true,
  provider: 'freewheel',
  networkId: '123456',
  serverUrl: '...',
  keyValues: {
    genre: ['action', 'thriller'],
    rating: 'pg-13',
    premium: 'true',
  },
}
```

## Platform Support

| Platform | Supported |
|----------|-----------|
| iOS | ✅ |
| Android | ✅ |
| Android TV | ✅ |
| Apple TV | ✅ |

## Best Practices

1. **Temporal Slots** - Define clear ad break positions
2. **Parameters** - Provide detailed targeting data
3. **Error Handling** - Handle ad failures gracefully
4. **Analytics** - Use FreeWheel's reporting
5. **Testing** - Test with FreeWheel demo server

## See Also

- [Getting Started](./getting-started.md) - Ads overview
- [Google DAI](./google-dai.md) - Server-side ads *(Pro)*
- [SpotX](./spotx.md) - Premium ads *(Pro)*

