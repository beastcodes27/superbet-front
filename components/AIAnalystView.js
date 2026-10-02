import React, { useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Colors } from '../constants';
import { geminiService } from '../services/geminiService';
import Icon from './icons/Icon.js';

export const AIAnalystView = ({ currentSport = 'Basketball' }) => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      sender: 'ai',
      text: `Welcome to SUPERBET AI Analyst powered by **Google Gemini 3.5 Flash Lite**.\n\nI specialize in filtering high-confidence sports betting opportunities (rated **93%+ probability**). Ask me about any fixture, player props, or value spreads!`,
    },
  ]);

  const quickPrompts = [
    { icon: 'basketball', text: 'Top 93%+ Basketball Spread Pick for Today' },
    { icon: 'bolt', text: 'High-Probability NBA Totals (Over/Under)' },
    { icon: 'target', text: 'Safe 2-Leg EuroLeague & NBA Parlay' },
    { icon: 'football', text: 'Premier League Goal Value Breakdown' },
  ];

  const handleSend = async (userPrompt) => {
    const textToSend = userPrompt || query;
    if (!textToSend.trim()) return;

    const userMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend,
    };

    setMessages((prev) => [...prev, userMessage]);
    setQuery('');
    setLoading(true);

    try {
      const response = await geminiService.askAnalyst(textToSend, currentSport);
      const aiMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: response,
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: '⚠️ An error occurred while contacting the Gemini model. Please check your network or API key in Settings.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Gemini AI Sports Analyst</Text>
          <Text style={styles.headerSubtitle}>
            Active Sport: <Text style={styles.sportBadge}>{currentSport}</Text>
          </Text>
        </View>
        <View style={styles.statusPill}>
          <View style={styles.statusDot} />
          <Text style={styles.statusText}>93%+ Filter Ready</Text>
        </View>
      </View>

      {/* Messages */}
      <ScrollView
        style={styles.messageScroll}
        contentContainerStyle={styles.messageContainer}
        showsVerticalScrollIndicator={false}
      >
        {messages.map((msg) => (
          <View
            key={msg.id}
            style={[
              styles.bubble,
              msg.sender === 'user' ? styles.userBubble : styles.aiBubble,
            ]}
          >
            {msg.sender === 'ai' && (
              <View style={styles.aiSenderHeader}>
                <View style={styles.geminiSparkle} />
                <Text style={styles.aiSenderLabel}>GEMINI 1.5 ANALYST</Text>
              </View>
            )}
            <Text
              style={[
                styles.bubbleText,
                msg.sender === 'user' ? styles.userBubbleText : styles.aiBubbleText,
              ]}
            >
              {msg.text}
            </Text>
          </View>
        ))}

        {loading && (
          <View style={styles.loadingBubble}>
            <ActivityIndicator color={Colors.primary} size="small" />
            <Text style={styles.loadingText}>Gemini is calculating match probability...</Text>
          </View>
        )}
      </ScrollView>

      {/* Quick Prompts */}
      <View style={styles.promptsContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.promptsScroll}>
          {quickPrompts.map((p, i) => (
            <TouchableOpacity
              key={i}
              style={styles.promptChip}
              onPress={() => handleSend(p.text)}
              activeOpacity={0.8}
            >
              <Icon name={p.icon} size={13} color={Colors.primary} />
              <Text style={styles.promptChipText}>{p.text}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Input Row */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={query}
          onChangeText={setQuery}
          placeholder="Ask Gemini about a match, spread, or player..."
          placeholderTextColor={Colors.textMuted}
          onSubmitEditing={() => handleSend()}
        />
        <TouchableOpacity
          style={[styles.sendButton, !query.trim() && styles.sendButtonDisabled]}
          onPress={() => handleSend()}
          disabled={!query.trim() || loading}
          activeOpacity={0.8}
        >
          <Text style={styles.sendText}>Ask</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    backgroundColor: Colors.cardHighlight,
  },
  headerTitle: {
    color: Colors.text,
    fontSize: 16,
    fontWeight: '800',
  },
  headerSubtitle: {
    color: Colors.textMuted,
    fontSize: 12,
    marginTop: 2,
  },
  sportBadge: {
    color: Colors.primary,
    fontWeight: '700',
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: 5,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.primary,
  },
  statusText: {
    color: Colors.primary,
    fontSize: 10,
    fontWeight: '800',
  },
  messageScroll: {
    flex: 1,
  },
  messageContainer: {
    padding: 16,
    gap: 12,
  },
  bubble: {
    borderRadius: 14,
    padding: 14,
    maxWidth: '88%',
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: Colors.secondaryLight,
    borderBottomRightRadius: 2,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  aiBubble: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.cardHighlight,
    borderBottomLeftRadius: 2,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  aiSenderHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: 6,
  },
  geminiSparkle: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.primary,
  },
  aiSenderLabel: {
    color: Colors.primary,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.6,
  },
  bubbleText: {
    fontSize: 13,
    lineHeight: 20,
  },
  userBubbleText: {
    color: Colors.text,
    fontWeight: '600',
  },
  aiBubbleText: {
    color: Colors.text,
  },
  loadingBubble: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    padding: 12,
    borderRadius: 12,
    gap: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  loadingText: {
    color: Colors.textMuted,
    fontSize: 12,
  },
  promptsContainer: {
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    backgroundColor: Colors.background,
  },
  promptsScroll: {
    paddingHorizontal: 16,
    gap: 8,
  },
  promptChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: 6,
  },
  promptChipText: {
    color: Colors.textMuted,
    fontSize: 12,
    fontWeight: '600',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 12,
    paddingHorizontal: 16,
    paddingBottom: 92, // Clearance for floating iPhone dock
    backgroundColor: Colors.cardHighlight,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    gap: 8,
  },
  input: {
    flex: 1,
    backgroundColor: Colors.card,
    color: Colors.text,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.border,
    fontSize: 13,
  },
  sendButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 18,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
  sendText: {
    color: Colors.textInverse,
    fontSize: 13,
    fontWeight: '800',
  },
});

export default AIAnalystView;
