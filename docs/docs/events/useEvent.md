# useEvent

Subscribe to player events with automatic cleanup.

## Basic Usage

```tsx
import { useVideoPlayer, useEvent, VideoView } from 'react-native-video';

function Player() {
  const player = useVideoPlayer(source, (_player) => {
    _player.play();
  });

  useEvent(player, 'onLoad', (data) => {
    console.log('Duration:', data.duration);
  });

  useEvent(player, 'onProgress', (data) => {
    console.log('Time:', data.currentTime);
  });

  useEvent(player, 'onError', (error) => {
    console.error('Error:', error.code, error.message);
  });

  return <VideoView player={player} />;
}
```

## API

```ts
function useEvent<T>(player, event, callback): void;
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `player` | `VideoPlayer` | Player instance |
| `event` | `T` | Event name |
| `callback` | `AllPlayerEvents[T]` | Callback function |

## Benefits

- **Automatic cleanup** - Removed on unmount
- **Type safety** - Inferred callback types
- **Declarative** - React-style subscriptions

## Manual Subscription

For non-React contexts or manual control:

```tsx
const subscription = player.addEventListener('onProgress', (data) => {
  console.log('Time:', data.currentTime);
});

// Later
subscription.remove();
```

## Clearing Events

```tsx
// Clear specific event
player.clearEvent('onProgress');

// Clear all events
player.clearAllEvents();

// Automatic on release
player.release();
```

## Initialization Timing

`onLoadStart` / `onLoad` fire automatically after player creation (when `initializeOnCreation: true`).

With deferred initialization:

```tsx
const player = useVideoPlayer({
  uri: source,
  initializeOnCreation: false,
});

// Attach handlers first
useEvent(player, 'onLoad', () => console.log('Loaded'));

// Then initialize
await player.initialize();
```

## See Also

- [Usage](./loading.md) - All events by category
