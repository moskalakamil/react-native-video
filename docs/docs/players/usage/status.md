# Status

Monitor player status and manage event listeners.

## status

```ts
get status(): VideoPlayerStatus;
```

Current player status. Read-only.

```tsx
useEvent(player, 'onStatusChange', (status) => {
  console.log('Status:', status);
});
```

### VideoPlayerStatus Values

| Status | Description |
|--------|-------------|
| `'idle'` | No source loaded |
| `'loading'` | Source loading |
| `'ready'` | Ready to play |
| `'playing'` | Playing |
| `'paused'` | Paused |
| `'buffering'` | Buffering |
| `'ended'` | Reached end |
| `'error'` | Error occurred |

```tsx
function StatusIcon({ player }) {
  const [status, setStatus] = useState(player.status);
  
  useEvent(player, 'onStatusChange', setStatus);

  switch (status) {
    case 'loading':
    case 'buffering':
      return <ActivityIndicator />;
    case 'playing':
      return <Icon name="pause" />;
    case 'ended':
      return <Icon name="replay" />;
    case 'error':
      return <Icon name="error" />;
    default:
      return <Icon name="play" />;
  }
}
```

---

## Event Management

### addEventListener()

```ts
addEventListener<Event>(event, callback): ListenerSubscription;
```

Add event listener. Returns subscription to remove it.

```tsx
const subscription = player.addEventListener('onProgress', (data) => {
  console.log('Time:', data.currentTime);
});

// Later
subscription.remove();
```

:::tip
In React, prefer `useEvent` hook for automatic cleanup.
:::

### clearAllEvents()

```ts
clearAllEvents(): void;
```

Remove all event listeners.

```tsx
player.clearAllEvents();
```

---

## Events

### onStatusChange

```tsx
useEvent(player, 'onStatusChange', (status) => {
  if (status === 'ready') console.log('Ready to play');
  if (status === 'buffering') console.log('Buffering...');
});
```

### onError

```tsx
useEvent(player, 'onError', (error) => {
  console.error('Error:', error.code, error.message);
});
```

---

## Complete Example

```tsx
import React, { useState } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useVideoPlayer, useEvent, VideoView, VideoPlayerStatus } from 'react-native-video';

function StatusPlayer() {
  const player = useVideoPlayer(source);

  const [status, setStatus] = useState<VideoPlayerStatus>('idle');
  const [error, setError] = useState<string | null>(null);

  useEvent(player, 'onStatusChange', setStatus);
  useEvent(player, 'onError', (err) => setError(err.message));

  const getColor = () => {
    switch (status) {
      case 'playing': return '#4CAF50';
      case 'paused': return '#FFC107';
      case 'buffering': return '#2196F3';
      case 'error': return '#F44336';
      default: return '#757575';
    }
  };

  return (
    <View>
      <View style={{ position: 'relative' }}>
        <VideoView player={player} style={{ width: '100%', height: 300 }} />

        {(status === 'loading' || status === 'buffering') && (
          <View style={{ /* overlay */ }}>
            <ActivityIndicator color="white" />
          </View>
        )}

        {status === 'error' && (
          <View style={{ /* overlay */ }}>
            <Text style={{ color: 'white' }}>⚠️ {error}</Text>
          </View>
        )}
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
        <View style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: getColor() }} />
        <Text style={{ marginLeft: 8 }}>{status.toUpperCase()}</Text>
      </View>

      <TouchableOpacity onPress={() => {
        if (status === 'playing') player.pause();
        else if (status === 'ended') { player.seekTo(0); player.play(); }
        else player.play();
      }}>
        <Text>
          {status === 'playing' ? 'Pause' : status === 'ended' ? 'Replay' : 'Play'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
```

## See Also

- [Events](../events/useEvent.md) - Event handling
- [Playback](./playback.md) - Playback control
