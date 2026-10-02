import React, { useState } from 'react';
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Colors } from '../constants';
import { calculateParlayOdds, calculatePayout } from '../services/predictionEngine';

export const BetSlipModal = ({
  visible,
  betSlip,
  onClose,
  onRemoveBet,
  onClearAll,
  onPlaceBets,
}) => {
  const [stake, setStake] = useState('25');
  const [placedSuccess, setPlacedSuccess] = useState(false);

  const parlayOdds = calculateParlayOdds(
    betSlip.map((b) => ({ odds: b.prediction.pickOdds }))
  );
  const potentialPayout = calculatePayout(stake, parlayOdds);

  const handlePlaceBet = () => {
    if (betSlip.length === 0) return;
    onPlaceBets(Number(stake) || 25, potentialPayout);
    setPlacedSuccess(true);
    setTimeout(() => {
      setPlacedSuccess(false);
      onClose();
    }, 1800);
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
            <View style={styles.headerTitleRow}>
              <Text style={styles.headerTitle}>Active Bet Slip</Text>
              <View style={styles.countPill}>
                <Text style={styles.countText}>{betSlip.length} Picks</Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.closeButton}
              activeOpacity={0.7}
              onPress={onClose}
            >
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>

          {placedSuccess ? (
            <View style={styles.successContainer}>
              <View style={styles.successIconBox}>
                <Text style={styles.successIcon}>✓</Text>
              </View>
              <Text style={styles.successTitle}>Bets Placed Successfully!</Text>
              <Text style={styles.successSubtitle}>
                Your selections have been logged into your Bet Tracker.
              </Text>
              <Text style={styles.potentialWinBadge}>
                Potential Return: ${potentialPayout.toFixed(2)}
              </Text>
            </View>
          ) : (
            <>
              {betSlip.length === 0 ? (
                <View style={styles.emptyContainer}>
                  <Text style={styles.emptyEmoji}>📋</Text>
                  <Text style={styles.emptyTitle}>Your Bet Slip is Empty</Text>
                  <Text style={styles.emptySubtitle}>
                    Select 93%+ high confidence predictions to build your accumulator.
                  </Text>
                </View>
              ) : (
                <ScrollView contentContainerStyle={styles.scroll}>
                  {/* Bets List */}
                  {betSlip.map((match) => (
                    <View key={match.id} style={styles.betItem}>
                      <View style={styles.betItemTop}>
                        <Text style={styles.betItemMatch}>
                          {match.homeTeam} vs {match.awayTeam}
                        </Text>
                        <TouchableOpacity
                          onPress={() => onRemoveBet(match.id)}
                          activeOpacity={0.7}
                        >
                          <Text style={styles.removeText}>✕</Text>
                        </TouchableOpacity>
                      </View>

                      <View style={styles.betItemBottom}>
                        <Text style={styles.betPick}>
                          {match.prediction.recommendedPick}
                        </Text>
                        <View style={styles.itemOddsBadge}>
                          <Text style={styles.itemOddsValue}>
                            {match.prediction.pickOdds.toFixed(2)}
                          </Text>
                        </View>
                      </View>

                      <Text style={styles.betConfidenceTag}>
                        AI Confidence: {match.prediction.confidence.toFixed(1)}%
                      </Text>
                    </View>
                  ))}

                  {/* Summary Controls */}
                  <View style={styles.summaryCard}>
                    <View style={styles.summaryRow}>
                      <Text style={styles.summaryLabel}>Combined Parlay Odds:</Text>
                      <Text style={styles.parlayOddsText}>{parlayOdds.toFixed(2)}</Text>
                    </View>

                    {/* Stake Input */}
                    <View style={styles.stakeRow}>
                      <Text style={styles.stakeLabel}>Wager Amount ($):</Text>
                      <TextInput
                        style={styles.stakeInput}
                        value={stake}
                        onChangeText={setStake}
                        keyboardType="numeric"
                        placeholder="25"
                        placeholderTextColor={Colors.textMuted}
                      />
                    </View>

                    {/* Quick Stake Buttons */}
                    <View style={styles.quickStakeRow}>
                      {['10', '25', '50', '100'].map((val) => (
                        <TouchableOpacity
                          key={val}
                          style={[
                            styles.quickStakeBtn,
                            stake === val && styles.quickStakeBtnActive,
                          ]}
                          onPress={() => setStake(val)}
                        >
                          <Text
                            style={[
                              styles.quickStakeText,
                              stake === val && styles.quickStakeTextActive,
                            ]}
                          >
                            ${val}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>

                    {/* Potential Return */}
                    <View style={styles.payoutRow}>
                      <Text style={styles.payoutLabel}>Est. Potential Payout:</Text>
                      <Text style={styles.payoutAmount}>${potentialPayout.toFixed(2)}</Text>
                    </View>
                  </View>
                </ScrollView>
              )}

              {/* Footer */}
              {betSlip.length > 0 && (
                <View style={styles.footer}>
                  <TouchableOpacity
                    style={styles.clearButton}
                    onPress={onClearAll}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.clearText}>Clear</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.placeButton}
                    onPress={handlePlaceBet}
                    activeOpacity={0.85}
                  >
                    <Text style={styles.placeButtonText}>
                      Lock In Bets (${stake || '0'})
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </>
          )}
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
    maxHeight: '85%',
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
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerTitle: {
    color: Colors.text,
    fontSize: 18,
    fontWeight: '800',
  },
  countPill: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  countText: {
    color: Colors.textInverse,
    fontSize: 11,
    fontWeight: '800',
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
    gap: 12,
  },
  betItem: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  betItemTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  betItemMatch: {
    color: Colors.textMuted,
    fontSize: 12,
    fontWeight: '600',
  },
  removeText: {
    color: Colors.textMuted,
    fontSize: 14,
    fontWeight: '800',
  },
  betItemBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  betPick: {
    color: Colors.text,
    fontSize: 15,
    fontWeight: '800',
    flex: 1,
  },
  itemOddsBadge: {
    backgroundColor: 'rgba(207, 255, 116, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  itemOddsValue: {
    color: Colors.primary,
    fontSize: 13,
    fontWeight: '800',
  },
  betConfidenceTag: {
    color: Colors.primary,
    fontSize: 11,
    fontWeight: '700',
    marginTop: 6,
  },
  summaryCard: {
    backgroundColor: Colors.card,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    marginTop: 6,
    gap: 12,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryLabel: {
    color: Colors.textMuted,
    fontSize: 13,
    fontWeight: '600',
  },
  parlayOddsText: {
    color: Colors.primary,
    fontSize: 18,
    fontWeight: '900',
  },
  stakeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stakeLabel: {
    color: Colors.text,
    fontSize: 14,
    fontWeight: '700',
  },
  stakeInput: {
    backgroundColor: Colors.background,
    color: Colors.primary,
    fontSize: 16,
    fontWeight: '800',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    width: 90,
    textAlign: 'right',
  },
  quickStakeRow: {
    flexDirection: 'row',
    gap: 8,
  },
  quickStakeBtn: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingVertical: 6,
    borderRadius: 6,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  quickStakeBtnActive: {
    borderColor: Colors.primary,
    backgroundColor: 'rgba(207, 255, 116, 0.12)',
  },
  quickStakeText: {
    color: Colors.textMuted,
    fontSize: 12,
    fontWeight: '700',
  },
  quickStakeTextActive: {
    color: Colors.primary,
  },
  payoutRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  payoutLabel: {
    color: Colors.text,
    fontSize: 14,
    fontWeight: '700',
  },
  payoutAmount: {
    color: Colors.primary,
    fontSize: 22,
    fontWeight: '900',
  },
  footer: {
    flexDirection: 'row',
    padding: 16,
    gap: 10,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    backgroundColor: Colors.background,
  },
  clearButton: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 10,
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  clearText: {
    color: Colors.textMuted,
    fontSize: 13,
    fontWeight: '700',
  },
  placeButton: {
    flex: 1,
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  placeButtonText: {
    color: Colors.textInverse,
    fontSize: 15,
    fontWeight: '800',
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
  },
  emptyEmoji: {
    fontSize: 48,
    marginBottom: 12,
  },
  emptyTitle: {
    color: Colors.text,
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 6,
  },
  emptySubtitle: {
    color: Colors.textMuted,
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 18,
  },
  successContainer: {
    padding: 36,
    alignItems: 'center',
  },
  successIconBox: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  successIcon: {
    color: Colors.textInverse,
    fontSize: 32,
    fontWeight: '900',
  },
  successTitle: {
    color: Colors.text,
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 6,
  },
  successSubtitle: {
    color: Colors.textMuted,
    fontSize: 13,
    textAlign: 'center',
    marginBottom: 16,
  },
  potentialWinBadge: {
    color: Colors.primary,
    fontSize: 15,
    fontWeight: '800',
  },
});

export default BetSlipModal;
