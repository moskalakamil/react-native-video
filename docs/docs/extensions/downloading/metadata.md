# Metadata

Attach custom data to downloads for organization and UI display.

## Overview

Metadata allows you to:
- Store custom information with downloads
- Organize downloads by category, course, etc.
- Display thumbnails and descriptions
- Track download context (user, timestamp, etc.)
- Build rich offline libraries

## Basic Metadata

```tsx
import { VideoDownloader } from 'react-native-video';

const download = await VideoDownloader.download({
  url: 'https://example.com/video.mp4',
  title: 'Introduction to React Native',
  metadata: {
    description: 'Learn the basics of React Native development',
    thumbnail: 'https://example.com/thumbnails/intro.jpg',
    duration: 600, // seconds
    instructor: 'John Doe',
  },
});
```

## Common Metadata Fields

### Course/Educational Content

```tsx
const download = await VideoDownloader.download({
  url: 'https://example.com/lecture.mp4',
  title: 'Lecture 5: State Management',
  metadata: {
    courseId: 'react-native-101',
    courseName: 'React Native Fundamentals',
    chapterId: '3',
    chapterName: 'Advanced Concepts',
    lessonNumber: 5,
    instructor: 'Jane Smith',
    duration: 1800,
    thumbnail: 'https://cdn.example.com/thumbs/lecture5.jpg',
    tags: ['react', 'state', 'hooks'],
    difficulty: 'intermediate',
  },
});
```

### Movies/Entertainment

```tsx
const download = await VideoDownloader.download({
  url: 'https://example.com/movie.mp4',
  title: 'The Matrix',
  metadata: {
    genre: ['Action', 'Sci-Fi'],
    year: 1999,
    director: 'Wachowski Brothers',
    cast: ['Keanu Reeves', 'Laurence Fishburne'],
    rating: 'R',
    duration: 8160, // seconds
    thumbnail: 'https://cdn.example.com/posters/matrix.jpg',
    synopsis: 'A computer hacker learns from mysterious rebels...',
    imdbId: 'tt0133093',
  },
});
```

### User-Generated Content

```tsx
const download = await VideoDownloader.download({
  url: 'https://example.com/user-video.mp4',
  title: 'My Vacation 2024',
  metadata: {
    userId: 'user123',
    uploadDate: '2024-01-15',
    location: 'Paris, France',
    tags: ['vacation', 'travel', 'europe'],
    thumbnail: 'https://example.com/thumbs/vacation.jpg',
    isPrivate: true,
    views: 0,
  },
});
```

## Retrieving Metadata

### Get Download with Metadata

```tsx
const download = await VideoDownloadManager.findById(downloadId);

console.log(download.metadata);
// {
//   courseId: 'react-native-101',
//   chapterName: 'Advanced Concepts',
//   ...
// }
```

### List Downloads with Metadata

```tsx
const downloads = await VideoDownloadManager.getAll();

downloads.forEach(download => {
  console.log(download.title);
  console.log(download.metadata);
});
```

## Filtering by Metadata

### By Course

```tsx
const downloads = await VideoDownloadManager.getAll();

const courseDownloads = downloads.filter(
  d => d.metadata?.courseId === 'react-native-101'
);
```

### By Tag

```tsx
const reactDownloads = downloads.filter(
  d => d.metadata?.tags?.includes('react')
);
```

### By Custom Field

```tsx
const recentDownloads = downloads.filter(
  d => {
    const date = new Date(d.metadata?.downloadDate);
    const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
    return date.getTime() > weekAgo;
  }
);
```

## Updating Metadata

Update metadata after download creation:

```tsx
const download = await VideoDownloadManager.findById(downloadId);

await download.updateMetadata({
  ...download.metadata,
  views: (download.metadata?.views || 0) + 1,
  lastViewed: new Date().toISOString(),
});
```

## Displaying Metadata in UI

### Download List with Thumbnails

```tsx
import React from 'react';
import { FlatList, Image, Text, View } from 'react-native';

function DownloadList({ downloads }) {
  return (
    <FlatList
      data={downloads}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Image 
            source={{ uri: item.metadata?.thumbnail }}
            style={styles.thumbnail}
          />
          <View style={styles.info}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>
              {item.metadata?.description}
            </Text>
            <Text style={styles.duration}>
              {formatDuration(item.metadata?.duration)}
            </Text>
          </View>
        </View>
      )}
    />
  );
}
```

