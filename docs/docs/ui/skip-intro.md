# Skip Intro & Binge Watching

Netflix-style components for seamless viewing experiences.

:::tip Pro Feature - Coming Soon
Skip Intro and Binge Watching components are Pro features currently in development.
:::

## Overview

Enhance your streaming app with:

- **Skip Intro** - Let users skip opening credits
- **Skip Recap** - Skip "previously on..." segments
- **Skip Outro** - Skip end credits
- **Next Episode** - Auto-play countdown with preview
- **Binge Mode** - Continuous playback between episodes

## Skip Intro

### Basic Usage

```tsx
import { VideoView, SkipIntro } from 'react-native-video';

function Player({ source, introEnd }) {
  const player = useVideoPlayer(source);

  return (
    <View>
      <VideoView player={player} />
      
      <SkipIntro
        player={player}
        skipTo={introEnd} // e.g., 90 (seconds)
        label="Skip Intro"
      />
    </View>
  );
}
```

### With Time Range

Show button only during intro:

```tsx
<SkipIntro
  player={player}
  showFrom={5}      // Show after 5 seconds
  showUntil={95}    // Hide after 95 seconds
  skipTo={90}       // Skip to 90 seconds
  label="Skip Intro"
/>
```

### Customization

```tsx
<SkipIntro
  player={player}
  skipTo={90}
  label="Skip Intro"
  style={styles.skipButton}
  labelStyle={styles.skipLabel}
  icon={<SkipIcon />}
  position="bottom-right" // 'bottom-right' | 'bottom-left' | 'top-right'
  animationType="slide"   // 'slide' | 'fade' | 'none'
/>
```

## Skip Recap

For "Previously on..." segments:

```tsx
<SkipRecap
  player={player}
  showFrom={0}
  showUntil={45}
  skipTo={42}
  label="Skip Recap"
/>
```

## Skip Outro

For end credits:

```tsx
const duration = player.duration;

<SkipOutro
  player={player}
  showFrom={duration - 120} // Show 2 min before end
  skipTo={duration - 5}     // Skip to near end
  label="Skip Credits"
/>
```

## Next Episode

### Basic Usage

```tsx
import { NextEpisode } from 'react-native-video';

function Player({ currentEpisode, nextEpisode }) {
  const player = useVideoPlayer(currentEpisode.source);

  const handlePlayNext = () => {
    // Navigate to next episode
    navigation.replace('Player', { episode: nextEpisode });
  };

  return (
    <View>
      <VideoView player={player} />
      
      <NextEpisode
        player={player}
        showBeforeEnd={30}        // Show 30s before end
        countdownDuration={10}   // 10s countdown
        onPlayNext={handlePlayNext}
        nextTitle={nextEpisode.title}
        nextThumbnail={nextEpisode.thumbnail}
      />
    </View>
  );
}
```

### With Preview

```tsx
<NextEpisode
  player={player}
  showBeforeEnd={45}
  countdownDuration={15}
  onPlayNext={handlePlayNext}
  nextTitle="Episode 5: The Finale"
  nextThumbnail="https://example.com/ep5-thumb.jpg"
  nextDuration="52 min"
  showPreview          // Show thumbnail preview
  previewStyle={styles.preview}
/>
```

### Customization

```tsx
<NextEpisode
  player={player}
  showBeforeEnd={30}
  countdownDuration={10}
  onPlayNext={handlePlayNext}
  onCancel={() => console.log('User cancelled')}
  nextTitle="Next Episode"
  
  // Styling
  style={styles.container}
  countdownStyle={styles.countdown}
  titleStyle={styles.title}
  buttonStyle={styles.button}
  
  // Labels
  playNextLabel="Play Next Episode"
  cancelLabel="Cancel"
  countdownFormat={(seconds) => `Starting in ${seconds}...`}
/>
```

## Binge Mode

Automatic continuous playback:

```tsx
import { useBingeMode } from 'react-native-video';

function SeriesPlayer({ episodes, startIndex }) {
  const [currentIndex, setCurrentIndex] = useState(startIndex);
  
  const binge = useBingeMode({
    episodes: episodes.map(ep => ep.source),
    currentIndex,
    onEpisodeChange: setCurrentIndex,
    countdownDuration: 5,
    autoPlay: true,
  });

  return (
    <View>
      <VideoView player={binge.player} />
      
      {/* Auto-shows next episode UI */}
      <BingeModeOverlay binge={binge} />
      
      {/* Episode info */}
      <Text>{episodes[currentIndex].title}</Text>
    </View>
  );
}
```

