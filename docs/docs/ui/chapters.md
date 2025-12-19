# Chapters

Navigate through video chapters with visual timeline markers.

## Overview

The Chapters component provides a rich chapter navigation experience with:
- Visual markers on the seek bar
- Chapter list panel
- Automatic chapter detection during playback
- Smooth seeking to chapter start points

```tsx
<Controls.Chapters 
  chapters={videoChapters}
  showOnSeekBar={true}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `chapters` | `Chapter[]` | `[]` | Array of chapter data |
| `showOnSeekBar` | `boolean` | `true` | Show markers on seek bar |
| `markerColor` | `string` | `'#FFFFFF'` | Marker color on seek bar |
| `activeColor` | `string` | `'#FF5722'` | Active chapter highlight color |
| `style` | `ViewStyle` | - | Container style |
| `panelStyle` | `ViewStyle` | - | Chapter list panel style |
| `itemStyle` | `ViewStyle` | - | Individual chapter item style |
| `thumbnailStyle` | `ImageStyle` | - | Thumbnail image style |
| `titleStyle` | `TextStyle` | - | Chapter title text style |
| `timeStyle` | `TextStyle` | - | Chapter time text style |
| `onChapterChange` | `(chapter: Chapter) => void` | - | Callback when chapter changes |
| `onChapterSelect` | `(chapter: Chapter) => void` | - | Callback when user selects chapter |

## Chapter Type

```ts
interface Chapter {
  id: string;
  title: string;
  startTime: number;  // in seconds
  endTime?: number;   // in seconds (optional)
  thumbnail?: string; // URL or require() for local image
  description?: string;
}
```

## Basic Example

```tsx
import { VideoView, Controls, useVideoPlayer } from 'react-native-video';

const chapters = [
  { 
    id: '1', 
    title: 'Introduction', 
    startTime: 0,
    thumbnail: require('./thumbnails/intro.jpg')
  },
  { 
    id: '2', 
    title: 'Getting Started', 
    startTime: 45,
    thumbnail: require('./thumbnails/start.jpg')
  },
  { 
    id: '3', 
    title: 'Advanced Topics', 
    startTime: 180,
    thumbnail: require('./thumbnails/advanced.jpg')
  },
  { 
    id: '4', 
    title: 'Conclusion', 
    startTime: 320,
    thumbnail: require('./thumbnails/conclusion.jpg')
  },
];

function VideoWithChapters({ source }) {
  const player = useVideoPlayer(source);

  return (
    <VideoView player={player} style={styles.video}>
      <Controls.Container>
        <Controls.PlayPause />
        
        {/* Chapters with seek bar markers */}
  <Controls.Chapters
    chapters={chapters}
    showOnSeekBar={true}
    markerColor="#FFFFFF"
    activeColor="#FF5722"
    onChapterChange={(chapter) => {
      console.log('Now playing:', chapter.title);
    }}
  />
        
        <Controls.SeekBar />
        <Controls.Duration />
      </Controls.Container>
    </VideoView>
  );
}
```

## Seek Bar Markers Only

If you only want chapter markers on the seek bar without a chapter list:

```tsx
<Controls.Chapters
  chapters={chapters}
  showOnSeekBar={true}
  markerColor="rgba(255, 255, 255, 0.8)"
/>
```

## Custom Chapter List Panel

```tsx
<Controls.Chapters
  chapters={chapters}
  panelStyle={{
    backgroundColor: 'rgba(0, 0, 0, 0.95)',
    borderRadius: 12,
    padding: 16,
    maxHeight: 300,
  }}
  itemStyle={{
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  }}
  thumbnailStyle={{
    width: 120,
    height: 68,
    borderRadius: 6,
    marginRight: 12,
  }}
  titleStyle={{
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  }}
  timeStyle={{
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 12,
    marginTop: 4,
  }}
  activeColor="#00BCD4"
/>
```

## Dynamic Chapters from API

```tsx
function VideoWithDynamicChapters({ videoId }) {
  const [chapters, setChapters] = useState([]);
  const player = useVideoPlayer(source);

  useEffect(() => {
    async function loadChapters() {
      const response = await fetch(`/api/videos/${videoId}/chapters`);
      const data = await response.json();
      setChapters(data.chapters);
    }
    loadChapters();
  }, [videoId]);

  return (
    <VideoView player={player}>
      <Controls.Container>
        {chapters.length > 0 && (
          <Controls.Chapters chapters={chapters} />
        )}
        {/* ... other controls */}
      </Controls.Container>
    </VideoView>
  );
}
```

## Combining with Other Controls

```tsx
<Controls.Container>
  {/* Top bar with chapter button */}
  <View style={styles.topBar}>
    <Controls.Chapters.Button /> {/* Just the toggle button */}
    <Controls.Fullscreen />
  </View>

  <Controls.PlayPause size={64} />

  {/* Bottom bar */}
  <View style={styles.bottomBar}>
    <Controls.Duration />
    <Controls.SeekBar>
      {/* Chapter markers rendered inside seek bar */}
      <Controls.Chapters.Markers chapters={chapters} />
    </Controls.SeekBar>
  </View>

  {/* Chapter panel (shown when button is pressed) */}
  <Controls.Chapters.Panel chapters={chapters} />
</Controls.Container>
```

