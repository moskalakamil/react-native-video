# resizeMode

```ts
optional resizeMode: ResizeMode;
```

Defined in: [video-view/VideoView.tsx:48](https://github.com/moskalakamil/react-native-video/blob/758f54e450f1f536cb2092e087be9e65f05c3e68/packages/react-native-video/src/core/video-view/VideoView.tsx#L48)

How the video should be resized to fit the view. Defaults to 'none'.
- 'contain': Scale the video uniformly (maintain aspect ratio) so that it fits entirely within the view
- 'cover': Scale the video uniformly (maintain aspect ratio) so that it fills the entire view (may crop)
- 'stretch': Scale the video to fill the entire view without maintaining aspect ratio
- 'none': Do not resize the video
