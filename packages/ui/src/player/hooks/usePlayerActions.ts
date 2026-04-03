import {type RefObject, useCallback, useMemo} from 'react';
import type {TextTrack} from 'react-native-video';
import type {VideoPlayer} from 'react-native-video';
import type {VideoViewRef} from 'react-native-video';
import type {PlayerActions} from '../../types';

export function usePlayerActions(
  player: VideoPlayer,
  videoRef: RefObject<VideoViewRef | null>,
): PlayerActions {
  const play = useCallback(() => player.play(), [player]);
  const pause = useCallback(() => player.pause(), [player]);
  const togglePlayback = useCallback(() => {
    if (player.isPlaying) {
      player.pause();
    } else {
      player.play();
    }
  }, [player]);
  const seekTo = useCallback((time: number) => player.seekTo(time), [player]);
  const seekBy = useCallback((offset: number) => player.seekBy(offset), [player]);
  const setVolume = useCallback((v: number) => { player.volume = v; }, [player]);
  const toggleMuted = useCallback(() => { player.muted = !player.muted; }, [player]);
  const setRate = useCallback((r: number) => { player.rate = r; }, [player]);
  const selectTextTrack = useCallback(
    (track: TextTrack | null) => player.selectTextTrack(track),
    [player],
  );
  const enterFullscreen = useCallback(() => { videoRef.current?.enterFullscreen(); }, [videoRef]);
  const exitFullscreen = useCallback(() => { videoRef.current?.exitFullscreen(); }, [videoRef]);
  const enterPiP = useCallback(() => { videoRef.current?.enterPictureInPicture(); }, [videoRef]);
  const exitPiP = useCallback(() => { videoRef.current?.exitPictureInPicture(); }, [videoRef]);

  return useMemo(
    () => ({
      play, pause, togglePlayback, seekTo, seekBy,
      setVolume, toggleMuted, setRate, selectTextTrack,
      enterFullscreen, exitFullscreen, enterPiP, exitPiP,
    }),
    [play, pause, togglePlayback, seekTo, seekBy, setVolume, toggleMuted, setRate, selectTextTrack, enterFullscreen, exitFullscreen, enterPiP, exitPiP],
  );
}
