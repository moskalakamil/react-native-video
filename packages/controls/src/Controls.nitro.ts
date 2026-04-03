import type {
  HybridView,
  HybridViewMethods,
  HybridViewProps,
} from 'react-native-nitro-modules';

export interface ControlsProps extends HybridViewProps {
  color: string;
}
export interface ControlsMethods extends HybridViewMethods {
  enterFullscreen(): void;
  exitFullscreen(): void;
}

export type Controls = HybridView<
  ControlsProps,
  ControlsMethods
>;
