import {useRef, useImperativeHandle, useCallback, useMemo, useState, createContext, use, type PropsWithChildren, type Ref} from 'react';
import {View, Modal, StyleSheet, type ViewStyle} from 'react-native';
import {getHostComponent, callback} from 'react-native-nitro-modules';
const ControlsConfig = require('../nitrogen/generated/shared/json/ControlsConfig.json');
import type {ControlsMethods, ControlsProps} from './Controls.nitro';

// Native view (internal)
const NativeControlsView = getHostComponent<ControlsProps, ControlsMethods>(
  'Controls',
  () => ControlsConfig,
);

// Context
interface ControlsContextValue {
  enterFullscreen: () => void;
  exitFullscreen: () => void;
  isFullscreen: boolean;
}

const ControlsContext = createContext<ControlsContextValue | null>(null);

export function useControls(): ControlsContextValue {
  const ctx = use(ControlsContext);
  if (!ctx) throw new Error('useControls must be used within <ControlsView>');
  return ctx;
}

// Public ref type
export interface ControlsViewRef {
  enterFullscreen: () => void;
  exitFullscreen: () => void;
}

// Public component
interface ControlsViewProps {
  style?: ViewStyle;
  ref?: Ref<ControlsViewRef>;
}

export function ControlsView({
  children,
  style,
  ref,
}: PropsWithChildren<ControlsViewProps>) {
  const nativeRef = useRef<ControlsMethods | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const enterFullscreen = useCallback(() => {
    nativeRef.current?.enterFullscreen();
    setIsFullscreen(true);
  }, []);

  const exitFullscreen = useCallback(() => {
    nativeRef.current?.exitFullscreen();
    setIsFullscreen(false);
  }, []);

  useImperativeHandle(ref, () => ({
    enterFullscreen,
    exitFullscreen,
  }), [enterFullscreen, exitFullscreen]);

  const contextValue = useMemo(
    () => ({enterFullscreen, exitFullscreen, isFullscreen}),
    [enterFullscreen, exitFullscreen, isFullscreen],
  );

  return (
    <ControlsContext value={contextValue}>
      <View style={[styles.wrapper, style]}>
        {/* Native view — handles VC presentation (StatusBar, orientation, home indicator) */}
        <NativeControlsView
          style={styles.nativeView as any}
          color="#000"
          hybridRef={callback((r: ControlsMethods) => {
            nativeRef.current = r;
          })}
        />
        {/* Inline: children overlay on top of native view */}
        {!isFullscreen && (
          <View style={styles.overlay} pointerEvents="box-none">
            {children}
          </View>
        )}
      </View>
      {/* Fullscreen: children in Modal — above everything, context preserved */}
      <Modal
        visible={isFullscreen}
        transparent
        animationType="none"
        statusBarTranslucent
        supportedOrientations={['portrait', 'landscape-left', 'landscape-right']}
      >
        <View style={styles.modalContent} pointerEvents="box-none">
          {children}
        </View>
      </Modal>
    </ControlsContext>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
  },
  nativeView: {
    ...StyleSheet.absoluteFillObject,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  modalContent: {
    flex: 1,
  },
});

export type {ControlsMethods, ControlsProps, ControlsViewProps, ControlsContextValue};
