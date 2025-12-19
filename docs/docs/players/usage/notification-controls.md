# Notification Controls

Show media controls in the system notification area and lock screen.

## Overview

- **Android**: Each player has its own notification + MediaSession (Google Assistant, external controls)
- **iOS**: One notification for the last active player

Usually paired with `playInBackground` to keep playback when app is backgrounded.

## showNotificationControls

```ts
get showNotificationControls(): boolean;
set showNotificationControls(value: boolean): void;
```

Enable/disable notification controls.

```tsx
const player = useVideoPlayer({
  uri: source,
  metadata: {
    title: 'Episode 42',
    artist: 'Podcast Name',
    artwork: 'https://example.com/artwork.jpg',
  },
}, (_player) => {
  _player.playInBackground = true;
  _player.showNotificationControls = true;
});
```

## Configuration Required

:::warning
Background audio must be configured:
- **Expo**: Set `enableBackgroundAudio: true`. See [Expo Plugin](../../fundamentals/configuration/expo-plugin.md#enablebackgroundaudio-optional).
- **Manual**: Add `audio` background mode to `Info.plist`. See [Manual Configuration](../../fundamentals/configuration/manual.md#enable-background-audio).
:::

### Android Manifest

```xml
<manifest ...>
  <uses-permission android:name="android.permission.FOREGROUND_SERVICE" />
  <application ...>
    <service
      android:name="com.brentvatne.react.ReactVideoView$MediaSessionService"
      android:exported="false"
      android:foregroundServiceType="mediaPlayback" />
  </application>
</manifest>
```

## Metadata

Customize notification appearance with source metadata:

```tsx
const player = useVideoPlayer({
  uri: source,
  metadata: {
    title: 'Song Title',
    artist: 'Artist Name',
    artwork: 'https://example.com/cover.jpg',
  },
}, (_player) => {
  _player.showNotificationControls = true;
});
```

| Property | Description |
|----------|-------------|
| `title` | Main title |
| `artist` | Secondary text |
| `artwork` | Cover image URL |

## Testing

:::note
iOS notification controls must be tested on a **real device**. Simulator does not support them.
:::

## Complete Example

```tsx
import React from 'react';
import { View, Button } from 'react-native';
import { useVideoPlayer, VideoView } from 'react-native-video';

function PodcastPlayer() {
  const player = useVideoPlayer({
    uri: 'https://example.com/podcast.mp3',
    metadata: {
      title: 'Episode 42: The Answer',
      artist: 'My Podcast',
      artwork: 'https://example.com/cover.jpg',
    },
  }, (_player) => {
    _player.playInBackground = true;
    _player.showNotificationControls = true;
    _player.play();
  });

  return (
    <View>
      <VideoView player={player} style={{ width: '100%', height: 300 }} />
      
      <Button
        title={player.isPlaying ? 'Pause' : 'Play'}
        onPress={() => player.isPlaying ? player.pause() : player.play()}
      />
    </View>
  );
}
```

## See Also

- [Background](./background.md) - Background playback
- [Source](./source.md) - Metadata configuration
