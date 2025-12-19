# Frame Processors

Process video frames in realtime using JavaScript or native plugins.

:::tip Pro Feature - Coming Soon
Frame Processors are a Pro feature currently in development. They enable realtime video analysis and manipulation.
:::

## What are Frame Processors?

Frame Processors are JavaScript functions called for each frame the player renders. Inside these functions you can:

- **Analyze frames** in realtime using native plugins
- **Draw overlays** directly onto frames using Skia
- **Extract data** like colors, objects, or text
- **Apply filters** and visual effects

```tsx
const frameProcessor = useFrameProcessor((frame) => {
  'worklet';
  const objects = detectObjects(frame);
  console.log(`Detected: ${objects[0]?.name}`);
}, []);

return <VideoView player={player} frameProcessor={frameProcessor} />;
```

## Use Cases

Frame Processors enable powerful video processing capabilities:

| Use Case | Description |
|----------|-------------|
| **Ambient Mode** | Extract colors for dynamic UI gradients |
| **Visual Product Search** | Detect products/clothing for e-commerce |
| **Object Detection** | Detect and track objects in video |
| **Face Recognition** | Identify faces and expressions |
| **Text Recognition (OCR)** | Extract text from video frames |
| **Motion Detection** | Detect movement or scene changes |
| **Custom Overlays** | Draw graphics, text, or AR elements |
| **Content Moderation** | Detect inappropriate content |

## Real-World Examples

### Ambient Mode (Dynamic Colors)

Extract dominant colors from the video to create ambient lighting effects around the player. This creates an immersive experience where UI elements like borders or backgrounds match the video content.

```tsx
import React, { useState } from 'react';
import { View } from 'react-native';
import { useVideoPlayer, VideoView, useFrameProcessor, runOnJS } from 'react-native-video';

function AmbientVideoPlayer({ source }) {
  const [ambientColor, setAmbientColor] = useState('#000000');

  const player = useVideoPlayer(source, (_player) => {
    _player.play();
  });

  const frameProcessor = useFrameProcessor((frame) => {
    'worklet';
    // Extract dominant color from frame edges
    const color = extractDominantColor(frame, {
      region: 'edges', // Focus on edges for ambient effect
      sampleSize: 50,
    });
    
    runOnJS(setAmbientColor)(color);
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: ambientColor }]}>
      <View style={[styles.ambientGlow, { 
        shadowColor: ambientColor,
        shadowRadius: 50,
        shadowOpacity: 0.8,
      }]}>
        <VideoView 
          player={player} 
          frameProcessor={frameProcessor}
          style={styles.video} 
        />
      </View>
    </View>
  );
}
```

**Features:**
- Real-time color extraction from video frames
- Smooth color transitions with interpolation
- Region-based sampling (edges, center, full frame)
- Perfect for music videos, ambient displays, and immersive UIs

### Visual Product Search (E-commerce)

Detect clothing and products in video content for shoppable experiences. Users can tap on items to find similar products for purchase.

```tsx
import React, { useState } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { useVideoPlayer, VideoView, useFrameProcessor, runOnJS } from 'react-native-video';

function ShoppableVideoPlayer({ source }) {
  const [detectedProducts, setDetectedProducts] = useState([]);
  const [isPaused, setIsPaused] = useState(false);

  const player = useVideoPlayer(source, (_player) => {
    _player.play();
  });

  const frameProcessor = useFrameProcessor((frame) => {
    'worklet';
    // Detect clothing and products in frame
    const products = detectProducts(frame, {
      categories: ['clothing', 'accessories', 'shoes'],
      minConfidence: 0.7,
    });
    
    // Map to screen coordinates
    const mapped = products.map(p => ({
      id: p.id,
      category: p.category,
      bounds: p.bounds,
      confidence: p.confidence,
    }));
    
    runOnJS(setDetectedProducts)(mapped);
  }, []);

  const handleProductTap = async (product) => {
    player.pause();
    setIsPaused(true);
    
    // Search for similar products
    const results = await searchSimilarProducts(product);
    showProductSheet(results);
  };

  return (
    <View style={styles.container}>
      <VideoView 
        player={player} 
        frameProcessor={frameProcessor}
        style={styles.video} 
      />
      
      {/* Product hotspots */}
      {detectedProducts.map((product) => (
        <TouchableOpacity
          key={product.id}
          style={[styles.hotspot, {
            left: product.bounds.x,
            top: product.bounds.y,
            width: product.bounds.width,
            height: product.bounds.height,
          }]}
          onPress={() => handleProductTap(product)}
        >
          <View style={styles.hotspotIndicator} />
        </TouchableOpacity>
      ))}
    </View>
  );
}
```

