# Resolution Select

Quality and resolution picker for adaptive streaming (HLS/DASH).

## Overview

The ResolutionSelect component enables users to manually select video quality, overriding automatic bitrate adaptation. This is useful when:
- Users want consistent quality regardless of network conditions
- Saving data is a priority (select lower resolution)
- Maximum quality is desired on fast connections

```tsx
<Controls.ResolutionSelect 
  showBitrate={true}
  autoLabel="Auto"
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `buttonSize` | `number` | `24` | Size of toggle button |
| `buttonColor` | `string` | `'#FFFFFF'` | Button icon color |
| `buttonIcon` | `ReactNode` | - | Custom button icon |
| `showBitrate` | `boolean` | `false` | Show bitrate alongside resolution |
| `showCurrentQuality` | `boolean` | `true` | Show current quality on button |
| `autoLabel` | `string` | `'Auto'` | Label for automatic quality |
| `style` | `ViewStyle` | - | Container style |
| `panelStyle` | `ViewStyle` | - | Selection panel style |
| `itemStyle` | `ViewStyle` | - | Individual item style |
| `itemTextStyle` | `TextStyle` | - | Item text style |
| `activeColor` | `string` | `'#007AFF'` | Active selection color |
| `onSelect` | `(resolution: Resolution \| 'auto') => void` | - | Callback on selection |
| `formatLabel` | `(resolution: Resolution) => string` | - | Custom label formatter |

## Resolution Type

```ts
interface Resolution {
  width: number;
  height: number;
  bitrate: number;
  label?: string;      // e.g., "1080p", "720p", "4K"
  frameRate?: number;  // e.g., 30, 60
  codec?: string;      // e.g., "h264", "hevc"
}
```

## Basic Example

```tsx
import { VideoView, Controls, useVideoPlayer } from 'react-native-video';

function VideoWithQualitySelector({ source }) {
  const player = useVideoPlayer(source);

  return (
    <VideoView player={player} style={styles.video}>
      <Controls.Container>
        <View style={styles.topBar}>
          <Controls.ResolutionSelect 
            showBitrate={true}
            autoLabel="Auto (Recommended)"
          />
          <Controls.Fullscreen />
        </View>

        <Controls.PlayPause size={64} />

        <View style={styles.bottomBar}>
          <Controls.SeekBar />
          <Controls.Duration />
        </View>
      </Controls.Container>
    </VideoView>
  );
}
```

## Custom Styling

```tsx
<Controls.ResolutionSelect
  showBitrate={true}
  panelStyle={{
    backgroundColor: 'rgba(0, 0, 0, 0.95)',
    borderRadius: 12,
    padding: 8,
    minWidth: 200,
  }}
  itemStyle={{
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
  }}
  itemTextStyle={{
    color: '#FFFFFF',
    fontSize: 16,
  }}
  activeColor="#00BCD4"
/>
```

## Custom Label Formatter

```tsx
<Controls.ResolutionSelect
  formatLabel={(resolution) => {
    const quality = resolution.height >= 2160 ? '4K' 
      : resolution.height >= 1080 ? 'Full HD'
      : resolution.height >= 720 ? 'HD'
      : 'SD';
    
    const bitrateMbps = (resolution.bitrate / 1000000).toFixed(1);
    
    return `${quality} (${resolution.height}p) - ${bitrateMbps} Mbps`;
  }}
/>
```

## Handling Selection

```tsx
function VideoWithQualityControl({ source }) {
  const player = useVideoPlayer(source);
  const [currentQuality, setCurrentQuality] = useState('auto');

  const handleQualitySelect = (resolution) => {
    if (resolution === 'auto') {
      setCurrentQuality('auto');
      // Enable automatic bitrate selection
      player.setAutomaticBitrateEnabled(true);
    } else {
      setCurrentQuality(`${resolution.height}p`);
      // Set specific bitrate
      player.setPreferredBitrate(resolution.bitrate);
    }
  };

  return (
    <VideoView player={player}>
      <Controls.Container>
        <Controls.ResolutionSelect
          onSelect={handleQualitySelect}
          showCurrentQuality={true}
        />
        {/* ... other controls */}
      </Controls.Container>
    </VideoView>
  );
}
```

## Data Saver Mode

Implement a data saver that limits maximum quality:

```tsx
function DataSaverVideoPlayer({ source }) {
  const player = useVideoPlayer(source);
  const [dataSaverEnabled, setDataSaverEnabled] = useState(false);

  return (
    <VideoView player={player}>
      <Controls.Container>
        <View style={styles.topBar}>
          {/* Data saver toggle */}
          <TouchableOpacity 
            onPress={() => setDataSaverEnabled(!dataSaverEnabled)}
            style={styles.dataSaverButton}
          >
            <Text style={{ color: dataSaverEnabled ? '#4CAF50' : '#FFF' }}>
              {dataSaverEnabled ? '📉 Data Saver ON' : '📊 Data Saver OFF'}
            </Text>
          </TouchableOpacity>

          <Controls.ResolutionSelect
            onSelect={(resolution) => {
              if (dataSaverEnabled && resolution !== 'auto') {
                // Limit to 480p in data saver mode
                if (resolution.height > 480) {
                  Alert.alert(
                    'Data Saver Active',
                    'Maximum quality is limited to 480p while Data Saver is enabled.'
                  );
                  return;
                }
              }
              // Apply selection...
            }}
          />
        </View>
        {/* ... other controls */}
      </Controls.Container>
    </VideoView>
  );
}
```

## Network-Aware Quality

```tsx
import NetInfo from '@react-native-community/netinfo';

function NetworkAwarePlayer({ source }) {
  const player = useVideoPlayer(source);
  const [networkType, setNetworkType] = useState('unknown');

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setNetworkType(state.type);
      
      // Auto-adjust quality based on network
      if (state.type === 'cellular') {
        player.setMaxBitrate(2000000); // 2 Mbps on cellular
      } else if (state.type === 'wifi') {
        player.setMaxBitrate(null); // Unlimited on WiFi
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <VideoView player={player}>
      <Controls.Container>
        <Controls.ResolutionSelect
          autoLabel={`Auto (${networkType === 'wifi' ? 'WiFi' : 'Cellular'})`}
        />
        {/* ... */}
      </Controls.Container>
    </VideoView>
  );
}
```

## Available Resolutions

The available resolutions depend on the video source. For HLS/DASH streams, resolutions are automatically detected from the manifest. You can access them programmatically:

```tsx
function QualityInfo({ player }) {
  const [resolutions, setResolutions] = useState([]);

  useEffect(() => {
    const availableResolutions = player.getAvailableResolutions();
    setResolutions(availableResolutions);
    
    console.log('Available qualities:', availableResolutions);
    // Example output:
    // [
    //   { width: 1920, height: 1080, bitrate: 5000000, label: '1080p' },
    //   { width: 1280, height: 720, bitrate: 2500000, label: '720p' },
    //   { width: 854, height: 480, bitrate: 1000000, label: '480p' },
    //   { width: 640, height: 360, bitrate: 500000, label: '360p' },
    // ]
  }, [player]);

  return (
    <Controls.ResolutionSelect
      // ResolutionSelect automatically uses player.getAvailableResolutions()
    />
  );
}
```

