# Getting Started

Pre-cache video content for instant playback and reduced bandwidth usage.

:::tip Pro Feature - Coming Soon
Video caching is a Pro feature currently in development.
:::

## Overview

Video caching provides:

| Feature | Description |
|---------|-------------|
| **Instant Playback** | Zero startup delay from cached content |
| **Seamless Streaming** | Play while caching in background |
| **Partial Caching** | Cache only first X% or X seconds |
| **Offline Playback** | Watch without network connection |
| **Smart Cleanup** | Automatic LRU-based cache management |
| **Bandwidth Savings** | Reduce data usage on repeat views |

## Quick Start

### Automatic Caching

The simplest approach - cache is used automatically:

```tsx
import { useVideoPlayer, VideoView } from 'react-native-video';

function Player({ source }) {
  const player = useVideoPlayer({
    uri: source,
    cache: true, // Enable caching
  });

  return <VideoView player={player} />;
}
```

That's it! The SDK automatically:
- Caches video segments as they stream
- Uses cached data on repeat playback
- Manages storage limits

### Manual Caching

For more control, cache videos before playback:

```tsx
import { useCache } from 'react-native-video';

function VideoItem({ video }) {
  const cache = useCache(video.url);

  useEffect(() => {
    // Cache first 30 seconds to disk
    cache.save({ duration: 30 });
  }, []);

  return (
    <View>
      <Text>Cached: {cache.progress}%</Text>
      <VideoView player={player} />
    </View>
  );
}
```

## useCache Hook

React hook for caching control:

```tsx
const cache = useCache(url: string);
```

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `isCached` | `boolean` | Whether video has cached content |
| `progress` | `number` | Cache progress (0-100) |
| `size` | `number` | Cached size in bytes |
| `status` | `CacheStatus` | `'idle'` \| `'caching'` \| `'cached'` \| `'error'` |

### Methods

| Method | Description |
|--------|-------------|
| `save(options)` | Save video to cache (persistent) |
| `cancel()` | Cancel ongoing caching |
| `clear()` | Remove from cache |

### Example

```tsx
function SmartVideoPlayer({ source }) {
  const cache = useCache(source);
  const player = useVideoPlayer({ uri: source, cache: true });

  // Cache on mount - persists across app restarts
  useEffect(() => {
    if (!cache.isCached) {
      cache.save({ percentage: 50 });
    }
  }, []);

  return (
    <View>
      <VideoView player={player} />
      
      {cache.status === 'caching' && (
        <ProgressBar progress={cache.progress / 100} />
      )}
    </View>
  );
}
```

## Cache Options

```ts
interface CacheOptions {
  percentage?: number;  // Cache first X% (default: 100)
  duration?: number;    // Cache first X seconds
  priority?: 'high' | 'medium' | 'low';
  networkPolicy?: 'any' | 'wifi' | 'unmetered';
}
```

### Cache by Percentage

```tsx
// Cache first 50% - persists on disk
cache.save({ percentage: 50 });
```

### Cache by Duration

```tsx
// Cache first 30 seconds
cache.save({ duration: 30 });
```

### Priority Caching

```tsx
// High priority - cache immediately
cache.save({ priority: 'high' });

// Low priority - cache when idle
cache.save({ priority: 'low' });
```

### Network Policy

```tsx
// Only cache on WiFi
cache.save({ networkPolicy: 'wifi' });

// Only on unmetered connections
cache.save({ networkPolicy: 'unmetered' });
```

## Feed Caching

Cache videos as user scrolls - they persist across app restarts:

