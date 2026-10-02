import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../constants';
import Icon from './icons/Icon.js';

export const Header = ({ onOpenBetSlip, betSlipCount = 0 }) => {
  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <View style={styles.logoRow}>
          <View style={styles.logoBadge}>
            <Text style={styles.logoText}>SUPERBET</Text>
          </View>
          <View style={styles.aiTag}>
            <View style={styles.aiDot} />
            <Text style={styles.aiTagText}>GEMINI 3.5 AI</Text>
          </View>
        </View>

        {/* Floating / Header Bet Slip Trigger */}
        <TouchableOpacity
          style={styles.slipButton}
          activeOpacity={0.8}
          onPress={onOpenBetSlip}
        >
          <Icon name="slip" size={14} color={Colors.primary} />
          <Text style={styles.slipButtonText}>Slip</Text>
          {betSlipCount > 0 && (
            <View style={styles.countBadge}>
              <Text style={styles.countText}>{betSlipCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.guaranteeRow}>
        <Icon name="bolt" size={13} color={Colors.primary} />
        <Text style={styles.guaranteeText}>
          <Text style={styles.highlight}>93%+ Accuracy</Text> AI-Filtered Sports Value Picks
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 14,
    backgroundColor: Colors.background,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logoBadge: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 6,
  },
  logoText: {
    color: Colors.textInverse,
    fontWeight: '900',
    fontSize: 18,
    letterSpacing: 1.2,
  },
  aiTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.cardHighlight,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: 5,
  },
  aiDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.primary,
  },
  aiTagText: {
    color: Colors.primary,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  slipButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.cardHighlight,
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: 6,
  },
  slipButtonText: {
    color: Colors.text,
    fontSize: 13,
    fontWeight: '700',
  },
  countBadge: {
    backgroundColor: Colors.primary,
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 1,
  },
  countText: {
    color: Colors.textInverse,
    fontSize: 11,
    fontWeight: '800',
  },
  guaranteeRow: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  guaranteeText: {
    color: Colors.textMuted,
    fontSize: 12,
    fontWeight: '500',
  },
  highlight: {
    color: Colors.primary,
    fontWeight: '700',
  },
});

export default Header;
