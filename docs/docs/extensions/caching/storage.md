# Storage Management

Manage storage locations, limits, and optimization for video cache.

:::tip Pro Feature - Coming Soon
Video caching is a Pro feature currently in development.
:::

## Overview

Storage management features:
- **Location Control** - Choose where to store cache
- **Size Limits** - Set maximum cache size
- **Storage Types** - Internal vs external storage
- **Quota Management** - Monitor and manage storage quota
- **Optimization** - Optimize storage usage

## Storage Locations

### Auto (Recommended)

Let SDK choose best location:

```tsx
import { VideoCache } from 'react-native-video';

VideoCache.configure({
  cacheLocation: 'auto', // SDK chooses automatically
});
```

SDK considers:
- Available space
- Platform capabilities
- User preferences
- Storage speed

### Internal Storage

Always use internal storage:

```tsx
VideoCache.configure({
  cacheLocation: 'internal',
});
```

**Benefits:**
- Always available
- Faster access
- More secure

**Drawbacks:**
- Limited space
- Shared with app data

### External Storage

Use external/SD card (Android):

```tsx
VideoCache.configure({
  cacheLocation: 'external',
});
```

**Benefits:**
- More space
- Removable

**Drawbacks:**
- May not be available
- Slower access
- Less secure

## Custom Directory

Specify custom cache directory:

```tsx
VideoCache.configure({
  cacheDirectory: '/custom/path/cache',
});
```

### Platform-Specific Paths

```tsx
import { Platform } from 'react-native';

VideoCache.configure({
  cacheDirectory: Platform.select({
    ios: '/Library/Caches/Videos',
    android: '/sdcard/Android/data/com.app/cache',
  }),
});
```

## Storage Limits

### Max Cache Size

Set maximum total cache size:

```tsx
VideoCache.configure({
  maxCacheSize: 1024 * 1024 * 1024, // 1 GB
});
```

### Per-Video Limit

Limit size per video:

```tsx
VideoCache.configure({
  maxVideoSize: 100 * 1024 * 1024, // 100 MB per video
});
```

### Dynamic Limits

Adjust limits based on available space:

```tsx
const availableSpace = await VideoCache.getAvailableSpace();

let maxCacheSize;
if (availableSpace > 10 * 1024 * 1024 * 1024) {
  maxCacheSize = 2 * 1024 * 1024 * 1024; // 2 GB if >10 GB available
} else if (availableSpace > 5 * 1024 * 1024 * 1024) {
  maxCacheSize = 1 * 1024 * 1024 * 1024; // 1 GB if >5 GB available
} else {
  maxCacheSize = 500 * 1024 * 1024; // 500 MB otherwise
}

VideoCache.configure({ maxCacheSize });
```

## Storage Info

### Get Available Space

```tsx
const availableSpace = await VideoCache.getAvailableSpace();
console.log('Available:', formatBytes(availableSpace));
```

### Get Total Space

```tsx
const totalSpace = await VideoCache.getTotalSpace();
console.log('Total:', formatBytes(totalSpace));
```

### Get Cache Usage

```tsx
const storage = await VideoCache.getStorageInfo();
console.log('Cache Size:', formatBytes(storage.usedSize));
console.log('Available in Cache:', formatBytes(storage.availableSize));
console.log('Usage:', (storage.usagePercentage * 100).toFixed(1) + '%');
```

## Storage Optimization

### Compression

Enable cache compression:

```tsx
VideoCache.configure({
  enableCompression: true,
  compressionQuality: 0.8, // 0-1
});
```

### Deduplication

Avoid caching duplicate content:

```tsx
VideoCache.configure({
  enableDeduplication: true, // Use checksums to detect duplicates
});
```

### Cleanup Threshold

Auto-cleanup when reaching threshold:

```tsx
VideoCache.configure({
  cleanupThreshold: 0.9, // Clean when 90% full
  cleanupTarget: 0.7, // Clean down to 70%
});
```

## Storage Monitoring

### Real-Time Monitoring

```tsx
VideoCache.onStorageChange((storage) => {
  console.log('Cache usage:', storage.usagePercentage);
  
  if (storage.usagePercentage > 0.95) {
    // Critical - force cleanup
    VideoCache.clearLeastUsed(10);
  } else if (storage.usagePercentage > 0.9) {
    // Warning - notify user
    showStorageWarning();
  }
});
```

### Periodic Checks

```tsx
setInterval(async () => {
  const storage = await VideoCache.getStorageInfo();
  const device = await VideoCache.getAvailableSpace();
  
  console.log('Cache:', formatBytes(storage.usedSize));
  console.log('Device:', formatBytes(device));
  
  // Warn if device storage is low
  if (device < 100 * 1024 * 1024) {
    console.warn('Device storage low!');
  }
}, 5 * 60 * 1000); // Every 5 minutes
```

## Storage Strategies

### Aggressive (Max Performance)

```tsx
VideoCache.configure({
  maxCacheSize: 2 * 1024 * 1024 * 1024, // 2 GB
  defaultCachePercentage: 75,
  cleanupThreshold: 0.95,
  cacheLocation: 'internal', // Fastest
});
```

### Balanced (Recommended)

```tsx
VideoCache.configure({
  maxCacheSize: 1 * 1024 * 1024 * 1024, // 1 GB
  defaultCachePercentage: 50,
  cleanupThreshold: 0.9,
  cacheLocation: 'auto',
});
```

### Conservative (Storage-Saving)

```tsx
VideoCache.configure({
  maxCacheSize: 500 * 1024 * 1024, // 500 MB
  defaultCachePercentage: 25,
  cleanupThreshold: 0.8,
  cacheLocation: 'external', // Save internal space
  enableCompression: true,
});
```

