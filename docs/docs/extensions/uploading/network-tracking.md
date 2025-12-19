# Network Tracking

Automatically manage uploads based on network connectivity and type.

## Overview

Network tracking provides:
- **Auto Pause/Resume** - Pause when offline, resume when back online
- **Connection Type** - Detect WiFi, cellular, ethernet
- **Cellular Control** - Restrict uploads to WiFi only
- **Network Quality** - Adapt to connection speed
- **Bandwidth Monitoring** - Track network usage

## Basic Network Tracking

```tsx
import { VideoUploader } from 'react-native-video';

const upload = await VideoUploader.upload({
  file: '/path/to/video.mp4',
  url: 'https://api.example.com/upload',
  networkTracking: true, // Enable network tracking
});

upload.onNetworkChange((state) => {
  console.log('Network:', state.isConnected ? 'Online' : 'Offline');
  console.log('Type:', state.type); // 'wifi', 'cellular', 'ethernet'
});

await upload.start();
```

## WiFi Only

Restrict uploads to WiFi:

```tsx
const upload = await VideoUploader.upload({
  file: '/path/to/video.mp4',
  url: 'https://api.example.com/upload',
  requireWifi: true, // Only upload on WiFi
});

upload.onNetworkChange((state) => {
  if (state.type === 'cellular') {
    console.log('Waiting for WiFi...');
  }
});
```

## Cellular Data Limit

Limit cellular data usage:

```tsx
const upload = await VideoUploader.upload({
  file: '/path/to/video.mp4',
  url: 'https://api.example.com/upload',
  allowCellular: true,
  cellularDataLimit: 50 * 1024 * 1024, // 50 MB max on cellular
});
```

## Network Events

Listen to network state changes:

```tsx
upload.onNetworkChange((state) => {
  console.log('Connected:', state.isConnected);
  console.log('Type:', state.type); // 'wifi', 'cellular', 'ethernet', 'none'
  console.log('Quality:', state.quality); // 'excellent', 'good', 'fair', 'poor'
  console.log('Speed:', state.estimatedSpeed); // bytes per second
});
```

### Network State Object

```ts
interface NetworkState {
  isConnected: boolean;
  type: 'wifi' | 'cellular' | 'ethernet' | 'none';
  quality: 'excellent' | 'good' | 'fair' | 'poor';
  estimatedSpeed: number; // bytes per second
}
```

## Automatic Pause/Resume

Uploads automatically pause when offline:

```tsx
const upload = await VideoUploader.upload({
  file: '/path/to/video.mp4',
  url: 'https://api.example.com/upload',
  networkTracking: true,
  autoPauseOnDisconnect: true, // Auto-pause when offline
  autoResumeOnConnect: true, // Auto-resume when back online
});

upload.onStateChange((state) => {
  console.log('State:', state);
  // 'uploading' → 'paused' (when offline) → 'uploading' (when back online)
});
```

## Connection Type Detection

Check current connection:

```tsx
import { VideoUploadManager } from 'react-native-video';

const networkState = await VideoUploadManager.getNetworkState();

if (networkState.type === 'wifi') {
  console.log('Connected to WiFi');
} else if (networkState.type === 'cellular') {
  console.log('Connected to cellular');
}
```

## Network Quality Adaptation

Adapt upload based on network quality:

```tsx
const upload = await VideoUploader.upload({
  file: '/path/to/video.mp4',
  url: 'https://api.example.com/upload',
  multipart: true,
  adaptToNetworkQuality: true,
});

upload.onNetworkChange((state) => {
  if (state.quality === 'poor') {
    console.log('Reducing chunk size for poor connection');
    // SDK automatically adjusts chunk size
  }
});
```

## Bandwidth Monitoring

Track bandwidth usage:

```tsx
upload.onBandwidthUpdate((bandwidth) => {
  console.log(`Upload speed: ${(bandwidth.speed / 1024 / 1024).toFixed(2)} MB/s`);
  console.log(`Total uploaded: ${(bandwidth.totalBytes / 1024 / 1024).toFixed(2)} MB`);
});
```

## Network Permissions

### iOS

No additional permissions required.

### Android

Add to `AndroidManifest.xml`:

