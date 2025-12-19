# Cache Management

Manage, monitor, and optimize cached video content.

:::tip Pro Feature - Coming Soon
Video caching is a Pro feature currently in development.
:::

## Overview

Cache management features:
- **View Cached Videos** - List all cached content
- **Clear Cache** - Remove cached videos
- **Storage Monitoring** - Track cache usage
- **Automatic Cleanup** - Remove old/unused cache
- **Manual Cleanup** - User-controlled cleanup

## View Cached Videos

Get all cached videos:

```tsx
import { VideoCache } from 'react-native-video';

const cachedVideos = await VideoCache.getAllCached();

cachedVideos.forEach(video => {
  console.log('URL:', video.url);
  console.log('Size:', video.size);
  console.log('Percentage:', video.percentage);
  console.log('Created:', video.createdAt);
  console.log('Last Accessed:', video.lastAccessed);
});
```

## Cache Info

Get detailed info for specific video:

```tsx
const info = await VideoCache.getInfo('https://example.com/video.mp4');

if (info) {
  console.log('Cached:', info.cached);
  console.log('Percentage:', info.percentage);
  console.log('Size:', info.size);
  console.log('Path:', info.localPath);
  console.log('Created:', info.createdAt);
  console.log('Last Accessed:', info.lastAccessed);
  console.log('Access Count:', info.accessCount);
}
```

## Clear Cache

### Clear Specific Video

```tsx
await VideoCache.clear('https://example.com/video.mp4');
```

### Clear Multiple Videos

```tsx
const urls = [
  'https://example.com/video1.mp4',
  'https://example.com/video2.mp4',
  'https://example.com/video3.mp4',
];

await VideoCache.clearMultiple(urls);
```

### Clear All Cache

```tsx
await VideoCache.clearAll();
```

### Clear by Pattern

```tsx
// Clear all videos from specific domain
await VideoCache.clearByPattern('https://cdn.example.com/*');
```

## Storage Monitoring

### Get Storage Info

```tsx
const storage = await VideoCache.getStorageInfo();

console.log('Total Cache Size:', storage.totalSize);
console.log('Used Size:', storage.usedSize);
console.log('Available Size:', storage.availableSize);
console.log('Usage Percentage:', storage.usagePercentage);
console.log('Cached Videos Count:', storage.cachedVideos);
```

### Monitor Storage Changes

```tsx
VideoCache.onStorageChange((storage) => {
  console.log('Cache usage:', storage.usagePercentage);
  
  if (storage.usagePercentage > 0.9) {
    console.warn('Cache almost full!');
  }
});
```

## Automatic Cleanup

### Age-Based Cleanup

Remove videos older than specified age:

```tsx
// Clean cache older than 7 days
await VideoCache.clearOlderThan(7 * 24 * 60 * 60 * 1000);
```

### Usage-Based Cleanup

Remove least used cache:

```tsx
// Remove 10 least recently used videos
await VideoCache.clearLeastUsed(10);
```

### Size-Based Cleanup

Remove cache to reach target size:

```tsx
// Reduce cache to 300 MB
await VideoCache.reduceCacheTo(300 * 1024 * 1024);
```

### Strategy-Based Cleanup

Use cleanup strategies:

```tsx
// LRU - Least Recently Used
await VideoCache.cleanup('lru', { count: 5 });

// LFU - Least Frequently Used
await VideoCache.cleanup('lfu', { count: 5 });

// Size - Largest files first
await VideoCache.cleanup('size', { targetSize: 200 * 1024 * 1024 });
```

## Manual Cleanup UI

Provide user interface for cache management:

```tsx
import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import { VideoCache } from 'react-native-video';

function CacheManagementScreen() {
  const [cachedVideos, setCachedVideos] = useState([]);
  const [storage, setStorage] = useState(null);

  useEffect(() => {
    loadCache();
  }, []);

  const loadCache = async () => {
    const videos = await VideoCache.getAllCached();
    const storageInfo = await VideoCache.getStorageInfo();
    
    setCachedVideos(videos);
    setStorage(storageInfo);
  };

  const clearVideo = async (url) => {
    await VideoCache.clear(url);
    await loadCache();
  };

  const clearAll = async () => {
    await VideoCache.clearAll();
    await loadCache();
  };

  const clearOld = async () => {
    await VideoCache.clearOlderThan(7 * 24 * 60 * 60 * 1000);
    await loadCache();
  };

  return (
    <View>
      {storage && (
        <View style={styles.storageInfo}>
          <Text>Cache Size: {formatBytes(storage.usedSize)}</Text>
          <Text>Usage: {(storage.usagePercentage * 100).toFixed(1)}%</Text>
          <Text>Videos: {storage.cachedVideos}</Text>
        </View>
      )}

      <View style={styles.actions}>
        <Button title="Clear Old (7d+)" onPress={clearOld} />
        <Button title="Clear All" onPress={clearAll} color="red" />
      </View>

      <FlatList
        data={cachedVideos}
        renderItem={({ item }) => (
          <View style={styles.videoItem}>
            <View>
              <Text numberOfLines={1}>{item.url}</Text>
              <Text>Size: {formatBytes(item.size)}</Text>
              <Text>Cached: {item.percentage}%</Text>
              <Text>Accessed: {formatDate(item.lastAccessed)}</Text>
            </View>
            <Button title="Clear" onPress={() => clearVideo(item.url)} />
          </View>
        )}
      />
    </View>
  );
}

function formatBytes(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / 1024 / 1024).toFixed(1) + ' MB';
}

function formatDate(date) {
  const now = new Date();
  const diff = now - new Date(date);
  const days = Math.floor(diff / (24 * 60 * 60 * 1000));
  
  if (days === 0) return 'Today';
  if (days === 1) return 'Yesterday';
  return `${days} days ago`;
}
```

