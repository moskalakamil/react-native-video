import Foundation
import MediaPlayer

class NowPlayingInfoCenterManager {
  static let shared = NowPlayingInfoCenterManager()

  private let SEEK_INTERVAL_SECONDS: Double = 10

  private weak var currentPlayer: AVPlayer?
  private var players = NSHashTable<AVPlayer>.weakObjects()

  private var observers: [Int: NSKeyValueObservation] = [:]
  private var playbackObserver: Any?
  private var pausedUpdateTimer: Timer?

  private var playTarget: Any?
  private var pauseTarget: Any?
  private var skipForwardTarget: Any?
  private var skipBackwardTarget: Any?
  private var playbackPositionTarget: Any?
  private var seekTarget: Any?
  private var togglePlayPauseTarget: Any?

  private let remoteCommandCenter = MPRemoteCommandCenter.shared()

  var receivingRemoteControlEvents = false {
    didSet {
      if receivingRemoteControlEvents {
        DispatchQueue.main.async {
          VideoManager.shared.setRemoteControlEventsActive(true)
          UIApplication.shared.beginReceivingRemoteControlEvents()
        }
      } else {
        DispatchQueue.main.async {
          UIApplication.shared.endReceivingRemoteControlEvents()
          VideoManager.shared.setRemoteControlEventsActive(false)
        }
      }
    }
  }

  deinit {
    cleanup()
  }

  func registerPlayer(player: AVPlayer) {
    if players.contains(player) {
      return
    }

    if receivingRemoteControlEvents == false {
      receivingRemoteControlEvents = true
    }

    if let oldObserver = observers[player.hashValue] {
      oldObserver.invalidate()
    }

    observers[player.hashValue] = observePlayers(player: player)
    players.add(player)

    if currentPlayer == nil {
      setCurrentPlayer(player: player)
    }
  }

  func removePlayer(player: AVPlayer) {
    if !players.contains(player) {
      return
    }

    if let observer = observers[player.hashValue] {
      observer.invalidate()
    }

    observers.removeValue(forKey: player.hashValue)
    players.remove(player)

    if currentPlayer == player {
      stopPausedUpdateTimer()
      currentPlayer = nil
      updateNowPlayingInfo()
    }

    if players.allObjects.isEmpty {
      cleanup()
    }
  }

  public func cleanup() {
    observers.removeAll()
    players.removeAllObjects()

    if let playbackObserver {
      currentPlayer?.removeTimeObserver(playbackObserver)
    }

    stopPausedUpdateTimer()
    invalidateCommandTargets()

    MPNowPlayingInfoCenter.default().nowPlayingInfo = [:]
    receivingRemoteControlEvents = false
  }

  private func setCurrentPlayer(player: AVPlayer) {
    if player == currentPlayer {
      return
    }

    if let playbackObserver {
      currentPlayer?.removeTimeObserver(playbackObserver)
    }

    // Stop paused timer when switching players
    stopPausedUpdateTimer()

    currentPlayer = player
    registerCommandTargets()

    // Only update NowPlaying info if player has a current item
    // This prevents clearing NowPlaying info when player is registered before source is set
    if player.currentItem != nil {
      updateNowPlayingInfo()
    }

    playbackObserver = player.addPeriodicTimeObserver(
      forInterval: CMTime(value: 1, timescale: 4),
      queue: .main,  // CRITICAL: Use main queue for Now Playing updates
      using: { [weak self] _ in
        self?.updateNowPlayingInfo()
      }
    )

    // If player is already paused, start the paused update timer
    if player.rate == 0 {
      startPausedUpdateTimer()
    }
  }

