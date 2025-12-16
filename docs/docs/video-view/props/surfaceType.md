# surfaceType

```ts
optional surfaceType: SurfaceType;
```

Defined in: [video-view/VideoView.tsx:64](https://github.com/moskalakamil/react-native-video/blob/758f54e450f1f536cb2092e087be9e65f05c3e68/packages/react-native-video/src/core/video-view/VideoView.tsx#L64)

The type of underlying native view. Defaults to 'surface'.
- 'surface': Uses a SurfaceView on Android. More performant, but cannot be animated or transformed.
- 'texture': Uses a TextureView on Android. Less performant, but can be animated and transformed.

Only applicable on Android
