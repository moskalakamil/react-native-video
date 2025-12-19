# Multi-Part Upload

Upload large files in chunks with automatic retry and resumability.

:::tip Pro Feature
Multi-part uploads require a Pro license.
:::

## Overview

Multi-part uploads enable:
- **Large File Support** - Upload files of any size
- **Resumable Uploads** - Resume from where it left off
- **Parallel Chunks** - Upload multiple chunks simultaneously
- **Automatic Retry** - Retry failed chunks individually
- **Progress Tracking** - Track overall and per-chunk progress

## Basic Multi-Part Upload

```tsx
import { VideoUploader } from 'react-native-video';

const upload = await VideoUploader.upload({
  file: '/path/to/large-video.mp4',
  url: 'https://api.example.com/upload',
  multipart: true,
  chunkSize: 5 * 1024 * 1024, // 5 MB chunks
});

await upload.start();
```

## Configuration

### chunkSize

Size of each chunk in bytes.

```tsx
const upload = await VideoUploader.upload({
  file: '/path/to/video.mp4',
  url: 'https://api.example.com/upload',
  multipart: true,
  chunkSize: 10 * 1024 * 1024, // 10 MB
});
```

**Default**: `5 * 1024 * 1024` (5 MB)

### maxParallelUploads

Number of chunks to upload simultaneously.

```tsx
const upload = await VideoUploader.upload({
  file: '/path/to/video.mp4',
  url: 'https://api.example.com/upload',
  multipart: true,
  maxParallelUploads: 3, // Upload 3 chunks at once
});
```

**Default**: `3`

### uploadId

Custom upload ID for resuming uploads.

```tsx
const upload = await VideoUploader.upload({
  file: '/path/to/video.mp4',
  url: 'https://api.example.com/upload',
  multipart: true,
  uploadId: 'my-unique-upload-id',
});
```

## Server Integration

### Initiate Upload

The SDK first initiates the multi-part upload:

```tsx
// 1. SDK sends POST to initiate
POST https://api.example.com/upload/initiate
{
  "filename": "video.mp4",
  "fileSize": 104857600,
  "chunkSize": 5242880
}

// 2. Server responds with uploadId
{
  "uploadId": "abc123",
  "chunkCount": 20
}
```

### Upload Chunks

Each chunk is uploaded separately:

```tsx
// SDK uploads each chunk
PUT https://api.example.com/upload/chunk
Headers:
  X-Upload-Id: abc123
  X-Chunk-Index: 0
  X-Chunk-Count: 20
  Content-Type: application/octet-stream

Body: [chunk data]

// Server responds
{
  "chunkIndex": 0,
  "status": "received"
}
```

### Complete Upload

After all chunks are uploaded:

```tsx
// SDK sends completion request
POST https://api.example.com/upload/complete
{
  "uploadId": "abc123"
}

// Server merges chunks and responds
{
  "videoId": "video123",
  "url": "https://cdn.example.com/video123.mp4"
}
```

## Progress Tracking

Track overall and per-chunk progress:

```tsx
const upload = await VideoUploader.upload({
  file: '/path/to/video.mp4',
  url: 'https://api.example.com/upload',
  multipart: true,
});

// Overall progress
upload.onProgress((progress) => {
  console.log(`Overall: ${progress.percentage}%`);
  console.log(`Chunks: ${progress.chunksUploaded} / ${progress.totalChunks}`);
  console.log(`Speed: ${(progress.speed / 1024 / 1024).toFixed(2)} MB/s`);
});

// Per-chunk progress
upload.onChunkProgress((chunkProgress) => {
  console.log(`Chunk ${chunkProgress.index}: ${chunkProgress.percentage}%`);
});

await upload.start();
```

## Resumable Uploads

Resume uploads after interruption:

```tsx
// Start upload
const upload = await VideoUploader.upload({
  file: '/path/to/video.mp4',
  url: 'https://api.example.com/upload',
  multipart: true,
  uploadId: 'my-upload-123',
});

// Upload interrupted...

// Later, resume with same uploadId
const resumed = await VideoUploader.resume('my-upload-123');

await resumed.start();
```

### Automatic Resume

Enable automatic resume on app restart:

```tsx
const upload = await VideoUploader.upload({
  file: '/path/to/video.mp4',
  url: 'https://api.example.com/upload',
  multipart: true,
  autoResume: true,
});
```

## Chunk Retry

Failed chunks are automatically retried:

```tsx
const upload = await VideoUploader.upload({
  file: '/path/to/video.mp4',
  url: 'https://api.example.com/upload',
  multipart: true,
  chunkRetryAttempts: 5,
  chunkRetryDelay: 3000, // 3 seconds
});

upload.onChunkRetry((chunk, attempt) => {
  console.log(`Retrying chunk ${chunk.index}, attempt ${attempt}`);
});
```

## Verification

Verify chunks on server:

```tsx
const upload = await VideoUploader.upload({
  file: '/path/to/video.mp4',
  url: 'https://api.example.com/upload',
  multipart: true,
  verifyChunks: true, // Server verifies each chunk
  checksumAlgorithm: 'md5', // 'md5' or 'sha256'
});
```

Server should respond with checksum:

```tsx
// Server response for each chunk
{
  "chunkIndex": 0,
  "status": "received",
  "checksum": "5d41402abc4b2a76b9719d911017c592"
}
```

## Custom Endpoints

