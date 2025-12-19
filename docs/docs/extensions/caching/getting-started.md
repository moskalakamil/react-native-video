# Getting Started

Pre-cache video content for instant playback and offline viewing.

:::tip Pro Feature - Coming Soon
Video caching is a Pro feature currently in development.
:::

## Overview

Video caching enables:
- **Instant Playback** - Start playing immediately from cache
- **Partial Caching** - Cache percentage of video (e.g., 50%)
- **Background Caching** - Pre-cache videos while app is idle
- **Smart Storage** - Automatic cache management based on space
- **Offline Viewing** - Play cached videos without network
- **Adaptive Caching** - Cache based on network and storage

## How It Works

```tsx
import { VideoCache } from 'react-native-video';

// Cache 50% of a video
await VideoCache.cache({
  url: 'https://example.com/video.mp4',
  percentage: 50, // Cache first 50%
});

// Play from cache
const player = useVideoPlayer({
  source: {
    uri: 'https://example.com/video.mp4',
    cache: true, // Use cache if available
  },
});
```

## Quick Start

### 1. Enable Caching

```tsx
import { VideoCache } from 'react-native-video';

// Configure cache
VideoCache.configure({
  maxCacheSize: 500 * 1024 * 1024, // 500 MB
  defaultCachePercentage: 50, // Cache 50% by default
  enableBackgroundCaching: true,
});
```

### 2. Cache a Video

```tsx
// Cache specific video
const cacheJob = await VideoCache.cache({
  url: 'https://example.com/video.mp4',
  percentage: 50,
  priority: 'high',
});

// Monitor progress
cacheJob.onProgress((progress) => {
  console.log(`Cached: ${progress.percentage}%`);
});

await cacheJob.start();
```

### 3. Play Cached Video

```tsx
const player = useVideoPlayer({
  source: {
    uri: 'https://example.com/video.mp4',
    cache: true,
  },
});

// Check if cached
const isCached = await VideoCache.isCached('https://example.com/video.mp4');
console.log('Video cached:', isCached);
```

## Cache Strategies

### Partial Cache (Recommended)

Cache first portion of videos for quick startup:

```tsx
await VideoCache.cache({
  url: 'https://example.com/video.mp4',
  percentage: 50, // First 50%
});
```

**Benefits:**
- Quick playback startup
- Saves storage space
- Works for most use cases

### Full Cache

Cache entire video for offline playback:

```tsx
await VideoCache.cache({
  url: 'https://example.com/video.mp4',
  percentage: 100, // Entire video
});
```

**Benefits:**
- Complete offline support
- No network needed during playback
- Best user experience

### Adaptive Cache

Automatically adjust cache based on conditions:

```tsx
await VideoCache.cache({
  url: 'https://example.com/video.mp4',
  adaptive: true, // Adjust based on network/storage
  minPercentage: 25,
  maxPercentage: 75,
});
```

## Background Caching

Pre-cache videos when app is idle:

```tsx
// Add to background cache queue
await VideoCache.queueForBackground([
  { url: 'https://example.com/video1.mp4', percentage: 50 },
  { url: 'https://example.com/video2.mp4', percentage: 50 },
  { url: 'https://example.com/video3.mp4', percentage: 50 },
]);

// Caching happens automatically when:
// - Device is charging
// - Connected to WiFi
// - App is idle
```

## Cache Status

Check cache status:

```tsx
// Check if URL is cached
const isCached = await VideoCache.isCached('https://example.com/video.mp4');

// Get cache info
const info = await VideoCache.getInfo('https://example.com/video.mp4');
console.log(info);
// {
//   cached: true,
//   percentage: 50,
//   size: 25 * 1024 * 1024, // 25 MB
//   createdAt: Date,
//   lastAccessed: Date
// }

// Get all cached videos
const cached = await VideoCache.getAllCached();
```

## Cache Management

### Clear Cache

```tsx
// Clear specific video
await VideoCache.clear('https://example.com/video.mp4');

// Clear all cache
await VideoCache.clearAll();

// Clear old cache
await VideoCache.clearOlderThan(7 * 24 * 60 * 60 * 1000); // 7 days
```

### Storage Info

```tsx
const storage = await VideoCache.getStorageInfo();
console.log(storage);
// {
//   totalSize: 500 * 1024 * 1024, // 500 MB
//   usedSize: 250 * 1024 * 1024, // 250 MB
//   availableSize: 250 * 1024 * 1024, // 250 MB
//   cachedVideos: 10
// }
```

## Platform Configuration

### iOS

Add to `Info.plist`:

```xml
<key>UIBackgroundModes</key>
<array>
  <string>fetch</string>
</array>
```

### Android

Add to `AndroidManifest.xml`:

```xml
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
```

## Complete Example

```tsx
import React, { useEffect, useState } from 'react';
import { View, Text, Button, ProgressBar } from 'react-native';
import { VideoCache, useVideoPlayer, VideoView } from 'react-native-video';

function CachedVideoPlayer({ videoUrl }) {
  const [cacheProgress, setCacheProgress] = useState(0);
  const [isCached, setIsCached] = useState(false);
  const [caching, setCaching] = useState(false);

  useEffect(() => {
    checkCache();
  }, []);

  const checkCache = async () => {
    const cached = await VideoCache.isCached(videoUrl);
    setIsCached(cached);
    
    if (cached) {
      const info = await VideoCache.getInfo(videoUrl);
      setCacheProgress(info.percentage);
    }
  };

  const startCaching = async () => {
    setCaching(true);
    
    const cacheJob = await VideoCache.cache({
      url: videoUrl,
      percentage: 50,
      priority: 'high',
    });

    cacheJob.onProgress((progress) => {
      setCacheProgress(progress.percentage);
    });

    cacheJob.onComplete(() => {
      setIsCached(true);
      setCaching(false);
    });

    await cacheJob.start();
  };

  const player = useVideoPlayer({
    source: {
      uri: videoUrl,
      cache: true,
    },
  });

  return (
    <View>
      <VideoView player={player} style={{ width: '100%', height: 300 }} />
      
      <View style={styles.cacheInfo}>
        <Text>Cache Status: {isCached ? '✅ Cached' : '❌ Not Cached'}</Text>
        {cacheProgress > 0 && (
          <>
            <Text>Cache Progress: {cacheProgress}%</Text>
            <ProgressBar progress={cacheProgress / 100} />
          </>
        )}
      </View>

      {!isCached && !caching && (
        <Button title="Cache Video (50%)" onPress={startCaching} />
      )}

      {caching && <Text>Caching...</Text>}
    </View>
  );
}
```

## Best Practices

1. **Partial Caching** - Cache 30-50% for best balance
2. **Background Caching** - Pre-cache popular content
3. **Storage Limits** - Set reasonable max cache size
4. **Auto Cleanup** - Remove old/unused cache regularly
5. **WiFi Only** - Cache on WiFi to save cellular data
6. **User Control** - Let users manage cache

## Next Steps

- [Cache Configuration](./configuration.md) - Configure caching behavior
- [Preloading](./preloading.md) - Pre-cache videos strategically
- [Cache Management](./management.md) - Manage cached content
- [Storage](./storage.md) - Storage configuration

