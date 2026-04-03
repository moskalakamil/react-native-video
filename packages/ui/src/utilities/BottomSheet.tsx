import {type ReactNode, useCallback, useRef, useState, useMemo, useEffect, createContext, use} from 'react';
import {Pressable, View, StyleSheet, type ViewStyle} from 'react-native';

// Lazy import — @gorhom/bottom-sheet is an optional peer dependency
let GorhomBottomSheet: typeof import('@gorhom/bottom-sheet').default | null = null;
let BottomSheetView: typeof import('@gorhom/bottom-sheet').BottomSheetView | null = null;

try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const mod = require('@gorhom/bottom-sheet');
  GorhomBottomSheet = mod.default;
  BottomSheetView = mod.BottomSheetView;
} catch {
  // @gorhom/bottom-sheet not installed — BottomSheet components will throw at runtime
}

interface BottomSheetContextValue {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  setContent: (node: ReactNode) => void;
}

const BottomSheetContext = createContext<BottomSheetContextValue | null>(null);

function useBottomSheetCtx(): BottomSheetContextValue {
  const ctx = use(BottomSheetContext);
  if (!ctx) throw new Error('BottomSheet sub-components must be inside BottomSheet.Root');
  return ctx;
}

function BottomSheetRoot({children, snapPoints = ['25%', '50%']}: {children: ReactNode; snapPoints?: (string | number)[]}) {
  if (!GorhomBottomSheet || !BottomSheetView) {
    throw new Error(
      'BottomSheet requires @gorhom/bottom-sheet to be installed. ' +
      'Run: bun add @gorhom/bottom-sheet',
    );
  }

  const [isOpen, setIsOpen] = useState(false);
  const [sheetContent, setSheetContent] = useState<ReactNode>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sheetRef = useRef<any>(null);

  const open = useCallback(() => {
    setIsOpen(true);
    requestAnimationFrame(() => sheetRef.current?.expand());
  }, []);

  const close = useCallback(() => {
    sheetRef.current?.close();
    setIsOpen(false);
  }, []);

  const contextValue = useMemo(
    () => ({isOpen, open, close, setContent: setSheetContent}),
    [isOpen, open, close],
  );

  const SheetComponent = GorhomBottomSheet;
  const SheetView = BottomSheetView;

  return (
    <BottomSheetContext value={contextValue}>
      {children}
      {isOpen && (
        <SheetComponent
          ref={sheetRef}
          snapPoints={snapPoints}
          enablePanDownToClose
          onClose={() => setIsOpen(false)}>
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          <SheetView>{sheetContent as any}</SheetView>
        </SheetComponent>
      )}
    </BottomSheetContext>
  );
}

function BottomSheetTrigger({render, children}: {render?: ReactNode; children?: ReactNode}) {
  const {open} = useBottomSheetCtx();
  return <Pressable onPress={open}>{render ?? children}</Pressable>;
}

function BottomSheetContent({children, style}: {children?: ReactNode; style?: ViewStyle}) {
  const {setContent} = useBottomSheetCtx();

  useEffect(() => {
    setContent(<View style={style}>{children}</View>);
    return () => setContent(null);
  }, [children, style, setContent]);

  return null;
}

function BottomSheetHandle({style}: {style?: ViewStyle}) {
  return <View style={[bottomSheetStyles.handle, style]} />;
}

export const BottomSheet = {
  Root: BottomSheetRoot,
  Trigger: BottomSheetTrigger,
  Content: BottomSheetContent,
  Handle: BottomSheetHandle,
};

const bottomSheetStyles = StyleSheet.create({
  handle: {width: 40, height: 4, borderRadius: 2, backgroundColor: 'rgba(255, 255, 255, 0.3)', alignSelf: 'center', marginVertical: 8},
});
