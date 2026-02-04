import AVFoundation

/// Utility for converting CustomVideoMetadata to AVMetadataItems
enum MetadataUtils {
  /// Creates synchronous metadata items (text only, no artwork)
  /// Use this for immediate player initialization to avoid blocking on artwork download
  static func createSyncMetadataItems(from metadata: CustomVideoMetadata?) -> [AVMetadataItem] {
    guard let metadata = metadata else {
      return []
    }

    var items: [AVMetadataItem] = []

    // Title
    if let title = metadata.title, !title.isEmpty {
      items.append(createMetadataItem(
        identifier: .commonIdentifierTitle,
        value: title as NSString
      ))
    }

    // Artist
    if let artist = metadata.artist, !artist.isEmpty {
      items.append(createMetadataItem(
        identifier: .commonIdentifierArtist,
        value: artist as NSString
      ))
    }

    // Description
    if let description = metadata.description, !description.isEmpty {
      items.append(createMetadataItem(
        identifier: .commonIdentifierDescription,
        value: description as NSString
      ))
    }

    return items
  }

  /// Converts CustomVideoMetadata to an array of AVMetadataItems including artwork
  /// WARNING: This blocks on artwork download (up to 10s). Prefer createSyncMetadataItems + async artwork
  ///
  /// This creates metadata items for:
  /// - Title (commonIdentifierTitle)
  /// - Artist (commonIdentifierArtist)
  /// - Description (commonIdentifierDescription)
  /// - Artwork (downloaded asynchronously from imageUri)
  ///
  /// Note: Subtitle is not set as AVMetadataItem because there's no standard identifier.
  /// The subtitle field in CustomVideoMetadata is currently unused on iOS.
  static func createMetadataItems(from metadata: CustomVideoMetadata?) async -> [AVMetadataItem] {
    guard let metadata = metadata else {
      return []
    }

    var items = createSyncMetadataItems(from: metadata)

    // Artwork - download asynchronously
    if let imageUri = metadata.imageUri, !imageUri.isEmpty {
      if let artworkItem = await downloadArtwork(from: imageUri) {
        items.append(artworkItem)
      }
    }

    return items
  }

  // MARK: - Private Helpers

  /// Creates a basic AVMetadataItem with identifier and value
  private static func createMetadataItem(
    identifier: AVMetadataIdentifier,
    value: NSCopying & NSObjectProtocol
  ) -> AVMetadataItem {
    let item = AVMutableMetadataItem()
    item.identifier = identifier
    item.value = value
    item.extendedLanguageTag = "und" // undefined language
    return item.copy() as! AVMetadataItem
  }

  /// URLSession configured for ephemeral (memory-only) caching
  /// Cache is cleared when app restarts - no disk persistence
  private static let artworkSession: URLSession = {
    let config = URLSessionConfiguration.ephemeral
    config.urlCache = URLCache(
      memoryCapacity: 5 * 1024 * 1024,   // 5 MB memory cache (~33 artwork images)
      diskCapacity: 0                     // 0 = no disk cache
    )
    config.timeoutIntervalForRequest = 10  // 10 second timeout
    return URLSession(configuration: config)
  }()

  /// Downloads artwork image from URL and creates AVMetadataItem
  /// Returns nil if download fails or invalid URL
  /// Public to allow async artwork loading after player initialization
  static func downloadArtwork(from urlString: String) async -> AVMetadataItem? {
    guard let url = URL(string: urlString) else {
      print("[ReactNativeVideo] Invalid artwork URL: \(urlString)")
      return nil
    }

    do {
      let (data, response) = try await artworkSession.data(from: url)

      // Verify response is successful
      guard let httpResponse = response as? HTTPURLResponse,
        (200...299).contains(httpResponse.statusCode)
      else {
        print("[ReactNativeVideo] Failed to download artwork, invalid response")
        return nil
      }

      // Determine data type from response or file extension
      let dataType = determineImageDataType(from: response, url: url)

      let item = AVMutableMetadataItem()
      item.identifier = .commonIdentifierArtwork
      item.value = data as NSData
      item.dataType = dataType
      item.extendedLanguageTag = "und"

      return item.copy() as! AVMetadataItem
    } catch {
      print("[ReactNativeVideo] Failed to download artwork from \(urlString): \(error.localizedDescription)")
      return nil
    }
  }

  /// Determines the appropriate data type for image metadata
  private static func determineImageDataType(from response: URLResponse, url: URL) -> String {
    // Try to get MIME type from response
    if let mimeType = response.mimeType {
      switch mimeType.lowercased() {
      case "image/jpeg", "image/jpg":
        return kCMMetadataBaseDataType_JPEG as String
      case "image/png":
        return kCMMetadataBaseDataType_PNG as String
      default:
        break
      }
    }

    // Fallback to file extension
    let pathExtension = url.pathExtension.lowercased()
    switch pathExtension {
    case "jpg", "jpeg":
      return kCMMetadataBaseDataType_JPEG as String
    case "png":
      return kCMMetadataBaseDataType_PNG as String
    default:
      // Default to JPEG if unknown
      return kCMMetadataBaseDataType_JPEG as String
    }
  }
}
