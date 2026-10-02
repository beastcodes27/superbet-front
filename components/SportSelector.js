import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors, Sports } from '../constants';

export const SportSelector = ({ selectedSport, onSelectSport }) => {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {Sports.map((sport) => {
          const isSelected = selectedSport === sport.id;
          return (
            <TouchableOpacity
              key={sport.id}
              activeOpacity={0.75}
              style={[
                styles.sportPill,
                isSelected ? styles.sportPillActive : styles.sportPillInactive,
              ]}
              onPress={() => onSelectSport(sport.id)}
            >
              <Text style={styles.sportIcon}>{sport.icon}</Text>
              <Text
                style={[
                  styles.sportName,
                  isSelected ? styles.sportNameActive : styles.sportNameInactive,
                ]}
              >
                {sport.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    paddingHorizontal: 16,
    gap: 8,
  },
  sportPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    gap: 6,
  },
  sportPillActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  sportPillInactive: {
    backgroundColor: Colors.cardHighlight,
    borderColor: Colors.border,
  },
  sportIcon: {
    fontSize: 16,
  },
  sportName: {
    fontSize: 13,
    fontWeight: '700',
  },
  sportNameActive: {
    color: Colors.textInverse,
  },
  sportNameInactive: {
    color: Colors.textMuted,
  },
});

export default SportSelector;
