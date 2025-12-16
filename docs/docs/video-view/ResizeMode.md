# Type Alias: ResizeMode

```ts
type ResizeMode = "contain" | "cover" | "stretch" | "none";
```

Defined in: [types/ResizeMode.ts:9](https://github.com/moskalakamil/react-native-video/blob/758f54e450f1f536cb2092e087be9e65f05c3e68/packages/react-native-video/src/core/types/ResizeMode.ts#L9)

Video resize modes that determine how video content is resized to fit the view

- 'contain': Scale the video uniformly (maintain aspect ratio) so that it fits entirely within the view
- 'cover': Scale the video uniformly (maintain aspect ratio) so that it fills the entire view (may crop)
- 'stretch': Scale the video to fill the entire view without maintaining aspect ratio
- 'none': Do not resize the video - it will fallback to default behavior (contain)
