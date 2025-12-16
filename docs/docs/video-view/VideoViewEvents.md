# Interface: VideoViewEvents

Defined in: [types/Events.ts:102](https://github.com/moskalakamil/react-native-video/blob/758f54e450f1f536cb2092e087be9e65f05c3e68/packages/react-native-video/src/core/types/Events.ts#L102)

## Properties

### onFullscreenChange()

```ts
onFullscreenChange: (fullscreen) => void;
```

Defined in: [types/Events.ts:112](https://github.com/moskalakamil/react-native-video/blob/758f54e450f1f536cb2092e087be9e65f05c3e68/packages/react-native-video/src/core/types/Events.ts#L112)

Called when the video view's fullscreen state changes.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `fullscreen` | `boolean` | Whether the video view is in fullscreen mode. |

#### Returns

`void`

***

### onPictureInPictureChange()

```ts
onPictureInPictureChange: (isInPictureInPicture) => void;
```

Defined in: [types/Events.ts:107](https://github.com/moskalakamil/react-native-video/blob/758f54e450f1f536cb2092e087be9e65f05c3e68/packages/react-native-video/src/core/types/Events.ts#L107)

Called when the video view's picture in picture state changes.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `isInPictureInPicture` | `boolean` | Whether the video view is in picture in picture mode. |

#### Returns

`void`

***

### willEnterFullscreen()

```ts
willEnterFullscreen: () => void;
```

Defined in: [types/Events.ts:116](https://github.com/moskalakamil/react-native-video/blob/758f54e450f1f536cb2092e087be9e65f05c3e68/packages/react-native-video/src/core/types/Events.ts#L116)

Called when the video view will enter fullscreen mode.

#### Returns

`void`

***

### willEnterPictureInPicture()

```ts
willEnterPictureInPicture: () => void;
```

Defined in: [types/Events.ts:124](https://github.com/moskalakamil/react-native-video/blob/758f54e450f1f536cb2092e087be9e65f05c3e68/packages/react-native-video/src/core/types/Events.ts#L124)

Called when the video view will enter picture in picture mode.

#### Returns

`void`

***

### willExitFullscreen()

```ts
willExitFullscreen: () => void;
```

Defined in: [types/Events.ts:120](https://github.com/moskalakamil/react-native-video/blob/758f54e450f1f536cb2092e087be9e65f05c3e68/packages/react-native-video/src/core/types/Events.ts#L120)

Called when the video view will exit fullscreen mode.

#### Returns

`void`

***

### willExitPictureInPicture()

```ts
willExitPictureInPicture: () => void;
```

Defined in: [types/Events.ts:128](https://github.com/moskalakamil/react-native-video/blob/758f54e450f1f536cb2092e087be9e65f05c3e68/packages/react-native-video/src/core/types/Events.ts#L128)

Called when the video view will exit picture in picture mode.

#### Returns

`void`
