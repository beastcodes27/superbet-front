import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../constants';
import Icon from './icons/Icon.js';

export const ConfidenceFilter = ({
  isOnlyHighConfidence,
  onToggleHighConfidence,
  matchCount = 0,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.8}
        style={[
          styles.pill,
          isOnlyHighConfidence ? styles.pillActive : styles.pillInactive,
        ]}
        onPress={onToggleHighConfidence}
      >
        <View style={styles.badgeIndicator}>
          <Icon
            name={isOnlyHighConfidence ? 'check' : 'bolt'}
            size={11}
            color={Colors.textInverse}
          />
        </View>
        <Text
          style={[
            styles.pillText,
            isOnlyHighConfidence ? styles.pillTextActive : styles.pillTextInactive,
          ]}
        >
          {isOnlyHighConfidence ? '93%+ Confidence Filter Active' : 'Show All Matches'}
        </Text>
      </TouchableOpacity>

      <View style={styles.matchCountPill}>
        <Text style={styles.matchCountText}>
          <Text style={styles.countNumber}>{matchCount}</Text> {matchCount === 1 ? 'Match' : 'Matches'}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    gap: 6,
  },
  pillActive: {
    backgroundColor: 'rgba(207, 255, 116, 0.12)',
    borderColor: Colors.primary,
  },
  pillInactive: {
    backgroundColor: Colors.card,
    borderColor: Colors.border,
  },
  badgeIndicator: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pillText: {
    fontSize: 12,
    fontWeight: '700',
  },
  pillTextActive: {
    color: Colors.primary,
  },
  pillTextInactive: {
    color: Colors.textMuted,
  },
  matchCountPill: {
    backgroundColor: Colors.card,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  matchCountText: {
    color: Colors.textMuted,
    fontSize: 12,
    fontWeight: '500',
  },
  countNumber: {
    color: Colors.text,
    fontWeight: '700',
  },
});

export default ConfidenceFilter;
