# Track Selection

Select specific audio and subtitle tracks when downloading adaptive streaming content.

:::tip Pro Feature
Advanced track selection requires a Pro license.
:::

## Overview

When downloading HLS/DASH content, you can:
- Select multiple audio tracks
- Select multiple subtitle tracks
- Set default tracks
- List available tracks before download

## Get Available Tracks

Before downloading, check what tracks are available:

```tsx
import { VideoDownloader } from 'react-native-video';

const tracks = await VideoDownloader.getAvailableTracks(
  'https://example.com/playlist.m3u8'
);

console.log(tracks);
// {
//   audio: [
//     { id: '1', language: 'en', label: 'English', channels: 2, bitrate: 128000, default: true },
//     { id: '2', language: 'es', label: 'Spanish', channels: 2, bitrate: 128000 },
//     { id: '3', language: 'en', label: 'English (5.1)', channels: 6, bitrate: 384000 },
//   ],
//   subtitles: [
//     { id: '1', language: 'en', label: 'English', format: 'vtt' },
//     { id: '2', language: 'es', label: 'Spanish', format: 'vtt' },
//     { id: '3', language: 'fr', label: 'French', format: 'vtt' },
//   ],
// }
```

## Audio Track Selection

### Select Single Audio Track

```tsx
const download = await VideoDownloader.download({
  url: 'https://example.com/playlist.m3u8',
  title: 'My Video',
  type: 'hls',
  audioTracks: [
    { language: 'en' }
  ],
});
```

### Select Multiple Audio Tracks

Download multiple audio tracks for multilingual support:

```tsx
const download = await VideoDownloader.download({
  url: 'https://example.com/playlist.m3u8',
  title: 'My Video',
  type: 'hls',
  audioTracks: [
    { language: 'en', label: 'English' },
    { language: 'es', label: 'Spanish' },
    { language: 'fr', label: 'French' },
  ],
});
```

### Select by Track ID

Use specific track IDs for precise selection:

```tsx
const tracks = await VideoDownloader.getAvailableTracks(url);
const englishTrack = tracks.audio.find(t => t.language === 'en');

const download = await VideoDownloader.download({
  url,
  title: 'My Video',
  type: 'hls',
  audioTracks: [
    { id: englishTrack.id }
  ],
});
```

### Audio Track Criteria

```ts
interface AudioTrackSelection {
  id?: string;           // Specific track ID
  language?: string;     // Language code (e.g., 'en', 'es')
  label?: string;        // Track label
  channels?: number;     // Audio channels (2, 6, etc.)
  minBitrate?: number;   // Minimum bitrate
  maxBitrate?: number;   // Maximum bitrate
  default?: boolean;     // Select default track
}
```

## Subtitle Track Selection

### Select Single Subtitle Track

```tsx
const download = await VideoDownloader.download({
  url: 'https://example.com/playlist.m3u8',
  title: 'My Video',
  type: 'hls',
  subtitleTracks: [
    { language: 'en' }
  ],
});
```

### Select Multiple Subtitle Tracks

```tsx
const download = await VideoDownloader.download({
  url: 'https://example.com/playlist.m3u8',
  title: 'My Video',
  type: 'hls',
  subtitleTracks: [
    { language: 'en', label: 'English' },
    { language: 'es', label: 'Spanish' },
    { language: 'fr', label: 'French' },
    { language: 'de', label: 'German' },
  ],
});
```

### Subtitle Track Criteria

```ts
interface SubtitleTrackSelection {
  id?: string;        // Specific track ID
  language?: string;  // Language code
  label?: string;     // Track label
  format?: string;    // Subtitle format ('vtt', 'srt', etc.)
  forced?: boolean;   // Forced subtitles only
  sdh?: boolean;      // SDH/CC subtitles
}
```

## Default Tracks

### Set Default Audio Track

```tsx
const download = await VideoDownloader.download({
  url: 'https://example.com/playlist.m3u8',
  title: 'My Video',
  type: 'hls',
  audioTracks: [
    { language: 'en', default: true },
    { language: 'es' },
  ],
});
```

### Set Default Subtitle Track

```tsx
const download = await VideoDownloader.download({
  url: 'https://example.com/playlist.m3u8',
  title: 'My Video',
  type: 'hls',
  subtitleTracks: [
    { language: 'en', default: true },
    { language: 'fr' },
  ],
});
```

## Advanced Selection

### Quality-Specific Audio

Select high-quality audio for high-resolution video:

