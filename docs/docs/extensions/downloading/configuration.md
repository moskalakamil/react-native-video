# Configuration

Configure download behavior, storage, networking, and performance settings.

## Global Configuration

Set default configuration for all downloads:

```tsx
import { VideoDownloader } from 'react-native-video';

VideoDownloader.configure({
  maxConcurrentDownloads: 3,
  allowCellularDownload: false,
  directory: 'MyApp/Videos',
  retryAttempts: 3,
  timeout: 30000,
});
```

## Configuration Options

### maxConcurrentDownloads

Maximum number of simultaneous downloads.

```tsx
VideoDownloader.configure({
  maxConcurrentDownloads: 2, // Download 2 videos at once
});
```

**Default**: `3`

### allowCellularDownload

Allow downloads over cellular/mobile data.

```tsx
VideoDownloader.configure({
  allowCellularDownload: true, // Allow mobile data
});
```

**Default**: `false` (WiFi only)

### directory

Custom download directory.

```tsx
VideoDownloader.configure({
  directory: 'MyApp/Videos/Courses',
});
```

**Default**: App's documents directory

### retryAttempts

Number of retry attempts on download failure.

```tsx
VideoDownloader.configure({
  retryAttempts: 5,
});
```

**Default**: `3`

### timeout

Network timeout in milliseconds.

```tsx
VideoDownloader.configure({
  timeout: 60000, // 60 seconds
});
```

**Default**: `30000` (30 seconds)

### chunkSize

Download chunk size in bytes.

```tsx
VideoDownloader.configure({
  chunkSize: 1024 * 1024, // 1 MB chunks
});
```

**Default**: `512 * 1024` (512 KB)

## Per-Download Configuration

Override global settings for specific downloads:

```tsx
const download = await VideoDownloader.download({
  url: 'https://example.com/video.mp4',
  title: 'My Video',
  
  // Override global settings
  allowCellularDownload: true,
  directory: 'MyApp/SpecialVideos',
  retryAttempts: 5,
  timeout: 120000,
});
```

## Storage Configuration

### Storage Location

#### Default Location

```tsx
// Uses app's default documents directory
VideoDownloader.configure({
  directory: undefined, // or omit
});
```

#### Custom Location

```tsx
VideoDownloader.configure({
  directory: 'Downloads/Videos',
});
```

#### Platform-Specific Paths

```tsx
import { Platform } from 'react-native';

VideoDownloader.configure({
  directory: Platform.select({
    ios: 'Library/Videos',
    android: 'Movies',
    default: 'Videos',
  }),
});
```

### Storage Limits

Set maximum storage usage:

```tsx
VideoDownloader.configure({
  maxStorageSize: 5 * 1024 * 1024 * 1024, // 5 GB
});
```

### Automatic Cleanup

Remove oldest downloads when storage limit is reached:

```tsx
VideoDownloader.configure({
  maxStorageSize: 5 * 1024 * 1024 * 1024,
  autoCleanup: true,
  cleanupStrategy: 'oldest', // or 'largest', 'least-viewed'
});
```

## Network Configuration

### WiFi Only

```tsx
VideoDownloader.configure({
  allowCellularDownload: false,
  pauseOnCellular: true, // Auto-pause when switching to cellular
});
```

### Bandwidth Limit

Limit download bandwidth:

```tsx
VideoDownloader.configure({
  maxBandwidth: 5 * 1024 * 1024, // 5 Mbps
});
```

### Connection Type

```tsx
VideoDownloader.configure({
  requiredConnectionType: 'wifi', // 'wifi', 'any', 'ethernet'
});
```

## Performance Configuration

### Parallel Segment Downloads

For HLS/DASH, download segments in parallel:

```tsx
VideoDownloader.configure({
  maxParallelSegments: 4,
});
```

### Background Downloads

Enable background downloads (iOS):

```tsx
VideoDownloader.configure({
  enableBackgroundDownloads: true,
});
```

### Battery Optimization

Pause downloads on low battery:

```tsx
VideoDownloader.configure({
  pauseOnLowBattery: true,
  lowBatteryThreshold: 20, // Pause below 20%
});
```

## Queue Configuration

### Queue Behavior

```tsx
VideoDownloader.configure({
  queueMode: 'fifo', // 'fifo' (first-in-first-out) or 'priority'
  autoStart: true, // Automatically start queued downloads
});
```

