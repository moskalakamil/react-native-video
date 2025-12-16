# Type Alias: VideoConfig

```ts
type VideoConfig = object;
```

Defined in: [types/VideoConfig.ts:6](https://github.com/moskalakamil/react-native-video/blob/758f54e450f1f536cb2092e087be9e65f05c3e68/packages/react-native-video/src/core/types/VideoConfig.ts#L6)

## Properties

### bufferConfig?

```ts
optional bufferConfig: BufferConfig;
```

Defined in: [types/VideoConfig.ts:28](https://github.com/moskalakamil/react-native-video/blob/758f54e450f1f536cb2092e087be9e65f05c3e68/packages/react-native-video/src/core/types/VideoConfig.ts#L28)

The player buffer configuration.

***

### drm?

```ts
optional drm: DrmParams;
```

Defined in: [types/VideoConfig.ts:24](https://github.com/moskalakamil/react-native-video/blob/758f54e450f1f536cb2092e087be9e65f05c3e68/packages/react-native-video/src/core/types/VideoConfig.ts#L24)

The DRM parameters to be used.

***

### externalSubtitles?

```ts
optional externalSubtitles: ExternalSubtitle[];
```

Defined in: [types/VideoConfig.ts:56](https://github.com/moskalakamil/react-native-video/blob/758f54e450f1f536cb2092e087be9e65f05c3e68/packages/react-native-video/src/core/types/VideoConfig.ts#L56)

The external subtitles to be used.

#### Note

on iOS, only WebVTT (.vtt) subtitles are supported (for HLS streams and MP4 files).

#### Note

on iOS, `label` can be overridden by player and there is no way to get around it.

#### Example

```ts
externalSubtitles: [
  {
    uri: 'https://example.com/subtitles_en.vtt',
    label: 'English',
    type: 'vtt',
    language: 'en'
  },
  {
    uri: 'https://example.com/subtitles_es.vtt',
    label: 'Español',
    type: 'vtt',
    language: 'es'
  }
]
```

***

### headers?

```ts
optional headers: Record<string, string>;
```

Defined in: [types/VideoConfig.ts:20](https://github.com/moskalakamil/react-native-video/blob/758f54e450f1f536cb2092e087be9e65f05c3e68/packages/react-native-video/src/core/types/VideoConfig.ts#L20)

The headers to be sent with the request.

***

### initializeOnCreation?

```ts
optional initializeOnCreation: boolean;
```

Defined in: [types/VideoConfig.ts:63](https://github.com/moskalakamil/react-native-video/blob/758f54e450f1f536cb2092e087be9e65f05c3e68/packages/react-native-video/src/core/types/VideoConfig.ts#L63)

when the player is created, this flag will determine if native player should be initialized immediately.
If set to true, the player will be initialized as soon as player is created
If set to false, the player will need be initialized manually later

#### Default

```ts
true
```

***

### metadata?

```ts
optional metadata: CustomVideoMetadata;
```

Defined in: [types/VideoConfig.ts:33](https://github.com/moskalakamil/react-native-video/blob/758f54e450f1f536cb2092e087be9e65f05c3e68/packages/react-native-video/src/core/types/VideoConfig.ts#L33)

The custom metadata to be associated with the video.
This metadata can be used by the native player to show information about the video.

***

### uri

```ts
uri: VideoSource;
```

Defined in: [types/VideoConfig.ts:16](https://github.com/moskalakamil/react-native-video/blob/758f54e450f1f536cb2092e087be9e65f05c3e68/packages/react-native-video/src/core/types/VideoConfig.ts#L16)

The uri of the video.

#### Example

```ts
uri: 'https://example.com/video.mp4'
// or
uri: require('./assets/video.mp4')
```
