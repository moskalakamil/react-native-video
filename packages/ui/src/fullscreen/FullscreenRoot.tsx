// import {useRef, useState, useCallback, useMemo, type ReactNode} from 'react';
// import {StyleSheet} from 'react-native';
// import {callback} from 'react-native-nitro-modules';
// import {FullscreenContext} from './FullscreenContext';
// import {usePlayerContext} from '../player/PlayerContext';

// interface FullscreenRootProps {
//   children: ReactNode;
// }

// export function FullscreenRoot({children}: FullscreenRootProps) {
//   const hostRef = useRef<FullscreenHostViewMethods>(null);
//   const [isFullscreen, setIsFullscreen] = useState(false);
//   const {meta} = usePlayerContext();

//   const enterFullscreen = useCallback(() => {
//     hostRef.current?.enterFullscreen();
//   }, []);

//   const exitFullscreen = useCallback(() => {
//     hostRef.current?.exitFullscreen();
//   }, []);

//   const toggleFullscreen = useCallback(() => {
//     if (isFullscreen) {
//       exitFullscreen();
//     } else {
//       enterFullscreen();
//     }
//   }, [isFullscreen, enterFullscreen, exitFullscreen]);

//   const handleFullscreenChange = useCallback(
//     (fs: boolean) => {
//       setIsFullscreen(fs);
//       meta._setIsFullscreen(fs);
//     },
//     [meta],
//   );

//   const contextValue = useMemo(
//     () => ({
//       isCustomFullscreen: isFullscreen,
//       enterFullscreen,
//       exitFullscreen,
//       toggleFullscreen,
//     }),
//     [isFullscreen, enterFullscreen, exitFullscreen, toggleFullscreen],
//   );

//   return (
//     <FullscreenContext value={contextValue}>
//       <NativeFullscreenHostView
//         style={styles.host}
//         hybridRef={callback((ref: FullscreenHostViewMethods) => {
//           hostRef.current = ref;
//         })}
//         onFullscreenChange={callback(handleFullscreenChange)}>
//         {children}
//       </NativeFullscreenHostView>
//     </FullscreenContext>
//   );
// }

// const styles = StyleSheet.create({
//   host: {flex: 1},
// });
