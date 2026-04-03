import {createContext, use} from 'react';
import type {ChaptersContextValue} from '../types';

export const ChaptersContext = createContext<ChaptersContextValue | null>(null);

export function useChapters(): ChaptersContextValue {
  const context = use(ChaptersContext);
  if (!context) {
    throw new Error('useChapters must be used within a <ChaptersProvider>.');
  }
  return context;
}

export function useChaptersOptional(): ChaptersContextValue | null {
  return use(ChaptersContext);
}
