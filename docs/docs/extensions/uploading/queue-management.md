# Queue Management

Manage multiple uploads efficiently with queue system and prioritization.

## Overview

Queue management provides:
- **Automatic Queuing** - Queue uploads when limit is reached
- **Priority Support** - Prioritize important uploads
- **Concurrent Limit** - Control simultaneous uploads
- **Queue Persistence** - Survive app restarts
- **Batch Operations** - Pause/resume/cancel multiple uploads

## Basic Queue

```tsx
import { VideoUploader } from 'react-native-video';

// Uploads are automatically queued
const upload1 = await VideoUploader.upload({
  file: '/path/to/video1.mp4',
  url: 'https://api.example.com/upload',
});

const upload2 = await VideoUploader.upload({
  file: '/path/to/video2.mp4',
  url: 'https://api.example.com/upload',
});

const upload3 = await VideoUploader.upload({
  file: '/path/to/video3.mp4',
  url: 'https://api.example.com/upload',
});

// All start automatically based on queue configuration
```

## Queue Configuration

Configure queue behavior globally:

```tsx
import { VideoUploadManager } from 'react-native-video';

VideoUploadManager.configure({
  maxConcurrentUploads: 2, // Upload 2 files at once
  queueMode: 'fifo', // 'fifo' or 'priority'
  autoStart: true, // Auto-start queued uploads
});
```

## Priority-Based Queue

Assign priorities to uploads:

```tsx
// High priority upload (starts first)
const urgentUpload = await VideoUploader.upload({
  file: '/path/to/urgent.mp4',
  url: 'https://api.example.com/upload',
  priority: 'high', // 'high', 'medium', 'low'
});

// Medium priority
const normalUpload = await VideoUploader.upload({
  file: '/path/to/normal.mp4',
  url: 'https://api.example.com/upload',
  priority: 'medium',
});

// Low priority (starts last)
const backgroundUpload = await VideoUploader.upload({
  file: '/path/to/background.mp4',
  url: 'https://api.example.com/upload',
  priority: 'low',
});
```

## Queue Operations

### Get All Uploads

```tsx
const uploads = await VideoUploadManager.getAll();

uploads.forEach(upload => {
  console.log(upload.id, upload.state, upload.progress);
});
```

### Get Queue Status

```tsx
const status = await VideoUploadManager.getQueueStatus();

console.log(status);
// {
//   total: 10,
//   uploading: 2,
//   queued: 5,
//   paused: 2,
//   completed: 1,
//   failed: 0
// }
```

### Pause All

```tsx
await VideoUploadManager.pauseAll();
```

### Resume All

```tsx
await VideoUploadManager.resumeAll();
```

### Cancel All

```tsx
await VideoUploadManager.cancelAll();
```

## Filter Uploads

### By State

```tsx
const uploads = await VideoUploadManager.getAll();

// Only uploading
const uploading = uploads.filter(u => u.state === 'uploading');

// Only queued
const queued = uploads.filter(u => u.state === 'queued');

// Failed uploads
const failed = uploads.filter(u => u.state === 'failed');
```

### By Priority

```tsx
const highPriority = uploads.filter(u => u.priority === 'high');
```

### By Metadata

```tsx
const userUploads = uploads.filter(
  u => u.metadata?.userId === 'user123'
);
```

## Queue Events

Listen to queue-level events:

```tsx
VideoUploadManager.onQueueChange((status) => {
  console.log('Queue status:', status);
  // {
  //   total: 10,
  //   uploading: 2,
  //   queued: 5,
  //   ...
  // }
});

VideoUploadManager.onUploadStart((upload) => {
  console.log('Upload started:', upload.id);
});

VideoUploadManager.onUploadComplete((upload) => {
  console.log('Upload completed:', upload.id);
});

VideoUploadManager.onUploadFailed((upload, error) => {
  console.error('Upload failed:', upload.id, error);
});
```

## Batch Upload

Upload multiple files at once:

```tsx
const files = [
  '/path/to/video1.mp4',
  '/path/to/video2.mp4',
  '/path/to/video3.mp4',
];

const uploads = await VideoUploadManager.batchUpload({
  files,
  url: 'https://api.example.com/upload',
  headers: {
    'Authorization': 'Bearer token',
  },
});

// Track batch progress
VideoUploadManager.onBatchProgress((progress) => {
  console.log(`Batch: ${progress.completed} / ${progress.total}`);
});
```

