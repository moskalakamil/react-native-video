import {type MutableRefObject, useCallback} from 'react';
import {
  VideoView as CoreVideoView,
  type VideoViewProps as CoreVideoViewProps,
  type VideoViewRef,
} from 'react-native-video';
import {usePlayerContext} from './PlayerContext';

type VideoViewProps = Omit<
  CoreVideoViewProps,
  'player' | 'controls' | 'onFullscreenChange' | 'onPictureInPictureChange'
> & {
  ref?: React.Ref<VideoViewRef>;
};

export function VideoView({ref, ...props}: VideoViewProps) {
  const {meta} = usePlayerContext();

  const setRef = (instance: VideoViewRef | null) => {
    (meta.videoRef as MutableRefObject<VideoViewRef | null>).current =
      instance;

    if (typeof ref === 'function') {
      ref(instance);
    } else if (ref) {
      (ref as MutableRefObject<VideoViewRef | null>).current = instance;
    }
  };

  const handleFullscreenChange = useCallback(
    (fs: boolean) => {
      meta._setIsFullscreen(fs);
    },
    [meta],
  );

  const handlePiPChange = useCallback(
    (pip: boolean) => {
      meta._setIsPiP(pip);
    },
    [meta],
  );

  return (
    <CoreVideoView
      ref={setRef}
      player={meta.player}
      controls={false}
      onFullscreenChange={handleFullscreenChange}
      onPictureInPictureChange={handlePiPChange}
      {...props}
    />
  );
}
