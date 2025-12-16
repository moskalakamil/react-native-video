---
sidebar_label: Buffering & Status
---

# Buffering & Status Events

Events related to buffering state, player status, and network bandwidth.

---

## onBuffer

```ts
onBuffer: (buffering) => void;
```

Called when the video buffering state changes. Indicates whether the player is currently buffering content.

---

## onStatusChange

```ts
onStatusChange: (status) => void;
```

Called when the player status changes. Provides information about the overall player state.

---

## onBandwidthUpdate

```ts
onBandwidthUpdate: (data) => void;
```

Called when the estimated network bandwidth changes. Useful for adaptive bitrate streaming and monitoring network conditions.

