# Google IMA

Integrate Google's Interactive Media Ads SDK for client-side advertising.

## Overview

Google IMA (Interactive Media Ads) provides:
- **VAST/VMAP Support** - Industry-standard ad formats
- **Pre/Mid/Post-roll** - Flexible ad placement
- **Ad Pods** - Multiple ads in sequence
- **Skippable Ads** - User can skip after countdown
- **Click-through** - Users can click ads
- **VPAID Support** - Interactive ads

## Basic Setup

```tsx
import { useVideoPlayer, VideoView } from 'react-native-video';

const player = useVideoPlayer({
  source: {
    uri: 'https://example.com/video.mp4',
  },
  ads: {
    enabled: true,
    provider: 'ima',
    adTagUrl: 'https://pubads.g.doubleclick.net/gampad/ads?...', // VAST tag
  },
});

return <VideoView player={player} style={{ flex: 1 }} />;
```

## Configuration

### Ad Tag URL

Provide VAST/VMAP ad tag URL:

```tsx
ads: {
  enabled: true,
  provider: 'ima',
  adTagUrl: 'https://pubads.g.doubleclick.net/gampad/ads?iu=/123/video&...', // Your ad tag
}
```

### Multiple Ad Breaks

Use VMAP for multiple ad breaks:

```tsx
ads: {
  enabled: true,
  provider: 'ima',
  adTagUrl: 'https://example.com/vmap.xml', // VMAP with pre/mid/post-roll
}
```

### Companion Ads

Display companion banners:

```tsx
ads: {
  enabled: true,
  provider: 'ima',
  adTagUrl: '...',
  companionSlots: [
    { id: 'companion-1', width: 300, height: 250 },
    { id: 'companion-2', width: 728, height: 90 },
  ],
}
```

## Ad Events

Listen to IMA ad events:

```tsx
// Ad started
player.addEventListener('adStart', (ad) => {
  console.log('Ad started:', ad);
  console.log('Duration:', ad.duration);
  console.log('Title:', ad.title);
  console.log('Skippable:', ad.skippable);
  console.log('Skip offset:', ad.skipOffset);
});

// Ad progress
player.addEventListener('adProgress', (progress) => {
  console.log('Ad progress:', progress.currentTime, '/', progress.duration);
});

// Ad paused/resumed
player.addEventListener('adPause', () => {
  console.log('Ad paused');
});

player.addEventListener('adResume', () => {
  console.log('Ad resumed');
});

// Ad completed
player.addEventListener('adComplete', () => {
  console.log('Ad completed');
});

// Ad skipped
player.addEventListener('adSkipped', () => {
  console.log('Ad skipped by user');
});

// Ad clicked
player.addEventListener('adClick', () => {
  console.log('Ad clicked');
  // Optionally pause main video
  player.pause();
});

// Ad error
player.addEventListener('adError', (error) => {
  console.error('Ad error:', error.message);
  // Continue with main content
});

// All ads completed
player.addEventListener('allAdsCompleted', () => {
  console.log('All ads completed');
});
```

## Ad Controls

### Skip Ad

```tsx
// Check if skippable
if (player.isAdSkippable()) {
  player.skipAd();
}
```

### Pause/Resume Ad

```tsx
// Pause ad
player.pauseAd();

// Resume ad
player.resumeAd();
```

### Get Current Ad

```tsx
const currentAd = player.getCurrentAd();

if (currentAd) {
  console.log('Title:', currentAd.title);
  console.log('Duration:', currentAd.duration);
  console.log('Remaining:', currentAd.remainingTime);
  console.log('Position:', currentAd.adPosition); // 'pre', 'mid', 'post'
  console.log('Total ads in pod:', currentAd.totalAdsInPod);
  console.log('Ad index in pod:', currentAd.adIndexInPod);
}
```

## Custom UI

### Skip Button

```tsx
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

function CustomSkipButton({ player }) {
  const [canSkip, setCanSkip] = useState(false);
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    const onAdProgress = (progress) => {
      const ad = player.getCurrentAd();
      if (!ad) return;

      const timeUntilSkip = ad.skipOffset - progress.currentTime;
      
      if (timeUntilSkip <= 0) {
        setCanSkip(true);
        setCountdown(0);
      } else {
        setCanSkip(false);
        setCountdown(Math.ceil(timeUntilSkip));
      }
    };

    player.addEventListener('adProgress', onAdProgress);
    return () => player.removeEventListener('adProgress', onAdProgress);
  }, []);

  if (!canSkip && countdown === 0) return null;

  return (
    <TouchableOpacity
      style={styles.skipButton}
      onPress={() => player.skipAd()}
      disabled={!canSkip}
    >
      <Text>
        {canSkip ? 'Skip Ad ›' : `Skip in ${countdown}s`}
      </Text>
    </TouchableOpacity>
  );
}
```

