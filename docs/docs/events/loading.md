---
sidebar_label: Loading
---

# Loading Events

Events related to video loading and initialization.

---

## onLoadStart

```ts
onLoadStart: (data) => void;
```

Called when the video starts loading. This is the first event fired when a new source is set.

---

## onLoad

```ts
onLoad: (data) => void;
```

Called when the video is loaded and ready to play. Contains metadata about the video such as duration, dimensions, and available tracks.

---

## onReadyToDisplay

```ts
onReadyToDisplay: () => void;
```

Called when the video is ready to be displayed on screen. This fires after `onLoad` when the first frame is available for rendering.

