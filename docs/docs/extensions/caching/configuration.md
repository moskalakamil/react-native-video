# Configuration

Configure video caching behavior and storage limits.

:::tip Pro Feature - Coming Soon
Video caching is a Pro feature currently in development.
:::

## Global Configuration

```tsx
import { VideoCache } from 'react-native-video';

VideoCache.configure({
  // Storage
  maxCacheSize: 500 * 1024 * 1024, // 500 MB
  cacheLocation: 'auto', // 'auto', 'internal', 'external'
  
  // Caching behavior
  defaultCachePercentage: 50,
  enableBackgroundCaching: true,
  cacheOnWifiOnly: true,
  
  // Management
  autoCleanup: true,
  maxCacheAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  cleanupThreshold: 0.9, // Clean when 90% full
  
  // Performance
  maxConcurrentCaches: 2,
  chunkSize: 1 * 1024 * 1024, // 1 MB
});
```

## Storage Settings

### maxCacheSize

Maximum total cache size in bytes.

```tsx
VideoCache.configure({
  maxCacheSize: 1024 * 1024 * 1024, // 1 GB
});
```

**Default**: `500 * 1024 * 1024` (500 MB)

### cacheLocation

Where to store cached videos.

```tsx
VideoCache.configure({
  cacheLocation: 'auto', // Let SDK choose best location
});
```

**Options:**
- `'auto'` - SDK chooses automatically
- `'internal'` - Internal storage (always available)
- `'external'` - External/SD card (if available)

**Default**: `'auto'`

### cacheDirectory

Custom cache directory path.

```tsx
VideoCache.configure({
  cacheDirectory: '/custom/cache/path',
});
```

## Caching Behavior

### defaultCachePercentage

Default percentage to cache when not specified.

```tsx
VideoCache.configure({
  defaultCachePercentage: 30, // Cache first 30%
});
```

**Default**: `50`

### enableBackgroundCaching

Enable background caching when app is idle.

```tsx
VideoCache.configure({
  enableBackgroundCaching: true,
});
```

**Default**: `true`

### cacheOnWifiOnly

Only cache on WiFi connections.

```tsx
VideoCache.configure({
  cacheOnWifiOnly: true,
});
```

**Default**: `true`

### allowCellularCaching

Allow caching on cellular networks.

```tsx
VideoCache.configure({
  allowCellularCaching: false,
});
```

**Default**: `false`

## Management Settings

### autoCleanup

Automatically clean up old cache.

```tsx
VideoCache.configure({
  autoCleanup: true,
  maxCacheAge: 14 * 24 * 60 * 60 * 1000, // 14 days
});
```

**Default**: `true`

### maxCacheAge

Maximum age of cache before cleanup (in milliseconds).

```tsx
VideoCache.configure({
  maxCacheAge: 30 * 24 * 60 * 60 * 1000, // 30 days
});
```

**Default**: `7 * 24 * 60 * 60 * 1000` (7 days)

### cleanupThreshold

Storage usage threshold to trigger cleanup (0-1).

```tsx
VideoCache.configure({
  cleanupThreshold: 0.95, // Clean when 95% full
});
```

**Default**: `0.9` (90%)

### cleanupStrategy

Strategy for removing cached videos.

```tsx
VideoCache.configure({
  cleanupStrategy: 'lru', // 'lru', 'lfu', 'fifo', 'size'
});
```

**Options:**
- `'lru'` - Least Recently Used
- `'lfu'` - Least Frequently Used
- `'fifo'` - First In, First Out
- `'size'` - Largest files first

**Default**: `'lru'`

## Performance Settings

### maxConcurrentCaches

Maximum number of simultaneous cache operations.

```tsx
VideoCache.configure({
  maxConcurrentCaches: 3,
});
```

**Default**: `2`

### chunkSize

Size of chunks for caching (in bytes).

```tsx
VideoCache.configure({
  chunkSize: 2 * 1024 * 1024, // 2 MB
});
```

**Default**: `1 * 1024 * 1024` (1 MB)

### bufferSize

Buffer size for read/write operations.

```tsx
VideoCache.configure({
  bufferSize: 512 * 1024, // 512 KB
});
```

**Default**: `256 * 1024` (256 KB)

## Per-Video Configuration

Override global settings per video:

```tsx
await VideoCache.cache({
  url: 'https://example.com/video.mp4',
  
  // Override defaults
  percentage: 75, // Cache 75% instead of default
  priority: 'high',
  allowCellular: true, // Override WiFi-only
  neverExpire: true, // Don't auto-cleanup this video
});
```

## Priority Levels

Set caching priority:

```tsx
await VideoCache.cache({
  url: 'https://example.com/video.mp4',
  percentage: 50,
  priority: 'high', // 'high', 'medium', 'low'
});
```

**Priority affects:**
- Queue position
- Background caching order
- Cleanup resistance

## Network Policies

### WiFi-Only Caching

```tsx
VideoCache.configure({
  cacheOnWifiOnly: true,
  allowCellularCaching: false,
});
```

### Cellular with Limit

```tsx
VideoCache.configure({
  allowCellularCaching: true,
  cellularCacheLimit: 50 * 1024 * 1024, // 50 MB max
});
```

### Adaptive Caching

```tsx
VideoCache.configure({
  adaptiveStrategy: true, // Adjust based on conditions
  wifiCachePercentage: 75, // Cache more on WiFi
  cellularCachePercentage: 25, // Cache less on cellular
});
```

## Complete Example

```tsx
import { VideoCache } from 'react-native-video';

// Production configuration
VideoCache.configure({
  // Storage - 1 GB max
  maxCacheSize: 1024 * 1024 * 1024,
  cacheLocation: 'auto',
  
  // Behavior - WiFi-only, 50% default
  defaultCachePercentage: 50,
  enableBackgroundCaching: true,
  cacheOnWifiOnly: true,
  
  // Management - Auto-cleanup after 14 days
  autoCleanup: true,
  maxCacheAge: 14 * 24 * 60 * 60 * 1000,
  cleanupThreshold: 0.9,
  cleanupStrategy: 'lru',
  
  // Performance - 2 concurrent, 2MB chunks
  maxConcurrentCaches: 2,
  chunkSize: 2 * 1024 * 1024,
});
```

## Platform-Specific Configuration

### iOS

```tsx
VideoCache.configure({
  ios: {
    useDocumentsDirectory: false, // Use caches directory
    protectFromBackup: true,
    urlCacheSize: 50 * 1024 * 1024, // 50 MB URL cache
  },
});
```

### Android

```tsx
VideoCache.configure({
  android: {
    preferExternal: true, // Prefer external storage
    useMediaStore: false,
    cachePartition: 'cache', // 'cache' or 'data'
  },
});
```

## Reset Configuration

```tsx
VideoCache.resetConfiguration();
```

## Get Current Configuration

```tsx
const config = VideoCache.getConfiguration();
console.log(config);
```

## Best Practices

1. **Storage Limits** - Set based on device/user needs
2. **WiFi-Only** - Enable for cellular data savings
3. **Auto Cleanup** - Keep cache fresh and manageable
4. **Priority System** - Use for important content
5. **Adaptive Strategy** - Better user experience
6. **Platform-Specific** - Optimize per platform

## See Also

- [Getting Started](./getting-started.md) - Video caching basics
- [Strategies](./strategies.md) - Caching strategies
- [Cache Management](./management.md) - Manage cached content
- [Storage](./storage.md) - Storage management