  private func registerCommandTargets() {
    invalidateCommandTargets()

    // CRITICAL: Enable commands - without this iOS won't recognize us as Now Playing app
    remoteCommandCenter.playCommand.isEnabled = true
    remoteCommandCenter.pauseCommand.isEnabled = true
    remoteCommandCenter.skipBackwardCommand.isEnabled = true
    remoteCommandCenter.skipForwardCommand.isEnabled = true
    remoteCommandCenter.changePlaybackPositionCommand.isEnabled = true
    remoteCommandCenter.togglePlayPauseCommand.isEnabled = true

    // Set skip intervals for skip commands
    remoteCommandCenter.skipBackwardCommand.preferredIntervals = [NSNumber(value: SEEK_INTERVAL_SECONDS)]
    remoteCommandCenter.skipForwardCommand.preferredIntervals = [NSNumber(value: SEEK_INTERVAL_SECONDS)]

    playTarget = remoteCommandCenter.playCommand.addTarget { [weak self] _ in
      guard let self, let player = self.currentPlayer else {
        return .commandFailed
      }

      if player.rate == 0 {
        player.play()
      }

      return .success
    }

    pauseTarget = remoteCommandCenter.pauseCommand.addTarget { [weak self] _ in
      guard let self, let player = self.currentPlayer else {
        return .commandFailed
      }

      if player.rate != 0 {
        player.pause()
      }

      return .success
    }

    skipBackwardTarget = remoteCommandCenter.skipBackwardCommand.addTarget {
      [weak self] _ in
      guard let self, let player = self.currentPlayer else {
        return .commandFailed
      }
      let newTime =
        player.currentTime()
        - CMTime(seconds: self.SEEK_INTERVAL_SECONDS, preferredTimescale: .max)
      player.seek(to: newTime)
      return .success
    }

    skipForwardTarget = remoteCommandCenter.skipForwardCommand.addTarget {
      [weak self] _ in
      guard let self, let player = self.currentPlayer else {
        return .commandFailed
      }

      let newTime =
        player.currentTime()
        + CMTime(seconds: self.SEEK_INTERVAL_SECONDS, preferredTimescale: .max)
      player.seek(to: newTime)
      return .success
    }

    playbackPositionTarget = remoteCommandCenter.changePlaybackPositionCommand
      .addTarget { [weak self] event in
        guard let self, let player = self.currentPlayer else {
          return .commandFailed
        }
        if let event = event as? MPChangePlaybackPositionCommandEvent {
          player.seek(
            to: CMTime(seconds: event.positionTime, preferredTimescale: .max)
          )
          return .success
        }
        return .commandFailed
      }

    // Handler for togglePlayPauseCommand, sent by Apple's Earpods wired headphones
    togglePlayPauseTarget = remoteCommandCenter.togglePlayPauseCommand.addTarget
    { [weak self] _ in
      guard let self, let player = self.currentPlayer else {
        return .commandFailed
      }

      if player.rate == 0 {
        player.play()
      } else {
        player.pause()
      }

      return .success
    }

    print("[NowPlaying] DEBUG: Remote commands registered and enabled")
  }

  private func invalidateCommandTargets() {
    remoteCommandCenter.playCommand.removeTarget(playTarget)
    remoteCommandCenter.pauseCommand.removeTarget(pauseTarget)
    remoteCommandCenter.skipForwardCommand.removeTarget(skipForwardTarget)
    remoteCommandCenter.skipBackwardCommand.removeTarget(skipBackwardTarget)
    remoteCommandCenter.changePlaybackPositionCommand.removeTarget(
      playbackPositionTarget
    )
    remoteCommandCenter.togglePlayPauseCommand.removeTarget(
      togglePlayPauseTarget
    )

    // Disable commands when not in use
    remoteCommandCenter.playCommand.isEnabled = false
    remoteCommandCenter.pauseCommand.isEnabled = false
    remoteCommandCenter.skipBackwardCommand.isEnabled = false
    remoteCommandCenter.skipForwardCommand.isEnabled = false
    remoteCommandCenter.changePlaybackPositionCommand.isEnabled = false
    remoteCommandCenter.togglePlayPauseCommand.isEnabled = false

    print("[NowPlaying] DEBUG: Remote commands invalidated and disabled")
  }

