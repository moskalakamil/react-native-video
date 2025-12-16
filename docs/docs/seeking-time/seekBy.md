# seekBy()

```ts
seekBy(time): void;
```

Defined in: [VideoPlayer.ts:243](https://github.com/moskalakamil/react-native-video/blob/758f54e450f1f536cb2092e087be9e65f05c3e68/packages/react-native-video/src/core/VideoPlayer.ts#L243)

Seek by given time.
If the time is negative, it will seek backward.
time will be clamped if it is out of range (0 ~ [duration](#duration)).
