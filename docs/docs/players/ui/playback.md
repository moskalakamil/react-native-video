# Playback Controls

Core playback UI components built with the compound API.

## PlayPause
```tsx
<Controls.PlayPause
  size={48}
  color="#FFFFFF"
/>
```
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `size` | `number` | `44` | Button size |
| `color` | `string` | `'#FFFFFF'` | Icon color |
| `playIcon` | `ReactNode` | - | Custom play icon |
| `pauseIcon` | `ReactNode` | - | Custom pause icon |
| `style` | `ViewStyle` | - | Container style |
| `iconStyle` | `ViewStyle` | - | Icon style |
| `onPress` | `() => void` | - | Extra callback |

---

## SeekBar
```tsx
<Controls.SeekBar
  progressColor="#FF5722"
  bufferColor="rgba(255, 87, 34, 0.3)"
  trackColor="rgba(255, 255, 255, 0.3)"
/>
```
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `progressColor` | `string` | `'#FFFFFF'` | Played progress color |
| `bufferColor` | `string` | `rgba(255,255,255,0.5)` | Buffered progress color |
| `trackColor` | `string` | `rgba(255,255,255,0.3)` | Track background |
| `thumbColor` | `string` | `'#FFFFFF'` | Thumb color |
| `thumbSize` | `number` | `12` | Thumb size |
| `height` | `number` | `4` | Track height |
| `style` | `ViewStyle` | - | Container style |
| `trackStyle` | `ViewStyle` | - | Track style |
| `thumbStyle` | `ViewStyle` | - | Thumb style |
| `showBuffer` | `boolean` | `true` | Show buffer bar |
| `showPreviewThumbnails` | `boolean` | `false` | *(Pro)* Frame thumbnails on scrub |
| `onSeekStart` | `() => void` | - | Called on seek start |
| `onSeekEnd` | `(time: number) => void` | - | Called on seek end |

---

## Duration
```tsx
<Controls.Duration format="mm:ss" showRemaining={false} />
```
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `format` | `'mm:ss' \| 'hh:mm:ss' \| 'auto'` | `'auto'` | Time format |
| `showRemaining` | `boolean` | `false` | Show remaining instead of current |
| `separator` | `string` | `' / '` | Separator between current/total |
| `textStyle` | `TextStyle` | - | Text style |
| `currentTimeStyle` | `TextStyle` | - | Current time text style |
| `durationStyle` | `TextStyle` | - | Duration text style |
| `style` | `ViewStyle` | - | Container style |

---

## Fullscreen
```tsx
<Controls.Fullscreen size={32} />
```
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `size` | `number` | `24` | Button size |
| `color` | `string` | `'#FFFFFF'` | Icon color |
| `enterIcon` | `ReactNode` | - | Custom enter icon |
| `exitIcon` | `ReactNode` | - | Custom exit icon |
| `style` | `ViewStyle` | - | Container style |
| `onEnter` | `() => void` | - | Callback on enter |
| `onExit` | `() => void` | - | Callback on exit |

---

## Mute
```tsx
<Controls.Mute size={28} />
```
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `size` | `number` | `24` | Button size |
| `color` | `string` | `'#FFFFFF'` | Icon color |
| `mutedIcon` | `ReactNode` | - | Custom muted icon |
| `unmutedIcon` | `ReactNode` | - | Custom unmuted icon |
| `style` | `ViewStyle` | - | Container style |
| `onToggle` | `(muted: boolean) => void` | - | Callback on toggle |

---

## Volume
```tsx
<Controls.Volume orientation="horizontal" showIcon />
```
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Slider orientation |
| `showIcon` | `boolean` | `true` | Show volume icon |
| `trackColor` | `string` | `rgba(255,255,255,0.3)` | Track color |
| `fillColor` | `string` | `'#FFFFFF'` | Fill color |
| `thumbColor` | `string` | `'#FFFFFF'` | Thumb color |
| `iconColor` | `string` | `'#FFFFFF'` | Icon color |
| `size` | `number` | `100` | Slider length |
| `style` | `ViewStyle` | - | Container style |
| `onChange` | `(volume: number) => void` | - | Callback on change |

