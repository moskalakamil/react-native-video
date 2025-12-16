# Interface: VideoViewRef

Defined in: [video-view/VideoView.tsx:67](https://github.com/moskalakamil/react-native-video/blob/758f54e450f1f536cb2092e087be9e65f05c3e68/packages/react-native-video/src/core/video-view/VideoView.tsx#L67)

## Properties

### addEventListener()

```ts
addEventListener: <Event>(event, callback) => ListenerSubscription;
```

Defined in: [video-view/VideoView.tsx:95](https://github.com/moskalakamil/react-native-video/blob/758f54e450f1f536cb2092e087be9e65f05c3e68/packages/react-native-video/src/core/video-view/VideoView.tsx#L95)

Adds a listener for a view event.

#### Type Parameters

| Type Parameter |
| ------ |
| `Event` *extends* keyof [`VideoViewEvents`](VideoViewEvents.md) |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `event` | `Event` | The event to add a listener for. |
| `callback` | [`VideoViewEvents`](VideoViewEvents.md)\[`Event`\] | The callback to call when the event is triggered. |

#### Returns

`ListenerSubscription`

A subscription object that can be used to remove the listener.

***

### canEnterPictureInPicture()

```ts
canEnterPictureInPicture: () => boolean;
```

Defined in: [video-view/VideoView.tsx:88](https://github.com/moskalakamil/react-native-video/blob/758f54e450f1f536cb2092e087be9e65f05c3e68/packages/react-native-video/src/core/video-view/VideoView.tsx#L88)

Check if picture in picture mode is supported

#### Returns

`boolean`

true if picture in picture mode is supported, false otherwise

***

### enterFullscreen()

```ts
enterFullscreen: () => void;
```

Defined in: [video-view/VideoView.tsx:71](https://github.com/moskalakamil/react-native-video/blob/758f54e450f1f536cb2092e087be9e65f05c3e68/packages/react-native-video/src/core/video-view/VideoView.tsx#L71)

Enter fullscreen mode

#### Returns

`void`

***

### enterPictureInPicture()

```ts
enterPictureInPicture: () => void;
```

Defined in: [video-view/VideoView.tsx:79](https://github.com/moskalakamil/react-native-video/blob/758f54e450f1f536cb2092e087be9e65f05c3e68/packages/react-native-video/src/core/video-view/VideoView.tsx#L79)

Enter picture in picture mode

#### Returns

`void`

***

### exitFullscreen()

```ts
exitFullscreen: () => void;
```

Defined in: [video-view/VideoView.tsx:75](https://github.com/moskalakamil/react-native-video/blob/758f54e450f1f536cb2092e087be9e65f05c3e68/packages/react-native-video/src/core/video-view/VideoView.tsx#L75)

Exit fullscreen mode

#### Returns

`void`

***

### exitPictureInPicture()

```ts
exitPictureInPicture: () => void;
```

Defined in: [video-view/VideoView.tsx:83](https://github.com/moskalakamil/react-native-video/blob/758f54e450f1f536cb2092e087be9e65f05c3e68/packages/react-native-video/src/core/video-view/VideoView.tsx#L83)

Exit picture in picture mode

#### Returns

`void`
