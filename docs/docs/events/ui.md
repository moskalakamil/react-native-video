---
sidebar_label: UI & External
---

# UI & External Playback Events

Events related to UI controls visibility and external playback (AirPlay, Chromecast).

---

## onControlsVisibleChange

```ts
onControlsVisibleChange: (visible) => void;
```

Called when the video view's native controls visibility changes. Indicates whether the controls are currently shown or hidden.

---

## onExternalPlaybackChange

```ts
onExternalPlaybackChange: (externalPlaybackActive) => void;
```

Called when the external playback state changes (e.g., AirPlay on iOS). Indicates whether content is being played on an external device.

