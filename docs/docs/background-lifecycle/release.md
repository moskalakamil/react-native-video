# release()

```ts
release(): void;
```

Defined in: [VideoPlayer.ts:223](https://github.com/moskalakamil/react-native-video/blob/758f54e450f1f536cb2092e087be9e65f05c3e68/packages/react-native-video/src/core/VideoPlayer.ts#L223)

Releases the player's native resources and releases native state.
After calling this method, the player is no longer usable.
Accessing any properties or methods of the player after calling this method will throw an error.
If you want to clean player resource use `replaceSourceAsync` with `null` instead.
