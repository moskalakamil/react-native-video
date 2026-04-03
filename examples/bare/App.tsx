import React from 'react';
import {StyleSheet, View, Text, StatusBar} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {useVideoPlayer, VideoView} from 'react-native-video';
import {PlayerProvider, FullscreenProvider, DefaultSkin} from '@react-native-video/ui';

const VIDEO_URL =
  'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8';

const CHAPTERS = [
  {title: 'Intro', startTime: 0, endTime: 30},
  {title: 'The Butterfly', startTime: 30, endTime: 120},
  {title: 'Frank the Bully', startTime: 120, endTime: 300},
  {title: 'The Chase', startTime: 300, endTime: 500},
  {title: 'Finale', startTime: 500, endTime: 596},
];

function Player() {
  const player = useVideoPlayer({uri: VIDEO_URL}, (p => {}));

  return (
    <View style={styles.playerContainer}>
      <PlayerProvider player={player}>
        <FullscreenProvider>
          <DefaultSkin
            chapters={CHAPTERS}
            onChapterChange={(ch) => console.log('Chapter:', ch?.title)}>
            <VideoView player={player} controls={true} style={styles.video} resizeMode="contain" />
          </DefaultSkin>
        </FullscreenProvider>
      </PlayerProvider>
    </View>
  );
}

function App() {
  return (
    <SafeAreaProvider>
    <GestureHandlerRootView style={styles.root}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>@react-native-video/ui</Text>
        <Text style={styles.subtitle}>DefaultSkin with glass effect</Text>
        <Player />
      </SafeAreaView>
    </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
  title: {
    color: '#111',
    fontSize: 20,
    fontWeight: '700',
    marginTop: 16,
  },
  subtitle: {
    color: 'rgba(35, 35, 35, 0.5)',
    fontSize: 14,
    marginBottom: 16,
  },
  playerContainer: {
    aspectRatio: 16 / 9,
    borderRadius: 12,
    overflow: 'hidden',
  },
  video: {
    width: '100%',
    aspectRatio: 16 / 9,
  },
});

export default App;
