# Configuration

Configure upload behavior globally and per-upload.

## Global Configuration

Configure defaults for all uploads:

```tsx
import { VideoUploadManager } from 'react-native-video';

VideoUploadManager.configure({
  // Queue settings
  maxConcurrentUploads: 2,
  queueMode: 'priority',
  autoStart: true,
  
  // Network settings
  requireWifi: false,
  allowCellular: true,
  networkTracking: true,
  
  // Retry settings
  retryAttempts: 3,
  retryDelay: 5000,
  
  // Multi-part settings
  chunkSize: 5 * 1024 * 1024,
  maxParallelUploads: 3,
  
  // Timeout settings
  timeout: 300000, // 5 minutes
  
  // Storage
  persistQueue: true,
});
```

## Per-Upload Configuration

Override global settings per upload:

```tsx
const upload = await VideoUploader.upload({
  file: '/path/to/video.mp4',
  url: 'https://api.example.com/upload',
  
  // Override global settings
  requireWifi: true,
  retryAttempts: 5,
  priority: 'high',
});
```

## Queue Settings

### maxConcurrentUploads

Maximum number of simultaneous uploads.

```tsx
VideoUploadManager.configure({
  maxConcurrentUploads: 3,
});
```

**Default**: `2`

### queueMode

Queue processing mode: `'fifo'` or `'priority'`.

```tsx
VideoUploadManager.configure({
  queueMode: 'priority', // Process by priority
});
```

**Default**: `'fifo'`

### autoStart

Automatically start uploads when added to queue.

```tsx
VideoUploadManager.configure({
  autoStart: true,
});
```

**Default**: `true`

## Network Settings

### requireWifi

Only upload on WiFi connections.

```tsx
VideoUploadManager.configure({
  requireWifi: true,
});
```

**Default**: `false`

### allowCellular

Allow uploads on cellular networks.

```tsx
VideoUploadManager.configure({
  allowCellular: true,
});
```

**Default**: `true`

### cellularDataLimit

Maximum data to upload on cellular (in bytes).

```tsx
VideoUploadManager.configure({
  cellularDataLimit: 100 * 1024 * 1024, // 100 MB
});
```

**Default**: `undefined` (no limit)

### networkTracking

Enable network state monitoring.

```tsx
VideoUploadManager.configure({
  networkTracking: true,
});
```

**Default**: `true`

## Retry Settings

### retryAttempts

Number of retry attempts on failure.

```tsx
VideoUploadManager.configure({
  retryAttempts: 5,
});
```

**Default**: `3`

### retryDelay

Delay between retries (in milliseconds).

```tsx
VideoUploadManager.configure({
  retryDelay: 10000, // 10 seconds
});
```

**Default**: `5000` (5 seconds)

### retryBackoff

Enable exponential backoff for retries.

```tsx
VideoUploadManager.configure({
  retryBackoff: true, // 5s, 10s, 20s, 40s...
});
```

**Default**: `false`

## Multi-Part Settings

### chunkSize

Size of each chunk in multi-part uploads (in bytes).

```tsx
VideoUploadManager.configure({
  chunkSize: 10 * 1024 * 1024, // 10 MB
});
```

**Default**: `5 * 1024 * 1024` (5 MB)

### maxParallelUploads

Number of chunks to upload simultaneously.

```tsx
VideoUploadManager.configure({
  maxParallelUploads: 5,
});
```

**Default**: `3`

### verifyChunks

Verify chunks with checksums.

```tsx
VideoUploadManager.configure({
  verifyChunks: true,
});
```

**Default**: `false`

### checksumAlgorithm

Checksum algorithm: `'md5'` or `'sha256'`.

```tsx
VideoUploadManager.configure({
  checksumAlgorithm: 'sha256',
});
```

**Default**: `'md5'`

## Timeout Settings

### timeout

Upload timeout (in milliseconds).

```tsx
VideoUploadManager.configure({
  timeout: 600000, // 10 minutes
});
```

**Default**: `300000` (5 minutes)

### connectionTimeout

