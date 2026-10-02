import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../constants';
import { getPredictionConfidenceBadge } from '../services/predictionEngine';
import Icon from './icons/Icon.js';

export const PredictionCard = ({
  match,
  onSelectMatch,
  onAddToSlip,
  isInSlip = false,
}) => {
  const { prediction } = match;
  const badge = getPredictionConfidenceBadge(prediction.confidence);

  return (
    <View style={styles.card}>
      {/* Header Row: League, Time & 93%+ Badge */}
      <View style={styles.headerRow}>
        <View style={styles.leagueTag}>
          <Text style={styles.leagueText}>{match.league}</Text>
          <Text style={styles.dotSeparator}>•</Text>
          <Text style={styles.timeText}>{match.time}</Text>
        </View>

        <View
          style={[
            styles.confidenceBadge,
            { backgroundColor: badge.badgeColor },
          ]}
        >
          <Text
            style={[
              styles.confidenceText,
              { color: badge.textColor },
            ]}
          >
            {badge.label}
          </Text>
        </View>
      </View>

      {/* Teams Matchup */}
      <View style={styles.matchupRow}>
        <View style={styles.teamCol}>
          <Text style={styles.teamName}>{match.homeTeam}</Text>
        </View>
        <Text style={styles.vsText}>VS</Text>
        <View style={[styles.teamCol, { alignItems: 'flex-end' }]}>
          <Text style={styles.teamName}>{match.awayTeam}</Text>
        </View>
      </View>

      {/* AI Recommended Pick Box (Olive Ink with Warm Lime accents) */}
      <View style={styles.pickBox}>
        <View style={styles.pickHeader}>
          <View style={styles.pickTagRow}>
            <Icon name="target" size={13} color={Colors.primary} />
            <Text style={styles.pickTag}>GEMINI AI PICK</Text>
          </View>
          <Text style={styles.predictedScore}>
            Score: <Text style={styles.scoreHighlight}>{prediction.predictedScore}</Text>
          </Text>
        </View>

        <View style={styles.pickMainRow}>
          <Text style={styles.pickTitle}>{prediction.recommendedPick}</Text>
          <View style={styles.oddsPill}>
            <Text style={styles.oddsValue}>{prediction.pickOdds.toFixed(2)}</Text>
          </View>
        </View>

        <Text style={styles.aiSnippet} numberOfLines={2}>
          {prediction.aiSummary}
        </Text>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionRow}>
        <TouchableOpacity
          style={styles.detailButton}
          activeOpacity={0.7}
          onPress={() => onSelectMatch(match)}
        >
          <Icon name="brain" size={14} color={Colors.primary} />
          <Text style={styles.detailButtonText}>Deep AI Dossier</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.slipButton,
            isInSlip ? styles.slipButtonAdded : styles.slipButtonActive,
          ]}
          activeOpacity={0.8}
          onPress={() => onAddToSlip(match)}
        >
          {isInSlip ? (
            <Icon name="check" size={13} color={Colors.primary} />
          ) : (
            <Icon name="slip" size={13} color={Colors.textInverse} />
          )}
          <Text
            style={[
              styles.slipButtonText,
              isInSlip ? styles.slipButtonTextAdded : styles.slipButtonTextActive,
            ]}
          >
            {isInSlip ? 'In Slip' : 'Add to Slip'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.cardHighlight,
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  leagueTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  leagueText: {
    color: Colors.textMuted,
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  dotSeparator: {
    color: Colors.borderLight,
    fontSize: 12,
  },
  timeText: {
    color: Colors.textMuted,
    fontSize: 12,
  },
  confidenceBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  confidenceText: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  matchupRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 6,
  },
  teamCol: {
    flex: 1,
  },
  teamName: {
    color: Colors.text,
    fontSize: 15,
    fontWeight: '800',
  },
  vsText: {
    color: Colors.textMuted,
    fontSize: 11,
    fontWeight: '800',
    paddingHorizontal: 8,
  },
  pickBox: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 12,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  pickHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  pickTagRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  pickTag: {
    color: Colors.primary,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  predictedScore: {
    color: Colors.textMuted,
    fontSize: 11,
  },
  scoreHighlight: {
    color: Colors.text,
    fontWeight: '700',
  },
  pickMainRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  pickTitle: {
    color: Colors.text,
    fontSize: 15,
    fontWeight: '800',
    flex: 1,
    marginRight: 8,
  },
  oddsPill: {
    backgroundColor: 'rgba(207, 255, 116, 0.15)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  oddsValue: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: '800',
  },
  aiSnippet: {
    color: Colors.textMuted,
    fontSize: 12,
    lineHeight: 17,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 4,
  },
  detailButton: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: Colors.card,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  detailButtonText: {
    color: Colors.text,
    fontSize: 12,
    fontWeight: '700',
  },
  slipButton: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  slipButtonActive: {
    backgroundColor: Colors.primary,
  },
  slipButtonAdded: {
    backgroundColor: Colors.secondaryLight,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  slipButtonText: {
    fontSize: 12,
    fontWeight: '800',
  },
  slipButtonTextActive: {
    color: Colors.textInverse,
  },
  slipButtonTextAdded: {
    color: Colors.primary,
  },
});

export default PredictionCard;
