# Class: VideoPlayer

Defined in: [VideoPlayer.ts:20](https://github.com/moskalakamil/react-native-video/blob/758f54e450f1f536cb2092e087be9e65f05c3e68/packages/react-native-video/src/core/VideoPlayer.ts#L20)

## Extends

- `VideoPlayerEvents`

## Implements

- `VideoPlayerBase`

## Constructors

### Constructor

```ts
new VideoPlayer(source): VideoPlayer;
```

Defined in: [VideoPlayer.ts:23](https://github.com/moskalakamil/react-native-video/blob/758f54e450f1f536cb2092e087be9e65f05c3e68/packages/react-native-video/src/core/VideoPlayer.ts#L23)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `source` | \| [`VideoSource`](./usage/source.md#videosource) \| [`VideoConfig`](./usage/source.md#videoconfig) \| `VideoPlayerSource` |

#### Returns

`VideoPlayer`

#### Overrides

```ts
VideoPlayerEvents.constructor
```

## Accessors

### currentTime

#### Get Signature

```ts
get currentTime(): number;
```

Defined in: [VideoPlayer.ts:115](https://github.com/moskalakamil/react-native-video/blob/758f54e450f1f536cb2092e087be9e65f05c3e68/packages/react-native-video/src/core/VideoPlayer.ts#L115)

The duration of the video in seconds (1.0 = 1 sec).
Returns NaN if the duration is not available.

##### Returns

`number`

#### Set Signature

```ts
set currentTime(value): void;
```

Defined in: [VideoPlayer.ts:119](https://github.com/moskalakamil/react-native-video/blob/758f54e450f1f536cb2092e087be9e65f05c3e68/packages/react-native-video/src/core/VideoPlayer.ts#L119)

The duration of the video in seconds (1.0 = 1 sec).
Returns NaN if the duration is not available.

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `value` | `number` |

##### Returns

`void`

#### Implementation of

```ts
VideoPlayerBase.currentTime
```

***

### duration

#### Get Signature

```ts
get duration(): number;
```

Defined in: [VideoPlayer.ts:101](https://github.com/moskalakamil/react-native-video/blob/758f54e450f1f536cb2092e087be9e65f05c3e68/packages/react-native-video/src/core/VideoPlayer.ts#L101)

The current time of the video in seconds (1.0 = 1 sec).
Returns NaN if the current time is not available.

##### Returns

`number`

#### Implementation of

```ts
VideoPlayerBase.duration
```

***

### ignoreSilentSwitchMode

#### Get Signature

```ts
get ignoreSilentSwitchMode(): IgnoreSilentSwitchMode;
```

Defined in: [VideoPlayer.ts:160](https://github.com/moskalakamil/react-native-video/blob/758f54e450f1f536cb2092e087be9e65f05c3e68/packages/react-native-video/src/core/VideoPlayer.ts#L160)

Controls the silent switch mode of the player.

##### Note

This is only supported on iOS.

- `auto` - uses default behavior for player.
- `ignore` - ignore the silent switch.
- `obey` - obey the silent switch.

##### Returns

[`IgnoreSilentSwitchMode`](./usage/audio.md#ignoresilentswitchmode-1)

#### Set Signature

```ts
set ignoreSilentSwitchMode(value): void;
```

Defined in: [VideoPlayer.ts:164](https://github.com/moskalakamil/react-native-video/blob/758f54e450f1f536cb2092e087be9e65f05c3e68/packages/react-native-video/src/core/VideoPlayer.ts#L164)

Controls the silent switch mode of the player.

##### Note

This is only supported on iOS.

- `auto` - uses default behavior for player.
- `ignore` - ignore the silent switch.
- `obey` - obey the silent switch.

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `value` | [`IgnoreSilentSwitchMode`](./usage/audio.md#ignoresilentswitchmode-1) |

##### Returns

`void`

#### Implementation of

```ts
VideoPlayerBase.ignoreSilentSwitchMode
```

***

### isPlaying

#### Get Signature

```ts
get isPlaying(): boolean;
```

Defined in: [VideoPlayer.ts:193](https://github.com/moskalakamil/react-native-video/blob/758f54e450f1f536cb2092e087be9e65f05c3e68/packages/react-native-video/src/core/VideoPlayer.ts#L193)

Whether the player is playing.

##### Note

This is a read-only property.

##### Note

To pause/resume the player, you need to use [play](#play) and [pause](#pause) methods.

##### Returns

`boolean`

#### Implementation of

```ts
VideoPlayerBase.isPlaying
```

***

### loop

#### Get Signature

```ts
get loop(): boolean;
```

Defined in: [VideoPlayer.ts:133](https://github.com/moskalakamil/react-native-video/blob/758f54e450f1f536cb2092e087be9e65f05c3e68/packages/react-native-video/src/core/VideoPlayer.ts#L133)

Whether the player is looped.

##### Returns

`boolean`

#### Set Signature

```ts
set loop(value): void;
```

Defined in: [VideoPlayer.ts:137](https://github.com/moskalakamil/react-native-video/blob/758f54e450f1f536cb2092e087be9e65f05c3e68/packages/react-native-video/src/core/VideoPlayer.ts#L137)

Whether the player is looped.

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `value` | `boolean` |

##### Returns

`void`

#### Implementation of

```ts
VideoPlayerBase.loop
```

***

### mixAudioMode

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

##### Returns

[`MixAudioMode`](./usage/audio.md#mixaudiomode-1)

#### Set Signature

```ts
set mixAudioMode(value): void;
```

Defined in: [VideoPlayer.ts:155](https://github.com/moskalakamil/react-native-video/blob/758f54e450f1f536cb2092e087be9e65f05c3e68/packages/react-native-video/src/core/VideoPlayer.ts#L155)

Controls the audio mixing mode of the player.

- `mixWithOthers` - Mix with other players.
- `doNotMix` - Do not mix with other players.
- `duckOthers` - Duck other players.
- `auto` - uses default behavior for player.

default is `auto`.

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `value` | [`MixAudioMode`](./usage/audio.md#mixaudiomode-1) |

##### Returns

`void`

#### Implementation of

```ts
VideoPlayerBase.mixAudioMode
```

***

### muted

#### Get Signature

```ts
get muted(): boolean;
```

Defined in: [VideoPlayer.ts:124](https://github.com/moskalakamil/react-native-video/blob/758f54e450f1f536cb2092e087be9e65f05c3e68/packages/react-native-video/src/core/VideoPlayer.ts#L124)

Whether the player is muted.

##### Returns

`boolean`

#### Set Signature

```ts
set muted(value): void;
```

Defined in: [VideoPlayer.ts:128](https://github.com/moskalakamil/react-native-video/blob/758f54e450f1f536cb2092e087be9e65f05c3e68/packages/react-native-video/src/core/VideoPlayer.ts#L128)

Whether the player is muted.

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `value` | `boolean` |

##### Returns

`void`

#### Implementation of

```ts
VideoPlayerBase.muted
```

***

### playInBackground

#### Get Signature

```ts
get playInBackground(): boolean;
```

Defined in: [VideoPlayer.ts:175](https://github.com/moskalakamil/react-native-video/blob/758f54e450f1f536cb2092e087be9e65f05c3e68/packages/react-native-video/src/core/VideoPlayer.ts#L175)

Whether the player should play in background.

- `true` - play in background.
- `false` - pause in background (default).

##### Note

this can override [playWhenInactive](#playwheninactive).

##### Returns

`boolean`

#### Set Signature

```ts
set playInBackground(value): void;
```

Defined in: [VideoPlayer.ts:179](https://github.com/moskalakamil/react-native-video/blob/758f54e450f1f536cb2092e087be9e65f05c3e68/packages/react-native-video/src/core/VideoPlayer.ts#L179)

Whether the player should play in background.

- `true` - play in background.
- `false` - pause in background (default).

##### Note

this can override [playWhenInactive](#playwheninactive).

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `value` | `boolean` |

##### Returns

`void`

#### Implementation of

```ts
VideoPlayerBase.playInBackground
```

***

### playWhenInactive

#### Get Signature

```ts
get playWhenInactive(): boolean;
```

Defined in: [VideoPlayer.ts:184](https://github.com/moskalakamil/react-native-video/blob/758f54e450f1f536cb2092e087be9e65f05c3e68/packages/react-native-video/src/core/VideoPlayer.ts#L184)

Whether the player should play when the app is inactive (user opened control center).

- `true` - play when the app is inactive.
- `false` - pause when the app is inactive (default).

##### Note

this can be overridden by [playInBackground](#playinbackground).

##### Note

This is only supported on iOS.

##### Returns

`boolean`

#### Set Signature

```ts
set playWhenInactive(value): void;
```

Defined in: [VideoPlayer.ts:188](https://github.com/moskalakamil/react-native-video/blob/758f54e450f1f536cb2092e087be9e65f05c3e68/packages/react-native-video/src/core/VideoPlayer.ts#L188)

Whether the player should play when the app is inactive (user opened control center).

- `true` - play when the app is inactive.
- `false` - pause when the app is inactive (default).

##### Note

this can be overridden by [playInBackground](#playinbackground).

##### Note

This is only supported on iOS.

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `value` | `boolean` |

##### Returns

`void`

#### Implementation of

```ts
VideoPlayerBase.playWhenInactive
```

***

### rate

#### Get Signature

```ts
get rate(): number;
```

Defined in: [VideoPlayer.ts:142](https://github.com/moskalakamil/react-native-video/blob/758f54e450f1f536cb2092e087be9e65f05c3e68/packages/react-native-video/src/core/VideoPlayer.ts#L142)

Controls the speed at which the player should play.

##### Note

if rate is = 0, it will pause video.

##### Returns

`number`

#### Set Signature

```ts
set rate(value): void;
```

Defined in: [VideoPlayer.ts:146](https://github.com/moskalakamil/react-native-video/blob/758f54e450f1f536cb2092e087be9e65f05c3e68/packages/react-native-video/src/core/VideoPlayer.ts#L146)

Controls the speed at which the player should play.

##### Note

if rate is = 0, it will pause video.

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `value` | `number` |

##### Returns

`void`

#### Implementation of

```ts
VideoPlayerBase.rate
```

***

### selectedTrack

#### Get Signature

```ts
get selectedTrack(): TextTrack | undefined;
```

Defined in: [VideoPlayer.ts:292](https://github.com/moskalakamil/react-native-video/blob/758f54e450f1f536cb2092e087be9e65f05c3e68/packages/react-native-video/src/core/VideoPlayer.ts#L292)

Get the currently selected text track.

##### Returns

[`TextTrack`](./usage/text-tracks.md#texttrack) \| `undefined`

The currently selected text track, or undefined if none is selected

#### Implementation of

```ts
VideoPlayerBase.selectedTrack
```

***

### showNotificationControls

#### Get Signature

```ts
get showNotificationControls(): boolean;
```

Defined in: [VideoPlayer.ts:197](https://github.com/moskalakamil/react-native-video/blob/758f54e450f1f536cb2092e087be9e65f05c3e68/packages/react-native-video/src/core/VideoPlayer.ts#L197)

##### Returns

`boolean`

#### Set Signature

```ts
set showNotificationControls(value): void;
```

Defined in: [VideoPlayer.ts:201](https://github.com/moskalakamil/react-native-video/blob/758f54e450f1f536cb2092e087be9e65f05c3e68/packages/react-native-video/src/core/VideoPlayer.ts#L201)

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `value` | `boolean` |

##### Returns

`void`

***

### source

#### Get Signature

```ts
get source(): VideoPlayerSource;
```

Defined in: [VideoPlayer.ts:91](https://github.com/moskalakamil/react-native-video/blob/758f54e450f1f536cb2092e087be9e65f05c3e68/packages/react-native-video/src/core/VideoPlayer.ts#L91)

The source of the video.
Source is immutable. To change the source, you need to call [replaceSourceAsync](#replacesourceasync) method.
see VideoPlayerSourceBase

##### Returns

`VideoPlayerSource`

#### Implementation of

```ts
VideoPlayerBase.source
```

***

### status

#### Get Signature

```ts
get status(): VideoPlayerStatus;
```

Defined in: [VideoPlayer.ts:96](https://github.com/moskalakamil/react-native-video/blob/758f54e450f1f536cb2092e087be9e65f05c3e68/packages/react-native-video/src/core/VideoPlayer.ts#L96)

The status of the player.

##### Returns

[`VideoPlayerStatus`](./usage/status.md#status)

#### Implementation of

```ts
VideoPlayerBase.status
```

***

### volume

#### Get Signature

```ts
get volume(): number;
```

Defined in: [VideoPlayer.ts:106](https://github.com/moskalakamil/react-native-video/blob/758f54e450f1f536cb2092e087be9e65f05c3e68/packages/react-native-video/src/core/VideoPlayer.ts#L106)

The volume of the video (0.0 = 0%, 1.0 = 100%).

##### Note

If the player is [muted](#muted), the volume will be 0.0.

##### Returns

`number`

#### Set Signature

```ts
set volume(value): void;
```

Defined in: [VideoPlayer.ts:110](https://github.com/moskalakamil/react-native-video/blob/758f54e450f1f536cb2092e087be9e65f05c3e68/packages/react-native-video/src/core/VideoPlayer.ts#L110)

The volume of the video (0.0 = 0%, 1.0 = 100%).

##### Note

If the player is [muted](#muted), the volume will be 0.0.

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `value` | `number` |

##### Returns

`void`

#### Implementation of

```ts
VideoPlayerBase.volume
```

## Methods

### addEventListener()

```ts
addEventListener<Event>(event, callback): ListenerSubscription;
```

Defined in: [VideoPlayerEvents.ts:40](https://github.com/moskalakamil/react-native-video/blob/758f54e450f1f536cb2092e087be9e65f05c3e68/packages/react-native-video/src/core/VideoPlayerEvents.ts#L40)

Adds a listener for a player event.

#### Type Parameters

| Type Parameter |
| ------ |
| `Event` *extends* keyof VideoPlayerEvents \| `"onError"` |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `event` | `Event` | The event to add a listener for. |
| `callback` | [`AllPlayerEvents`](../events/AllPlayerEvents.md)\[`Event`\] | The callback to call when the event is triggered. |

#### Returns

`ListenerSubscription`

A subscription object that can be used to remove the listener.

#### Throw

Error if the event is not supported.

#### Inherited from

```ts
VideoPlayerEvents.addEventListener
```

***

### clearAllEvents()

```ts
clearAllEvents(): void;
```

Defined in: [VideoPlayerEvents.ts:142](https://github.com/moskalakamil/react-native-video/blob/758f54e450f1f536cb2092e087be9e65f05c3e68/packages/react-native-video/src/core/VideoPlayerEvents.ts#L142)

Clears all events from the event emitter.

#### Returns

`void`

#### Inherited from

```ts
VideoPlayerEvents.clearAllEvents
```

***

### getAvailableTextTracks()

```ts
getAvailableTextTracks(): TextTrack[];
```

Defined in: [VideoPlayer.ts:274](https://github.com/moskalakamil/react-native-video/blob/758f54e450f1f536cb2092e087be9e65f05c3e68/packages/react-native-video/src/core/VideoPlayer.ts#L274)

Get all available text tracks for the current source.

#### Returns

[`TextTrack`](./usage/text-tracks.md#texttrack)[]

Array of available text tracks

#### Implementation of

```ts
VideoPlayerBase.getAvailableTextTracks
```

***

### initialize()

```ts
initialize(): Promise<void>;
```

Defined in: [VideoPlayer.ts:205](https://github.com/moskalakamil/react-native-video/blob/758f54e450f1f536cb2092e087be9e65f05c3e68/packages/react-native-video/src/core/VideoPlayer.ts#L205)

Manually initialize the player. You don't need to call this method manually, unless you set `initializeOnCreation` to false in [VideoConfig](./usage/source.md#videoconfig)

#### Returns

`Promise`\<`void`\>

#### Implementation of

```ts
VideoPlayerBase.initialize
```

***

### pause()

```ts
pause(): void;
```

Defined in: [VideoPlayer.ts:235](https://github.com/moskalakamil/react-native-video/blob/758f54e450f1f536cb2092e087be9e65f05c3e68/packages/react-native-video/src/core/VideoPlayer.ts#L235)

Pause playback of player.

#### Returns

`void`

#### Implementation of

```ts
VideoPlayerBase.pause
```

***

### play()

```ts
play(): void;
```

Defined in: [VideoPlayer.ts:227](https://github.com/moskalakamil/react-native-video/blob/758f54e450f1f536cb2092e087be9e65f05c3e68/packages/react-native-video/src/core/VideoPlayer.ts#L227)

Start playback of player.

#### Returns

`void`

#### Implementation of

```ts
VideoPlayerBase.play
```

***

### preload()

```ts
preload(): Promise<void>;
```

Defined in: [VideoPlayer.ts:211](https://github.com/moskalakamil/react-native-video/blob/758f54e450f1f536cb2092e087be9e65f05c3e68/packages/react-native-video/src/core/VideoPlayer.ts#L211)

Preload the video.
This is useful to avoid delay when the user plays the video.
Preloading too many videos can lead to memory issues or performance issues.

#### Returns

`Promise`\<`void`\>

#### Implementation of

```ts
VideoPlayerBase.preload
```

***

### release()

```ts
release(): void;
```

Defined in: [VideoPlayer.ts:223](https://github.com/moskalakamil/react-native-video/blob/758f54e450f1f536cb2092e087be9e65f05c3e68/packages/react-native-video/src/core/VideoPlayer.ts#L223)

Releases the player's native resources and releases native state.
After calling this method, the player is no longer usable.
Accessing any properties or methods of the player after calling this method will throw an error.
If you want to clean player resource use `replaceSourceAsync` with `null` instead.

#### Returns

`void`

***

### replaceSourceAsync()

```ts
replaceSourceAsync(source): Promise<void>;
```

Defined in: [VideoPlayer.ts:259](https://github.com/moskalakamil/react-native-video/blob/758f54e450f1f536cb2092e087be9e65f05c3e68/packages/react-native-video/src/core/VideoPlayer.ts#L259)

Replace the current source of the player.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `source` | \| [`VideoSource`](./usage/source.md#videosource) \| [`VideoConfig`](./usage/source.md#videoconfig) \| `null` | The new source of the video. |

#### Returns

`Promise`\<`void`\>

#### Note

If you want to clear the source, you can pass null.
see VideoPlayerSourceBase

#### Implementation of

```ts
VideoPlayerBase.replaceSourceAsync
```

***

### seekBy()

```ts
seekBy(time): void;
```

Defined in: [VideoPlayer.ts:243](https://github.com/moskalakamil/react-native-video/blob/758f54e450f1f536cb2092e087be9e65f05c3e68/packages/react-native-video/src/core/VideoPlayer.ts#L243)

Seek by given time.
If the time is negative, it will seek backward.
time will be clamped if it is out of range (0 ~ [duration](#duration)).

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `time` | `number` | The time to seek from current time in seconds. |

#### Returns

`void`

#### Implementation of

```ts
VideoPlayerBase.seekBy
```

***

### seekTo()

```ts
seekTo(time): void;
```

Defined in: [VideoPlayer.ts:251](https://github.com/moskalakamil/react-native-video/blob/758f54e450f1f536cb2092e087be9e65f05c3e68/packages/react-native-video/src/core/VideoPlayer.ts#L251)

Seek to a specific time in the video.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `time` | `number` | The time to seek to in seconds. |

#### Returns

`void`

#### Note

This have same effect as [currentTime](#currenttime) setter.

#### Note

time will be clamped if it is out of range (0 ~ [duration](#duration)).

#### Implementation of

```ts
VideoPlayerBase.seekTo
```

***

### selectTextTrack()

```ts
selectTextTrack(textTrack): void;
```

Defined in: [VideoPlayer.ts:283](https://github.com/moskalakamil/react-native-video/blob/758f54e450f1f536cb2092e087be9e65f05c3e68/packages/react-native-video/src/core/VideoPlayer.ts#L283)

Select a text track to display.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `textTrack` | [`TextTrack`](./usage/text-tracks.md#texttrack) \| `null` | Text track to select, or null to unselect current track |

#### Returns

`void`

#### Implementation of

```ts
VideoPlayerBase.selectTextTrack
```
