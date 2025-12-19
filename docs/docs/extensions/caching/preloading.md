# Preloading

Strategically pre-cache videos for optimal user experience.

:::tip Pro Feature - Coming Soon
Video caching is a Pro feature currently in development.
:::

## Overview

Preloading strategies:
- **On Demand** - Cache when user navigates to video
- **Predictive** - Cache likely-to-watch videos
- **Background** - Cache during idle time
- **Scheduled** - Cache at specific times
- **Smart Queue** - Priority-based caching

## On-Demand Preloading

Cache when user views or scrolls to video:

```tsx
import { VideoCache } from 'react-native-video';

function VideoItem({ video, isVisible }) {
  useEffect(() => {
    if (isVisible) {
      // User can see this video, start caching
      VideoCache.cache({
        url: video.url,
        percentage: 30, // Quick cache for instant playback
        priority: 'high',
      });
    }
  }, [isVisible]);

  return <VideoPlayer source={{ uri: video.url, cache: true }} />;
}
```

## Predictive Preloading

Cache next videos in feed:

```tsx
function VideoFeed({ videos, currentIndex }) {
  useEffect(() => {
    // Cache next 3 videos
    const nextVideos = videos.slice(currentIndex + 1, currentIndex + 4);
    
    nextVideos.forEach((video, index) => {
      VideoCache.cache({
        url: video.url,
        percentage: 50,
        priority: index === 0 ? 'high' : 'medium', // Higher priority for next video
      });
    });
  }, [currentIndex]);

  // ...
}
```

## Background Preloading

Cache during idle time:

```tsx
import { AppState } from 'react-native';
import { VideoCache } from 'react-native-video';

function setupBackgroundCaching() {
  AppState.addEventListener('change', (state) => {
    if (state === 'background') {
      // App is backgrounded, start caching
      VideoCache.queueForBackground(popularVideos.map(v => ({
        url: v.url,
        percentage: 50,
      })));
    }
  });
}
```

## Scheduled Preloading

Cache at specific times (e.g., overnight):

```tsx
import { VideoCache } from 'react-native-video';

async function scheduleNightlyCaching() {
  const now = new Date();
  const tonight = new Date();
  tonight.setHours(2, 0, 0, 0); // 2 AM
  
  if (tonight < now) {
    tonight.setDate(tonight.getDate() + 1);
  }
  
  const delay = tonight - now;
  
  setTimeout(() => {
    VideoCache.queueForBackground(videosToCache, {
      requireWifi: true,
      requireCharging: true,
    });
  }, delay);
}
```

## Smart Queue

Priority-based queue management:

```tsx
// High priority - currently viewing
await VideoCache.cache({
  url: currentVideo.url,
  percentage: 100,
  priority: 'high',
});

// Medium priority - next in feed
await VideoCache.cache({
  url: nextVideo.url,
  percentage: 50,
  priority: 'medium',
});

// Low priority - popular content
await VideoCache.cache({
  url: popularVideo.url,
  percentage: 30,
  priority: 'low',
});
```

## Preload Strategies

### Aggressive (Fast Startup)

Cache more, use more storage:

```tsx
VideoCache.configure({
  defaultCachePercentage: 75, // Cache 75%
  maxConcurrentCaches: 3, // Cache 3 at once
  preloadNext: 3, // Preload 3 videos ahead
});
```

### Balanced (Recommended)

Balance between speed and storage:

```tsx
VideoCache.configure({
  defaultCachePercentage: 50, // Cache 50%
  maxConcurrentCaches: 2, // Cache 2 at once
  preloadNext: 2, // Preload 2 videos ahead
});
```

### Conservative (Storage-Saving)

Minimal caching, save storage:

```tsx
VideoCache.configure({
  defaultCachePercentage: 25, // Cache 25%
  maxConcurrentCaches: 1, // Cache 1 at a time
  preloadNext: 1, // Preload 1 video ahead
});
```

## Feed Preloading

Preload videos in scrollable feed:

