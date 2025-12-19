# Text Tracks

Manage subtitles and closed captions.

## Overview

Text tracks can come from:
- **Embedded** - Built into video (HLS, DASH)
- **External** - Separate files (VTT, SRT)

## selectedTrack

```ts
get selectedTrack(): TextTrack | undefined;
```

Currently selected track, or `undefined` if none.

```tsx
useEvent(player, 'onTrackChange', (track) => {
  console.log(track ? `Subtitles: ${track.label}` : 'Subtitles: Off');
});
```

## getAvailableTextTracks()

```ts
getAvailableTextTracks(): TextTrack[];
```

Get all available tracks after video loads.

```tsx
useEvent(player, 'onLoad', () => {
  const tracks = player.getAvailableTextTracks();
  console.log('Available:', tracks);
});
```

## selectTextTrack()

```ts
selectTextTrack(textTrack: TextTrack | null): void;
```

Select a track or disable subtitles.

```tsx
// Enable English
const tracks = player.getAvailableTextTracks();
const en = tracks.find(t => t.language === 'en');
if (en) player.selectTextTrack(en);

// Disable
player.selectTextTrack(null);
```

## External Subtitles

Load from external files:

```tsx
const player = useVideoPlayer({
  uri: 'https://example.com/video.mp4',
  externalSubtitles: [
    { uri: 'https://example.com/en.vtt', label: 'English', language: 'en', type: 'vtt' },
    { uri: 'https://example.com/es.vtt', label: 'Español', language: 'es', type: 'vtt' },
  ],
});
```

**Supported formats:** VTT (recommended), SRT

---

## Types

### TextTrack

```ts
interface TextTrack {
  id: string;
  label: string;
  language?: string;
  selected: boolean;
}
```

### ExternalSubtitle

```ts
interface ExternalSubtitle {
  uri: string;
  label: string;
  language: string;
  type: 'vtt' | 'srt';
}
```

---

## Events

### onTrackChange

```tsx
useEvent(player, 'onTrackChange', (track) => {
  // track is null when subtitles disabled
});
```

### onTextTrackDataChanged

Fired when current subtitle text changes.

```tsx
useEvent(player, 'onTextTrackDataChanged', (texts) => {
  console.log('Current text:', texts);
});
```

---

## Complete Example

```tsx
import React, { useState } from 'react';
import { View, Button, Modal, TouchableOpacity, Text } from 'react-native';
import { useVideoPlayer, useEvent, VideoView } from 'react-native-video';

function SubtitlePicker() {
  const player = useVideoPlayer({
    uri: source,
    externalSubtitles: [
      { uri: 'https://example.com/en.vtt', label: 'English', language: 'en', type: 'vtt' },
      { uri: 'https://example.com/es.vtt', label: 'Español', language: 'es', type: 'vtt' },
    ],
  });

  const [tracks, setTracks] = useState<TextTrack[]>([]);
  const [current, setCurrent] = useState<TextTrack | undefined>();
  const [show, setShow] = useState(false);

  useEvent(player, 'onLoad', () => setTracks(player.getAvailableTextTracks()));
  useEvent(player, 'onTrackChange', (t) => setCurrent(t ?? undefined));

  const select = (track: TextTrack | null) => {
    player.selectTextTrack(track);
    setShow(false);
  };

  return (
    <View>
      <VideoView player={player} style={{ width: '100%', height: 300 }} />
      
      <Button
        title={current ? `CC: ${current.label}` : 'CC: Off'}
        onPress={() => setShow(true)}
      />

      <Modal visible={show} transparent>
        <View style={{ /* ... */ }}>
          <TouchableOpacity onPress={() => select(null)}>
            <Text>Off {!current && '✓'}</Text>
          </TouchableOpacity>
          
          {tracks.map(track => (
            <TouchableOpacity key={track.id} onPress={() => select(track)}>
              <Text>{track.label} {track.selected && '✓'}</Text>
            </TouchableOpacity>
          ))}
          
          <Button title="Close" onPress={() => setShow(false)} />
        </View>
      </Modal>
    </View>
  );
}
```

## See Also

- [Source](./source.md) - External subtitles config
- [Events](../events/useEvent.md) - Event handling