## Protected Cache

Protect important videos from cleanup:

```tsx
// Mark as protected
await VideoCache.protect('https://example.com/important.mp4');

// Check if protected
const isProtected = await VideoCache.isProtected('https://example.com/important.mp4');

// Unprotect
await VideoCache.unprotect('https://example.com/important.mp4');

// Clear all except protected
await VideoCache.clearAllExceptProtected();
```

## Cache Analytics

Track cache performance:

```tsx
const analytics = await VideoCache.getAnalytics();

console.log('Total Hits:', analytics.hits);
console.log('Total Misses:', analytics.misses);
console.log('Hit Rate:', analytics.hitRate);
console.log('Total Cached:', analytics.totalCached);
console.log('Total Cleared:', analytics.totalCleared);
console.log('Average Cache Time:', analytics.avgCacheTime);
```

## Export/Import Cache

### Export Cache Manifest

```tsx
const manifest = await VideoCache.exportManifest();

// Save to file or cloud
await saveToFile('cache-manifest.json', JSON.stringify(manifest));
```

### Import Cache Manifest

```tsx
const manifest = await loadFromFile('cache-manifest.json');

await VideoCache.importManifest(JSON.parse(manifest), {
  revalidate: true, // Check if videos still exist
  recache: false, // Don't re-download
});
```

## Cache Events

Listen to cache events:

```tsx
// Video cached
VideoCache.onCached((video) => {
  console.log('Video cached:', video.url);
});

// Video removed
VideoCache.onCleared((url) => {
  console.log('Video cleared:', url);
});

// Cache full
VideoCache.onCacheFull((storage) => {
  console.warn('Cache full!', storage);
  // Trigger cleanup
  VideoCache.cleanup('lru', { count: 5 });
});

// Storage low
VideoCache.onStorageLow((storage) => {
  console.warn('Storage low!');
});
```

## Complete Management Example

```tsx
import { VideoCache } from 'react-native-video';

class CacheManager {
  constructor() {
    this.setupAutoCleanup();
    this.setupMonitoring();
  }

  setupAutoCleanup() {
    // Daily cleanup at 3 AM
    setInterval(() => {
      const hour = new Date().getHours();
      if (hour === 3) {
        this.performCleanup();
      }
    }, 60 * 60 * 1000); // Check every hour
  }

  setupMonitoring() {
    VideoCache.onStorageChange(async (storage) => {
      // Auto-cleanup when 90% full
      if (storage.usagePercentage > 0.9) {
        await this.performCleanup();
      }
    });
  }

  async performCleanup() {
    // 1. Remove videos older than 14 days
    await VideoCache.clearOlderThan(14 * 24 * 60 * 60 * 1000);

    // 2. If still over 80%, remove least used
    const storage = await VideoCache.getStorageInfo();
    if (storage.usagePercentage > 0.8) {
      await VideoCache.clearLeastUsed(10);
    }

    // 3. Log cleanup
    console.log('Cache cleanup completed');
    const analytics = await VideoCache.getAnalytics();
    console.log('Analytics:', analytics);
  }

  async getCacheReport() {
    const videos = await VideoCache.getAllCached();
    const storage = await VideoCache.getStorageInfo();
    const analytics = await VideoCache.getAnalytics();

    return {
      totalVideos: videos.length,
      totalSize: storage.usedSize,
      usage: storage.usagePercentage,
      hitRate: analytics.hitRate,
      oldestVideo: videos.sort((a, b) => a.createdAt - b.createdAt)[0],
      largestVideo: videos.sort((a, b) => b.size - a.size)[0],
    };
  }
}

export default new CacheManager();
```

## Best Practices

1. **Auto Cleanup** - Enable automatic cleanup
2. **Storage Monitoring** - Track usage regularly
3. **User Control** - Let users manage cache
4. **Protected Cache** - Protect important content
5. **Analytics** - Track cache performance
6. **Age-Based Cleanup** - Remove old cache regularly

## See Also

- [Getting Started](./getting-started.md) - Video caching basics
- [Configuration](./configuration.md) - Configure caching
- [Preloading](./preloading.md) - Pre-cache videos
- [Storage](./storage.md) - Storage management