Use different endpoints for each operation:

```tsx
const upload = await VideoUploader.upload({
  file: '/path/to/video.mp4',
  multipart: true,
  endpoints: {
    initiate: 'https://api.example.com/upload/init',
    uploadChunk: 'https://api.example.com/upload/chunk',
    complete: 'https://api.example.com/upload/finish',
    abort: 'https://api.example.com/upload/cancel',
  },
});
```

## Abort Upload

Cancel multi-part upload:

```tsx
await upload.abort(); // Notifies server to clean up chunks
```

## Complete Example

```tsx
import React, { useState, useEffect } from 'react';
import { View, Text, Button, ProgressBar } from 'react-native';
import { VideoUploader } from 'react-native-video';

function MultiPartUploadExample({ filePath, fileSize }) {
  const [upload, setUpload] = useState(null);
  const [progress, setProgress] = useState(0);
  const [chunksProgress, setChunksProgress] = useState({});
  const [state, setState] = useState('idle');

  const startUpload = async () => {
    const ul = await VideoUploader.upload({
      file: filePath,
      url: 'https://api.example.com/upload',
      multipart: true,
      chunkSize: 5 * 1024 * 1024, // 5 MB
      maxParallelUploads: 3,
      autoResume: true,
      verifyChunks: true,
    });

    ul.onProgress((prog) => {
      setProgress(prog.percentage);
    });

    ul.onChunkProgress((chunkProg) => {
      setChunksProgress(prev => ({
        ...prev,
        [chunkProg.index]: chunkProg.percentage,
      }));
    });

    ul.onStateChange((s) => setState(s));

    ul.onChunkRetry((chunk, attempt) => {
      console.log(`Retrying chunk ${chunk.index}, attempt ${attempt}`);
    });

    ul.onComplete((response) => {
      console.log('Upload completed!', response.data);
    });

    ul.onError((error) => {
      console.error('Upload failed:', error);
    });

    setUpload(ul);
    await ul.start();
  };

  return (
    <View>
      <Text>File Size: {(fileSize / 1024 / 1024).toFixed(2)} MB</Text>
      <Text>State: {state}</Text>
      <Text>Progress: {progress}%</Text>

      <ProgressBar progress={progress / 100} />

      {upload && (
        <View>
          <Text>Chunks Progress:</Text>
          {Object.entries(chunksProgress).map(([index, prog]) => (
            <View key={index} style={{ flexDirection: 'row' }}>
              <Text>Chunk {index}: </Text>
              <ProgressBar progress={prog / 100} style={{ flex: 1 }} />
              <Text>{prog}%</Text>
            </View>
          ))}
        </View>
      )}

      {state === 'idle' && (
        <Button title="Start Upload" onPress={startUpload} />
      )}

      {state === 'uploading' && upload && (
        <Button title="Pause" onPress={() => upload.pause()} />
      )}

      {state === 'paused' && upload && (
        <Button title="Resume" onPress={() => upload.resume()} />
      )}

      {state === 'uploading' && upload && (
        <Button title="Abort" onPress={() => upload.abort()} color="red" />
      )}
    </View>
  );
}
```

## Server Implementation Example

Basic Node.js/Express server for multi-part uploads:

```js
// Initiate upload
app.post('/upload/initiate', (req, res) => {
  const { filename, fileSize, chunkSize } = req.body;
  const uploadId = generateUploadId();
  const chunkCount = Math.ceil(fileSize / chunkSize);
  
  // Store upload metadata
  uploads[uploadId] = {
    filename,
    fileSize,
    chunkSize,
    chunkCount,
    receivedChunks: [],
  };
  
  res.json({ uploadId, chunkCount });
});

// Upload chunk
app.put('/upload/chunk', (req, res) => {
  const uploadId = req.headers['x-upload-id'];
  const chunkIndex = parseInt(req.headers['x-chunk-index']);
  
  // Save chunk to disk
  const chunkPath = `./uploads/${uploadId}/chunk-${chunkIndex}`;
  fs.writeFileSync(chunkPath, req.body);
  
  // Calculate checksum
  const checksum = calculateMD5(req.body);
  
  // Track received chunk
  uploads[uploadId].receivedChunks.push(chunkIndex);
  
  res.json({ chunkIndex, status: 'received', checksum });
});

// Complete upload
app.post('/upload/complete', async (req, res) => {
  const { uploadId } = req.body;
  const upload = uploads[uploadId];
  
  // Merge all chunks
  const outputPath = `./videos/${upload.filename}`;
  await mergeChunks(uploadId, upload.chunkCount, outputPath);
  
  // Clean up chunks
  await cleanupChunks(uploadId);
  
  res.json({
    videoId: uploadId,
    url: `https://cdn.example.com/${uploadId}.mp4`,
  });
});
```

## Best Practices

1. **Chunk Size** - Use 5-10 MB chunks for optimal performance
2. **Parallel Uploads** - Limit to 3-5 parallel chunks
3. **Verification** - Always verify chunks with checksums
4. **Auto Resume** - Enable for better UX
5. **Error Handling** - Implement chunk-level retry logic
6. **Server Cleanup** - Clean up orphaned chunks periodically

## See Also

- [Basic Upload](./basic-upload.md) - Simple file uploads
- [Queue Management](./queue-management.md) - Handle multiple uploads
- [Configuration](./configuration.md) - Upload configuration

