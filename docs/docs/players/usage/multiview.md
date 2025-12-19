# Multiview

Play multiple video streams simultaneously in a single synchronized view.

:::tip Pro Feature - Coming Soon
Multiview is a Pro feature currently in development.
:::

## Overview

Multiview enables:

- **Multiple angles** - Watch sports from different camera angles
- **Split screen** - Compare videos side by side
- **Picture-in-Picture grid** - Display 2, 4, or more streams
- **Synchronized playback** - All streams play in sync
- **Audio switching** - Choose which stream's audio to hear

## Quick Start

```tsx
import { useMultiview, MultiviewGrid } from 'react-native-video';

function MultiAnglePlayer() {
  const multiview = useMultiview([
    { uri: 'https://example.com/camera1.m3u8', label: 'Main' },
    { uri: 'https://example.com/camera2.m3u8', label: 'Goal' },
    { uri: 'https://example.com/camera3.m3u8', label: 'Tactical' },
    { uri: 'https://example.com/camera4.m3u8', label: 'Player' },
  ]);

  return (
    <MultiviewGrid 
      multiview={multiview} 
      layout="2x2"
      style={{ width: '100%', aspectRatio: 16/9 }} 
    />
  );
}
```

## useMultiview Hook

```ts
const multiview = useMultiview(sources: MultiviewSource[], config?: MultiviewConfig);
```

### MultiviewSource

```ts
interface MultiviewSource {
  uri: string;
  label?: string;
  type?: 'hls' | 'dash' | 'mp4';
  drm?: DRMConfig;
}
```

### MultiviewConfig

```ts
interface MultiviewConfig {
  syncTolerance?: number;  // Max desync in ms (default: 100)
  activeAudio?: number;    // Index of stream for audio (default: 0)
  autoSync?: boolean;      // Auto-sync streams (default: true)
}
```

## Layouts

### Built-in Layouts

```tsx
// 2x2 Grid (4 streams)
<MultiviewGrid multiview={multiview} layout="2x2" />

// 1+3 Layout (1 large + 3 small)
<MultiviewGrid multiview={multiview} layout="1+3" />

// Side by side (2 streams)
<MultiviewGrid multiview={multiview} layout="side-by-side" />

// Picture in Picture (1 large + 1 small overlay)
<MultiviewGrid multiview={multiview} layout="pip" />
```

### Custom Layout

```tsx
<MultiviewGrid 
  multiview={multiview} 
  layout="custom"
  customLayout={[
    { index: 0, x: 0, y: 0, width: 0.7, height: 1 },      // Main (70%)
    { index: 1, x: 0.7, y: 0, width: 0.3, height: 0.33 }, // Top right
    { index: 2, x: 0.7, y: 0.33, width: 0.3, height: 0.33 },
    { index: 3, x: 0.7, y: 0.66, width: 0.3, height: 0.34 },
  ]}
/>
```

## Controls

### Playback Control

```tsx
// Play all streams
multiview.play();

// Pause all streams
multiview.pause();

// Seek all streams to position
multiview.seekTo(30); // 30 seconds

// Get current time (from primary stream)
const time = multiview.currentTime;
```

### Audio Selection

```tsx
// Switch audio to stream index 2
multiview.setActiveAudio(2);

// Get current audio source
const audioIndex = multiview.activeAudio;
```

### Focus Stream

```tsx
// Expand stream to fullscreen temporarily
multiview.focusStream(1);

// Return to grid
multiview.unfocus();

// Check if focused
const isFocused = multiview.focusedStream !== null;
```

### Stream Management

```tsx
// Add stream dynamically
multiview.addStream({ uri: 'https://example.com/camera5.m3u8' });

// Remove stream
multiview.removeStream(2);

// Replace stream
multiview.replaceStream(1, { uri: 'https://example.com/alternate.m3u8' });
```

## Events