```tsx
import { FlatList } from 'react-native';
import { VideoCache } from 'react-native-video';

function VideoFeed({ videos }) {
  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    viewableItems.forEach((item, index) => {
      // Cache visible video
      VideoCache.cache({
        url: item.item.url,
        percentage: 50,
        priority: 'high',
      });
      
      // Preload next videos
      const nextIndex = videos.indexOf(item.item) + 1;
      if (nextIndex < videos.length) {
        VideoCache.cache({
          url: videos[nextIndex].url,
          percentage: 30,
          priority: 'medium',
        });
      }
    });
  });

  return (
    <FlatList
      data={videos}
      onViewableItemsChanged={onViewableItemsChanged.current}
      viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
      renderItem={({ item }) => <VideoItem video={item} />}
    />
  );
}
```

## Playlist Preloading

Cache entire playlists:

```tsx
async function cachePlaylist(playlist) {
  for (let i = 0; i < playlist.videos.length; i++) {
    await VideoCache.cache({
      url: playlist.videos[i].url,
      percentage: i === 0 ? 100 : 50, // Full cache for first video
      priority: i === 0 ? 'high' : 'medium',
    });
  }
}
```

## Conditional Preloading

Cache based on conditions:

```tsx
async function smartPreload(video) {
  const networkState = await VideoCache.getNetworkState();
  const storage = await VideoCache.getStorageInfo();
  const batteryLevel = await getBatteryLevel();

  // Only cache if conditions are good
  if (
    networkState.type === 'wifi' &&
    storage.availableSize > 100 * 1024 * 1024 && // 100 MB available
    batteryLevel > 0.5 // 50% battery
  ) {
    await VideoCache.cache({
      url: video.url,
      percentage: 50,
    });
  }
}
```

## User Preferences

Respect user cache preferences:

```tsx
import AsyncStorage from '@react-native-async-storage/async-storage';

async function cacheWithUserPreference(video) {
  const preferences = await AsyncStorage.getItem('cachePreferences');
  const { enabled, wifiOnly, percentage } = JSON.parse(preferences);

  if (!enabled) return;

  const networkState = await VideoCache.getNetworkState();
  
  if (wifiOnly && networkState.type !== 'wifi') {
    return; // Skip caching on cellular
  }

  await VideoCache.cache({
    url: video.url,
    percentage: percentage || 50,
  });
}
```

## Complete Example

```tsx
import React, { useEffect, useRef } from 'react';
import { FlatList, View } from 'react-native';
import { VideoCache, VideoView, useVideoPlayer } from 'react-native-video';

function SmartVideoFeed({ videos }) {
  const currentIndex = useRef(0);

  // Preload on mount
  useEffect(() => {
    preloadInitialVideos();
  }, []);

  const preloadInitialVideos = async () => {
    // Cache first video fully
    await VideoCache.cache({
      url: videos[0].url,
      percentage: 100,
      priority: 'high',
    });

    // Preload next 2 videos partially
    for (let i = 1; i < 3 && i < videos.length; i++) {
      VideoCache.cache({
        url: videos[i].url,
        percentage: 50,
        priority: 'medium',
      });
    }
  };

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length === 0) return;

    const index = videos.findIndex(v => v.id === viewableItems[0].item.id);
    currentIndex.current = index;

    // Preload next videos
    for (let i = index + 1; i < index + 4 && i < videos.length; i++) {
      const distance = i - index;
      VideoCache.cache({
        url: videos[i].url,
        percentage: distance === 1 ? 75 : 50, // More for immediate next
        priority: distance === 1 ? 'high' : 'medium',
      });
    }
  });

  return (
    <FlatList
      data={videos}
      onViewableItemsChanged={onViewableItemsChanged.current}
      viewabilityConfig={{ itemVisiblePercentThreshold: 80 }}
      renderItem={({ item }) => <CachedVideoItem video={item} />}
    />
  );
}

function CachedVideoItem({ video }) {
  const player = useVideoPlayer({
    source: {
      uri: video.url,
      cache: true, // Use cache if available
    },
  });

  return (
    <View>
      <VideoView player={player} style={{ width: '100%', height: 400 }} />
    </View>
  );
}
```

## Best Practices

1. **Progressive Caching** - Cache visible/next videos first
2. **Priority Queue** - Use priorities effectively
3. **Condition-Based** - Check network/storage/battery
4. **User Preference** - Respect user settings
5. **Storage Aware** - Don't cache if storage is low
6. **Network Smart** - Prefer WiFi for large caches

## See Also

- [Getting Started](./getting-started.md) - Video caching basics
- [Configuration](./configuration.md) - Configure caching
- [Cache Management](./management.md) - Manage cached content
- [Storage](./storage.md) - Storage management