### Ad Countdown

```tsx
function AdCountdown({ player }) {
  const [remaining, setRemaining] = useState(0);

  useEffect(() => {
    const onAdProgress = (progress) => {
      setRemaining(Math.ceil(progress.duration - progress.currentTime));
    };

    player.addEventListener('adProgress', onAdProgress);
    return () => player.removeEventListener('adProgress', onAdProgress);
  }, []);

  return <Text style={styles.countdown}>Ad: {remaining}s</Text>;
}
```

## Complete Example

```tsx
import React, { useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useVideoPlayer, VideoView } from 'react-native-video';

function VideoWithAds({ videoUrl, adTagUrl }) {
  const [isAdPlaying, setIsAdPlaying] = useState(false);
  const [adTitle, setAdTitle] = useState('');

  const player = useVideoPlayer({
    source: { uri: videoUrl },
    ads: {
      enabled: true,
      provider: 'ima',
      adTagUrl,
    },
  });

  // Ad events
  player.addEventListener('adStart', (ad) => {
    setIsAdPlaying(true);
    setAdTitle(ad.title || 'Advertisement');
  });

  player.addEventListener('adComplete', () => {
    setIsAdPlaying(false);
    setAdTitle('');
  });

  player.addEventListener('adError', (error) => {
    console.error('Ad error:', error);
    setIsAdPlaying(false);
  });

  return (
    <View style={styles.container}>
      <VideoView player={player} style={styles.video} />
      
      {isAdPlaying && (
        <View style={styles.adOverlay}>
          <Text style={styles.adBadge}>Ad</Text>
          <Text style={styles.adTitle}>{adTitle}</Text>
          <CustomSkipButton player={player} />
        </View>
      )}
    </View>
  );
}
```

## Advanced Configuration

### Request Settings

Configure ad request:

```tsx
ads: {
  enabled: true,
  provider: 'ima',
  adTagUrl: '...',
  requestSettings: {
    omidVersion: '1.3.7',
    playerType: 'react-native-video',
    playerVersion: '6.0.0',
    ppid: 'user123', // Publisher Provided ID
  },
}
```

### Ad UI Settings

Customize ad UI:

```tsx
ads: {
  enabled: true,
  provider: 'ima',
  adTagUrl: '...',
  uiSettings: {
    showCountdown: true,
    showAdAttribution: true,
  },
}
```

## Testing

Use Google's test ads:

```tsx
const TEST_AD_TAG = 'https://pubads.g.doubleclick.net/gampad/ads?iu=/21775744923/external/single_ad_samples&sz=640x480&cust_params=sample_ct%3Dlinear&ciu_szs=300x250%2C728x90&gdfp_req=1&output=vast&unviewed_position_start=1&env=vp&impl=s&correlator=';

ads: {
  enabled: true,
  provider: 'ima',
  adTagUrl: TEST_AD_TAG,
}
```

## Platform Setup

### iOS

Add to `Info.plist`:

```xml
<key>NSAppTransportSecurity</key>
<dict>
  <key>NSAllowsArbitraryLoads</key>
  <true/>
</dict>
```

### Android

No additional setup required.

## Best Practices

1. **Error Handling** - Always handle ad errors gracefully
2. **Loading States** - Show loading indicator during ad load
3. **User Control** - Respect skip button and ad timing
4. **Analytics** - Track ad impressions and completions
5. **Testing** - Test with various ad formats
6. **Fallback** - Continue content if ads fail

## Troubleshooting

### Ads Not Playing

- Verify ad tag URL is correct
- Check network connectivity
- Review ad error messages
- Test with Google's sample ad tags

### Ads Blocked

- Ad blockers may block IMA SDK
- Use HTTPS for ad tags
- Check app transport security settings

## See Also

- [Getting Started](./getting-started.md) - Ads overview
- [Google DAI](./google-dai.md) - Server-side ads *(Pro)*
- [Events](../events/useEvent.md) - Event handling