```tsx
const download = await VideoDownloader.download({
  url: 'https://example.com/playlist.m3u8',
  title: 'My Video',
  type: 'hls',
  quality: '1080p',
  audioTracks: [
    {
      language: 'en',
      channels: 6,  // 5.1 surround
      minBitrate: 384000,
    },
  ],
});
```

### All Tracks

Download all available tracks:

```tsx
const tracks = await VideoDownloader.getAvailableTracks(url);

const download = await VideoDownloader.download({
  url,
  title: 'My Video',
  type: 'hls',
  audioTracks: tracks.audio,
  subtitleTracks: tracks.subtitles,
});
```

## Track Filtering

### Filter by Language

```tsx
const tracks = await VideoDownloader.getAvailableTracks(url);

// Only English and Spanish audio
const filteredAudio = tracks.audio.filter(
  t => ['en', 'es'].includes(t.language)
);

const download = await VideoDownloader.download({
  url,
  title: 'My Video',
  type: 'hls',
  audioTracks: filteredAudio,
});
```

### Filter by Channels

```tsx
const tracks = await VideoDownloader.getAvailableTracks(url);

// Only stereo audio (2 channels)
const stereoAudio = tracks.audio.filter(t => t.channels === 2);

const download = await VideoDownloader.download({
  url,
  title: 'My Video',
  type: 'hls',
  audioTracks: stereoAudio,
});
```

## Playing with Track Selection

After download, select tracks during playback:

```tsx
const download = await VideoDownloader.download({
  url: 'https://example.com/playlist.m3u8',
  title: 'My Video',
  type: 'hls',
  audioTracks: [
    { language: 'en' },
    { language: 'es' },
  ],
  subtitleTracks: [
    { language: 'en' },
    { language: 'es' },
  ],
});

await download.start();

// Play with track selection
const player = useVideoPlayer(download.localPath);

// Get available tracks
const availableTracks = player.getAvailableTextTracks();

// Select Spanish audio
player.selectAudioTrack({ language: 'es' });

// Select English subtitles
player.selectTextTrack({ language: 'en' });
```

## Complete Example

```tsx
import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, Switch } from 'react-native';
import { VideoDownloader } from 'react-native-video';

function TrackSelectionExample() {
  const [tracks, setTracks] = useState({ audio: [], subtitles: [] });
  const [selectedAudio, setSelectedAudio] = useState([]);
  const [selectedSubtitles, setSelectedSubtitles] = useState([]);

  const url = 'https://example.com/playlist.m3u8';

  useEffect(() => {
    loadTracks();
  }, []);

  const loadTracks = async () => {
    const available = await VideoDownloader.getAvailableTracks(url);
    setTracks(available);
  };

  const toggleAudioTrack = (track) => {
    setSelectedAudio(prev => {
      const exists = prev.find(t => t.id === track.id);
      if (exists) {
        return prev.filter(t => t.id !== track.id);
      }
      return [...prev, track];
    });
  };

  const toggleSubtitleTrack = (track) => {
    setSelectedSubtitles(prev => {
      const exists = prev.find(t => t.id === track.id);
      if (exists) {
        return prev.filter(t => t.id !== track.id);
      }
      return [...prev, track];
    });
  };

  const startDownload = async () => {
    const download = await VideoDownloader.download({
      url,
      title: 'My Video',
      type: 'hls',
      audioTracks: selectedAudio,
      subtitleTracks: selectedSubtitles,
    });

    await download.start();
  };

  return (
    <View>
      <Text>Audio Tracks:</Text>
      <FlatList
        data={tracks.audio}
        renderItem={({ item }) => (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Switch
              value={selectedAudio.some(t => t.id === item.id)}
              onValueChange={() => toggleAudioTrack(item)}
            />
            <Text>{item.label} ({item.language}) - {item.channels}ch</Text>
          </View>
        )}
      />

      <Text>Subtitle Tracks:</Text>
      <FlatList
        data={tracks.subtitles}
        renderItem={({ item }) => (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Switch
              value={selectedSubtitles.some(t => t.id === item.id)}
              onValueChange={() => toggleSubtitleTrack(item)}
            />
            <Text>{item.label} ({item.language})</Text>
          </View>
        )}
      />

      <Button
        title={`Download (${selectedAudio.length} audio, ${selectedSubtitles.length} subs)`}
        onPress={startDownload}
        disabled={selectedAudio.length === 0}
      />
    </View>
  );
}
```

## See Also

- [Adaptive Streaming](./adaptive-streaming.md) - HLS/DASH downloads
- [Configuration](./configuration.md) - Download configuration

