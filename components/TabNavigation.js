import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Colors } from '../constants';

export const TabNavigation = ({
  activeTab,
  onSelectTab,
  onOpenBetSlip,
  betSlipCount = 0,
}) => {
  const tabs = [
    { id: 'predictions', label: 'Predictions', icon: '🎯' },
    { id: 'analyst', label: 'AI Analyst', icon: '🧠' },
    { id: 'stats', label: 'Audit 93%+', icon: '📊' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
  ];

  return (
    <View style={styles.dockWrapper} pointerEvents="box-none">
      <View style={styles.dockContainer}>
        {/* iOS Frosted Glass Dock Island */}
        <View style={styles.dockGlowRim} />

        <View style={styles.tabsRow}>
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <TouchableOpacity
                key={tab.id}
                style={styles.dockItem}
                activeOpacity={0.75}
                onPress={() => onSelectTab(tab.id)}
              >
                {/* iPhone App Icon Squircle */}
                <View
                  style={[
                    styles.iconSquircle,
                    isActive ? styles.iconSquircleActive : styles.iconSquircleInactive,
                  ]}
                >
                  <Text
                    style={[
                      styles.tabIcon,
                      isActive ? styles.tabIconActive : styles.tabIconInactive,
                    ]}
                  >
                    {tab.icon}
                  </Text>
                </View>

                {/* Dock Label */}
                <Text
                  style={[
                    styles.tabLabel,
                    isActive ? styles.tabLabelActive : styles.tabLabelInactive,
                  ]}
                  numberOfLines={1}
                >
                  {tab.label}
                </Text>

                {/* iOS Active Indicator Dot */}
                {isActive && <View style={styles.activeDot} />}
              </TouchableOpacity>
            );
          })}

          {/* Quick Bet Slip Dock App (if items in slip) */}
          {betSlipCount > 0 && onOpenBetSlip && (
            <TouchableOpacity
              style={styles.dockItem}
              activeOpacity={0.75}
              onPress={onOpenBetSlip}
            >
              <View style={[styles.iconSquircle, styles.slipSquircle]}>
                <Text style={styles.slipIcon}>📋</Text>
                <View style={styles.slipBadge}>
                  <Text style={styles.slipBadgeText}>{betSlipCount}</Text>
                </View>
              </View>
              <Text style={styles.slipLabel}>Slip</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  dockWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: Platform.OS === 'ios' ? 24 : 18,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999,
  },
  dockContainer: {
    width: '92%',
    maxWidth: 420,
    backgroundColor: 'rgba(34, 42, 21, 0.94)', // Translucent Olive Ink
    borderRadius: 34,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderWidth: 1.5,
    borderColor: 'rgba(207, 255, 116, 0.3)', // Warm Lime glass rim
    // iOS Depth Shadows
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.55,
    shadowRadius: 20,
    elevation: 16,
  },
  dockGlowRim: {
    position: 'absolute',
    top: 0,
    left: 20,
    right: 20,
    height: 1,
    backgroundColor: 'rgba(207, 255, 116, 0.45)', // Subtle specular light reflection
    borderRadius: 1,
  },
  tabsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  dockItem: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 60,
    paddingVertical: 2,
  },
  iconSquircle: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  iconSquircleActive: {
    backgroundColor: Colors.primary, // Warm Lime
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 8,
    transform: [{ scale: 1.05 }],
  },
  iconSquircleInactive: {
    backgroundColor: 'rgba(21, 25, 13, 0.65)',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  tabIcon: {
    fontSize: 20,
  },
  tabIconActive: {
    transform: [{ scale: 1.05 }],
  },
  tabIconInactive: {
    opacity: 0.85,
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  tabLabelActive: {
    color: Colors.primary,
    fontWeight: '800',
  },
  tabLabelInactive: {
    color: Colors.textMuted,
  },
  activeDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.primary,
    marginTop: 3,
  },
  slipSquircle: {
    backgroundColor: 'rgba(207, 255, 116, 0.18)',
    borderWidth: 1.5,
    borderColor: Colors.primary,
    position: 'relative',
  },
  slipIcon: {
    fontSize: 19,
  },
  slipBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: Colors.primary,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  slipBadgeText: {
    color: Colors.textInverse,
    fontSize: 10,
    fontWeight: '900',
  },
  slipLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: Colors.primary,
  },
});

export default TabNavigation;
