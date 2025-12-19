# Basic Upload

Upload single files with simple API and automatic retry.

## Quick Start

```tsx
import { VideoUploader } from 'react-native-video';

const upload = await VideoUploader.upload({
  file: '/path/to/video.mp4',
  url: 'https://api.example.com/upload',
});

await upload.start();
```

## Upload Options

```tsx
interface UploadOptions {
  file: string;
  url: string;
  method?: 'POST' | 'PUT';
  headers?: Record<string, string>;
  fields?: Record<string, any>;
  metadata?: Record<string, any>;
  fileKey?: string;
}
```

### file (required)

Local path to the file to upload.

```tsx
const upload = await VideoUploader.upload({
  file: '/var/mobile/Containers/Data/video.mp4',
  url: 'https://api.example.com/upload',
});
```

### url (required)

The server endpoint to upload to.

```tsx
const upload = await VideoUploader.upload({
  file: '/path/to/video.mp4',
  url: 'https://api.example.com/videos/upload',
});
```

### method (optional)

HTTP method to use. Defaults to `'POST'`.

```tsx
const upload = await VideoUploader.upload({
  file: '/path/to/video.mp4',
  url: 'https://api.example.com/upload',
  method: 'PUT',
});
```

### headers (optional)

Custom HTTP headers.

```tsx
const upload = await VideoUploader.upload({
  file: '/path/to/video.mp4',
  url: 'https://api.example.com/upload',
  headers: {
    'Authorization': 'Bearer token123',
    'X-Custom-Header': 'value',
  },
});
```

### fields (optional)

Additional form fields to send with the upload.

```tsx
const upload = await VideoUploader.upload({
  file: '/path/to/video.mp4',
  url: 'https://api.example.com/upload',
  fields: {
    title: 'My Video',
    description: 'Uploaded from mobile',
    userId: '12345',
  },
});
```

### metadata (optional)

Custom metadata for local tracking (not sent to server).

```tsx
const upload = await VideoUploader.upload({
  file: '/path/to/video.mp4',
  url: 'https://api.example.com/upload',
  metadata: {
    localId: 'abc123',
    timestamp: Date.now(),
    category: 'vacation',
  },
});
```

### fileKey (optional)

The form field name for the file. Defaults to `'file'`.

```tsx
const upload = await VideoUploader.upload({
  file: '/path/to/video.mp4',
  url: 'https://api.example.com/upload',
  fileKey: 'video', // Server expects 'video' field
});
```

## Progress Tracking

Monitor upload progress in real-time:

```tsx
const upload = await VideoUploader.upload({
  file: '/path/to/video.mp4',
  url: 'https://api.example.com/upload',
});

upload.onProgress((progress) => {
  console.log(`Uploaded: ${progress.bytesUploaded} / ${progress.totalBytes}`);
  console.log(`Progress: ${progress.percentage}%`);
  console.log(`Speed: ${progress.speed} bytes/sec`);
  console.log(`ETA: ${progress.estimatedTimeRemaining} seconds`);
});

await upload.start();
```

### Progress Object

```ts
interface UploadProgress {
  bytesUploaded: number;
  totalBytes: number;
  percentage: number; // 0-100
  speed: number; // bytes per second
  estimatedTimeRemaining: number; // seconds
}
```

## Upload Control

### Start

Begin the upload:

```tsx
await upload.start();
```

### Pause

Temporarily pause the upload:

```tsx
await upload.pause();
```

### Resume

Resume a paused upload:

```tsx
await upload.resume();
```

### Cancel

Cancel and remove the upload:

```tsx
await upload.cancel();
```

## Events

Listen to upload lifecycle events:

