import {type ReactNode} from 'react';
import {View, StyleSheet, Pressable, type ViewStyle} from 'react-native';
import Animated, {useSharedValue, useAnimatedStyle, withTiming} from 'react-native-reanimated';
import {useFullscreen} from '../fullscreen/FullscreenContext';
import {Controls} from '../controls';
import {PlayButton} from '../playback/PlayButton';
import {SeekButton} from '../playback/SeekButton';
import {MuteButton} from '../volume/MuteButton';
import {VolumeSlider} from '../volume/VolumeSlider';
import {TimeSlider} from '../time/TimeSlider';
import {Time} from '../time/Time';
import {FullscreenButton} from '../fullscreen/FullscreenButton';
import {PiPButton} from '../pip/PiPButton';
import {SpeedMenu} from '../speed/SpeedMenu';
import {ChaptersProvider} from '../chapters/ChaptersProvider';
import {ChapterTitle} from '../chapters/ChapterTitle';
import type {Chapter} from '../types';
import {GlassSurface} from './GlassSurface';
import {useGlassHighlight} from './GlassSurface';
import {
  PlayIcon,
  PauseIcon,
  SeekForwardIcon,
  SeekBackwardIcon,
  MuteOffIcon,
  MuteOnIcon,
  FullscreenEnterIcon,
  FullscreenExitIcon,
  SettingsIcon,
  PiPIcon,
} from './icons';

const SEEK_TIME = 10;

/** Pressable that highlights the parent GlassSurface on press */
function HighlightPressable({onPress, style, children}: {
  onPress?: () => void;
  style?: ViewStyle;
  children: ReactNode;
}) {
  const highlight = useGlassHighlight();
  return (
    <Pressable
      onPress={onPress}
      onPressIn={() => { if (highlight) highlight.value = true; }}
      onPressOut={() => { if (highlight) highlight.value = false; }}
      style={style}
    >
      {children}
    </Pressable>
  );
}

interface DefaultSkinProps {
  children: ReactNode;
  style?: ViewStyle;
  chapters?: Chapter[];
  onChapterChange?: (chapter: Chapter | null) => void;
}

