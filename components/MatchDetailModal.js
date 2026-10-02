import React, { useState } from 'react';
import {
  ActivityIndicator,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Colors } from '../constants';
import { geminiService } from '../services/geminiService';
import { getPredictionConfidenceBadge } from '../services/predictionEngine';

export const MatchDetailModal = ({
  visible,
  match,
  onClose,
  onAddToSlip,
  isInSlip,
}) => {
  const [loading, setLoading] = useState(false);
  const [currentMatch, setCurrentMatch] = useState(match);

  if (!match) return null;

  const activeMatch = currentMatch || match;
  const { prediction } = activeMatch;
  const badge = getPredictionConfidenceBadge(prediction.confidence);

  const handleRefreshAnalysis = async () => {
    setLoading(true);
    try {
      const refreshedPrediction = await geminiService.analyzeMatch(activeMatch);
      setCurrentMatch({
        ...activeMatch,
        prediction: refreshedPrediction,
      });
    } catch (e) {
      console.warn('Refresh analysis failed', e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          {/* Header */}
          <View style={styles.header}>
            <View>
              <Text style={styles.headerLeague}>
                {activeMatch.league} • {activeMatch.time}
              </Text>
              <Text style={styles.headerTitle}>
                {activeMatch.homeTeam} vs {activeMatch.awayTeam}
              </Text>
            </View>

            <TouchableOpacity
              style={styles.closeButton}
              activeOpacity={0.7}
              onPress={onClose}
            >
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
            {/* Confidence Banner */}
            <View style={styles.confidenceBanner}>
              <View>
                <Text style={styles.confidenceSub}>GEMINI AI CONFIDENCE</Text>
                <Text style={styles.confidenceValue}>{prediction.confidence.toFixed(1)}%</Text>
              </View>
              <View
                style={[
                  styles.badgeContainer,
                  { backgroundColor: badge.badgeColor },
                ]}
              >
                <Text
                  style={[
                    styles.badgeText,
                    { color: badge.textColor },
                  ]}
                >
                  {badge.label}
                </Text>
              </View>
            </View>

            {/* AI Recommendation Box */}
            <View style={styles.sectionBox}>
              <Text style={styles.sectionHeading}>🎯 Recommended Selection</Text>
              <View style={styles.recommendationRow}>
                <Text style={styles.pickText}>{prediction.recommendedPick}</Text>
                <View style={styles.oddsPill}>
                  <Text style={styles.oddsText}>Odds {prediction.pickOdds.toFixed(2)}</Text>
                </View>
              </View>
              <Text style={styles.predictedScore}>
                Predicted Outcome:{' '}
                <Text style={styles.boldText}>{prediction.predictedScore}</Text>
              </Text>
              <Text style={styles.aiSummary}>{prediction.aiSummary}</Text>
            </View>

            {/* Key Matchup Factors */}
            <View style={styles.sectionBox}>
              <Text style={styles.sectionHeading}>⚡ Quantitative Edge Factors</Text>
              {prediction.keyFactors?.map((factor, index) => (
                <View key={index} style={styles.factorRow}>
                  <Text style={styles.factorBullet}>•</Text>
                  <Text style={styles.factorText}>{factor}</Text>
                </View>
              ))}
            </View>

            {/* Head-to-Head & Risk */}
            <View style={styles.infoGrid}>
              <View style={styles.infoCol}>
                <Text style={styles.infoLabel}>HEAD-TO-HEAD</Text>
                <Text style={styles.infoValue}>{prediction.h2h}</Text>
              </View>
              <View style={styles.infoCol}>
                <Text style={styles.infoLabel}>RISK ASSESSMENT</Text>
                <Text style={styles.infoValue}>{prediction.riskRating}</Text>
              </View>
            </View>

            {/* Bankroll Unit Recommendation */}
            <View style={styles.bankrollBox}>
              <Text style={styles.bankrollLabel}>💰 Bankroll Sizing Recommendation:</Text>
              <Text style={styles.bankrollValue}>{prediction.recommendedStake}</Text>
            </View>

            {/* Live Re-analyze with Gemini Button */}
            <TouchableOpacity
              style={styles.reanalyzeButton}
              activeOpacity={0.8}
              onPress={handleRefreshAnalysis}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color={Colors.primary} size="small" />
              ) : (
                <Text style={styles.reanalyzeText}>
                  ✨ Refresh Prediction with Gemini 3.8 Live
                </Text>
              )}
            </TouchableOpacity>
          </ScrollView>

          {/* Footer CTA */}
          <View style={styles.footer}>
            <TouchableOpacity
              style={[
                styles.ctaButton,
                isInSlip ? styles.ctaButtonAdded : styles.ctaButtonActive,
              ]}
              activeOpacity={0.85}
              onPress={() => {
                onAddToSlip(activeMatch);
              }}
            >
              <Text
                style={[
                  styles.ctaText,
                  isInSlip ? styles.ctaTextAdded : styles.ctaTextActive,
                ]}
              >
                {isInSlip ? '✓ Added in Bet Slip' : '+ Add Pick to Bet Slip'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(10, 14, 6, 0.82)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: Colors.cardHighlight,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '88%',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  headerLeague: {
    color: Colors.primary,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  headerTitle: {
    color: Colors.text,
    fontSize: 18,
    fontWeight: '800',
    marginTop: 2,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.card,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  closeButtonText: {
    color: Colors.textMuted,
    fontSize: 16,
    fontWeight: '700',
  },
  scroll: {
    padding: 20,
    gap: 16,
  },
  confidenceBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.card,
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  confidenceSub: {
    color: Colors.textMuted,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  confidenceValue: {
    color: Colors.primary,
    fontSize: 32,
    fontWeight: '900',
  },
  badgeContainer: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '800',
  },
  sectionBox: {
    backgroundColor: Colors.card,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  sectionHeading: {
    color: Colors.text,
    fontSize: 15,
    fontWeight: '800',
    marginBottom: 10,
  },
  recommendationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  pickText: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: '800',
    flex: 1,
  },
  oddsPill: {
    backgroundColor: 'rgba(207, 255, 116, 0.15)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  oddsText: {
    color: Colors.primary,
    fontSize: 13,
    fontWeight: '800',
  },
  predictedScore: {
    color: Colors.textMuted,
    fontSize: 13,
    marginBottom: 8,
  },
  boldText: {
    color: Colors.text,
    fontWeight: '700',
  },
  aiSummary: {
    color: Colors.text,
    fontSize: 13,
    lineHeight: 20,
  },
  factorRow: {
    flexDirection: 'row',
    marginBottom: 8,
    gap: 8,
  },
  factorBullet: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: '900',
  },
  factorText: {
    color: Colors.textMuted,
    fontSize: 13,
    flex: 1,
    lineHeight: 18,
  },
  infoGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  infoCol: {
    flex: 1,
    backgroundColor: Colors.card,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  infoLabel: {
    color: Colors.textMuted,
    fontSize: 10,
    fontWeight: '800',
    marginBottom: 4,
  },
  infoValue: {
    color: Colors.text,
    fontSize: 12,
    fontWeight: '600',
  },
  bankrollBox: {
    backgroundColor: 'rgba(207, 255, 116, 0.10)',
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  bankrollLabel: {
    color: Colors.primary,
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 2,
  },
  bankrollValue: {
    color: Colors.text,
    fontSize: 14,
    fontWeight: '800',
  },
  reanalyzeButton: {
    backgroundColor: Colors.card,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  reanalyzeText: {
    color: Colors.primary,
    fontSize: 13,
    fontWeight: '700',
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    backgroundColor: Colors.background,
  },
  ctaButton: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  ctaButtonActive: {
    backgroundColor: Colors.primary,
  },
  ctaButtonAdded: {
    backgroundColor: Colors.secondaryLight,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  ctaText: {
    fontSize: 15,
    fontWeight: '800',
  },
  ctaTextActive: {
    color: Colors.textInverse,
  },
  ctaTextAdded: {
    color: Colors.primary,
  },
});

export default MatchDetailModal;
