# DRM Downloads

Download DRM-protected content for secure offline playback.

:::tip Pro Feature
DRM downloads require a Pro license.
:::

## Overview

Download and play DRM-protected content offline with support for:
- **Widevine** (Android)
- **FairPlay** (iOS)
- **PlayReady** (Windows, Xbox)
- License persistence
- Offline license renewal
- Secure storage

## Supported DRM Systems

| Platform | Widevine | FairPlay | PlayReady |
|----------|----------|----------|-----------|
| iOS | ❌ | ✅ | ❌ |
| Android | ✅ | ❌ | ❌ |

## Basic DRM Download

```tsx
import { VideoDownloader } from 'react-native-video';

const download = await VideoDownloader.download({
  url: 'https://example.com/protected-video.mp4',
  title: 'Protected Content',
  drm: {
    type: 'fairplay', // or 'widevine', 'playready'
    licenseServer: 'https://license.example.com/acquire',
    certificateUrl: 'https://license.example.com/cert', // FairPlay only
  },
});

await download.start();
```

## FairPlay (iOS)

### Basic FairPlay Download

```tsx
const download = await VideoDownloader.download({
  url: 'https://example.com/hls/master.m3u8',
  title: 'Protected Video',
  type: 'hls',
  drm: {
    type: 'fairplay',
    licenseServer: 'https://fps.example.com/license',
    certificateUrl: 'https://fps.example.com/cert.cer',
  },
});
```

### With Custom Headers

```tsx
const download = await VideoDownloader.download({
  url: 'https://example.com/hls/master.m3u8',
  title: 'Protected Video',
  type: 'hls',
  drm: {
    type: 'fairplay',
    licenseServer: 'https://fps.example.com/license',
    certificateUrl: 'https://fps.example.com/cert.cer',
    headers: {
      'Authorization': 'Bearer token',
      'X-Custom-Data': 'user-id-123',
    },
  },
});
```

### License Duration

```tsx
const download = await VideoDownloader.download({
  url: 'https://example.com/hls/master.m3u8',
  title: 'Protected Video',
  type: 'hls',
  drm: {
    type: 'fairplay',
    licenseServer: 'https://fps.example.com/license',
    certificateUrl: 'https://fps.example.com/cert.cer',
    licenseDuration: 7 * 24 * 60 * 60, // 7 days in seconds
  },
});
```

## Widevine (Android)

### Basic Widevine Download

```tsx
const download = await VideoDownloader.download({
  url: 'https://example.com/dash/manifest.mpd',
  title: 'Protected Video',
  type: 'dash',
  drm: {
    type: 'widevine',
    licenseServer: 'https://widevine.example.com/proxy',
  },
});
```

### With License Challenge

```tsx
const download = await VideoDownloader.download({
  url: 'https://example.com/dash/manifest.mpd',
  title: 'Protected Video',
  type: 'dash',
  drm: {
    type: 'widevine',
    licenseServer: 'https://widevine.example.com/proxy',
    headers: {
      'X-AxDRM-Message': 'license-token',
    },
  },
});
```

## PlayReady (Windows)

```tsx
const download = await VideoDownloader.download({
  url: 'https://example.com/smooth/manifest',
  title: 'Protected Video',
  drm: {
    type: 'playready',
    licenseServer: 'https://playready.example.com/license',
    headers: {
      'Authorization': 'Bearer token',
    },
  },
});
```

## License Management

### Check License Status

```tsx
const download = await VideoDownloadManager.findById(downloadId);

const licenseStatus = await download.getLicenseStatus();

console.log(licenseStatus);
// {
//   isValid: true,
//   expirationDate: '2024-12-31T23:59:59Z',
//   daysRemaining: 7,
//   canRenew: true,
// }
```

### Renew License

```tsx
const download = await VideoDownloadManager.findById(downloadId);

await download.renewLicense();

console.log('License renewed successfully');
```

### Auto-Renewal

Enable automatic license renewal before expiration:

```tsx
const download = await VideoDownloader.download({
  url: 'https://example.com/protected.mp4',
  title: 'Protected Video',
  drm: {
    type: 'fairplay',
    licenseServer: 'https://fps.example.com/license',
    certificateUrl: 'https://fps.example.com/cert.cer',
    autoRenew: true,
    renewBeforeDays: 2, // Renew 2 days before expiration
  },
});
```

## Offline Playback

### Play Downloaded DRM Content

```tsx
const download = await VideoDownloadManager.findById(downloadId);

// Check license before playing
const licenseStatus = await download.getLicenseStatus();

if (!licenseStatus.isValid) {
  console.error('License expired');
  // Attempt to renew
  await download.renewLicense();
}

// Play the content
const player = useVideoPlayer(download.localPath, {
  drm: download.drmConfig,
});

return <VideoView player={player} />;
```

