---
sidebar_label: Tracks & Metadata
---

# Tracks & Metadata Events

Events related to text tracks, subtitles, and timed metadata.

---

## onTrackChange

```ts
onTrackChange: (track) => void;
```

Called when the selected text track (subtitle) changes. Contains information about the newly selected track.

---

## onTextTrackDataChanged

```ts
onTextTrackDataChanged: (texts) => void;
```

Called when the text track data changes. Contains the currently displayed subtitle text.

---

## onTimedMetadata

```ts
onTimedMetadata: (metadata) => void;
```

Called when player receives timed metadata embedded in the video stream (e.g., ID3 tags in HLS streams).

