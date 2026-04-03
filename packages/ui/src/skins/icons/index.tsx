import {type ReactNode} from 'react';
import {type ViewStyle} from 'react-native';
import Svg, {Path, Rect} from 'react-native-svg';

interface IconProps {
  size?: number;
  color?: string;
  style?: ViewStyle;
}

export function PlayIcon({size = 24, color = '#fff', style}: IconProps): ReactNode {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
      <Path
        d="M8 5.14v13.72a1 1 0 001.5.86l11.2-6.86a1 1 0 000-1.72L9.5 4.28a1 1 0 00-1.5.86z"
        fill={color}
      />
    </Svg>
  );
}

export function PauseIcon({size = 24, color = '#fff', style}: IconProps): ReactNode {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
      <Rect x={6} y={4} width={4} height={16} rx={1} fill={color} />
      <Rect x={14} y={4} width={4} height={16} rx={1} fill={color} />
    </Svg>
  );
}

export function SeekForwardIcon({size = 24, color = '#fff', style}: IconProps): ReactNode {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
      <Path
        d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 18a8 8 0 110-16 8 8 0 010 16z"
        fill={color}
        opacity={0.3}
      />
      <Path d="M10 8l6 4-6 4V8z" fill={color} />
    </Svg>
  );
}

export function SeekBackwardIcon({size = 24, color = '#fff', style}: IconProps): ReactNode {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
      <Path
        d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 18a8 8 0 110-16 8 8 0 010 16z"
        fill={color}
        opacity={0.3}
      />
      <Path d="M14 8l-6 4 6 4V8z" fill={color} />
    </Svg>
  );
}

export function MuteOffIcon({size = 20, color = '#fff', style}: IconProps): ReactNode {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
      <Path
        d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0014 8.14v7.72A4.49 4.49 0 0016.5 12z"
        fill={color}
      />
    </Svg>
  );
}

export function MuteOnIcon({size = 20, color = '#fff', style}: IconProps): ReactNode {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
      <Path
        d="M3 9v6h4l5 5V4L7 9H3zm13.59.55l-1.42 1.42L16.59 12l-1.42 1.42 1.42 1.41L18 13.42l1.41 1.41 1.42-1.41L19.41 12l1.42-1.42-1.42-1.41L18 10.59l-1.41-1.42z"
        fill={color}
      />
    </Svg>
  );
}

export function FullscreenEnterIcon({size = 20, color = '#fff', style}: IconProps): ReactNode {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
      <Path
        d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"
        fill={color}
      />
    </Svg>
  );
}

export function FullscreenExitIcon({size = 20, color = '#fff', style}: IconProps): ReactNode {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
      <Path
        d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"
        fill={color}
      />
    </Svg>
  );
}

export function SettingsIcon({size = 20, color = '#fff', style}: IconProps): ReactNode {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
      <Path
        d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 00.12-.61l-1.92-3.32a.49.49 0 00-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.48.48 0 00-.48-.41h-3.84a.48.48 0 00-.48.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96a.49.49 0 00-.59.22L2.74 8.87a.48.48 0 00.12.61l2.03 1.58c-.05.3-.07.62-.07.94s.02.64.07.94l-2.03 1.58a.49.49 0 00-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.26.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6A3.6 3.6 0 1115.6 12 3.61 3.61 0 0112 15.6z"
        fill={color}
      />
    </Svg>
  );
}

export function PiPIcon({size = 20, color = '#fff', style}: IconProps): ReactNode {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
      <Path
        d="M19 7h-8v6h8V7zm2-4H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h18v14z"
        fill={color}
      />
    </Svg>
  );
}