```tsx
import { FlatList } from 'react-native';
import { useCache, useVideoPlayer, VideoView, VideoCache } from 'react-native-video';

function VideoFeed({ videos }) {
  return (
    <FlatList
      data={videos}
      renderItem={({ item, index }) => (
        <VideoItem video={item} index={index} />
      )}
      onViewableItemsChanged={({ viewableItems }) => {
        // Cache next 2 videos to disk
        viewableItems.forEach(({ index }) => {
          const nextVideos = videos.slice(index + 1, index + 3);
          nextVideos.forEach(v => VideoCache.save(v.url, { percentage: 30 }));
        });
      }}
    />
  );
}

function VideoItem({ video }) {
  const cache = useCache(video.url);
  const player = useVideoPlayer({ uri: video.url, cache: true });

  return (
    <View>
      <VideoView player={player} style={{ height: 300 }} />
      {cache.isCached && <CachedBadge />}
    </View>
  );
}
```

## Global Configuration

Configure caching behavior globally:

```tsx
import { VideoCache } from 'react-native-video';

// At app startup
VideoCache.configure({
  // Storage
  maxSize: 500 * 1024 * 1024, // 500 MB
  
  // Behavior
  defaultPercentage: 50,
  networkPolicy: 'wifi',
  
  // Cleanup
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  cleanupStrategy: 'lru',
});
```

## Cache Status

Check cache status for any URL:

```tsx
const status = await VideoCache.getStatus(url);

console.log(status);
// {
//   isCached: true,
//   percentage: 50,
//   size: 25_000_000, // 25 MB
//   createdAt: Date,
//   lastAccessed: Date,
// }
```

## Complete Example

```tsx
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { 
  useVideoPlayer, 
  VideoView, 
  useCache,
  VideoCache 
} from 'react-native-video';

// Configure at app startup
VideoCache.configure({
  maxSize: 500 * 1024 * 1024,
  networkPolicy: 'wifi',
});

function App() {
  const [videos] = useState([
    { id: '1', url: 'https://example.com/video1.mp4', title: 'Video 1' },
    { id: '2', url: 'https://example.com/video2.mp4', title: 'Video 2' },
    { id: '3', url: 'https://example.com/video3.mp4', title: 'Video 3' },
  ]);

  return (
    <FlatList
      data={videos}
      renderItem={({ item }) => <CachedVideoPlayer video={item} />}
      keyExtractor={(item) => item.id}
    />
  );
}

function CachedVideoPlayer({ video }) {
  const cache = useCache(video.url);
  
  const player = useVideoPlayer({
    uri: video.url,
    cache: true,
  }, (_player) => {
    _player.play();
  });

  // Cache first 30 seconds - persists on disk
  useEffect(() => {
    if (!cache.isCached) {
      cache.save({ duration: 30 });
    }
  }, []);

  return (
    <View style={styles.container}>
      <VideoView player={player} style={styles.video} />
      
      <View style={styles.info}>
        <Text style={styles.title}>{video.title}</Text>
        
        {cache.status === 'caching' && (
          <Text>Caching: {cache.progress}%</Text>
        )}
        
        {cache.isCached && (
          <View style={styles.cachedBadge}>
            <Text>✓ Cached</Text>
          </View>
        )}
      </View>
      
      <TouchableOpacity onPress={() => cache.clear()}>
        <Text>Clear Cache</Text>
      </TouchableOpacity>
    </View>
  );
}
```

## Platform Configuration

### iOS

Add background fetch capability for background caching:

```xml
<!-- Info.plist -->
<key>UIBackgroundModes</key>
<array>
  <string>fetch</string>
</array>
```

### Android

Required permissions:

```xml
<!-- AndroidManifest.xml -->
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
```

## Platform Support

| Feature | iOS | Android |
|---------|-----|---------|
| Automatic caching | ✅ | ✅ |
| Partial caching | ✅ | ✅ |
| Background caching | ✅ | ✅ |
| Offline playback | ✅ | ✅ |
| HLS caching | ✅ | ✅ |
| DASH caching | ❌ | ✅ |

## Next Steps

- [Configuration](./configuration.md) - Advanced cache settings
- [Strategies](./strategies.md) - Smart caching strategies
- [Management](./management.md) - Cache cleanup and monitoring
- [Storage](./storage.md) - Storage optimization
