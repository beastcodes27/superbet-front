import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../constants';
import { calculateHistoricalStats } from '../services/predictionEngine';

export const StatsTrackerView = ({ betHistory = [] }) => {
  const stats = calculateHistoricalStats();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Top Banner */}
      <View style={styles.topCard}>
        <View style={styles.bannerHeader}>
          <Text style={styles.bannerTag}>⚡ 93%+ MODEL AUDIT</Text>
          <Text style={styles.liveAuditedTag}>VERIFIED HISTORICAL</Text>
        </View>

        <View style={styles.mainRateRow}>
          <View>
            <Text style={styles.mainRateValue}>{stats.verifiedWinRate}%</Text>
            <Text style={styles.mainRateLabel}>Overall Model Accuracy Rate</Text>
          </View>
          <View style={styles.roiBox}>
            <Text style={styles.roiValue}>{stats.monthlyRoi}</Text>
            <Text style={styles.roiLabel}>30-Day Simulated ROI</Text>
          </View>
        </View>

        <View style={styles.subStatsRow}>
          <View style={styles.subStatCol}>
            <Text style={styles.subStatNum}>{stats.totalPicksAnalyzed}</Text>
            <Text style={styles.subStatText}>Picks Analyzed</Text>
          </View>
          <View style={styles.subStatCol}>
            <Text style={styles.subStatNum}>{stats.picksWon}</Text>
            <Text style={styles.subStatText}>Picks Won</Text>
          </View>
          <View style={styles.subStatCol}>
            <Text style={styles.subStatNum}>{stats.activeStreak}🔥</Text>
            <Text style={styles.subStatText}>Current Streak</Text>
          </View>
        </View>
      </View>

      {/* Sport Breakdown */}
      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Sport Accuracy Breakdown</Text>
        {stats.sportBreakdown.map((item, index) => (
          <View key={index} style={styles.sportRow}>
            <Text style={styles.sportName}>{item.sport}</Text>
            <View style={styles.ratePill}>
              <Text style={styles.rateText}>{item.winRate}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* User's Tracked Bets History */}
      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Recent Placed / Tracked Bets</Text>
        {betHistory.length === 0 ? (
          <Text style={styles.noBetsText}>No bets tracked yet. Add picks from the predictions feed!</Text>
        ) : (
          betHistory.map((item) => (
            <View key={item.id} style={styles.historyItem}>
              <View style={styles.historyTop}>
                <Text style={styles.historyMatch}>{item.match}</Text>
                <View
                  style={[
                    styles.statusBadge,
                    item.status === 'WON'
                      ? styles.statusWon
                      : item.status === 'PENDING'
                      ? styles.statusPending
                      : styles.statusLost,
                  ]}
                >
                  <Text
                    style={[
                      styles.statusBadgeText,
                      item.status === 'WON'
                        ? styles.statusWonText
                        : item.status === 'PENDING'
                        ? styles.statusPendingText
                        : styles.statusLostText,
                    ]}
                  >
                    {item.status}
                  </Text>
                </View>
              </View>

              <View style={styles.historyBottom}>
                <Text style={styles.historyPick}>{item.pick}</Text>
                <Text style={styles.historyReturn}>
                  Stake ${item.stake} → <Text style={styles.winReturn}>${item.returnPayout}</Text>
                </Text>
              </View>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    padding: 16,
    paddingBottom: 110, // Clearance for floating iPhone dock
    gap: 16,
  },
  topCard: {
    backgroundColor: Colors.cardHighlight,
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  bannerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  bannerTag: {
    color: Colors.primary,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  liveAuditedTag: {
    color: Colors.textMuted,
    fontSize: 10,
    fontWeight: '700',
  },
  mainRateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  mainRateValue: {
    color: Colors.primary,
    fontSize: 40,
    fontWeight: '900',
  },
  mainRateLabel: {
    color: Colors.textMuted,
    fontSize: 12,
  },
  roiBox: {
    backgroundColor: 'rgba(207, 255, 116, 0.12)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  roiValue: {
    color: Colors.primary,
    fontSize: 18,
    fontWeight: '900',
  },
  roiLabel: {
    color: Colors.textMuted,
    fontSize: 10,
    fontWeight: '600',
  },
  subStatsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingTop: 12,
  },
  subStatCol: {
    alignItems: 'center',
  },
  subStatNum: {
    color: Colors.text,
    fontSize: 16,
    fontWeight: '800',
  },
  subStatText: {
    color: Colors.textMuted,
    fontSize: 11,
  },
  sectionCard: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  sectionTitle: {
    color: Colors.text,
    fontSize: 15,
    fontWeight: '800',
    marginBottom: 12,
  },
  sportRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  sportName: {
    color: Colors.text,
    fontSize: 14,
    fontWeight: '600',
  },
  ratePill: {
    backgroundColor: 'rgba(207, 255, 116, 0.15)',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  rateText: {
    color: Colors.primary,
    fontSize: 13,
    fontWeight: '800',
  },
  noBetsText: {
    color: Colors.textMuted,
    fontSize: 13,
    textAlign: 'center',
    paddingVertical: 20,
  },
  historyItem: {
    backgroundColor: Colors.cardHighlight,
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  historyTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  historyMatch: {
    color: Colors.textMuted,
    fontSize: 12,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  statusWon: {
    backgroundColor: 'rgba(74, 222, 128, 0.2)',
  },
  statusWonText: {
    color: '#4ADE80',
    fontSize: 10,
    fontWeight: '800',
  },
  statusPending: {
    backgroundColor: 'rgba(250, 204, 21, 0.2)',
  },
  statusPendingText: {
    color: '#FACC15',
    fontSize: 10,
    fontWeight: '800',
  },
  statusLost: {
    backgroundColor: 'rgba(248, 113, 113, 0.2)',
  },
  statusLostText: {
    color: '#F87171',
    fontSize: 10,
    fontWeight: '800',
  },
  historyBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  historyPick: {
    color: Colors.text,
    fontSize: 14,
    fontWeight: '700',
  },
  historyReturn: {
    color: Colors.textMuted,
    fontSize: 12,
  },
  winReturn: {
    color: Colors.primary,
    fontWeight: '700',
  },
});

export default StatsTrackerView;
