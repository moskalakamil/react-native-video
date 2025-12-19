# Fullscreen

Control fullscreen mode programmatically and respond to fullscreen state changes.

## Methods

Access these methods via a ref to `VideoView`:

```tsx
const videoRef = useRef<VideoViewRef>(null);

<VideoView ref={videoRef} player={player} />
```

### enterFullscreen()

```ts
enterFullscreen(): void;
```

Enter fullscreen mode.

```tsx
videoRef.current?.enterFullscreen();
```

### exitFullscreen()

```ts
exitFullscreen(): void;
```

Exit fullscreen mode.

```tsx
videoRef.current?.exitFullscreen();
```

## Events

### onFullscreenChange

```ts
onFullscreenChange?: (isFullscreen: boolean) => void;
```

Called when the fullscreen state changes.

```tsx
<VideoView
  player={player}
  onFullscreenChange={(isFullscreen) => {
    console.log('Fullscreen:', isFullscreen);
  }}
/>
```

### willEnterFullscreen

```ts
willEnterFullscreen?: () => void;
```

Called immediately before entering fullscreen mode.

```tsx
<VideoView
  player={player}
  willEnterFullscreen={() => {
    // Hide other UI elements
  }}
/>
```

### willExitFullscreen

```ts
willExitFullscreen?: () => void;
```

Called immediately before exiting fullscreen mode.

```tsx
<VideoView
  player={player}
  willExitFullscreen={() => {
    // Prepare to show other UI elements
  }}
/>
```

## Complete Example

```tsx
import React, { useRef, useState } from 'react';
import { View, Button } from 'react-native';
import { useVideoPlayer, VideoView, VideoViewRef } from 'react-native-video';

function FullscreenPlayer({ source }) {
  const videoRef = useRef<VideoViewRef>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const player = useVideoPlayer(source, (_player) => {
    _player.play();
  });

  const toggleFullscreen = () => {
    if (isFullscreen) {
      videoRef.current?.exitFullscreen();
    } else {
      videoRef.current?.enterFullscreen();
    }
  };

  return (
    <View>
      <VideoView
        ref={videoRef}
        player={player}
        style={{ width: '100%', aspectRatio: 16/9 }}
        onFullscreenChange={setIsFullscreen}
        willEnterFullscreen={() => console.log('Entering fullscreen...')}
        willExitFullscreen={() => console.log('Exiting fullscreen...')}
      />
      
      <Button 
        title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'} 
        onPress={toggleFullscreen} 
      />
    </View>
  );
}
```

## Platform Behavior

| Platform | Behavior |
|----------|----------|
| iOS | Presents native fullscreen player |
| Android | Expands video to fill screen, hides status bar |

## See Also

- [Props](./props.md) - All VideoView props
- [Picture in Picture](./picture-in-picture.md) - PiP mode

