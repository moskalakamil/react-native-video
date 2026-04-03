import {useEffect, useMemo, useState} from 'react';
import {useSharedValue} from 'react-native-reanimated';
import type {VideoPlayerStatus, TextTrack} from 'react-native-video';
import type {VideoPlayer} from 'react-native-video';
import type {PlayerState} from '../../types';

export function usePlayerState(player: VideoPlayer) {
  const currentTime = useSharedValue(0);
  const seekPreviewTime = useSharedValue(-1);
  const bufferedPosition = useSharedValue(0);

  const [status, setStatus] = useState<VideoPlayerStatus>('idle');
  const [isPlaying, setIsPlaying] = useState(player.isPlaying);
  const [duration, setDuration] = useState(player.duration);
  const [volume, setVolumeState] = useState(player.volume);
  const [muted, setMutedState] = useState(player.muted);
  const [rate, setRateState] = useState(player.rate);
  const [textTracks, setTextTracks] = useState<TextTrack[]>([]);
  const [selectedTextTrack, setSelectedTextTrack] = useState<TextTrack | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPiP, setIsPiP] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);

  useEffect(() => {
    const subscriptions = [
      player.addEventListener('onStatusChange', (s) => setStatus(s)),
      player.addEventListener('onPlaybackStateChange', (data) => {
        setIsPlaying(data.isPlaying);
        setIsBuffering(data.isBuffering);
      }),
      player.addEventListener('onLoad', (data) => {
        setDuration(data.duration);
        setTextTracks(player.getAvailableTextTracks());
      }),
      player.addEventListener('onProgress', (data) => {
        currentTime.value = data.currentTime;
        bufferedPosition.value = data.bufferDuration;
      }),
      player.addEventListener('onSeek', (seekTime) => {
        currentTime.value = seekTime;
      }),
      player.addEventListener('onVolumeChange', (data) => {
        setVolumeState(data.volume);
        setMutedState(data.muted);
      }),
      player.addEventListener('onPlaybackRateChange', (r) => {
        setRateState(r);
      }),
      player.addEventListener('onTrackChange', (track) => {
        setSelectedTextTrack(track);
      }),
      player.addEventListener('onBuffer', (buffering) => {
        setIsBuffering(buffering);
      }),
    ];

    return () => {
      subscriptions.forEach((sub) => sub.remove());
    };
  }, [player, currentTime, bufferedPosition]);

  const state: PlayerState = useMemo(
    () => ({
      status, isPlaying, currentTime, seekPreviewTime, duration, bufferedPosition,
      volume, muted, rate, textTracks, selectedTextTrack,
      isFullscreen, isPiP, isBuffering,
    }),
    [status, isPlaying, currentTime, seekPreviewTime, duration, bufferedPosition, volume, muted, rate, textTracks, selectedTextTrack, isFullscreen, isPiP, isBuffering],
  );

  return {state, setIsFullscreen, setIsPiP};
}
