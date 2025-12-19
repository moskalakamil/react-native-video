# Picture in Picture

Enable Picture-in-Picture (PiP) mode to let users watch video in a floating window while using other apps.

## Props

### pictureInPicture

```ts
optional pictureInPicture: boolean;
```

Enable PiP and show the PiP button in native controls. Defaults to `false`.

```tsx
<VideoView player={player} controls pictureInPicture />
```

### autoEnterPictureInPicture

```ts
optional autoEnterPictureInPicture: boolean;
```

Automatically enter PiP when the app goes to background. Defaults to `false`.

```tsx
<VideoView 
  player={player} 
  pictureInPicture 
  autoEnterPictureInPicture 
/>
```

## Methods

Access these methods via a ref to `VideoView`:

```tsx
const videoRef = useRef<VideoViewRef>(null);

<VideoView ref={videoRef} player={player} />
```

### enterPictureInPicture()

```ts
enterPictureInPicture(): void;
```

Enter PiP mode programmatically.

```tsx
videoRef.current?.enterPictureInPicture();
```

### exitPictureInPicture()

```ts
exitPictureInPicture(): void;
```

Exit PiP mode programmatically.

```tsx
videoRef.current?.exitPictureInPicture();
```

### canEnterPictureInPicture()

```ts
canEnterPictureInPicture(): boolean;
```

Check if PiP is supported on the current device.

```tsx
const canPiP = videoRef.current?.canEnterPictureInPicture();

if (canPiP) {
  videoRef.current?.enterPictureInPicture();
}
```

## Events

### onPictureInPictureChange

```ts
onPictureInPictureChange?: (isInPiP: boolean) => void;
```

Called when PiP state changes.

```tsx
<VideoView
  player={player}
  onPictureInPictureChange={(isInPiP) => {
    console.log('PiP:', isInPiP);
  }}
/>
```

### willEnterPictureInPicture

```ts
willEnterPictureInPicture?: () => void;
```

Called immediately before entering PiP mode.

```tsx
<VideoView
  player={player}
  willEnterPictureInPicture={() => {
    // Prepare for PiP
  }}
/>
```

### willExitPictureInPicture

```ts
willExitPictureInPicture?: () => void;
```

Called immediately before exiting PiP mode.

```tsx
<VideoView
  player={player}
  willExitPictureInPicture={() => {
    // Prepare to return to full view
  }}
/>
```

## Complete Example

```tsx
import React, { useRef, useState } from 'react';
import { View, Button, Text } from 'react-native';
import { useVideoPlayer, VideoView, VideoViewRef } from 'react-native-video';

function PiPPlayer({ source }) {
  const videoRef = useRef<VideoViewRef>(null);
  const [isInPiP, setIsInPiP] = useState(false);
  const [canPiP, setCanPiP] = useState(false);

  const player = useVideoPlayer(source, (_player) => {
    _player.play();
  });

  const handleLayout = () => {
    setCanPiP(videoRef.current?.canEnterPictureInPicture() ?? false);
  };

  const togglePiP = () => {
    if (isInPiP) {
      videoRef.current?.exitPictureInPicture();
    } else {
      videoRef.current?.enterPictureInPicture();
    }
  };

  return (
    <View>
      <VideoView
        ref={videoRef}
        player={player}
        style={{ width: '100%', aspectRatio: 16/9 }}
        pictureInPicture
        autoEnterPictureInPicture
        onLayout={handleLayout}
        onPictureInPictureChange={setIsInPiP}
      />
      
      {canPiP ? (
        <Button 
          title={isInPiP ? 'Exit PiP' : 'Enter PiP'} 
          onPress={togglePiP} 
        />
      ) : (
        <Text>PiP not supported on this device</Text>
      )}
    </View>
  );
}
```

## Platform Configuration

### iOS

Add to your `Info.plist`:

```xml
<key>UIBackgroundModes</key>
<array>
  <string>audio</string>
</array>
```

### Android

PiP requires Android 8.0 (API 26) or higher. Add to your `AndroidManifest.xml`:

```xml
<activity
  android:name=".MainActivity"
  android:supportsPictureInPicture="true"
  android:configChanges="screenSize|smallestScreenSize|screenLayout|orientation">
</activity>
```

## Platform Support

| Feature | iOS | Android |
|---------|-----|---------|
| PiP | ✅ iOS 14+ | ✅ API 26+ |
| Auto-enter | ✅ | ✅ |
| Custom controls in PiP | ✅ | ❌ |

## See Also

- [Props](./props.md) - All VideoView props
- [Fullscreen](./fullscreen.md) - Fullscreen mode
- [Background](../players/usage/background.md) - Background playback

