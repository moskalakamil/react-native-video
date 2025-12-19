# Getting Started

Upload media files in the background with automatic retry, network tracking, and queue management.

## Overview

The Background Upload SDK enables:
- **Background Uploads** - Continue uploading when app is backgrounded
- **Automatic Retry** - Retry failed uploads automatically
- **Network Tracking** - Pause/resume based on connectivity
- **Queue Management** - Handle multiple uploads efficiently
- **Multi-Part Upload** - Upload large files in chunks *(Pro)*
- **Progress Tracking** - Monitor upload progress in real-time
- **Server Verification** - Verify upload completion on server

## Basic Example

```tsx
import { VideoUploader } from 'react-native-video';

// Simple upload
const upload = await VideoUploader.upload({
  file: '/path/to/video.mp4',
  url: 'https://api.example.com/upload',
});

// Monitor progress
upload.onProgress((progress) => {
  console.log(`Uploaded: ${progress.percentage}%`);
});

// Wait for completion
await upload.start();

console.log('Upload completed!', upload.response);
```

## Installation

The Background Upload SDK requires additional native setup:

### iOS

Add background modes to `Info.plist`:

```xml
<key>UIBackgroundModes</key>
<array>
  <string>fetch</string>
  <string>processing</string>
</array>
```

Add to your `Podfile`:

```ruby
pod 'RNVideoUploader', :path => '../node_modules/react-native-video/ios'
```

### Android

Add to `AndroidManifest.xml`:

```xml
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
<uses-permission android:name="android.permission.FOREGROUND_SERVICE" />

<application>
  <service
    android:name="com.brentvatne.react.VideoUploaderService"
    android:exported="false"
    android:foregroundServiceType="dataSync" />
</application>
```

## Quick Start

### 1. Create an Upload

```tsx
const upload = await VideoUploader.upload({
  file: '/path/to/video.mp4',
  url: 'https://api.example.com/upload',
  method: 'POST',
  headers: {
    'Authorization': 'Bearer token',
  },
  metadata: {
    title: 'My Video',
    description: 'Uploaded from mobile',
  },
});
```

### 2. Start Uploading

```tsx
// Start immediately
await upload.start();

// Or listen to events
upload.onProgress((progress) => {
  console.log(`${progress.bytesUploaded} / ${progress.totalBytes}`);
});

upload.onComplete((response) => {
  console.log('Upload completed!', response);
});

upload.onError((error) => {
  console.error('Upload failed:', error);
});

await upload.start();
```

### 3. Handle Response

```tsx
const upload = await VideoUploader.upload({
  file: '/path/to/video.mp4',
  url: 'https://api.example.com/upload',
});

upload.onComplete((response) => {
  console.log('Server response:', response.data);
  console.log('Video ID:', response.data.videoId);
});

await upload.start();
```

## Upload Manager

Manage multiple uploads with the Upload Manager:

```tsx
import { VideoUploadManager } from 'react-native-video';

// Get all uploads
const uploads = await VideoUploadManager.getAll();

// Find specific upload
const upload = await VideoUploadManager.findById(uploadId);

// Cancel upload
await VideoUploadManager.cancel(uploadId);

// Get total bytes uploaded
const totalUploaded = await VideoUploadManager.getTotalBytesUploaded();
```

## Upload States

Uploads progress through these states:

| State | Description |
|-------|-------------|
| `queued` | Waiting to start |
| `uploading` | Actively uploading |
| `paused` | Temporarily paused |
| `completed` | Successfully uploaded |
| `failed` | Upload failed |
| `cancelled` | User cancelled |

```tsx
upload.onStateChange((state) => {
  switch (state) {
    case 'queued':
      console.log('Waiting to start...');
      break;
    case 'uploading':
      console.log('Uploading...');
      break;
    case 'completed':
      console.log('Upload complete!');
      break;
    case 'failed':
      console.log('Upload failed');
      break;
  }
});
```

## Network Tracking

Automatically pause/resume uploads based on connectivity:

```tsx
const upload = await VideoUploader.upload({
  file: '/path/to/video.mp4',
  url: 'https://api.example.com/upload',
  networkTracking: true, // Auto-pause when offline
  requireWifi: false, // Allow cellular uploads
});

upload.onNetworkChange((state) => {
  console.log('Network:', state.isConnected ? 'Online' : 'Offline');
  console.log('Type:', state.type); // 'wifi', 'cellular', 'ethernet'
});
```

## Automatic Retry

Uploads automatically retry on failure:

```tsx
const upload = await VideoUploader.upload({
  file: '/path/to/video.mp4',
  url: 'https://api.example.com/upload',
  retryAttempts: 3,
  retryDelay: 5000, // 5 seconds
});

upload.onRetry((attempt) => {
  console.log(`Retrying upload, attempt ${attempt}/3`);
});
```

## Next Steps

- [Basic Upload](./basic-upload.md) - Simple file uploads
- [Multi-Part Upload](./multi-part-upload.md) - Large file uploads *(Pro)*
- [Queue Management](./queue-management.md) - Handle multiple uploads
- [Network Tracking](./network-tracking.md) - Network-aware uploads
- [Configuration](./configuration.md) - Configure upload behavior

