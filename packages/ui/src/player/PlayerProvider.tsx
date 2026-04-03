import {type ReactNode, useMemo, useRef} from 'react';
import {VideoPlayer} from 'react-native-video';
import type {VideoViewRef} from 'react-native-video';
import {PlayerContext} from './PlayerContext';
import {usePlayerState} from './hooks/usePlayerState';
import {usePlayerActions} from './hooks/usePlayerActions';
import type {PlayerMeta} from '../types';

interface PlayerProviderProps {
  player: VideoPlayer;
  children: ReactNode;
}

export function PlayerProvider({player, children}: PlayerProviderProps) {
  const videoRef = useRef<VideoViewRef>(null);
  const {state, setIsFullscreen, setIsPiP} = usePlayerState(player);
  const actions = usePlayerActions(player, videoRef);

  const meta: PlayerMeta = useMemo(
    () => ({player, videoRef, _setIsFullscreen: setIsFullscreen, _setIsPiP: setIsPiP}),
    [player, setIsFullscreen, setIsPiP],
  );

  const contextValue = useMemo(
    () => ({state, actions, meta}),
    [state, actions, meta],
  );

  return (
    <PlayerContext value={contextValue}>
      {children}
    </PlayerContext>
  );
}
