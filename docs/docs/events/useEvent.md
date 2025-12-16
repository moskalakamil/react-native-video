# Function: useEvent()

```ts
function useEvent<T>(
   player, 
   event, 
   callback): void;
```

Defined in: [hooks/useEvent.ts:12](https://github.com/moskalakamil/react-native-video/blob/758f54e450f1f536cb2092e087be9e65f05c3e68/packages/react-native-video/src/core/hooks/useEvent.ts#L12)

Attaches an event listener to a `VideoPlayer` instance for a specified event.

## Type Parameters

| Type Parameter |
| ------ |
| `T` *extends* keyof VideoPlayerEvents \| `"onError"` |

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `player` | [`VideoPlayer`](../classes/VideoPlayer.md) | The player to attach the event to |
| `event` | `T` | The name of the event to attach the callback to |
| `callback` | [`AllPlayerEvents`](../type-aliases/AllPlayerEvents.md)\[`T`\] | The callback for the event |

## Returns

`void`
