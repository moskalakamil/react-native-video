# Adaptive Streaming Downloads

Download HLS and DASH content for offline playback with quality and track selection.

:::tip Pro Feature
Adaptive streaming downloads require a Pro license.
:::

## Overview

Download adaptive streaming content (HLS/DASH) with:
- Quality selection (resolution/bitrate)
- Audio track selection
- Subtitle track selection
- Automatic quality selection
- Segment-based progress tracking

## Basic HLS Download

```tsx
import { VideoDownloader } from 'react-native-video';

const download = await VideoDownloader.download({
  url: 'https://example.com/playlist.m3u8',
  title: 'My HLS Video',
  type: 'hls',
});

await download.start();
```

## Quality Selection

### Automatic Quality (Recommended)

Download the best quality available:

```tsx
const download = await VideoDownloader.download({
  url: 'https://example.com/playlist.m3u8',
  title: 'My Video',
  type: 'hls',
  quality: 'auto', // Downloads highest quality
});
```

### Specific Quality

Choose a specific resolution or bitrate:

```tsx
const download = await VideoDownloader.download({
  url: 'https://example.com/playlist.m3u8',
  title: 'My Video',
  type: 'hls',
  quality: {
    resolution: '1080p',
    // or bitrate: 5000000 (5 Mbps)
  },
});
```

### List Available Qualities

Get all available quality levels before downloading:

```tsx
const qualities = await VideoDownloader.getAvailableQualities(
  'https://example.com/playlist.m3u8'
);

console.log(qualities);
// [
//   { width: 1920, height: 1080, bitrate: 5000000, label: '1080p' },
//   { width: 1280, height: 720, bitrate: 2500000, label: '720p' },
//   { width: 854, height: 480, bitrate: 1000000, label: '480p' },
// ]
```

## Track Selection

### Audio Tracks

Download specific audio tracks:

```tsx
const download = await VideoDownloader.download({
  url: 'https://example.com/playlist.m3u8',
  title: 'My Video',
  type: 'hls',
  audioTracks: [
    { language: 'en', label: 'English' },
    { language: 'es', label: 'Spanish' },
  ],
});
```

### Subtitle Tracks

Download specific subtitle tracks:

```tsx
const download = await VideoDownloader.download({
  url: 'https://example.com/playlist.m3u8',
  title: 'My Video',
  type: 'hls',
  subtitleTracks: [
    { language: 'en', label: 'English' },
    { language: 'fr', label: 'French' },
  ],
});
```

### List Available Tracks

Get all available tracks before downloading:

```tsx
const tracks = await VideoDownloader.getAvailableTracks(
  'https://example.com/playlist.m3u8'
);

console.log(tracks.audio);
// [
//   { id: '1', language: 'en', label: 'English', default: true },
//   { id: '2', language: 'es', label: 'Spanish' },
// ]

console.log(tracks.subtitles);
// [
//   { id: '1', language: 'en', label: 'English' },
//   { id: '2', language: 'fr', label: 'French' },
// ]
```

## DASH Downloads

Download DASH content similarly to HLS:

```tsx
const download = await VideoDownloader.download({
  url: 'https://example.com/manifest.mpd',
  title: 'My DASH Video',
  type: 'dash',
  quality: {
    resolution: '720p',
  },
  audioTracks: [{ language: 'en' }],
});

await download.start();
```

## Advanced Options

### Full Configuration

```tsx
const download = await VideoDownloader.download({
  url: 'https://example.com/playlist.m3u8',
  title: 'My Video',
  type: 'hls',
  
  // Quality selection
  quality: {
    resolution: '1080p',
    // or: bitrate: 5000000,
    // or: 'auto' for best quality
  },
  
  // Track selection
  audioTracks: [
    { language: 'en', label: 'English' },
  ],
  subtitleTracks: [
    { language: 'en', label: 'English' },
    { language: 'es', label: 'Spanish' },
  ],
  
  // Storage optimization
  removeSourceAfterDownload: false,
  
  // Custom headers
  headers: {
    'Authorization': 'Bearer token',
  },
});
```

## Progress Tracking

Adaptive streaming downloads provide detailed segment progress:

```tsx
download.onProgress((progress) => {
  console.log(`Overall: ${progress.percentage}%`);
  console.log(`Segments: ${progress.segmentsDownloaded} / ${progress.totalSegments}`);
  console.log(`Speed: ${(progress.speed / 1024 / 1024).toFixed(2)} MB/s`);
});
```

## Playing Downloaded Content

```tsx
const download = await VideoDownloader.download({
  url: 'https://example.com/playlist.m3u8',
  title: 'My Video',
  type: 'hls',
});

await download.start();

// Play the downloaded content
const player = useVideoPlayer(download.localPath);

return <VideoView player={player} />;
```

## Complete Example

```tsx
import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import { VideoDownloader } from 'react-native-video';

function AdaptiveDownloadExample() {
  const [qualities, setQualities] = useState([]);
  const [selectedQuality, setSelectedQuality] = useState(null);
  const [download, setDownload] = useState(null);
  const [progress, setProgress] = useState(0);

  const url = 'https://example.com/playlist.m3u8';

  useEffect(() => {
    loadQualities();
  }, []);

  const loadQualities = async () => {
    const available = await VideoDownloader.getAvailableQualities(url);
    setQualities(available);
  };

  const startDownload = async () => {
    const dl = await VideoDownloader.download({
      url,
      title: 'My HLS Video',
      type: 'hls',
      quality: selectedQuality || 'auto',
    });

    dl.onProgress((prog) => {
      setProgress(prog.percentage);
    });

    dl.onComplete((result) => {
      console.log('Downloaded:', result.localPath);
    });

    setDownload(dl);
    await dl.start();
  };

  return (
    <View>
      <Text>Select Quality:</Text>
      <FlatList
        data={qualities}
        renderItem={({ item }) => (
          <Button
            title={`${item.label} (${(item.bitrate / 1000000).toFixed(1)} Mbps)`}
            onPress={() => setSelectedQuality(item)}
          />
        )}
      />
      
      <Button 
        title={`Download ${selectedQuality?.label || 'Best Quality'}`}
        onPress={startDownload}
      />
      
      {download && <Text>Progress: {progress}%</Text>}
    </View>
  );
}
```

## See Also

- [Track Selection](./track-selection.md) - Advanced track selection
- [Configuration](./configuration.md) - Download configuration options