**Features:**
- Real-time clothing and product detection
- Tap-to-shop functionality
- Category filtering (clothing, accessories, shoes, etc.)
- Integration with product catalogs and search APIs
- Perfect for fashion videos, influencer content, and live shopping

## Installation

Frame Processors require `react-native-worklets-core`:

```bash
npm install react-native-worklets-core
```

Add the plugin to your `babel.config.js`:

```js
module.exports = {
  plugins: [
    ['react-native-worklets-core/plugin'],
  ],
};
```

## The Frame Object

A video frame contains pixel data and metadata:

```tsx
const frameProcessor = useFrameProcessor((frame) => {
  'worklet';
  console.log(`Frame: ${frame.width}x${frame.height}`);
  console.log(`Format: ${frame.pixelFormat}`);
  console.log(`Timestamp: ${frame.timestamp}ms`);
}, []);
```

### Frame Properties

| Property | Type | Description |
|----------|------|-------------|
| `width` | `number` | Frame width in pixels |
| `height` | `number` | Frame height in pixels |
| `pixelFormat` | `string` | Pixel format (`'rgb'`, `'yuv'`, etc.) |
| `timestamp` | `number` | Frame timestamp in milliseconds |
| `bytesPerRow` | `number` | Bytes per row of pixel data |

### Accessing Pixel Data

```tsx
const frameProcessor = useFrameProcessor((frame) => {
  'worklet';
  if (frame.pixelFormat === 'rgb') {
    const buffer = frame.toArrayBuffer();
    const data = new Uint8Array(buffer);
    // First pixel RGB values
    console.log(`RGB(${data[0]}, ${data[1]}, ${data[2]})`);
  }
}, []);
```

:::note
At 1080p, a raw frame is ~6MB. At 60 FPS, ~360MB/second flows through your processor. Use native plugins for heavy processing.
:::

## Native Plugins

For performance-critical tasks, use native Frame Processor Plugins written in Swift/Kotlin/C++.

### Using Community Plugins

```bash
npm install vision-camera-image-labeler
cd ios && pod install
```

```tsx
import { useImageLabeler } from 'vision-camera-image-labeler';

function VideoAnalyzer() {
  const { labelImage } = useImageLabeler();

  const frameProcessor = useFrameProcessor((frame) => {
    'worklet';
    const labels = labelImage(frame);
    console.log(`Detected: ${labels[0]?.name}`);
  }, [labelImage]);

  return <VideoView player={player} frameProcessor={frameProcessor} />;
}
```

### Creating Custom Plugins

Create native plugins for optimal performance:

**iOS (Swift):**

```swift
@objc(ObjectDetector)
public class ObjectDetectorPlugin: FrameProcessorPlugin {
  public override func callback(_ frame: Frame, withArguments args: [AnyHashable: Any]) -> Any {
    let imageBuffer = frame.buffer
    let objects = MLKit.detectObjects(imageBuffer)
    return objects.map { $0.toJson() }
  }
}
```

**Android (Kotlin):**

```kotlin
class ObjectDetectorPlugin : FrameProcessorPlugin() {
  override fun callback(frame: Frame, params: Map<String, Any>): Any {
    val image = frame.image
    val objects = MLKit.detectObjects(image)
    return objects.map { it.toJson() }
  }
}
```

## Drawing with Skia

Draw directly onto frames using Skia:

```tsx
import { Skia } from '@shopify/react-native-skia';

const frameProcessor = useFrameProcessor((frame) => {
  'worklet';
  
  // Detect faces
  const faces = detectFaces(frame);
  
  // Draw rectangles around faces
  const canvas = frame.getSkiaCanvas();
  const paint = Skia.Paint();
  paint.setColor(Skia.Color('cyan'));
  paint.setStyle('stroke');
  paint.setStrokeWidth(3);
  
  for (const face of faces) {
    canvas.drawRect(face.bounds, paint);
  }
}, []);
```