## Queue Persistence

Queue persists across app restarts:

```tsx
// On app start, resume pending uploads
useEffect(() => {
  const resumePendingUploads = async () => {
    const uploads = await VideoUploadManager.getAll();
    const pending = uploads.filter(
      u => ['uploading', 'paused', 'queued'].includes(u.state)
    );
    
    for (const upload of pending) {
      await upload.resume();
    }
  };
  
  resumePendingUploads();
}, []);
```

## Queue Strategies

### FIFO (First In, First Out)

```tsx
VideoUploadManager.configure({
  queueMode: 'fifo',
});

// Uploads process in order added
```

### Priority-Based

```tsx
VideoUploadManager.configure({
  queueMode: 'priority',
});

// Uploads process by priority: high → medium → low
```

### Custom Strategy

```tsx
VideoUploadManager.configure({
  queueMode: 'custom',
  queueComparator: (a, b) => {
    // Custom sorting logic
    // Sort by file size (smallest first)
    return a.fileSize - b.fileSize;
  },
});
```

## Complete Example

```tsx
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button } from 'react-native';
import { VideoUploadManager } from 'react-native-video';

function UploadQueueScreen() {
  const [uploads, setUploads] = useState([]);
  const [queueStatus, setQueueStatus] = useState(null);

  useEffect(() => {
    loadUploads();
    
    const unsubscribe = VideoUploadManager.onQueueChange((status) => {
      setQueueStatus(status);
      loadUploads();
    });
    
    return () => unsubscribe();
  }, []);

  const loadUploads = async () => {
    const all = await VideoUploadManager.getAll();
    setUploads(all);
  };

  const addUpload = async (filePath, priority = 'medium') => {
    await VideoUploader.upload({
      file: filePath,
      url: 'https://api.example.com/upload',
      priority,
    });
  };

  const pauseAll = async () => {
    await VideoUploadManager.pauseAll();
  };

  const resumeAll = async () => {
    await VideoUploadManager.resumeAll();
  };

  const clearCompleted = async () => {
    const completed = uploads.filter(u => u.state === 'completed');
    for (const upload of completed) {
      await VideoUploadManager.remove(upload.id);
    }
    loadUploads();
  };

  return (
    <View>
      {queueStatus && (
        <View style={styles.queueStatus}>
          <Text>Total: {queueStatus.total}</Text>
          <Text>Uploading: {queueStatus.uploading}</Text>
          <Text>Queued: {queueStatus.queued}</Text>
          <Text>Completed: {queueStatus.completed}</Text>
        </View>
      )}

      <View style={styles.actions}>
        <Button title="Pause All" onPress={pauseAll} />
        <Button title="Resume All" onPress={resumeAll} />
        <Button title="Clear Completed" onPress={clearCompleted} />
      </View>

      <FlatList
        data={uploads}
        renderItem={({ item }) => (
          <View style={styles.uploadItem}>
            <Text>{item.fileName}</Text>
            <Text>State: {item.state}</Text>
            <Text>Priority: {item.priority}</Text>
            {item.progress && (
              <Text>Progress: {item.progress.percentage}%</Text>
            )}
            
            <View style={styles.itemActions}>
              {item.state === 'uploading' && (
                <Button title="Pause" onPress={() => item.pause()} />
              )}
              {item.state === 'paused' && (
                <Button title="Resume" onPress={() => item.resume()} />
              )}
              {item.state !== 'completed' && (
                <Button 
                  title="Cancel" 
                  onPress={() => item.cancel()} 
                  color="red"
                />
              )}
            </View>
          </View>
        )}
      />
    </View>
  );
}
```

## Best Practices

1. **Concurrent Limit** - Set to 2-3 for optimal performance
2. **Priority** - Use priorities for user-initiated uploads
3. **Persistence** - Resume pending uploads on app start
4. **Cleanup** - Remove completed uploads periodically
5. **User Control** - Allow users to pause/resume/cancel
6. **Status Updates** - Show queue status to users

## See Also

- [Basic Upload](./basic-upload.md) - Simple file uploads
- [Network Tracking](./network-tracking.md) - Network-aware uploads
- [Configuration](./configuration.md) - Upload configuration

