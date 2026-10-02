import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Colors } from './constants';
import { MockMatches } from './data/mockMatches';
import {
  filterHighConfidenceMatches,
  storageService,
} from './services';
import Header from './components/Header.js';
import SportSelector from './components/SportSelector.js';
import DateFilter from './components/DateFilter.js';
import ConfidenceFilter from './components/ConfidenceFilter.js';
import PredictionCard from './components/PredictionCard.js';
import MatchDetailModal from './components/MatchDetailModal.js';
import BetSlipModal from './components/BetSlipModal.js';
import AIAnalystView from './components/AIAnalystView.js';
import StatsTrackerView from './components/StatsTrackerView.js';
import SettingsView from './components/SettingsView.js';
import TabNavigation from './components/TabNavigation.js';
import Icon from './components/icons/Icon.js';

export default function App() {
  const [activeTab, setActiveTab] = useState('predictions');
  const [selectedSport, setSelectedSport] = useState('basketball'); // Default to Basketball as requested
  const [selectedDate, setSelectedDate] = useState('today');
  const [isOnlyHighConfidence, setIsOnlyHighConfidence] = useState(true); // 93%+ default active
  const [refreshing, setRefreshing] = useState(false);

  // Modals & Slips
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [isBetSlipVisible, setIsBetSlipVisible] = useState(false);

  // Reactive State from Storage
  const [betSlip, setBetSlip] = useState([]);
  const [betHistory, setBetHistory] = useState([]);

  useEffect(() => {
    const unsubscribe = storageService.subscribe((state) => {
      setBetSlip(state.betSlip);
      setBetHistory(state.betHistory);
    });
    // Init state
    const current = storageService.getState();
    setBetSlip(current.betSlip);
    setBetHistory(current.betHistory);
    return unsubscribe;
  }, []);

  // Filter Matches (with defensive safety fallback)
  const matchesToFilter = Array.isArray(MockMatches) ? MockMatches : [];
  const filteredMatches = matchesToFilter.filter((match) => {
    if (!match) return false;
    // 1. Sport filter
    if (selectedSport && match.sport !== selectedSport) return false;

    // 2. Date filter
    const now = new Date();
    const todayStr = now.toISOString().split('T')[0];
    const tmrw = new Date(now);
    tmrw.setDate(now.getDate() + 1);
    const tmrwStr = tmrw.toISOString().split('T')[0];

    if (selectedDate === 'today' && match.date !== todayStr) return false;
    if (selectedDate === 'tomorrow' && match.date !== tmrwStr) return false;

    // 3. High confidence filter (93%+)
    if (isOnlyHighConfidence && (match.prediction?.confidence || 0) < 93.0) {
      return false;
    }

    return true;
  });

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 700);
  };

  const handleAddToSlip = (match) => {
    storageService.addToBetSlip(match);
  };

  const handleRemoveFromSlip = (id) => {
    storageService.removeFromBetSlip(id);
  };

  const handleClearSlip = () => {
    storageService.clearBetSlip();
  };

  const handlePlaceBets = (stake, totalReturn) => {
    storageService.placeBets(stake, totalReturn);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />

      {/* Top Header */}
      <Header
        onOpenBetSlip={() => setIsBetSlipVisible(true)}
        betSlipCount={betSlip.length}
      />

      {/* Main Screen Switcher */}
      {activeTab === 'predictions' && (
        <View style={styles.tabContent}>
          {/* Sport Selector Carousel */}
          <SportSelector
            selectedSport={selectedSport}
            onSelectSport={setSelectedSport}
          />

          {/* Date Selector (Today, Tomorrow, Weekend, etc.) */}
          <DateFilter
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
          />

          {/* 93%+ Confidence Filter Pill */}
          <ConfidenceFilter
            isOnlyHighConfidence={isOnlyHighConfidence}
            onToggleHighConfidence={() => setIsOnlyHighConfidence(!isOnlyHighConfidence)}
            matchCount={filteredMatches.length}
          />

          {/* Matches List */}
          <FlatList
            data={filteredMatches}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContainer}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
                tintColor={Colors.primary}
              />
            }
            renderItem={({ item }) => {
              const inSlip = betSlip.some((b) => b.id === item.id);
              return (
                <PredictionCard
                  match={item}
                  isInSlip={inSlip}
                  onSelectMatch={(m) => setSelectedMatch(m)}
                  onAddToSlip={(m) => handleAddToSlip(m)}
                />
              );
            }}
            ListEmptyComponent={
              <View style={styles.emptyView}>
                <View style={styles.emptyIconBox}>
                  <Icon name="search" size={32} color={Colors.primary} />
                </View>
                <Text style={styles.emptyTitle}>No Matches Matching 93%+ Filter</Text>
                <Text style={styles.emptyText}>
                  Try selecting 'Tomorrow' or 'This Weekend' for more high-probability basketball & sports predictions.
                </Text>
                <TouchableOpacity
                  style={styles.resetFilterBtn}
                  onPress={() => {
                    setSelectedDate('today');
                    setIsOnlyHighConfidence(false);
                  }}
                >
                  <Text style={styles.resetFilterText}>Show All Available Matches</Text>
                </TouchableOpacity>
              </View>
            }
          />
        </View>
      )}

      {activeTab === 'analyst' && (
        <AIAnalystView currentSport={selectedSport.toUpperCase()} />
      )}

      {activeTab === 'stats' && (
        <StatsTrackerView betHistory={betHistory} />
      )}

      {activeTab === 'settings' && <SettingsView />}

      {/* Floating Bet Slip Bar (if items in slip) */}
      {betSlip.length > 0 && !isBetSlipVisible && (
        <TouchableOpacity
          style={styles.floatingSlipBar}
          activeOpacity={0.9}
          onPress={() => setIsBetSlipVisible(true)}
        >
          <View style={styles.floatingSlipLeft}>
            <View style={styles.floatingCount}>
              <Text style={styles.floatingCountText}>{betSlip.length}</Text>
            </View>
            <Icon name="slip" size={16} color={Colors.textInverse} />
            <Text style={styles.floatingLabel}>View Active Bet Slip</Text>
          </View>
          <Text style={styles.floatingArrow}>Tap to Open →</Text>
        </TouchableOpacity>
      )}

      {/* Bottom Floating iPhone Dock Navigation */}
      <TabNavigation
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onOpenBetSlip={() => setIsBetSlipVisible(true)}
        betSlipCount={betSlip.length}
      />

      {/* Deep Gemini AI Match Breakdown Modal */}
      <MatchDetailModal
        visible={!!selectedMatch}
        match={selectedMatch}
        isInSlip={betSlip.some((b) => b.id === selectedMatch?.id)}
        onClose={() => setSelectedMatch(null)}
        onAddToSlip={(m) => handleAddToSlip(m)}
      />

      {/* Bet Slip Drawer */}
      <BetSlipModal
        visible={isBetSlipVisible}
        betSlip={betSlip}
        onClose={() => setIsBetSlipVisible(false)}
        onRemoveBet={handleRemoveFromSlip}
        onClearAll={handleClearSlip}
        onPlaceBets={handlePlaceBets}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  tabContent: {
    flex: 1,
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 110, // Clearance for floating iPhone dock
  },
  emptyView: {
    padding: 36,
    alignItems: 'center',
  },
  emptyIconBox: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.cardHighlight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  emptyTitle: {
    color: Colors.text,
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 6,
    textAlign: 'center',
  },
  emptyText: {
    color: Colors.textMuted,
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 16,
  },
  resetFilterBtn: {
    backgroundColor: Colors.cardHighlight,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  resetFilterText: {
    color: Colors.primary,
    fontSize: 13,
    fontWeight: '700',
  },
  floatingSlipBar: {
    position: 'absolute',
    bottom: 104, // Hovering cleanly above the iPhone dock
    left: 18,
    right: 18,
    backgroundColor: Colors.primary,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: '#CFFF74',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 10,
    zIndex: 998,
  },
  floatingSlipLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  floatingCount: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.textInverse,
    alignItems: 'center',
    justifyContent: 'center',
  },
  floatingCountText: {
    color: Colors.primary,
    fontSize: 12,
    fontWeight: '900',
  },
  floatingLabel: {
    color: Colors.textInverse,
    fontSize: 14,
    fontWeight: '800',
  },
  floatingArrow: {
    color: Colors.textInverse,
    fontSize: 12,
    fontWeight: '800',
  },
});