### Drawing Examples

**Text overlay:**

```tsx
const frameProcessor = useFrameProcessor((frame) => {
  'worklet';
  const canvas = frame.getSkiaCanvas();
  const font = Skia.Font(null, 24);
  const paint = Skia.Paint();
  paint.setColor(Skia.Color('white'));
  
  canvas.drawText('LIVE', 20, 40, font, paint);
}, []);
```

**Blur region:**

```tsx
const frameProcessor = useFrameProcessor((frame) => {
  'worklet';
  const faces = detectFaces(frame);
  
  for (const face of faces) {
    frame.applyBlur(face.bounds, 20); // 20px blur radius
  }
}, []);
```

## Performance

Frame Processors run synchronously in the render pipeline.

### Timing Constraints

| FPS | Time per Frame |
|-----|----------------|
| 24 | 41ms |
| 30 | 33ms |
| 60 | 16ms |

### Optimization Tips

1. **Lower resolution** - Process at lower resolution when possible:

```tsx
const player = useVideoPlayer({
  uri: source,
  frameProcessorResolution: { width: 640, height: 360 },
});
```

2. **Skip frames** - Process every Nth frame:

```tsx
let frameCount = 0;

const frameProcessor = useFrameProcessor((frame) => {
  'worklet';
  frameCount++;
  if (frameCount % 3 !== 0) return; // Process every 3rd frame
  
  const result = heavyProcessing(frame);
}, []);
```

3. **Use native plugins** - Offload heavy work to native code

4. **Async processing** - Queue results for async handling:

```tsx
const frameProcessor = useFrameProcessor((frame) => {
  'worklet';
  const result = detectObjects(frame);
  
  // Send to JS thread asynchronously
  runOnJS(handleDetection)(result);
}, []);
```

## Complete Example

```tsx
import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { useVideoPlayer, VideoView, useFrameProcessor, runOnJS } from 'react-native-video';

function ObjectDetectionPlayer({ source }) {
  const [detectedObjects, setDetectedObjects] = useState<string[]>([]);

  const player = useVideoPlayer(source, (_player) => {
    _player.play();
  });

  const frameProcessor = useFrameProcessor((frame) => {
    'worklet';
    
    // Detect objects using native plugin
    const objects = detectObjects(frame, {
      maxResults: 5,
      minConfidence: 0.7,
    });
    
    // Extract names
    const names = objects.map(obj => obj.name);
    
    // Update React state (async)
    runOnJS(setDetectedObjects)(names);
  }, []);

  return (
    <View>
      <VideoView 
        player={player} 
        frameProcessor={frameProcessor}
        style={{ width: '100%', height: 300 }} 
      />
      
      <View style={styles.overlay}>
        <Text style={styles.title}>Detected Objects:</Text>
        {detectedObjects.map((obj, i) => (
          <Text key={i} style={styles.object}>• {obj}</Text>
        ))}
      </View>
    </View>
  );
}
```

## Platform Support

| Feature | iOS | Android |
|---------|-----|---------|
| Frame access | ✅ | ✅ |
| Native plugins | ✅ | ✅ |
| Skia drawing | ✅ | ✅ |
| GPU acceleration | ✅ | ✅ |
| Custom resolution | ✅ | ✅ |

## Disabling Frame Processors

If not using Frame Processors, disable them to reduce bundle size:

**Android (`gradle.properties`):**
```properties
ReactNativeVideo_enableFrameProcessors=false
```

**iOS (`Podfile`):**
```ruby
$RNVideoEnableFrameProcessors = false
```

**Expo (`app.json`):**
```json
{
  "plugins": [
    ["react-native-video", {
      "enableFrameProcessors": false
    }]
  ]
}
```

## See Also

- [VisionCamera Frame Processors](https://react-native-vision-camera.com/docs/guides/frame-processors) - Similar API for camera frames
- [Playback](./playback.md) - Video playback controls
- [Events](../events/useEvent.md) - Event handling