Connection timeout (in milliseconds).

```tsx
VideoUploadManager.configure({
  connectionTimeout: 30000, // 30 seconds
});
```

**Default**: `30000` (30 seconds)

## Storage Settings

### persistQueue

Persist queue across app restarts.

```tsx
VideoUploadManager.configure({
  persistQueue: true,
});
```

**Default**: `true`

### storageLocation

Custom storage location for queue data.

```tsx
VideoUploadManager.configure({
  storageLocation: '/custom/path/uploads',
});
```

**Default**: Platform default

### cleanupOnComplete

Automatically remove completed uploads.

```tsx
VideoUploadManager.configure({
  cleanupOnComplete: true,
  cleanupDelay: 3600000, // 1 hour
});
```

**Default**: `false`

## Logging

### logLevel

Set logging level: `'debug'`, `'info'`, `'warn'`, `'error'`, `'none'`.

```tsx
VideoUploadManager.configure({
  logLevel: 'debug',
});
```

**Default**: `'warn'`

### customLogger

Provide custom logger:

```tsx
VideoUploadManager.configure({
  customLogger: {
    debug: (msg) => console.log('[DEBUG]', msg),
    info: (msg) => console.log('[INFO]', msg),
    warn: (msg) => console.warn('[WARN]', msg),
    error: (msg) => console.error('[ERROR]', msg),
  },
});
```

## Complete Configuration Example

```tsx
import { VideoUploadManager } from 'react-native-video';

VideoUploadManager.configure({
  // Queue
  maxConcurrentUploads: 2,
  queueMode: 'priority',
  autoStart: true,
  
  // Network
  requireWifi: false,
  allowCellular: true,
  cellularDataLimit: 100 * 1024 * 1024,
  networkTracking: true,
  
  // Retry
  retryAttempts: 5,
  retryDelay: 5000,
  retryBackoff: true,
  
  // Multi-part
  chunkSize: 5 * 1024 * 1024,
  maxParallelUploads: 3,
  verifyChunks: true,
  checksumAlgorithm: 'md5',
  
  // Timeout
  timeout: 300000,
  connectionTimeout: 30000,
  
  // Storage
  persistQueue: true,
  cleanupOnComplete: true,
  cleanupDelay: 3600000,
  
  // Logging
  logLevel: 'info',
});
```

## Platform-Specific Configuration

### iOS

```tsx
VideoUploadManager.configure({
  ios: {
    backgroundSessionId: 'com.example.uploads',
    enableCellularAccess: true,
    allowsExpensiveNetworkAccess: false,
    allowsConstrainedNetworkAccess: false,
  },
});
```

### Android

```tsx
VideoUploadManager.configure({
  android: {
    notificationTitle: 'Uploading Videos',
    notificationIcon: 'ic_upload',
    foregroundService: true,
    wakeLock: true,
  },
});
```

## Environment-Based Configuration

```tsx
const isDev = __DEV__;

VideoUploadManager.configure({
  logLevel: isDev ? 'debug' : 'error',
  retryAttempts: isDev ? 1 : 5,
  timeout: isDev ? 60000 : 300000,
});
```

## Reset Configuration

Reset to defaults:

```tsx
VideoUploadManager.resetConfiguration();
```

## Get Current Configuration

```tsx
const config = VideoUploadManager.getConfiguration();
console.log(config);
```

## Best Practices

1. **Configure Once** - Configure at app startup
2. **Environment-Based** - Use different configs for dev/prod
3. **User Preferences** - Let users override key settings (WiFi-only)
4. **Platform-Specific** - Use platform-specific settings when needed
5. **Logging** - Use debug logging in development only
6. **Retry Strategy** - Enable backoff for production
7. **Cleanup** - Auto-cleanup completed uploads

## See Also

- [Basic Upload](./basic-upload.md) - Simple file uploads
- [Multi-Part Upload](./multi-part-upload.md) - Large file uploads
- [Queue Management](./queue-management.md) - Handle multiple uploads
- [Network Tracking](./network-tracking.md) - Network-aware uploads

