import {createContext, use} from 'react';
import type {FullscreenContextValue} from '../types';

export const FullscreenContext = createContext<FullscreenContextValue | null>(
  null,
);

export function useFullscreen(): FullscreenContextValue | null {
  return use(FullscreenContext);
}
