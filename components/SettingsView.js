import React, { useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Colors, Config } from '../constants';
import { geminiService } from '../services/geminiService';

export const SettingsView = () => {
  const [apiKey, setApiKey] = useState(geminiService.getApiKey());
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [oddsFormat, setOddsFormat] = useState('decimal');
  const [minConfidence, setMinConfidence] = useState(Config.minConfidenceThreshold.toString());

  const handleSaveApiKey = () => {
    if (!apiKey.trim()) {
      Alert.alert('Invalid Key', 'Please enter a valid Gemini API Key.');
      return;
    }
    geminiService.setApiKey(apiKey);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Gemini AI Configuration */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Google Gemini AI Integration</Text>
          <View style={styles.aiPill}>
            <Text style={styles.aiPillText}>v3.8 Flash</Text>
          </View>
        </View>

        <Text style={styles.desc}>
          Live predictions, match modeling, and reasoning are powered by the Gemini Generative Language API.
        </Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Gemini API Key:</Text>
          <TextInput
            style={styles.keyInput}
            value={apiKey}
            onChangeText={setApiKey}
            placeholder="Enter Gemini API Key..."
            placeholderTextColor={Colors.textMuted}
            autoCapitalize="none"
            secureTextEntry={false}
          />
        </View>

        <TouchableOpacity
          style={[styles.saveBtn, savedSuccess && styles.saveBtnSuccess]}
          onPress={handleSaveApiKey}
          activeOpacity={0.8}
        >
          <Text style={styles.saveBtnText}>
            {savedSuccess ? '✓ API Key Saved & Active' : 'Update Gemini API Key'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Model Confidence Calibration */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Prediction Threshold Calibration</Text>
        <Text style={styles.desc}>
          Strict filter ensuring only picks with statistical model confidence meeting or exceeding this cutoff are displayed.
        </Text>

        <View style={styles.thresholdRow}>
          {['93.0', '94.0', '95.0'].map((threshold) => (
            <TouchableOpacity
              key={threshold}
              style={[
                styles.thresholdBtn,
                minConfidence === threshold && styles.thresholdBtnActive,
              ]}
              onPress={() => setMinConfidence(threshold)}
            >
              <Text
                style={[
                  styles.thresholdText,
                  minConfidence === threshold && styles.thresholdTextActive,
                ]}
              >
                {threshold}%+
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Odds Format */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Preferred Odds Format</Text>
        <View style={styles.oddsFormatRow}>
          {[
            { id: 'decimal', label: 'Decimal (2.10)' },
            { id: 'american', label: 'American (+110)' },
            { id: 'fractional', label: 'Fractional (11/10)' },
          ].map((fmt) => (
            <TouchableOpacity
              key={fmt.id}
              style={[
                styles.formatBtn,
                oddsFormat === fmt.id && styles.formatBtnActive,
              ]}
              onPress={() => setOddsFormat(fmt.id)}
            >
              <Text
                style={[
                  styles.formatText,
                  oddsFormat === fmt.id && styles.formatTextActive,
                ]}
              >
                {fmt.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* App Details */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>SUPERBET Frontend</Text>
        <Text style={styles.appInfoText}>
          Version: <Text style={styles.whiteText}>1.0.0</Text>
        </Text>
        <Text style={styles.appInfoText}>
          Brand Palette: <Text style={styles.limeText}>Warm Lime (#CFFF74)</Text> &{' '}
          <Text style={styles.whiteText}>Olive Ink (#2F3A1D)</Text>
        </Text>
        <Text style={styles.appInfoText}>
          Repository:{' '}
          <Text style={styles.limeText}>https://github.com/beastcodes27/superbet-front.git</Text>
        </Text>
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
  card: {
    backgroundColor: Colors.cardHighlight,
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardTitle: {
    color: Colors.text,
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 6,
  },
  aiPill: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  aiPillText: {
    color: Colors.textInverse,
    fontSize: 10,
    fontWeight: '900',
  },
  desc: {
    color: Colors.textMuted,
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 14,
  },
  inputGroup: {
    marginBottom: 14,
  },
  label: {
    color: Colors.text,
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 6,
  },
  keyInput: {
    backgroundColor: Colors.card,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: Colors.primary,
    fontSize: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  saveBtn: {
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveBtnSuccess: {
    backgroundColor: '#4ADE80',
  },
  saveBtnText: {
    color: Colors.textInverse,
    fontSize: 13,
    fontWeight: '800',
  },
  thresholdRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 6,
  },
  thresholdBtn: {
    flex: 1,
    backgroundColor: Colors.card,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  thresholdBtnActive: {
    borderColor: Colors.primary,
    backgroundColor: 'rgba(207, 255, 116, 0.15)',
  },
  thresholdText: {
    color: Colors.textMuted,
    fontSize: 13,
    fontWeight: '700',
  },
  thresholdTextActive: {
    color: Colors.primary,
    fontWeight: '900',
  },
  oddsFormatRow: {
    gap: 8,
    marginTop: 6,
  },
  formatBtn: {
    backgroundColor: Colors.card,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  formatBtnActive: {
    borderColor: Colors.primary,
    backgroundColor: 'rgba(207, 255, 116, 0.12)',
  },
  formatText: {
    color: Colors.textMuted,
    fontSize: 13,
    fontWeight: '600',
  },
  formatTextActive: {
    color: Colors.primary,
    fontWeight: '800',
  },
  appInfoText: {
    color: Colors.textMuted,
    fontSize: 12,
    marginBottom: 4,
  },
  whiteText: {
    color: Colors.text,
    fontWeight: '700',
  },
  limeText: {
    color: Colors.primary,
    fontWeight: '700',
  },
});

export default SettingsView;
