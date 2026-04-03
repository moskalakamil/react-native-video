import {useCallback} from 'react';
import {View, Text, Pressable, StyleSheet, type ViewStyle} from 'react-native';
import {usePlayerContext} from '../player/PlayerContext';
import type {TextTrack} from 'react-native-video';

interface CaptionsMenuProps {
  style?: ViewStyle;
}

export function CaptionsMenu({style}: CaptionsMenuProps) {
  const {state, actions} = usePlayerContext();

  const handleSelect = useCallback(
    (track: TextTrack | null) => {
      actions.selectTextTrack(track);
    },
    [actions],
  );

  if (state.textTracks.length === 0) return null;

  return (
    <View style={[styles.menu, style]}>
      <Pressable
        style={[
          styles.item,
          state.selectedTextTrack === null && styles.itemActive,
        ]}
        onPress={() => handleSelect(null)}>
        <Text
          style={[
            styles.text,
            state.selectedTextTrack === null && styles.textActive,
          ]}>
          Off
        </Text>
      </Pressable>
      {state.textTracks.map((track, index) => {
        const isSelected =
          state.selectedTextTrack?.language === track.language;
        return (
          <Pressable
            key={`${track.language}-${index}`}
            style={[styles.item, isSelected && styles.itemActive]}
            onPress={() => handleSelect(track)}>
            <Text style={[styles.text, isSelected && styles.textActive]}>
              {track.label ?? track.language}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  menu: {padding: 4},
  item: {paddingVertical: 8, paddingHorizontal: 12, borderRadius: 4},
  itemActive: {backgroundColor: 'rgba(255, 255, 255, 0.15)'},
  text: {fontSize: 14, color: 'rgba(255, 255, 255, 0.7)'},
  textActive: {color: '#fff', fontWeight: '600'},
});