### Priority-Based Queue

```tsx
const highPriorityDownload = await VideoDownloader.download({
  url: 'https://example.com/important.mp4',
  title: 'Important Video',
  priority: 'high', // 'high', 'medium', 'low'
});

const lowPriorityDownload = await VideoDownloader.download({
  url: 'https://example.com/optional.mp4',
  title: 'Optional Video',
  priority: 'low',
});
```

## Error Handling Configuration

### Retry Strategy

```tsx
VideoDownloader.configure({
  retryAttempts: 3,
  retryDelay: 5000, // Wait 5 seconds between retries
  retryBackoff: 'exponential', // 'linear' or 'exponential'
});
```

### Error Callbacks

```tsx
VideoDownloader.configure({
  onError: (download, error) => {
    console.error(`Download failed: ${download.title}`, error);
    // Send to analytics
  },
  onRetry: (download, attempt) => {
    console.log(`Retrying ${download.title}, attempt ${attempt}`);
  },
});
```

## Notification Configuration

### Android Notifications

```tsx
VideoDownloader.configure({
  showNotification: true,
  notificationConfig: {
    channelId: 'video_downloads',
    channelName: 'Video Downloads',
    icon: 'ic_download',
    color: '#FF5722',
    onTap: (download) => {
      // Navigate to download screen
    },
  },
});
```

### iOS Background Tasks

```tsx
VideoDownloader.configure({
  enableBackgroundDownloads: true,
  backgroundSessionIdentifier: 'com.myapp.downloads',
});
```

## Complete Configuration Example

```tsx
import { VideoDownloader } from 'react-native-video';
import { Platform } from 'react-native';

// Global configuration on app start
VideoDownloader.configure({
  // Concurrency
  maxConcurrentDownloads: 3,
  maxParallelSegments: 4,
  
  // Network
  allowCellularDownload: false,
  pauseOnCellular: true,
  maxBandwidth: 10 * 1024 * 1024, // 10 Mbps
  timeout: 60000,
  
  // Storage
  directory: 'Downloads/Videos',
  maxStorageSize: 10 * 1024 * 1024 * 1024, // 10 GB
  autoCleanup: true,
  cleanupStrategy: 'oldest',
  
  // Retry
  retryAttempts: 3,
  retryDelay: 5000,
  retryBackoff: 'exponential',
  
  // Battery
  pauseOnLowBattery: true,
  lowBatteryThreshold: 20,
  
  // Queue
  queueMode: 'priority',
  autoStart: true,
  
  // Platform-specific
  ...Platform.select({
    ios: {
      enableBackgroundDownloads: true,
      backgroundSessionIdentifier: 'com.myapp.downloads',
    },
    android: {
      showNotification: true,
      notificationConfig: {
        channelId: 'video_downloads',
        channelName: 'Video Downloads',
        icon: 'ic_download',
      },
    },
  }),
  
  // Callbacks
  onError: (download, error) => {
    console.error('Download failed:', download.title, error);
    // Send to analytics
  },
  onComplete: (download) => {
    console.log('Download complete:', download.title);
    // Update UI
  },
});
```

## Runtime Configuration Changes

Update configuration at runtime:

```tsx
// Disable cellular when roaming
import NetInfo from '@react-native-community/netinfo';

NetInfo.addEventListener(state => {
  if (state.type === 'cellular' && state.details?.isConnectionExpensive) {
    VideoDownloader.configure({
      allowCellularDownload: false,
    });
  }
});
```

## Get Current Configuration

```tsx
const config = VideoDownloader.getConfiguration();

console.log(config);
// {
//   maxConcurrentDownloads: 3,
//   allowCellularDownload: false,
//   ...
// }
```

## Reset Configuration

```tsx
// Reset to defaults
VideoDownloader.resetConfiguration();
```

## Best Practices

1. **WiFi Only** - Default to WiFi-only downloads to save user data
2. **Storage Limits** - Set reasonable storage limits
3. **Auto Cleanup** - Enable automatic cleanup for better UX
4. **Battery Aware** - Pause downloads on low battery
5. **Retry Logic** - Use exponential backoff for retries
6. **Notifications** - Show download progress in notifications
7. **Background Downloads** - Enable for better UX on iOS

## See Also

- [Getting Started](./getting-started.md) - Download basics
- [Basic Downloads](./basic-downloads.md) - MP4 downloads

