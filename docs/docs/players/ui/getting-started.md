# Custom UI Controls

Build beautiful, fully customizable video player interfaces using our compound component API.

## Overview

React Native Video provides a powerful compound component pattern that lets you create custom video player UIs. Instead of being locked into a single design, you compose your interface from modular, pre-built components.

```tsx
import { VideoView, Controls } from 'react-native-video';

function MyPlayer() {
  const player = useVideoPlayer(source);

  return (
    <VideoView player={player}>
      <Controls.Container>
        <Controls.PlayPause />
        <Controls.SeekBar />
        <Controls.Duration />
      </Controls.Container>
    </VideoView>
  );
}
```

## Compound API Philosophy

The compound component pattern gives you:

- **Full Control** - Position, style, and animate any control element
- **Flexibility** - Use only the components you need
- **Consistency** - Built-in state management and player synchronization
- **Customization** - Override styles or wrap components with your own logic

## Available Components

- Playback UI: [PlayPause, SeekBar, Duration, Fullscreen, Mute, Volume](./playback.md)
- Screen sharing: [AirPlay, Chromecast, native pickers](./screen-sharing.md)
- Subtitles: [Subtitle selector](./subtitles.md)
- Pro features: [Chapters](./chapters.md) · [ResolutionSelect](./resolution-select.md) · SeekBar preview thumbnails (in SeekBar props)
- SeekBar preview thumbnails *(Pro)* — see [Basic Controls](./basic.md#seekbar)

## Basic Example

```tsx
import { VideoView, Controls } from 'react-native-video';

function BasicPlayer({ source }) {
  const player = useVideoPlayer(source);

  return (
    <VideoView player={player} style={styles.video}>
      <Controls.Container style={styles.controls}>
        {/* Top bar */}
        <Controls.TopBar>
          <Controls.Title />
          <Controls.Fullscreen />
        </Controls.TopBar>

        {/* Center play button */}
        <Controls.Center>
          <Controls.PlayPause size={64} />
        </Controls.Center>

        {/* Bottom bar */}
        <Controls.BottomBar>
          <Controls.Duration />
          <Controls.SeekBar />
          <Controls.Mute />
        </Controls.BottomBar>
      </Controls.Container>
    </VideoView>
  );
}
```

## Custom Styling

All control components accept standard React Native style props:

```tsx
<Controls.PlayPause 
  style={styles.playButton}
  iconStyle={styles.icon}
  activeColor="#FF5722"
  inactiveColor="#FFFFFF"
/>

<Controls.SeekBar
  style={styles.seekBar}
  trackStyle={styles.track}
  thumbStyle={styles.thumb}
  progressColor="#FF5722"
  bufferColor="rgba(255, 87, 34, 0.3)"
/>
```

## Building Custom Components

You can also build entirely custom controls using the player hooks:

```tsx
import { useVideoPlayer } from 'react-native-video';

function CustomPlayButton() {
  const player = useVideoPlayer();
  
  const handlePress = () => {
    if (player.isPlaying) {
      player.pause();
    } else {
      player.play();
    }
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <MyCustomIcon name={player.isPlaying ? 'pause' : 'play'} />
    </TouchableOpacity>
  );
}
```

