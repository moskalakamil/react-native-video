import {useCallback} from 'react';
import {View, Text, Pressable, StyleSheet, type ViewStyle} from 'react-native';
import {usePlayerContext} from '../player/PlayerContext';

const DEFAULT_RATES = [0.5, 1, 1.25, 1.5, 2];

interface SpeedMenuProps {
  rates?: number[];
  style?: ViewStyle;
}

export function SpeedMenu({rates = DEFAULT_RATES, style}: SpeedMenuProps) {
  const {state, actions} = usePlayerContext();

  const handleSelect = useCallback(
    (rate: number) => {
      actions.setRate(rate);
    },
    [actions],
  );

  return (
    <View style={[styles.menu, style]}>
      {rates.map((rate) => {
        const isSelected = state.rate === rate;
        return (
          <Pressable
            key={rate}
            style={[styles.item, isSelected && styles.itemActive]}
            onPress={() => handleSelect(rate)}>
            <Text style={[styles.text, isSelected && styles.textActive]}>
              {rate === 1 ? 'Normal' : `${rate}x`}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  menu: {padding: 2},
  item: {paddingVertical: 4, paddingHorizontal: 8, borderRadius: 4},
  itemActive: {backgroundColor: 'rgba(255, 255, 255, 0.15)'},
  text: {fontSize: 12, color: 'rgba(255, 255, 255, 0.7)'},
  textActive: {color: '#fff', fontWeight: '600'},
});