### Grouped by Category

```tsx
function GroupedDownloads({ downloads }) {
  const grouped = downloads.reduce((acc, download) => {
    const category = download.metadata?.category || 'Uncategorized';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(download);
    return acc;
  }, {});

  return (
    <View>
      {Object.entries(grouped).map(([category, items]) => (
        <View key={category}>
          <Text style={styles.categoryHeader}>{category}</Text>
          <FlatList
            data={items}
            renderItem={({ item }) => <DownloadItem download={item} />}
          />
        </View>
      ))}
    </View>
  );
}
```

## Searchable Metadata

Make downloads searchable by metadata:

```tsx
function searchDownloads(query, downloads) {
  const lowerQuery = query.toLowerCase();
  
  return downloads.filter(download => {
    // Search title
    if (download.title.toLowerCase().includes(lowerQuery)) {
      return true;
    }
    
    // Search description
    if (download.metadata?.description?.toLowerCase().includes(lowerQuery)) {
      return true;
    }
    
    // Search tags
    if (download.metadata?.tags?.some(tag => 
      tag.toLowerCase().includes(lowerQuery)
    )) {
      return true;
    }
    
    return false;
  });
}
```

## Sorting by Metadata

```tsx
// Sort by duration
const sortedByDuration = [...downloads].sort((a, b) => 
  (a.metadata?.duration || 0) - (b.metadata?.duration || 0)
);

// Sort by date
const sortedByDate = [...downloads].sort((a, b) => 
  new Date(b.metadata?.uploadDate) - new Date(a.metadata?.uploadDate)
);

// Sort by lesson number
const sortedByLesson = [...downloads].sort((a, b) =>
  (a.metadata?.lessonNumber || 0) - (b.metadata?.lessonNumber || 0)
);
```

## Complete Example

```tsx
import React, { useState, useEffect } from 'react';
import { View, FlatList, Image, Text, TextInput } from 'react-native';
import { VideoDownloadManager } from 'react-native-video';

function DownloadLibrary() {
  const [downloads, setDownloads] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    loadDownloads();
  }, []);

  const loadDownloads = async () => {
    const all = await VideoDownloadManager.getAll();
    setDownloads(all);
  };

  const filteredDownloads = downloads
    .filter(d => {
      // Filter by category
      if (filter !== 'all' && d.metadata?.category !== filter) {
        return false;
      }
      
      // Filter by search
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          d.title.toLowerCase().includes(query) ||
          d.metadata?.description?.toLowerCase().includes(query) ||
          d.metadata?.tags?.some(tag => tag.toLowerCase().includes(query))
        );
      }
      
      return true;
    })
    .sort((a, b) => 
      // Sort by lesson number if available
      (a.metadata?.lessonNumber || 999) - (b.metadata?.lessonNumber || 999)
    );

  return (
    <View>
      <TextInput
        placeholder="Search downloads..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      
      <FlatList
        data={filteredDownloads}
        renderItem={({ item }) => (
          <View style={styles.item}>
            {item.metadata?.thumbnail && (
              <Image
                source={{ uri: item.metadata.thumbnail }}
                style={styles.thumbnail}
              />
            )}
            <View style={styles.info}>
              <Text style={styles.title}>{item.title}</Text>
              {item.metadata?.description && (
                <Text style={styles.description}>
                  {item.metadata.description}
                </Text>
              )}
              {item.metadata?.duration && (
                <Text style={styles.duration}>
                  {Math.floor(item.metadata.duration / 60)} min
                </Text>
              )}
              {item.metadata?.tags && (
                <View style={styles.tags}>
                  {item.metadata.tags.map(tag => (
                    <Text key={tag} style={styles.tag}>{tag}</Text>
                  ))}
                </View>
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

1. **Consistent Structure** - Use consistent metadata fields across similar content types
2. **Thumbnails** - Always include thumbnails for better UX
3. **Search Keywords** - Add relevant tags for searchability
4. **Timestamps** - Include creation/download/update timestamps
5. **File Size** - Store file size for storage management UI
6. **Validation** - Validate metadata before saving

## See Also

- [Basic Downloads](./basic-downloads.md) - Download API basics
- [Configuration](./configuration.md) - Download configuration