  public func updateNowPlayingInfo() {
    guard let player = currentPlayer, let currentItem = player.currentItem
    else {
      print("[NowPlaying] DEBUG: No player or currentItem - clearing NowPlaying info")
      invalidateCommandTargets()
      DispatchQueue.main.async {
        MPNowPlayingInfoCenter.default().nowPlayingInfo = [:]
      }
      return
    }

    print("[NowPlaying] DEBUG: Updating NowPlaying - rate: \(player.rate)")

    // commonMetadata is metadata from asset, externalMetadata is custom metadata set by user
    // externalMetadata should override commonMetadata to allow override metadata from source
    // When the metadata has the tag "iTunSMPB" or "iTunNORM" then the metadata is not converted correctly and comes [nil, nil, ...]
    // This leads to a crash of the app
    let metadata: [AVMetadataItem] = {

      let common = processMetadataItems(currentItem.asset.commonMetadata)
      let external = processMetadataItems(currentItem.externalMetadata)

      return Array(common.merging(external) { _, new in new }.values)
    }()

    let titleItem =
      AVMetadataItem.metadataItems(
        from: metadata,
        filteredByIdentifier: .commonIdentifierTitle
      ).first?.stringValue ?? ""

    let artistItem =
      AVMetadataItem.metadataItems(
        from: metadata,
        filteredByIdentifier: .commonIdentifierArtist
      ).first?.stringValue ?? ""

    print("[NowPlaying] DEBUG: Metadata - title: '\(titleItem)', artist: '\(artistItem)', metadata count: \(metadata.count)")

    // Create artwork only if image data exists
    let artworkItem: MPMediaItemArtwork? = {
      let artworkMetadata = AVMetadataItem.metadataItems(
        from: metadata,
        filteredByIdentifier: .commonIdentifierArtwork
      )

      guard let imgData = artworkMetadata.first?.dataValue,
        let image = UIImage(data: imgData),
        image.size.width > 0 && image.size.height > 0
      else {
        return nil
      }

      return MPMediaItemArtwork(boundsSize: image.size) { _ in image }
    }()

    // CRITICAL: Always set ElapsedPlaybackTime explicitly, especially when rate=0
    // iOS resets elapsed time when rate=0 if not explicitly set
    let currentTime = currentItem.currentTime().seconds
    let duration = currentItem.duration.seconds

    var newNowPlayingInfo: [String: Any] = [
      MPMediaItemPropertyTitle: titleItem,
      MPMediaItemPropertyArtist: artistItem,
      MPMediaItemPropertyPlaybackDuration: duration,
      MPNowPlayingInfoPropertyElapsedPlaybackTime: currentTime.isFinite ? currentTime : 0,
      MPNowPlayingInfoPropertyPlaybackRate: player.rate,
      MPNowPlayingInfoPropertyDefaultPlaybackRate: 1.0, // iOS needs this to know normal playback rate
      MPNowPlayingInfoPropertyIsLiveStream: CMTIME_IS_INDEFINITE(
        currentItem.asset.duration
      ),
      MPNowPlayingInfoPropertyMediaType: MPNowPlayingInfoMediaType.video.rawValue, // CRITICAL: Tell iOS this is video
    ]

    // Only add artwork if it exists
    if let artworkItem = artworkItem {
      newNowPlayingInfo[MPMediaItemPropertyArtwork] = artworkItem
    }
    print("[NowPlaying] DEBUG: Setting NowPlaying with \(newNowPlayingInfo.count) keys")
    print("[NowPlaying] DEBUG: Has artwork: \(newNowPlayingInfo[MPMediaItemPropertyArtwork] != nil)")
    print("[NowPlaying] DEBUG: Playback rate: \(player.rate)")

    // CRITICAL: Always update on main thread
    if Thread.isMainThread {
      // CRITICAL: Don't merge - replace completely to ensure iOS updates the display
      // Merging can cause iOS to not refresh the UI when paused
      MPNowPlayingInfoCenter.default().nowPlayingInfo = newNowPlayingInfo
      print("[NowPlaying] DEBUG: Final NowPlaying has \(MPNowPlayingInfoCenter.default().nowPlayingInfo?.count ?? 0) keys")
    } else {
      DispatchQueue.main.async {
        MPNowPlayingInfoCenter.default().nowPlayingInfo = newNowPlayingInfo
        print("[NowPlaying] DEBUG: Final NowPlaying has \(MPNowPlayingInfoCenter.default().nowPlayingInfo?.count ?? 0) keys (async)")
      }
    }
  }

