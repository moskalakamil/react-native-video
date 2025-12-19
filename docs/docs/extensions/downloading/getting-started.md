# Getting Started

Download videos for offline playback with full control over quality, tracks, and storage.

## Overview

The Downloading API enables:
- **Offline Playback** - Watch videos without an internet connection
- **Quality Control** - Download specific quality levels
- **Track Selection** - Choose audio/subtitle tracks to download
- **Progress Tracking** - Monitor download progress and status
- **Storage Management** - Control where and how files are stored
- **Metadata** - Attach custom data to downloads
- **DRM Support** - Download DRM-protected content *(Pro)*

## Basic Example

```tsx
import { VideoDownloader } from 'react-native-video';

// Simple MP4 download
const download = await VideoDownloader.download({
  url: 'https://example.com/video.mp4',
  title: 'My Video',
});

// Monitor progress
download.onProgress((progress) => {
  console.log(`Downloaded: ${progress.percentage}%`);
});

// Wait for completion
await download.start();

// Play the downloaded video
const player = useVideoPlayer(download.localPath);
```

## Installation

The Downloading feature requires additional native setup:

### iOS

Add to your `Podfile`:

```ruby
pod 'RNVideoDownloader', :path => '../node_modules/react-native-video/ios'
```

### Android

Add to `android/app/build.gradle`:

```gradle
dependencies {
  implementation project(':react-native-video-downloader')
}
```

## Quick Start

### 1. Create a Download

```tsx
const download = await VideoDownloader.download({
  url: 'https://example.com/video.mp4',
  title: 'My Video',
  metadata: {
    description: 'Video description',
    thumbnail: 'https://example.com/thumb.jpg',
  },
});
```

### 2. Start Downloading

```tsx
// Start immediately
await download.start();

// Or listen to events
download.onProgress((progress) => {
  console.log(`${progress.bytesDownloaded} / ${progress.totalBytes}`);
});

download.onComplete((result) => {
  console.log('Download completed!', result.localPath);
});

download.onError((error) => {
  console.error('Download failed:', error);
});

await download.start();
```

### 3. Play Downloaded Video

```tsx
const player = useVideoPlayer(download.localPath);

return <VideoView player={player} />;
```

## Download Manager

Manage multiple downloads with the Download Manager:

```tsx
import { VideoDownloadManager } from 'react-native-video';

// Get all downloads
const downloads = await VideoDownloadManager.getAll();

// Find specific download
const download = await VideoDownloadManager.findById(downloadId);

// Remove download
await VideoDownloadManager.remove(downloadId);

// Get total storage used
const totalSize = await VideoDownloadManager.getTotalSize();
```

## Download States

Downloads progress through these states:

| State | Description |
|-------|-------------|
| `queued` | Waiting to start |
| `downloading` | Actively downloading |
| `paused` | Temporarily paused |
| `completed` | Successfully downloaded |
| `failed` | Download failed |
| `cancelled` | User cancelled |

```tsx
download.onStateChange((state) => {
  switch (state) {
    case 'queued':
      console.log('Waiting to start...');
      break;
    case 'downloading':
      console.log('Downloading...');
      break;
    case 'completed':
      console.log('Ready to play!');
      break;
    case 'failed':
      console.log('Something went wrong');
      break;
  }
});
```

## Next Steps

- [Basic Downloads](./basic-downloads.md) - Download MP4 videos
- [Adaptive Streaming](./adaptive-streaming.md) - Download HLS/DASH *(Pro)*
- [Track Selection](./track-selection.md) - Choose specific audio/subtitle tracks *(Pro)*
- [Metadata](./metadata.md) - Attach custom data to downloads
- [Configuration](./configuration.md) - Configure download behavior

