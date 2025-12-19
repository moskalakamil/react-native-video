# Subtitles

Custom subtitle/caption selector with styling support.

```tsx
<Controls.Subtitles
  buttonSize={28}
  panelStyle={styles.subtitlePanel}
/>
```

## Props
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `buttonSize` | `number` | `24` | Size of toggle button |
| `buttonColor` | `string` | `'#FFFFFF'` | Button icon color |
| `activeColor` | `string` | `'#007AFF'` | Active track indicator color |
| `style` | `ViewStyle` | - | Container style |
| `panelStyle` | `ViewStyle` | - | Selection panel style |
| `itemStyle` | `ViewStyle` | - | Individual item style |
| `itemTextStyle` | `TextStyle` | - | Item text style |
| `showOffOption` | `boolean` | `true` | Show "Off" option |
| `offLabel` | `string` | `'Off'` | Label for off option |
| `onSelect` | `(track: TextTrack \| null) => void` | - | Callback when track selected |

## Example
```tsx
<Controls.Subtitles
  buttonSize={32}
  activeColor="#FF5722"
  panelStyle={{
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    borderRadius: 8,
    padding: 8,
  }}
  itemStyle={{
    paddingVertical: 12,
    paddingHorizontal: 16,
  }}
  itemTextStyle={{
    color: '#FFFFFF',
    fontSize: 16,
  }}
/>
```