## Platform-Specific

### iOS

```tsx
VideoCache.configure({
  ios: {
    useDocumentsDirectory: false, // Use Library/Caches
    protectFromBackup: true, // Exclude from iCloud backup
    urlCacheSize: 50 * 1024 * 1024, // NSURLCache size
  },
});
```

### Android

```tsx
VideoCache.configure({
  android: {
    preferExternal: true, // Prefer external storage
    useMediaStore: false, // Don't use MediaStore API
    cachePartition: 'cache', // 'cache' or 'data'
  },
});
```

## User Settings UI

Provide UI for storage settings:

```tsx
import React, { useState, useEffect } from 'react';
import { View, Text, Slider, Switch, Button } from 'react-native';
import { VideoCache } from 'react-native-video';

function StorageSettings() {
  const [maxSize, setMaxSize] = useState(1024);
  const [cachePercentage, setCachePercentage] = useState(50);
  const [wifiOnly, setWifiOnly] = useState(true);
  const [storage, setStorage] = useState(null);

  useEffect(() => {
    loadStorage();
  }, []);

  const loadStorage = async () => {
    const info = await VideoCache.getStorageInfo();
    setStorage(info);
  };

  const applySettings = async () => {
    await VideoCache.configure({
      maxCacheSize: maxSize * 1024 * 1024,
      defaultCachePercentage: cachePercentage,
      cacheOnWifiOnly: wifiOnly,
    });
    
    await loadStorage();
  };

  const clearCache = async () => {
    await VideoCache.clearAll();
    await loadStorage();
  };

  return (
    <View>
      <Text style={styles.title}>Storage Settings</Text>

      {storage && (
        <View style={styles.storageInfo}>
          <Text>Used: {formatBytes(storage.usedSize)}</Text>
          <Text>Limit: {formatBytes(storage.totalSize)}</Text>
          <Text>Usage: {(storage.usagePercentage * 100).toFixed(1)}%</Text>
        </View>
      )}

      <View style={styles.setting}>
        <Text>Max Cache Size: {maxSize} MB</Text>
        <Slider
          value={maxSize}
          minimumValue={100}
          maximumValue={5000}
          step={100}
          onValueChange={setMaxSize}
        />
      </View>

      <View style={styles.setting}>
        <Text>Cache Percentage: {cachePercentage}%</Text>
        <Slider
          value={cachePercentage}
          minimumValue={10}
          maximumValue={100}
          step={5}
          onValueChange={setCachePercentage}
        />
      </View>

      <View style={styles.setting}>
        <Text>WiFi Only:</Text>
        <Switch value={wifiOnly} onValueChange={setWifiOnly} />
      </View>

      <Button title="Apply Settings" onPress={applySettings} />
      <Button title="Clear All Cache" onPress={clearCache} color="red" />
    </View>
  );
}
```

## Complete Example

```tsx
import { VideoCache } from 'react-native-video';

class StorageManager {
  async initialize() {
    await this.setupStorage();
    this.startMonitoring();
  }

  async setupStorage() {
    // Get available space
    const available = await VideoCache.getAvailableSpace();
    
    // Set cache size based on available space
    let maxCacheSize;
    if (available > 10 * 1024 * 1024 * 1024) {
      maxCacheSize = 2 * 1024 * 1024 * 1024; // 2 GB
    } else if (available > 5 * 1024 * 1024 * 1024) {
      maxCacheSize = 1 * 1024 * 1024 * 1024; // 1 GB
    } else {
      maxCacheSize = 500 * 1024 * 1024; // 500 MB
    }

    VideoCache.configure({
      maxCacheSize,
      cacheLocation: 'auto',
      cleanupThreshold: 0.9,
      cleanupTarget: 0.7,
      enableCompression: true,
      enableDeduplication: true,
    });
  }

  startMonitoring() {
    VideoCache.onStorageChange((storage) => {
      console.log('Storage usage:', storage.usagePercentage);
      
      if (storage.usagePercentage > 0.95) {
        this.emergencyCleanup();
      } else if (storage.usagePercentage > 0.9) {
        this.autoCleanup();
      }
    });

    // Check device storage every hour
    setInterval(async () => {
      const available = await VideoCache.getAvailableSpace();
      if (available < 100 * 1024 * 1024) {
        console.warn('Device storage critically low!');
        this.emergencyCleanup();
      }
    }, 60 * 60 * 1000);
  }

  async autoCleanup() {
    await VideoCache.clearOlderThan(7 * 24 * 60 * 60 * 1000);
  }

  async emergencyCleanup() {
    await VideoCache.clearAllExceptProtected();
  }

  async getStorageReport() {
    const storage = await VideoCache.getStorageInfo();
    const device = await VideoCache.getAvailableSpace();
    const videos = await VideoCache.getAllCached();

    return {
      cacheUsed: storage.usedSize,
      cacheLimit: storage.totalSize,
      cacheUsage: storage.usagePercentage,
      deviceAvailable: device,
      videosCount: videos.length,
      avgVideoSize: storage.usedSize / videos.length,
    };
  }
}

export default new StorageManager();
```

## Best Practices

1. **Dynamic Limits** - Adjust based on available space
2. **Auto Cleanup** - Enable automatic cleanup
3. **User Control** - Let users configure limits
4. **Monitoring** - Track storage usage
5. **Platform-Specific** - Optimize per platform
6. **Compression** - Enable for storage savings

## See Also

- [Getting Started](./getting-started.md) - Video caching basics
- [Configuration](./configuration.md) - Configure caching
- [Preloading](./preloading.md) - Pre-cache videos
- [Cache Management](./management.md) - Manage cached content