### Binge Mode Options

```ts
interface BingeModeConfig {
  episodes: string[];           // Array of source URIs
  currentIndex: number;
  onEpisodeChange: (index: number) => void;
  countdownDuration?: number;   // Seconds before auto-play (default: 10)
  autoPlay?: boolean;           // Auto-play next (default: true)
  skipCredits?: boolean;        // Auto-skip outros (default: false)
  skipIntros?: boolean;         // Auto-skip intros (default: false)
  introMarkers?: number[];      // Intro end times per episode
  outroMarkers?: number[];      // Outro start times per episode
}
```

## Markers from API

Load skip markers from your backend:

```tsx
function Player({ videoId }) {
  const [markers, setMarkers] = useState(null);

  useEffect(() => {
    fetch(`/api/videos/${videoId}/markers`)
      .then(res => res.json())
      .then(setMarkers);
  }, [videoId]);

  const player = useVideoPlayer(source);

  if (!markers) return <Loading />;

  return (
    <View>
      <VideoView player={player} />
      
      {markers.intro && (
        <SkipIntro
          player={player}
          showFrom={markers.intro.start}
          showUntil={markers.intro.end + 5}
          skipTo={markers.intro.end}
        />
      )}
      
      {markers.recap && (
        <SkipRecap
          player={player}
          showFrom={markers.recap.start}
          showUntil={markers.recap.end + 5}
          skipTo={markers.recap.end}
        />
      )}
      
      {markers.outro && (
        <SkipOutro
          player={player}
          showFrom={markers.outro.start}
          skipTo={markers.outro.end}
        />
      )}
    </View>
  );
}
```

### Markers API Response

```ts
interface VideoMarkers {
  intro?: { start: number; end: number };
  recap?: { start: number; end: number };
  outro?: { start: number; end: number };
}
```

## Complete Example

```tsx
import React, { useState, useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import { 
  useVideoPlayer, 
  VideoView, 
  SkipIntro, 
  NextEpisode 
} from 'react-native-video';

function StreamingPlayer({ series, episodeIndex }) {
  const episode = series.episodes[episodeIndex];
  const nextEpisode = series.episodes[episodeIndex + 1];

  const player = useVideoPlayer(episode.source, (_player) => {
    _player.play();
  });

  const handlePlayNext = () => {
    navigation.replace('Player', {
      series,
      episodeIndex: episodeIndex + 1,
    });
  };

  return (
    <View style={styles.container}>
      <VideoView player={player} style={styles.video} />

      {/* Skip intro button */}
      {episode.introEnd && (
        <SkipIntro
          player={player}
          showFrom={3}
          showUntil={episode.introEnd + 5}
          skipTo={episode.introEnd}
          style={styles.skipButton}
        />
      )}

      {/* Next episode countdown */}
      {nextEpisode && (
        <NextEpisode
          player={player}
          showBeforeEnd={30}
          countdownDuration={10}
          onPlayNext={handlePlayNext}
          nextTitle={nextEpisode.title}
          nextThumbnail={nextEpisode.thumbnail}
          showPreview
        />
      )}

      {/* Episode info */}
      <View style={styles.info}>
        <Text style={styles.title}>{episode.title}</Text>
        <Text style={styles.subtitle}>
          S{episode.season}E{episode.number}
        </Text>
      </View>
    </View>
  );
}
```

## Platform Support

| Feature | iOS | Android |
|---------|-----|---------|
| Skip Intro | ✅ | ✅ |
| Skip Recap | ✅ | ✅ |
| Skip Outro | ✅ | ✅ |
| Next Episode | ✅ | ✅ |
| Binge Mode | ✅ | ✅ |
| Animations | ✅ | ✅ |

## See Also

- [Playback Controls](./playback.md) - Basic UI components
- [Chapters](./chapters.md) - Video chapters *(Pro)*
- [Events](../players/events/useEvent.md) - Event handling

