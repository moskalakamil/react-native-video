# Background Playback

Control how the player behaves when the app is in the background.

:::warning Configuration Required
To enable background audio, configure your app:
- **Expo**: Set `enableBackgroundAudio: true`. See [Expo Plugin](../../fundamentals/configuration/expo-plugin.md#enablebackgroundaudio-optional).
- **Manual**: Add `audio` background mode to `Info.plist`. See [Manual Configuration](../../fundamentals/configuration/manual.md#enable-background-audio).
:::

## playInBackground

```ts
get playInBackground(): boolean;
set playInBackground(value: boolean): void;
```

Continue playing when app is backgrounded.

| Value | Behavior |
|-------|----------|
| `true` | Continue in background |
| `false` | Pause when backgrounded (default) |

**Set on creation:**
```tsx
const player = useVideoPlayer(source, (_player) => {
  _player.playInBackground = true;
  _player.showNotificationControls = true;
});
```

**Toggle dynamically:**
```tsx
<Switch
  value={player.playInBackground}
  onValueChange={(v) => player.playInBackground = v}
/>
```

## playWhenInactive

```ts
get playWhenInactive(): boolean;
set playWhenInactive(value: boolean): void;
```

**iOS only.** Continue playing when app is inactive (Control Center open, notification).

```tsx
const player = useVideoPlayer(source, (_player) => {
  _player.playWhenInactive = true;
});
```

:::note
`playInBackground` can override this setting.
:::

## With Notification Controls

When playing in background, show media controls in notification area:

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

See [Notification Controls](./notification-controls.md) for details.

## Complete Example

```tsx
import React from 'react';
import { View, Switch, Text, Platform } from 'react-native';
import { useVideoPlayer, VideoView } from 'react-native-video';

function BackgroundPlayer() {
  const player = useVideoPlayer({
    uri: source,
    metadata: { title: 'My Podcast' },
  }, (_player) => {
    _player.playInBackground = true;
    _player.showNotificationControls = true;
    _player.play();
  });

  return (
    <View>
      <VideoView player={player} style={{ width: '100%', height: 300 }} />
      
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text>Play in Background</Text>
        <Switch
          value={player.playInBackground}
          onValueChange={(v) => {
            player.playInBackground = v;
            player.showNotificationControls = v;
          }}
        />
      </View>

      {Platform.OS === 'ios' && (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text>Play When Inactive</Text>
          <Switch
            value={player.playWhenInactive}
            onValueChange={(v) => player.playWhenInactive = v}
          />
        </View>
      )}
    </View>
  );
}
```

## See Also

- [Notification Controls](./notification-controls.md) - Lock screen controls
- [Audio](./audio.md) - Audio mixing
