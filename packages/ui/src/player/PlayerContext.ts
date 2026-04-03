import { createContext, use } from 'react';
import type { PlayerContextValue } from '../types';

export const PlayerContext = createContext<PlayerContextValue | null>(null);

export function usePlayerContext(): PlayerContextValue {
  const context = use(PlayerContext);
  if (!context) {
    throw new Error(
      'usePlayerContext must be used within a <PlayerProvider>. ' +
        'Wrap your UI components with <PlayerProvider player={player}>.'
    );
  }
  return context;
}