## Security Features

### Secure Storage

DRM downloads are automatically stored in secure, encrypted storage:

```tsx
const download = await VideoDownloader.download({
  url: 'https://example.com/protected.mp4',
  title: 'Protected Video',
  drm: {
    type: 'widevine',
    licenseServer: 'https://license.example.com',
  },
  secureStorage: true, // Default for DRM content
});
```

### Screenshot Prevention

Prevent screenshots during playback:

```tsx
const player = useVideoPlayer(download.localPath, {
  drm: download.drmConfig,
  preventScreenCapture: true,
});
```

## Error Handling

### License Acquisition Errors

```tsx
const download = await VideoDownloader.download({
  url: 'https://example.com/protected.mp4',
  title: 'Protected Video',
  drm: {
    type: 'fairplay',
    licenseServer: 'https://fps.example.com/license',
    certificateUrl: 'https://fps.example.com/cert.cer',
  },
});

download.onError((error) => {
  if (error.code === 'DRM_LICENSE_ERROR') {
    console.error('Failed to acquire license:', error.message);
    // Show user-friendly error
  } else if (error.code === 'DRM_CERTIFICATE_ERROR') {
    console.error('Invalid certificate:', error.message);
  }
});

await download.start();
```

### License Expiration Handling

```tsx
// Listen for license expiration
download.onLicenseExpiring((daysRemaining) => {
  console.log(`License expires in ${daysRemaining} days`);
  // Show renewal prompt to user
});

download.onLicenseExpired(() => {
  console.log('License has expired');
  // Disable playback, show renewal option
});
```

## Complete Example

```tsx
import React, { useState, useEffect } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import { VideoDownloader, VideoDownloadManager, useVideoPlayer } from 'react-native-video';

function DRMDownloadExample() {
  const [download, setDownload] = useState(null);
  const [licenseStatus, setLicenseStatus] = useState(null);
  const [player, setPlayer] = useState(null);

  const startDownload = async () => {
    const dl = await VideoDownloader.download({
      url: 'https://example.com/hls/master.m3u8',
      title: 'Protected Content',
      type: 'hls',
      drm: {
        type: 'fairplay',
        licenseServer: 'https://fps.example.com/license',
        certificateUrl: 'https://fps.example.com/cert.cer',
        licenseDuration: 7 * 24 * 60 * 60,
        autoRenew: true,
        renewBeforeDays: 1,
      },
    });

    dl.onProgress((progress) => {
      console.log(`Downloaded: ${progress.percentage}%`);
    });

    dl.onComplete(async () => {
      const status = await dl.getLicenseStatus();
      setLicenseStatus(status);
      setDownload(dl);
    });

    dl.onError((error) => {
      Alert.alert('Download Failed', error.message);
    });

    await dl.start();
  };

  const playVideo = () => {
    if (!licenseStatus?.isValid) {
      Alert.alert('License Invalid', 'Please renew the license');
      return;
    }

    const p = useVideoPlayer(download.localPath, {
      drm: download.drmConfig,
      preventScreenCapture: true,
    });

    setPlayer(p);
  };

  const renewLicense = async () => {
    try {
      await download.renewLicense();
      const status = await download.getLicenseStatus();
      setLicenseStatus(status);
      Alert.alert('Success', 'License renewed');
    } catch (error) {
      Alert.alert('Renewal Failed', error.message);
    }
  };

  return (
    <View>
      {!download && (
        <Button title="Download Protected Content" onPress={startDownload} />
      )}

      {download && licenseStatus && (
        <>
          <Text>License Status: {licenseStatus.isValid ? 'Valid' : 'Expired'}</Text>
          <Text>Days Remaining: {licenseStatus.daysRemaining}</Text>
          
          {licenseStatus.isValid && (
            <Button title="Play" onPress={playVideo} />
          )}
          
          {licenseStatus.canRenew && (
            <Button title="Renew License" onPress={renewLicense} />
          )}
        </>
      )}

      {player && (
        <VideoView player={player} style={{ width: '100%', aspectRatio: 16/9 }} />
      )}
    </View>
  );
}
```

## Best Practices

1. **Check License Before Download** - Verify user has valid entitlement
2. **Monitor Expiration** - Track license expiration dates
3. **Auto-Renewal** - Enable auto-renewal for better UX
4. **Error Handling** - Provide clear error messages for license issues
5. **Secure Storage** - Always use secure storage for DRM content
6. **Test on Device** - DRM doesn't work in simulators/emulators

## See Also

- [Adaptive Streaming](./adaptive-streaming.md) - HLS/DASH downloads
- [Configuration](./configuration.md) - Download configuration
- [DRM Playback](../../players/drm.md) - Online DRM playback

