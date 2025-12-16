# Interface: VideoViewProps

Defined in: [video-view/VideoView.tsx:20](https://github.com/moskalakamil/react-native-video/blob/758f54e450f1f536cb2092e087be9e65f05c3e68/packages/react-native-video/src/core/video-view/VideoView.tsx#L20)

## Extends

- `Partial`\<[`VideoViewEvents`](VideoViewEvents.md)\>.`ViewProps`

## Properties

### autoEnterPictureInPicture?

```ts
optional autoEnterPictureInPicture: boolean;
```

Defined in: [video-view/VideoView.tsx:40](https://github.com/moskalakamil/react-native-video/blob/758f54e450f1f536cb2092e087be9e65f05c3e68/packages/react-native-video/src/core/video-view/VideoView.tsx#L40)

Whether to automatically enter picture in picture mode when the video is playing. Defaults to false.

***

### controls?

```ts
optional controls: boolean;
```

Defined in: [video-view/VideoView.tsx:32](https://github.com/moskalakamil/react-native-video/blob/758f54e450f1f536cb2092e087be9e65f05c3e68/packages/react-native-video/src/core/video-view/VideoView.tsx#L32)

Whether to show the controls. Defaults to false.

***

### keepScreenAwake?

```ts
optional keepScreenAwake: boolean;
```

Defined in: [video-view/VideoView.tsx:52](https://github.com/moskalakamil/react-native-video/blob/758f54e450f1f536cb2092e087be9e65f05c3e68/packages/react-native-video/src/core/video-view/VideoView.tsx#L52)

Whether to keep the screen awake while the video view is mounted. Defaults to true.

***

### onFullscreenChange()?

```ts
optional onFullscreenChange: (fullscreen) => void;
```

Defined in: [types/Events.ts:112](https://github.com/moskalakamil/react-native-video/blob/758f54e450f1f536cb2092e087be9e65f05c3e68/packages/react-native-video/src/core/types/Events.ts#L112)

Called when the video view's fullscreen state changes.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `fullscreen` | `boolean` | Whether the video view is in fullscreen mode. |

#### Returns

`void`

#### Inherited from

[`VideoViewEvents`](VideoViewEvents.md).[`onFullscreenChange`](VideoViewEvents.md#onfullscreenchange)

***

### onPictureInPictureChange()?

```ts
optional onPictureInPictureChange: (isInPictureInPicture) => void;
```

Defined in: [types/Events.ts:107](https://github.com/moskalakamil/react-native-video/blob/758f54e450f1f536cb2092e087be9e65f05c3e68/packages/react-native-video/src/core/types/Events.ts#L107)

Called when the video view's picture in picture state changes.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `isInPictureInPicture` | `boolean` | Whether the video view is in picture in picture mode. |

#### Returns

`void`

#### Inherited from

[`VideoViewEvents`](VideoViewEvents.md).[`onPictureInPictureChange`](VideoViewEvents.md#onpictureinpicturechange)

***

### pictureInPicture?

```ts
optional pictureInPicture: boolean;
```

Defined in: [video-view/VideoView.tsx:36](https://github.com/moskalakamil/react-native-video/blob/758f54e450f1f536cb2092e087be9e65f05c3e68/packages/react-native-video/src/core/video-view/VideoView.tsx#L36)

Whether to enable & show the picture in picture button in native controls. Defaults to false.

***

### player

```ts
player: VideoPlayer;
```

Defined in: [video-view/VideoView.tsx:24](https://github.com/moskalakamil/react-native-video/blob/758f54e450f1f536cb2092e087be9e65f05c3e68/packages/react-native-video/src/core/video-view/VideoView.tsx#L24)

The player to play the video - [VideoPlayer](../classes/VideoPlayer.md)

***

### resizeMode?

```ts
optional resizeMode: ResizeMode;
```

Defined in: [video-view/VideoView.tsx:48](https://github.com/moskalakamil/react-native-video/blob/758f54e450f1f536cb2092e087be9e65f05c3e68/packages/react-native-video/src/core/video-view/VideoView.tsx#L48)

How the video should be resized to fit the view. Defaults to 'none'.
- 'contain': Scale the video uniformly (maintain aspect ratio) so that it fits entirely within the view
- 'cover': Scale the video uniformly (maintain aspect ratio) so that it fills the entire view (may crop)
- 'stretch': Scale the video to fill the entire view without maintaining aspect ratio
- 'none': Do not resize the video

***

### style?

```ts
optional style: ViewStyle;
```

Defined in: [video-view/VideoView.tsx:28](https://github.com/moskalakamil/react-native-video/blob/758f54e450f1f536cb2092e087be9e65f05c3e68/packages/react-native-video/src/core/video-view/VideoView.tsx#L28)

The style of the video view - ViewStyle

#### Overrides

```ts
ViewProps.style
```

***

### surfaceType?

```ts
optional surfaceType: SurfaceType;
```

Defined in: [video-view/VideoView.tsx:64](https://github.com/moskalakamil/react-native-video/blob/758f54e450f1f536cb2092e087be9e65f05c3e68/packages/react-native-video/src/core/video-view/VideoView.tsx#L64)

The type of underlying native view. Defaults to 'surface'.
- 'surface': Uses a SurfaceView on Android. More performant, but cannot be animated or transformed.
- 'texture': Uses a TextureView on Android. Less performant, but can be animated and transformed.

Only applicable on Android

#### Default

```ts
'surface'
```

#### Platform

android

***

### willEnterFullscreen()?

```ts
optional willEnterFullscreen: () => void;
```

Defined in: [types/Events.ts:116](https://github.com/moskalakamil/react-native-video/blob/758f54e450f1f536cb2092e087be9e65f05c3e68/packages/react-native-video/src/core/types/Events.ts#L116)

Called when the video view will enter fullscreen mode.

#### Returns

`void`

#### Inherited from

[`VideoViewEvents`](VideoViewEvents.md).[`willEnterFullscreen`](VideoViewEvents.md#willenterfullscreen)

***

### willEnterPictureInPicture()?

```ts
optional willEnterPictureInPicture: () => void;
```

Defined in: [types/Events.ts:124](https://github.com/moskalakamil/react-native-video/blob/758f54e450f1f536cb2092e087be9e65f05c3e68/packages/react-native-video/src/core/types/Events.ts#L124)

Called when the video view will enter picture in picture mode.

#### Returns

`void`

#### Inherited from

[`VideoViewEvents`](VideoViewEvents.md).[`willEnterPictureInPicture`](VideoViewEvents.md#willenterpictureinpicture)

***

### willExitFullscreen()?

```ts
optional willExitFullscreen: () => void;
```

Defined in: [types/Events.ts:120](https://github.com/moskalakamil/react-native-video/blob/758f54e450f1f536cb2092e087be9e65f05c3e68/packages/react-native-video/src/core/types/Events.ts#L120)

Called when the video view will exit fullscreen mode.

#### Returns

`void`

#### Inherited from

[`VideoViewEvents`](VideoViewEvents.md).[`willExitFullscreen`](VideoViewEvents.md#willexitfullscreen)

***

### willExitPictureInPicture()?

```ts
optional willExitPictureInPicture: () => void;
```

Defined in: [types/Events.ts:128](https://github.com/moskalakamil/react-native-video/blob/758f54e450f1f536cb2092e087be9e65f05c3e68/packages/react-native-video/src/core/types/Events.ts#L128)

Called when the video view will exit picture in picture mode.

#### Returns

`void`

#### Inherited from

[`VideoViewEvents`](VideoViewEvents.md).[`willExitPictureInPicture`](VideoViewEvents.md#willexitpictureinpicture)
