# preload()

```ts
preload(): Promise<void>;
```

Defined in: [VideoPlayer.ts:211](https://github.com/moskalakamil/react-native-video/blob/758f54e450f1f536cb2092e087be9e65f05c3e68/packages/react-native-video/src/core/VideoPlayer.ts#L211)

Preload the video.
This is useful to avoid delay when the user plays the video.
Preloading too many videos can lead to memory issues or performance issues.
