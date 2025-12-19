# SpotX

Premium video advertising with SpotX platform.

:::tip Pro Feature - Coming Soon
SpotX integration is a Pro feature currently in development.
:::

## Overview

SpotX provides:
- **Premium Video Ads** - High-quality ad inventory
- **VAST/VPAID Support** - Industry standards
- **Header Bidding** - Maximize revenue
- **Advanced Targeting** - Audience segmentation
- **Real-Time Analytics** - Detailed reporting
- **Cross-Platform** - Consistent experience

## Basic Setup

```tsx
import { useVideoPlayer, VideoView } from 'react-native-video';

const player = useVideoPlayer({
  source: {
    uri: 'https://example.com/video.mp4',
  },
  ads: {
    enabled: true,
    provider: 'spotx',
    channelId: 'your-channel-id',
  },
});

return <VideoView player={player} />;
```

## Configuration

### Channel Configuration

```tsx
ads: {
  enabled: true,
  provider: 'spotx',
  channelId: '123456',
  publisherId: 'your-publisher-id',
}
```

### Content Metadata

Provide content metadata for better targeting:

```tsx
ads: {
  enabled: true,
  provider: 'spotx',
  channelId: '123456',
  contentMetadata: {
    title: 'Video Title',
    description: 'Video description',
    duration: 300, // seconds
    category: 'sports',
    tags: ['football', 'highlights'],
  },
}
```

### User Targeting

```tsx
ads: {
  enabled: true,
  provider: 'spotx',
  channelId: '123456',
  userTargeting: {
    age: 25,
    gender: 'male',
    interests: ['sports', 'technology'],
  },
}
```

## Ad Events

```tsx
// Ad loaded
player.addEventListener('adLoaded', (ad) => {
  console.log('Ad loaded:', ad);
});

// Ad started
player.addEventListener('adStart', (ad) => {
  console.log('Ad started:', ad.title);
});

// Ad quartiles
player.addEventListener('adFirstQuartile', () => {
  console.log('Ad 25% complete');
});

player.addEventListener('adMidpoint', () => {
  console.log('Ad 50% complete');
});

player.addEventListener('adThirdQuartile', () => {
  console.log('Ad 75% complete');
});

// Ad completed
player.addEventListener('adComplete', () => {
  console.log('Ad completed');
});

// Ad error
player.addEventListener('adError', (error) => {
  console.error('SpotX error:', error);
});
```

## Advanced Features

### Header Bidding

Enable header bidding for maximum revenue:

```tsx
ads: {
  enabled: true,
  provider: 'spotx',
  channelId: '123456',
  headerBidding: {
    enabled: true,
    timeout: 2000, // ms
    bidders: ['appnexus', 'rubicon', 'pubmatic'],
  },
}
```

### Ad Pods

Configure multiple ads in sequence:

```tsx
ads: {
  enabled: true,
  provider: 'spotx',
  channelId: '123456',
  adPods: {
    maxAdsPerPod: 3,
    minAdDuration: 15, // seconds
    maxAdDuration: 30, // seconds
  },
}
```

### Custom Parameters

Pass custom targeting parameters:

```tsx
ads: {
  enabled: true,
  provider: 'spotx',
  channelId: '123456',
  customParams: {
    section: 'homepage',
    device_type: 'mobile',
    app_version: '1.0.0',
  },
}
```

## Complete Example

```tsx
import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { useVideoPlayer, VideoView } from 'react-native-video';

function VideoWithSpotXAds({ video }) {
  const [adPlaying, setAdPlaying] = useState(false);
  const [adProgress, setAdProgress] = useState(0);

  const player = useVideoPlayer({
    source: { uri: video.url },
    ads: {
      enabled: true,
      provider: 'spotx',
      channelId: 'your-channel-id',
      contentMetadata: {
        title: video.title,
        duration: video.duration,
        category: video.category,
      },
      headerBidding: {
        enabled: true,
        timeout: 2000,
      },
    },
  });

  player.addEventListener('adStart', () => {
    setAdPlaying(true);
  });

  player.addEventListener('adProgress', (progress) => {
    setAdProgress(progress.percentage);
  });

  player.addEventListener('adComplete', () => {
    setAdPlaying(false);
    setAdProgress(0);
  });

  return (
    <View>
      <VideoView player={player} style={styles.video} />
      
      {adPlaying && (
        <View style={styles.adOverlay}>
          <Text>Ad: {adProgress}%</Text>
        </View>
      )}
    </View>
  );
}
```

## Best Practices

1. **Metadata** - Provide detailed content metadata
2. **Header Bidding** - Enable for maximum revenue
3. **Error Handling** - Handle ad failures gracefully
4. **Analytics** - Track ad performance
5. **User Experience** - Balance ads with content

## See Also

- [Getting Started](./getting-started.md) - Ads overview
- [Google IMA](./google-ima.md) - Client-side ads
- [FreeWheel](./freewheel.md) - Enterprise ads *(Pro)*

