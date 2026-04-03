import type { SharedValue } from 'react-native-reanimated';
import type {
  VideoPlayer,
  VideoPlayerStatus,
  TextTrack,
} from 'react-native-video';
import type { RefObject } from 'react';
import type { VideoViewRef } from 'react-native-video';

export interface PlayerState {
  status: VideoPlayerStatus;
  isPlaying: boolean;
  currentTime: SharedValue<number>;
  /** Time preview during seek drag. -1 when not previewing. */
  seekPreviewTime: SharedValue<number>;
  duration: number;
  bufferedPosition: SharedValue<number>;
  volume: number;
  muted: boolean;
  rate: number;
  textTracks: TextTrack[];
  selectedTextTrack: TextTrack | null;
  isFullscreen: boolean;
  isPiP: boolean;
  isBuffering: boolean;
}

export interface PlayerActions {
  play: () => void;
  pause: () => void;
  togglePlayback: () => void;
  seekTo: (time: number) => void;
  seekBy: (offset: number) => void;
  setVolume: (volume: number) => void;
  toggleMuted: () => void;
  setRate: (rate: number) => void;
  selectTextTrack: (track: TextTrack | null) => void;
  enterFullscreen: () => void;
  exitFullscreen: () => void;
  enterPiP: () => void;
  exitPiP: () => void;
}

export interface PlayerMeta {
  player: VideoPlayer;
  videoRef: RefObject<VideoViewRef | null>;
  _setIsFullscreen: (value: boolean) => void;
  _setIsPiP: (value: boolean) => void;
}

export interface PlayerContextValue {
  state: PlayerState;
  actions: PlayerActions;
  meta: PlayerMeta;
}

export interface Chapter {
  title: string;
  startTime: number;
  endTime: number;
}

export interface ChaptersContextValue {
  chapters: Chapter[];
  currentChapter: Chapter | null;
  goToChapter: (chapter: Chapter) => void;
}

export interface FullscreenContextValue {
  isCustomFullscreen: boolean;
  enterFullscreen: () => void;
  exitFullscreen: () => void;
  toggleFullscreen: () => void;
}

export type VolumeLevel = 'off' | 'low' | 'high';
