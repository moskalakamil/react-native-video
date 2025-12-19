# Source

Manage video source and configuration.

## source

```ts
get source(): VideoPlayerSource;
```

Current video source. Read-only. Use `replaceSourceAsync()` to change.

```tsx
console.log('Playing:', player.source.uri);
```

## replaceSourceAsync()

```ts
replaceSourceAsync(source: VideoSource | VideoConfig | null): Promise<void>;
```

Replace the current video source.

```tsx
// Change video
await player.replaceSourceAsync({ uri: 'https://example.com/video2.mp4' });
player.play();

// Clear source (free resources)
await player.replaceSourceAsync(null);
```

:::tip
Use `replaceSourceAsync(null)` to free resources while keeping the player instance.
:::

---

## Types

### VideoSource

```ts
type VideoSource = string | number;
```

- **URL**: `'https://example.com/video.mp4'`
- **Local file**: `require('./assets/video.mp4')`

### VideoConfig

```ts
interface VideoConfig {
  uri: VideoSource;
  headers?: Record<string, string>;
  drm?: DrmParams;
  bufferConfig?: BufferConfig;
  metadata?: CustomVideoMetadata;
  externalSubtitles?: ExternalSubtitle[];
  initializeOnCreation?: boolean;
}
```

| Property | Type | Description |
|----------|------|-------------|
| `uri` | `VideoSource` | Video URL or local file. Required. |
| `headers?` | `Record<string, string>` | HTTP headers |
| `drm?` | `DrmParams` | DRM config. See [DRM](../drm.md). |
| `bufferConfig?` | `BufferConfig` | Buffer config. See [Player](../player.md#buffer-config). |
| `metadata?` | `CustomVideoMetadata` | Metadata for notifications |
| `externalSubtitles?` | `ExternalSubtitle[]` | External subtitle tracks |
| `initializeOnCreation?` | `boolean` | Initialize immediately. Default: `true`. |

---

## Examples

**Basic:**
```tsx
const player = useVideoPlayer({ uri: 'https://example.com/video.mp4' });
```

**With headers:**
```tsx
const player = useVideoPlayer({
  uri: 'https://api.example.com/video.mp4',
  headers: { 'Authorization': 'Bearer token' },
});
```

**With subtitles:**
```tsx
const player = useVideoPlayer({
  uri: 'https://example.com/video.mp4',
  externalSubtitles: [
    { uri: 'https://example.com/en.vtt', label: 'English', language: 'en', type: 'vtt' },
    { uri: 'https://example.com/es.vtt', label: 'Español', language: 'es', type: 'vtt' },
  ],
});
```

**With metadata (for notifications):**
```tsx
const player = useVideoPlayer({
  uri: 'https://example.com/video.mp4',
  metadata: {
    title: 'Big Buck Bunny',
    artist: 'Blender Foundation',
    artwork: 'https://example.com/thumb.jpg',
  },
}, (_player) => {
  _player.showNotificationControls = true;
});
```

**Deferred initialization:**
```tsx
const player = useVideoPlayer({
  uri: 'https://example.com/video.mp4',
  initializeOnCreation: false,
});

// Later
await player.initialize();
player.play();
```

---

## Playlist Example

```tsx
function PlaylistPlayer() {
  const videos = [
    'https://example.com/video1.mp4',
    'https://example.com/video2.mp4',
    'https://example.com/video3.mp4',
  ];
  const [index, setIndex] = useState(0);

  const player = useVideoPlayer({ uri: videos[index] }, (_player) => {
    _player.play();
  });

  useEvent(player, 'onEnd', async () => {
    const next = (index + 1) % videos.length;
    await player.replaceSourceAsync({ uri: videos[next] });
    setIndex(next);
    player.play();
  });

  return (
    <View>
      <VideoView player={player} style={{ width: '100%', height: 300 }} />
      <Text>Playing: {index + 1} / {videos.length}</Text>
      {/* ... */}
    </View>
  );
}
```