```tsx
// Stream loaded
useEvent(multiview, 'onStreamLoad', (index, data) => {
  console.log(`Stream ${index} loaded:`, data.duration);
});

// Sync status changed
useEvent(multiview, 'onSyncChange', (data) => {
  console.log('Streams synced:', data.isSynced);
  console.log('Max desync:', data.maxDesync);
});

// Audio switched
useEvent(multiview, 'onAudioChange', (index) => {
  console.log('Audio now from stream:', index);
});

// Stream error
useEvent(multiview, 'onStreamError', (index, error) => {
  console.error(`Stream ${index} error:`, error);
});
```

## Complete Example

```tsx
import React, { useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { useMultiview, MultiviewGrid, useEvent } from 'react-native-video';

const CAMERA_ANGLES = [
  { uri: 'https://example.com/main.m3u8', label: 'Main Camera' },
  { uri: 'https://example.com/goal.m3u8', label: 'Goal Line' },
  { uri: 'https://example.com/tactical.m3u8', label: 'Tactical' },
  { uri: 'https://example.com/player.m3u8', label: 'Player Cam' },
];

function SportsMultiview() {
  const [layout, setLayout] = useState<'2x2' | '1+3'>('2x2');
  const [activeAudio, setActiveAudio] = useState(0);

  const multiview = useMultiview(CAMERA_ANGLES, {
    activeAudio,
    syncTolerance: 50,
  });

  const handleStreamTap = (index: number) => {
    // Double tap to focus, single tap to switch audio
    setActiveAudio(index);
    multiview.setActiveAudio(index);
  };

  return (
    <View style={styles.container}>
      <MultiviewGrid
        multiview={multiview}
        layout={layout}
        style={styles.grid}
        onStreamPress={handleStreamTap}
        onStreamLongPress={(index) => multiview.focusStream(index)}
      />

      {/* Layout switcher */}
      <View style={styles.controls}>
        <TouchableOpacity onPress={() => setLayout('2x2')}>
          <Text style={layout === '2x2' ? styles.active : styles.inactive}>
            Grid
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setLayout('1+3')}>
          <Text style={layout === '1+3' ? styles.active : styles.inactive}>
            Focus
          </Text>
        </TouchableOpacity>
      </View>

      {/* Audio indicator */}
      <View style={styles.audioIndicator}>
        <Text>🔊 {CAMERA_ANGLES[activeAudio].label}</Text>
      </View>
    </View>
  );
}
```

## Use Cases

| Use Case | Layout | Description |
|----------|--------|-------------|
| **Sports** | 2x2, 1+3 | Multiple camera angles, tactical views |
| **E-sports** | 1+3 | Main game + player cams |
| **Surveillance** | 2x2, 3x3 | Multiple security cameras |
| **Education** | side-by-side | Instructor + slides |
| **Comparison** | side-by-side | Before/after, A/B testing |
| **Live Events** | pip | Main stage + backstage |

## Performance Tips

1. **Limit streams** - 4 streams max recommended on mobile
2. **Lower quality** - Use lower bitrates for non-focused streams
3. **Lazy loading** - Load streams as needed

```tsx
multiview.setStreamQuality(0, 'high');   // Main stream
multiview.setStreamQuality(1, 'medium'); // Secondary
multiview.setStreamQuality(2, 'low');    // Background
multiview.setStreamQuality(3, 'low');    // Background
```

## Platform Support

| Feature | iOS | Android |
|---------|-----|---------|
| 2 streams | ✅ | ✅ |
| 4 streams | ✅ | ✅ |
| 6+ streams | ⚠️ Device dependent | ⚠️ Device dependent |
| Audio switching | ✅ | ✅ |
| Synchronized seek | ✅ | ✅ |
| Custom layouts | ✅ | ✅ |

## See Also

- [Playback](./playback.md) - Single video playback
- [Low Latency](./low-latency.md) - For live multiview
- [Events](../events/useEvent.md) - Event handling

