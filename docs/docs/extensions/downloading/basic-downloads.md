# Basic Downloads

Download MP4 videos for offline playback with simple API.

## Quick Start

```tsx
import { VideoDownloader } from 'react-native-video';

const download = await VideoDownloader.download({
  url: 'https://example.com/video.mp4',
  title: 'My Video',
});

await download.start();
```

## Download Options

```tsx
interface DownloadOptions {
  url: string;
  title: string;
  metadata?: Record<string, any>;
  headers?: Record<string, string>;
  filename?: string;
  directory?: string;
}
```

### url (required)

The URL of the video file to download.

```tsx
const download = await VideoDownloader.download({
  url: 'https://cdn.example.com/videos/my-video.mp4',
  title: 'My Video',
});
```

### title (required)

Human-readable title for the download. Used in UI and notifications.

```tsx
const download = await VideoDownloader.download({
  url: 'https://example.com/video.mp4',
  title: 'Introduction to React Native',
});
```

### metadata (optional)

Custom data attached to the download. See [Metadata](./metadata.md) for details.

```tsx
const download = await VideoDownloader.download({
  url: 'https://example.com/video.mp4',
  title: 'My Video',
  metadata: {
    courseId: '12345',
    chapterId: '3',
    duration: 300,
    thumbnail: 'https://example.com/thumb.jpg',
  },
});
```

### headers (optional)

Custom HTTP headers for the download request.

```tsx
const download = await VideoDownloader.download({
  url: 'https://example.com/video.mp4',
  title: 'My Video',
  headers: {
    'Authorization': 'Bearer token',
    'X-Custom-Header': 'value',
  },
});
```

### filename (optional)

Custom filename for the downloaded file. If not provided, generates from URL.

```tsx
const download = await VideoDownloader.download({
  url: 'https://example.com/video.mp4',
  title: 'My Video',
  filename: 'intro-video.mp4',
});
```

### directory (optional)

Custom directory path. Defaults to app's documents directory.

```tsx
const download = await VideoDownloader.download({
  url: 'https://example.com/video.mp4',
  title: 'My Video',
  directory: 'courses/react-native',
});
```

## Progress Tracking

Monitor download progress in real-time:

```tsx
const download = await VideoDownloader.download({
  url: 'https://example.com/video.mp4',
  title: 'My Video',
});

download.onProgress((progress) => {
  console.log(`Downloaded: ${progress.bytesDownloaded} / ${progress.totalBytes}`);
  console.log(`Progress: ${progress.percentage}%`);
  console.log(`Speed: ${progress.speed} bytes/sec`);
  console.log(`ETA: ${progress.estimatedTimeRemaining} seconds`);
});

await download.start();
```

### Progress Object

```ts
interface DownloadProgress {
  bytesDownloaded: number;
  totalBytes: number;
  percentage: number; // 0-100
  speed: number; // bytes per second
  estimatedTimeRemaining: number; // seconds
}
```

## Download Control

### Start

Begin or resume downloading:

```tsx
await download.start();
```

### Pause

Temporarily pause the download:

```tsx
await download.pause();
```

### Resume

Resume a paused download:

```tsx
await download.resume();
```

### Cancel

Cancel and remove the download:

```tsx
await download.cancel();
```

## Events

Listen to download lifecycle events:

```tsx
const download = await VideoDownloader.download({
  url: 'https://example.com/video.mp4',
  title: 'My Video',
});

// Progress updates
download.onProgress((progress) => {
  console.log(`${progress.percentage}% complete`);
});

// State changes
download.onStateChange((state) => {
  console.log('State:', state);
});

// Completion
download.onComplete((result) => {
  console.log('Download complete!');
  console.log('Local path:', result.localPath);
});

// Errors
download.onError((error) => {
  console.error('Download failed:', error.message);
});

await download.start();
```

## Playing Downloaded Videos

Once downloaded, play the video using its local path:

```tsx
const download = await VideoDownloader.download({
  url: 'https://example.com/video.mp4',
  title: 'My Video',
});

await download.start();

// After download completes
const player = useVideoPlayer(download.localPath);

return <VideoView player={player} />;
```

## Complete Example

```tsx
import React, { useState } from 'react';
import { View, Text, Button, ProgressBar } from 'react-native';
import { VideoDownloader } from 'react-native-video';

function DownloadExample() {
  const [download, setDownload] = useState(null);
  const [progress, setProgress] = useState(0);
  const [state, setState] = useState('idle');

  const startDownload = async () => {
    const dl = await VideoDownloader.download({
      url: 'https://example.com/video.mp4',
      title: 'My Video',
    });

    dl.onProgress((prog) => setProgress(prog.percentage));
    dl.onStateChange((s) => setState(s));
    
    dl.onComplete((result) => {
      console.log('Downloaded to:', result.localPath);
    });

    setDownload(dl);
    await dl.start();
  };

  return (
    <View>
      <Text>State: {state}</Text>
      {state === 'downloading' && (
        <>
          <ProgressBar progress={progress / 100} />
          <Text>{progress}%</Text>
        </>
      )}
      
      <Button 
        title="Download" 
        onPress={startDownload}
        disabled={state === 'downloading'}
      />
      
      {download && state === 'downloading' && (
        <Button title="Pause" onPress={() => download.pause()} />
      )}
      
      {download && state === 'paused' && (
        <Button title="Resume" onPress={() => download.resume()} />
      )}
    </View>
  );
}
```

