import {ControlsRoot} from './ControlsRoot';
import {
  ControlsTop,
  ControlsCenter,
  ControlsBottom,
  ControlsLeft,
  ControlsRight,
} from './ControlsLayout';
import {ControlsPopup} from './ControlsPopup';
export type {PopupContextValue, PopupRootProps, PopupTriggerProps, PopupContentProps} from './ControlsPopup';

export const Controls = {
  Root: ControlsRoot,
  Top: ControlsTop,
  Center: ControlsCenter,
  Bottom: ControlsBottom,
  Left: ControlsLeft,
  Right: ControlsRight,
  Popup: ControlsPopup,
};
