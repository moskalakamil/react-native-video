import {createContext, use} from 'react';

interface ControlsContextValue {
  lockAutoHide: () => void;
  unlockAutoHide: () => void;
  show: () => void;
  hide: () => void;
}

export const ControlsContext = createContext<ControlsContextValue | null>(null);

export function useControlsContext(): ControlsContextValue | null {
  return use(ControlsContext);
}
