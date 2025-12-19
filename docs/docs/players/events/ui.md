---
sidebar_label: UI & External
---

# UI & External Events

Events for controls visibility and external playback (AirPlay, Chromecast).

## onControlsVisibleChange

```ts
onControlsVisibleChange: (visible: boolean) => void;
```

Fired when native controls visibility changes.

```tsx
useEvent(player, 'onControlsVisibleChange', (visible) => {
  console.log('Controls:', visible ? 'shown' : 'hidden');
});
```

## onExternalPlaybackChange

```ts
onExternalPlaybackChange: (externalPlaybackActive: boolean) => void;
```

Fired when AirPlay/external playback state changes.

```tsx
useEvent(player, 'onExternalPlaybackChange', (active) => {
  console.log('AirPlay:', active ? 'active' : 'inactive');
});
```

## Example

```tsx
function ExternalPlaybackPlayer() {
  const [isAirPlay, setIsAirPlay] = useState(false);

  const player = useVideoPlayer(source, (_player) => {
    _player.play();
  });

  useEvent(player, 'onExternalPlaybackChange', (active) => {
    setIsAirPlay(active);
  });

  return (
    <View>
      <VideoView player={player} style={{ width: '100%', height: 300 }} />
      {isAirPlay && <Text>📺 Playing on external device</Text>}
    </View>
  );
}
```