```xml
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
<uses-permission android:name="android.permission.ACCESS_WIFI_STATE" />
```

## Complete Example

```tsx
import React, { useState, useEffect } from 'react';
import { View, Text, Switch, Button } from 'react-native';
import { VideoUploader, VideoUploadManager } from 'react-native-video';

function NetworkAwareUpload({ filePath }) {
  const [upload, setUpload] = useState(null);
  const [networkState, setNetworkState] = useState(null);
  const [wifiOnly, setWifiOnly] = useState(false);

  useEffect(() => {
    const checkNetwork = async () => {
      const state = await VideoUploadManager.getNetworkState();
      setNetworkState(state);
    };

    checkNetwork();
    const interval = setInterval(checkNetwork, 5000);
    return () => clearInterval(interval);
  }, []);

  const startUpload = async () => {
    const ul = await VideoUploader.upload({
      file: filePath,
      url: 'https://api.example.com/upload',
      networkTracking: true,
      requireWifi: wifiOnly,
      autoPauseOnDisconnect: true,
      autoResumeOnConnect: true,
    });

    ul.onNetworkChange((state) => {
      setNetworkState(state);
      
      if (!state.isConnected) {
        console.log('Network disconnected - upload paused');
      } else if (state.type === 'cellular' && wifiOnly) {
        console.log('Waiting for WiFi connection...');
      } else {
        console.log('Network available - upload active');
      }
    });

    ul.onBandwidthUpdate((bandwidth) => {
      console.log(`Speed: ${(bandwidth.speed / 1024 / 1024).toFixed(2)} MB/s`);
    });

    setUpload(ul);
    await ul.start();
  };

  return (
    <View>
      <View style={styles.networkStatus}>
        <Text style={styles.title}>Network Status</Text>
        {networkState && (
          <>
            <Text>
              Status: {networkState.isConnected ? '✅ Connected' : '❌ Disconnected'}
            </Text>
            <Text>Type: {networkState.type}</Text>
            <Text>Quality: {networkState.quality}</Text>
            {networkState.estimatedSpeed && (
              <Text>
                Speed: {(networkState.estimatedSpeed / 1024 / 1024).toFixed(2)} MB/s
              </Text>
            )}
          </>
        )}
      </View>

      <View style={styles.settings}>
        <Text>WiFi Only:</Text>
        <Switch
          value={wifiOnly}
          onValueChange={setWifiOnly}
          disabled={upload?.state === 'uploading'}
        />
      </View>

      {networkState?.type === 'cellular' && wifiOnly && (
        <Text style={styles.warning}>
          ⚠️ Upload will wait for WiFi connection
        </Text>
      )}

      <Button
        title="Start Upload"
        onPress={startUpload}
        disabled={upload?.state === 'uploading'}
      />
    </View>
  );
}
```

## Network Strategies

### Conservative (WiFi Only)

Best for large files or limited data plans:

```tsx
const upload = await VideoUploader.upload({
  file: '/path/to/large-video.mp4',
  url: 'https://api.example.com/upload',
  requireWifi: true,
});
```

### Balanced (Cellular with Limit)

Allow cellular with data limit:

```tsx
const upload = await VideoUploader.upload({
  file: '/path/to/video.mp4',
  url: 'https://api.example.com/upload',
  allowCellular: true,
  cellularDataLimit: 100 * 1024 * 1024, // 100 MB
});
```

### Aggressive (Any Connection)

Upload immediately on any connection:

```tsx
const upload = await VideoUploader.upload({
  file: '/path/to/video.mp4',
  url: 'https://api.example.com/upload',
  allowCellular: true,
  networkTracking: true,
});
```

## Best Practices

1. **WiFi for Large Files** - Require WiFi for files > 100 MB
2. **Auto Pause/Resume** - Always enable for better UX
3. **User Preference** - Let users choose WiFi-only mode
4. **Data Limits** - Set reasonable cellular data limits
5. **Network Feedback** - Show network status to users
6. **Quality Adaptation** - Enable for better reliability

## See Also

- [Basic Upload](./basic-upload.md) - Simple file uploads
- [Queue Management](./queue-management.md) - Handle multiple uploads
- [Configuration](./configuration.md) - Upload configuration

