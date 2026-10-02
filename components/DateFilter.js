import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors, DateFilters } from '../constants';

export const DateFilter = ({ selectedDate, onSelectDate }) => {
  return (
    <View style={styles.container}>
      <View style={styles.filterRow}>
        {DateFilters.map((df) => {
          const isSelected = selectedDate === df.id;
          return (
            <TouchableOpacity
              key={df.id}
              activeOpacity={0.8}
              style={[
                styles.dateButton,
                isSelected && styles.dateButtonActive,
              ]}
              onPress={() => onSelectDate(df.id)}
            >
              <Text
                style={[
                  styles.dateText,
                  isSelected && styles.dateTextActive,
                ]}
              >
                {df.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingBottom: 12,
    backgroundColor: Colors.background,
  },
  filterRow: {
    flexDirection: 'row',
    backgroundColor: Colors.card,
    borderRadius: 10,
    padding: 4,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  dateButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 7,
  },
  dateButtonActive: {
    backgroundColor: Colors.cardHighlight,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  dateText: {
    color: Colors.textMuted,
    fontSize: 12,
    fontWeight: '600',
  },
  dateTextActive: {
    color: Colors.primary,
    fontWeight: '800',
  },
});

export default DateFilter;
