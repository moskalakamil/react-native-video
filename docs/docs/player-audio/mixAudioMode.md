# mixAudioMode

#### Get Signature

```ts
get mixAudioMode(): MixAudioMode;
```

Defined in: [VideoPlayer.ts:151](https://github.com/moskalakamil/react-native-video/blob/758f54e450f1f536cb2092e087be9e65f05c3e68/packages/react-native-video/src/core/VideoPlayer.ts#L151)

Controls the audio mixing mode of the player.

- `mixWithOthers` - Mix with other players.
- `doNotMix` - Do not mix with other players.
- `duckOthers` - Duck other players.
- `auto` - uses default behavior for player.

default is `auto`.
