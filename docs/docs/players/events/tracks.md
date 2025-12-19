---
sidebar_label: Tracks & Metadata
---

# Tracks & Metadata Events

Events for text tracks and timed metadata.

## onTrackChange

```ts
onTrackChange: (track: TextTrack | null) => void;
```

Fired when selected text track changes.

```tsx
useEvent(player, 'onTrackChange', (track) => {
  if (track) {
    console.log('Selected:', track.label);
  } else {
    console.log('Subtitles disabled');
  }
});
```

## onTextTrackDataChanged

```ts
onTextTrackDataChanged: (texts: string[]) => void;
```

Fired when current subtitle text changes.

```tsx
useEvent(player, 'onTextTrackDataChanged', (texts) => {
  console.log('Current subtitle:', texts.join(' '));
});
```

## onTimedMetadata

```ts
onTimedMetadata: (metadata: TimedMetadata) => void;
```

Fired when timed metadata is encountered (ID3 tags in HLS streams).

```tsx
useEvent(player, 'onTimedMetadata', (metadata) => {
  console.log('Metadata:', metadata);
});
```

## Example

```tsx
function SubtitlePlayer() {
  const [currentSubtitle, setCurrentSubtitle] = useState('');
  const [trackLabel, setTrackLabel] = useState('Off');

  const player = useVideoPlayer(source, (_player) => {
    _player.play();
  });

  useEvent(player, 'onTrackChange', (track) => {
    setTrackLabel(track?.label ?? 'Off');
  });

  useEvent(player, 'onTextTrackDataChanged', (texts) => {
    setCurrentSubtitle(texts.join(' '));
  });

  return (
    <View>
      <VideoView player={player} style={{ width: '100%', height: 300 }} />
      <Text>Track: {trackLabel}</Text>
      <Text>{currentSubtitle}</Text>
    </View>
  );
}
```
