# Screen Sharing (Casting)

AirPlay and Chromecast controls built with the compound API. These buttons open the native route picker so users can choose a device.

## AirPlay (iOS)
```tsx
<Controls.AirPlay
  size={28}
  tintColor="#FFFFFF"
  activeTintColor="#007AFF"
/>
```
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `size` | `number` | `24` | Button size |
| `tintColor` | `string` | `'#FFFFFF'` | Icon color (inactive) |
| `activeTintColor` | `string` | `'#007AFF'` | Icon color (active) |
| `style` | `ViewStyle` | - | Container style |
| `prioritizesVideoDevices` | `boolean` | `true` | Prefer video-capable devices |

**Platform support**
| Platform | Supported |
| --- | --- |
| iOS | ✅ |
| Android | ❌ (use Chromecast) |

## Chromecast (Android)
```tsx
<Controls.Chromecast
  size={28}
  tintColor="#FFFFFF"
/>
```
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `size` | `number` | `24` | Button size |
| `tintColor` | `string` | `'#FFFFFF'` | Icon color |
| `style` | `ViewStyle` | - | Container style |

**Platform support**
| Platform | Supported |
| --- | --- |
| iOS | ❌ (use AirPlay) |
| Android | ✅ |

**Setup**
- Chromecast requires Android project setup. See the [Chromecast Setup Guide](../../video-view/getting-started.md).

## Invoking native pickers
Both `Controls.AirPlay` and `Controls.Chromecast` render platform-native route pickers. Place the buttons wherever you need them; tapping opens the system device selector.

