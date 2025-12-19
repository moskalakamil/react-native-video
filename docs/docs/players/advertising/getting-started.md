# Getting Started with Ads

Monetize your videos with integrated advertising solutions.

## Overview

React Native Video supports multiple ad platforms:

| Platform | Description | Type | Status |
|----------|-------------|------|--------|
| **Google IMA** | Industry-standard client-side ads | Free | ✅ Available |
| **Google DAI** | Server-side ad insertion (SSAI) | Pro | 🔮 Planned |
| **SpotX** | Premium video advertising | Pro | 🔮 Planned |
| **FreeWheel** | Enterprise ad management | Pro | 🔮 Planned |
| **Yospace** | Server-side ad insertion | Pro | 🔮 Planned |

## Ad Types

### Client-Side Ads (CSAI)

Ads are inserted on the client device:

- **Google IMA** - Free, VAST/VMAP support
- Works with most ad networks
- Client handles ad playback

**Benefits:**
- Easy integration
- Works with any video source
- No server-side setup

**Drawbacks:**
- Ad blockers can block
- Network switching visible
- Limited tracking

### Server-Side Ads (SSAI)

Ads are stitched into video stream on server:

- **Google DAI** - Google's SSAI solution *(Pro)*
- **Yospace** - Premium SSAI platform *(Pro)*
- Server stitches ads seamlessly

**Benefits:**
- Ad-blocker resistant
- Seamless transitions
- Better tracking
- Consistent quality

**Drawbacks:**
- Requires server-side setup
- More complex integration

## Quick Start

### Client-Side (Google IMA)

```tsx
import { useVideoPlayer, VideoView } from 'react-native-video';

const player = useVideoPlayer({
  source: {
    uri: 'https://example.com/video.mp4',
  },
  ads: {
    enabled: true,
    provider: 'ima', // Google IMA
    adTagUrl: 'https://example.com/vast.xml',
  },
});

return <VideoView player={player} />;
```

### Server-Side (Google DAI) *(Pro)*

```tsx
const player = useVideoPlayer({
  source: {
    uri: 'https://dai.google.com/...',
    type: 'dai',
  },
  ads: {
    enabled: true,
    provider: 'dai',
    contentSourceId: '123',
    videoId: 'abc',
  },
});
```

## Ad Events

Listen to ad lifecycle events:

```tsx
player.addEventListener('adStart', (ad) => {
  console.log('Ad started:', ad.duration);
});

player.addEventListener('adComplete', () => {
  console.log('Ad completed');
});

player.addEventListener('adSkipped', () => {
  console.log('Ad skipped');
});

player.addEventListener('adError', (error) => {
  console.error('Ad error:', error);
});
```

## Ad Controls

Control ad playback:

```tsx
// Skip ad (if skippable)
player.skipAd();

// Check if ad is playing
const isPlayingAd = player.isPlayingAd();

// Get current ad
const currentAd = player.getCurrentAd();
console.log('Ad time remaining:', currentAd.remainingTime);
```

## Platform Support

| Platform | IMA | DAI | SpotX | FreeWheel | Yospace |
|----------|-----|-----|-------|-----------|---------|
| iOS | ✅ | 🔮 | 🔮 | 🔮 | 🔮 |
| Android | ✅ | 🔮 | 🔮 | 🔮 | 🔮 |
| Android TV | ✅ | 🔮 | 🔮 | 🔮 | 🔮 |
| Apple TV | ✅ | 🔮 | 🔮 | 🔮 | 🔮 |

## Next Steps

- [Google IMA](./google-ima.md) - Client-side ads (Free)
- [Google DAI](./google-dai.md) - Server-side ads *(Pro)*
- [SpotX](./spotx.md) - Premium video ads *(Pro)*
- [FreeWheel](./freewheel.md) - Enterprise ads *(Pro)*
- [Yospace](./yospace.md) - SSAI platform *(Pro)*