  private func findNewCurrentPlayer() {
    if let newPlayer = players.allObjects.first(where: {
      $0.rate != 0
    }) {
      setCurrentPlayer(player: newPlayer)
    }
  }

  // We will observe players rate to find last active player that info will be displayed
  private func observePlayers(player: AVPlayer) -> NSKeyValueObservation {
    return player.observe(\.rate) { [weak self] player, change in
      guard let self else { return }

      let rate = change.newValue

      // case where there is new player that is not paused
      // In this case event is triggered by non currentPlayer
      if rate != 0 && self.currentPlayer != player {
        self.setCurrentPlayer(player: player)
        return
      }

      // case where currentPlayer was paused
      // In this case event is triggered by currentPlayer
      if rate == 0 && self.currentPlayer == player {
        print("[NowPlaying] DEBUG: Player paused - finding new current player")
        self.findNewCurrentPlayer()
        print("[NowPlaying] DEBUG: After findNewCurrentPlayer, currentPlayer is: \(self.currentPlayer != nil ? "set" : "nil")")
        // Always update NowPlaying info after pause to ensure metadata stays visible
        self.updateNowPlayingInfo()
        // Start timer to keep updating NowPlaying while paused
        self.startPausedUpdateTimer()
        return
      }

      // case where currentPlayer resumed playing
      // CRITICAL: Update NowPlaying when resuming to refresh playbackRate
      if rate != 0 && self.currentPlayer == player {
        print("[NowPlaying] DEBUG: Player resumed - updating NowPlaying")
        // Stop the paused timer since periodic observer will handle updates
        self.stopPausedUpdateTimer()
        self.updateNowPlayingInfo()
      }
    }
  }

  private func processMetadataItems(_ items: [AVMetadataItem]) -> [String:
    AVMetadataItem]
  {
    var result = [String: AVMetadataItem]()

    for item in items {
      if let id = item.identifier?.rawValue, !id.isEmpty, result[id] == nil {
        result[id] = item
      }
    }

    return result
  }

  // MARK: - Paused State Timer

  /// Starts a timer to update NowPlaying info while paused
  /// This ensures iOS keeps the notification visible even when playback is paused
  private func startPausedUpdateTimer() {
    stopPausedUpdateTimer()

    print("[NowPlaying] DEBUG: Starting paused update timer")
    // CRITICAL: Schedule on main thread for Now Playing updates
    DispatchQueue.main.async { [weak self] in
      guard let self = self else { return }
      // Update every 5 seconds to keep notification alive
      self.pausedUpdateTimer = Timer.scheduledTimer(
        withTimeInterval: 5.0,
        repeats: true
      ) { [weak self] _ in
        self?.updateNowPlayingInfo()
      }
    }
  }

  private func stopPausedUpdateTimer() {
    DispatchQueue.main.async { [weak self] in
      guard let self = self else { return }
      if self.pausedUpdateTimer != nil {
        print("[NowPlaying] DEBUG: Stopping paused update timer")
      }
      self.pausedUpdateTimer?.invalidate()
      self.pausedUpdateTimer = nil
    }
  }
}