export function DefaultSkin({children, style, chapters, onChapterChange}: DefaultSkinProps) {
  const fullscreen = useFullscreen();
  const isFS = fullscreen?.isCustomFullscreen ?? false;
  const seekDragging = useSharedValue(false);

  const bottomBarAnimStyle = useAnimatedStyle(() => ({
    transform: [{scale: withTiming(seekDragging.value ? 1.02 : 1, {duration: 200})}],
  }));

  const content = (
    <View style={[styles.container, isFS && styles.containerFullscreen, style]}>
      {children}

      <Controls.Root style={styles.controlsRoot}>
        {/* ===== TOP BAR ===== */}
        <Controls.Top>
          <Controls.Left>
            {isFS ? (
              <>
                <GlassSurface style={styles.controlPill} animated>
                  <FullscreenButton
                    render={({onPress}, {isFullscreen}) => (
                      <HighlightPressable onPress={onPress} style={styles.iconButton}>
                        {isFullscreen ? (
                          <FullscreenExitIcon size={18} color="rgba(255,255,255,0.8)" />
                        ) : (
                          <FullscreenEnterIcon size={18} color="rgba(255,255,255,0.8)" />
                        )}
                      </HighlightPressable>
                    )}
                  />
                </GlassSurface>
                <GlassSurface style={styles.controlPill} animated>
                  <PiPButton
                    render={({onPress}) => (
                      <HighlightPressable onPress={onPress} style={styles.iconButton}>
                        <PiPIcon size={18} color="rgba(255,255,255,0.8)" />
                      </HighlightPressable>
                    )}
                  />
                </GlassSurface>
              </>
            ) : (
              <GlassSurface style={styles.controlPill} animated>
                <FullscreenButton
                  render={({onPress}, {isFullscreen}) => (
                    <HighlightPressable onPress={onPress} style={styles.iconButton}>
                      {isFullscreen ? (
                        <FullscreenExitIcon size={18} color="rgba(255,255,255,0.8)" />
                      ) : (
                        <FullscreenEnterIcon size={18} color="rgba(255,255,255,0.8)" />
                      )}
                    </HighlightPressable>
                  )}
                />
                <PiPButton
                  render={({onPress}) => (
                    <HighlightPressable onPress={onPress} style={styles.iconButton}>
                      <PiPIcon size={18} color="rgba(255,255,255,0.8)" />
                    </HighlightPressable>
                  )}
                />
              </GlassSurface>
            )}
          </Controls.Left>

          <Controls.Right>
            <GlassSurface style={styles.controlPill} animated>
              <MuteButton
                render={({onPress}, {muted}) => (
                  <HighlightPressable onPress={onPress} style={styles.iconButton}>
                    {muted ? (
                      <MuteOnIcon size={18} color="rgba(255,255,255,0.8)" />
                    ) : (
                      <MuteOffIcon size={18} color="rgba(255,255,255,0.8)" />
                    )}
                  </HighlightPressable>
                )}
              />
              <VolumeSlider.Root style={styles.volumeSlider}>
                <VolumeSlider.Track style={styles.volumeTrack}>
                  <VolumeSlider.Fill style={styles.volumeFill} />
                </VolumeSlider.Track>
              </VolumeSlider.Root>
            </GlassSurface>
          </Controls.Right>
        </Controls.Top>

        {/* ===== CENTER BAR ===== */}
        <Controls.Center style={styles.center}>
          <SeekButton
            seconds={-SEEK_TIME}
            render={({onPress}) => (
              <GlassSurface style={styles.seekButtonGlass} pressable onPress={onPress}>
                <SeekBackwardIcon size={22} color="rgba(255,255,255,0.9)" />
              </GlassSurface>
            )}
          />

          <PlayButton
            render={({onPress}, {isPlaying}) => (
              <GlassSurface style={styles.playButtonGlass} pressable onPress={onPress}>
                {isPlaying ? (
                  <PauseIcon size={32} color="#fff" />
                ) : (
                  <PlayIcon size={32} color="#fff" style={{marginLeft: -5}}/>
                )}
              </GlassSurface>
            )}
          />

          <SeekButton
            seconds={SEEK_TIME}
            render={({onPress}) => (
              <GlassSurface style={styles.seekButtonGlass} pressable onPress={onPress}>
                  <SeekForwardIcon size={22} color="rgba(255,255,255,0.9)" />
              </GlassSurface>
            )}
          />
        </Controls.Center>

        {/* ===== BOTTOM BAR ===== */}
        <Controls.Bottom>
          {chapters && chapters.length > 0 && (
            <ChapterTitle style={styles.chapterTitle} />
          )}

          <Controls.Popup.Root>
            <Animated.View style={[styles.bottomBarWrapper, bottomBarAnimStyle]}>
            <GlassSurface style={styles.bottomBar} contentStyle={styles.bottomBarContent}>
              <Time.Value type="current" style={styles.timeText} />

              <TimeSlider.Root style={styles.slider} isDragging={seekDragging}>
                <TimeSlider.Track style={styles.sliderTrack}>
                  <TimeSlider.Buffer style={styles.sliderBuffer} />
                  <TimeSlider.Fill style={styles.sliderFill} />
                  <TimeSlider.ChapterMarkers />
                </TimeSlider.Track>
              </TimeSlider.Root>

              <Time.Value type="duration" style={styles.timeText} />

              <Controls.Popup.Trigger>
                <View style={styles.iconButton}>
                  <SettingsIcon size={16} color="rgba(255,255,255,0.8)" />
                </View>
              </Controls.Popup.Trigger>
            </GlassSurface>
            </Animated.View>

            <Controls.Popup.Content style={styles.speedMenuContent}>
              <GlassSurface style={styles.speedMenuGlass} contentStyle={styles.speedMenuInner}>
                <SpeedMenu />
              </GlassSurface>
            </Controls.Popup.Content>
          </Controls.Popup.Root>
        </Controls.Bottom>
      </Controls.Root>
    </View>
  );

  if (chapters && chapters.length > 0) {
    return (
      <ChaptersProvider chapters={chapters} onChapterChange={onChapterChange}>
        {content}
      </ChaptersProvider>
    );
  }

  return content;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    overflow: 'hidden',
    borderRadius: 12,
  },
  containerFullscreen: {
    flex: 1,
    justifyContent: 'center',
    borderRadius: 0,
    backgroundColor: 'transparent',
  },
  controlsRoot: {
    justifyContent: 'space-between',
  },

  // Control wrapper
  controlPill: {
    borderRadius: 12,
  },

  // Center
  center: {
    gap: 20,
  },
  playButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButtonGlass: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  seekButtonGlass: {
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Volume
  volumeSlider: {
    width: 80,
    height: 28,
  },
  volumeTrack: {
    height: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 1.5,
  },
  volumeFill: {
    backgroundColor: '#fff',
  },

  // Bottom
  chapterTitle: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 13,
    fontWeight: '600',
    marginHorizontal: 16,
    marginBottom: 6,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: {width: 0, height: 1},
    textShadowRadius: 2,
  },
  bottomBarWrapper: {
    transformOrigin: 'bottom center',
  },
  bottomBar: {
    marginHorizontal: 12,
    marginBottom: 12,
    borderRadius: 16,
  },
  bottomBarContent: {
    gap: 8,
  },
  slider: {
    flex: 1,
    height: 28,
  },
  sliderTrack: {
    height: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 1.5,
  },
  sliderBuffer: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  sliderFill: {
    backgroundColor: '#fff',
  },
  timeText: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.7)',
    fontVariant: ['tabular-nums'],
  },
  iconButton: {
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  speedMenuContent: {
    width: 80,
  },
  speedMenuGlass: {
    borderRadius: 12,
  },
  speedMenuInner: {
    flexDirection: 'column',
    padding: 2,
  },
});
