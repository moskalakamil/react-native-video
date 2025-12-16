---
sidebar_label: Playback
---

# Playback Events

Events related to video playback state and progress.

---

## onPlaybackStateChange

```ts
onPlaybackStateChange: (data) => void;
```

Called when the player playback state changes (e.g., playing, paused, stopped).

---

## onPlaybackRateChange

```ts
onPlaybackRateChange: (rate) => void;
```

Called when the player playback rate changes (e.g., when setting playback speed).

---

## onProgress

```ts
onProgress: (data) => void;
```

Called periodically while the video is playing. Contains current playback position and buffered ranges.

---

## onSeek

```ts
onSeek: (seekTime) => void;
```

Called when a seek operation completes. Contains the time that was seeked to.

---

## onEnd

```ts
onEnd: () => void;
```

Called when the video playback reaches the end of the content.