```tsx
const upload = await VideoUploader.upload({
  file: '/path/to/video.mp4',
  url: 'https://api.example.com/upload',
});

// Progress updates
upload.onProgress((progress) => {
  console.log(`${progress.percentage}% complete`);
});

// State changes
upload.onStateChange((state) => {
  console.log('State:', state);
});

// Completion
upload.onComplete((response) => {
  console.log('Upload complete!');
  console.log('Server response:', response.data);
  console.log('Status code:', response.statusCode);
});

// Errors
upload.onError((error) => {
  console.error('Upload failed:', error.message);
  console.error('Code:', error.code);
});

// Network changes
upload.onNetworkChange((state) => {
  console.log('Network:', state.isConnected ? 'Connected' : 'Disconnected');
});

await upload.start();
```

## Server Response

Handle server responses:

```tsx
upload.onComplete((response) => {
  console.log('Status:', response.statusCode);
  console.log('Headers:', response.headers);
  console.log('Body:', response.data);
  
  // Parse JSON response
  const data = JSON.parse(response.data);
  console.log('Video ID:', data.videoId);
  console.log('URL:', data.url);
});
```

## Error Handling

```tsx
upload.onError((error) => {
  switch (error.code) {
    case 'NETWORK_ERROR':
      console.error('Network error:', error.message);
      break;
    case 'SERVER_ERROR':
      console.error('Server error:', error.statusCode);
      break;
    case 'FILE_NOT_FOUND':
      console.error('File not found:', error.filePath);
      break;
    case 'CANCELLED':
      console.log('Upload was cancelled');
      break;
    default:
      console.error('Unknown error:', error);
  }
});
```

## Complete Example

```tsx
import React, { useState } from 'react';
import { View, Text, Button, ProgressBar } from 'react-native';
import { VideoUploader } from 'react-native-video';

function UploadExample({ filePath }) {
  const [upload, setUpload] = useState(null);
  const [progress, setProgress] = useState(0);
  const [state, setState] = useState('idle');
  const [response, setResponse] = useState(null);

  const startUpload = async () => {
    const ul = await VideoUploader.upload({
      file: filePath,
      url: 'https://api.example.com/upload',
      headers: {
        'Authorization': 'Bearer token',
      },
      fields: {
        title: 'My Video',
        userId: 'user123',
      },
    });

    ul.onProgress((prog) => setProgress(prog.percentage));
    ul.onStateChange((s) => setState(s));
    
    ul.onComplete((resp) => {
      console.log('Upload completed!');
      setResponse(resp);
    });

    ul.onError((error) => {
      console.error('Upload failed:', error);
      alert(`Upload failed: ${error.message}`);
    });

    setUpload(ul);
    await ul.start();
  };

  return (
    <View>
      <Text>State: {state}</Text>
      
      {state === 'uploading' && (
        <>
          <ProgressBar progress={progress / 100} />
          <Text>{progress}%</Text>
        </>
      )}
      
      <Button 
        title="Upload" 
        onPress={startUpload}
        disabled={state === 'uploading'}
      />
      
      {upload && state === 'uploading' && (
        <Button title="Pause" onPress={() => upload.pause()} />
      )}
      
      {upload && state === 'paused' && (
        <Button title="Resume" onPress={() => upload.resume()} />
      )}

      {response && (
        <View>
          <Text>Upload successful!</Text>
          <Text>Status: {response.statusCode}</Text>
          <Text>Response: {JSON.stringify(response.data)}</Text>
        </View>
      )}
    </View>
  );
}
```

## Best Practices

1. **Auth Tokens** - Include authentication in headers
2. **Error Handling** - Always listen to `onError` events
3. **Network Awareness** - Enable network tracking for cellular/WiFi
4. **User Feedback** - Show progress and status to users
5. **Validation** - Validate file exists before uploading
6. **Retry Logic** - Enable automatic retry for reliability

## See Also

- [Multi-Part Upload](./multi-part-upload.md) - Large file uploads *(Pro)*
- [Queue Management](./queue-management.md) - Handle multiple uploads
- [Configuration](./configuration.md) - Upload configuration

