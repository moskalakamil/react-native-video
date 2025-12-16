---
sidebar_label: Audio
---

# Audio Events

Events related to audio playback and system audio state.

---

## onVolumeChange

```ts
onVolumeChange: (data) => void;
```

Called when the volume of the player changes. Contains the new volume level.

---

## onAudioBecomingNoisy

```ts
onAudioBecomingNoisy: () => void;
```

Called when audio output becomes "noisy" (e.g., when headphones are unplugged). Typically used to pause playback automatically.

---

## onAudioFocusChange

```ts
onAudioFocusChange: (hasAudioFocus) => void;
```

Called when the audio focus changes. Indicates whether the player currently has audio focus (Android specific).

