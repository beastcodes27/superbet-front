/**
 * SUPERBET Application Configuration
 */

export const Config = {
  appName: 'SUPERBET',
  tagline: 'AI-Powered 93%+ Sports Predictions',
  version: '1.0.0',

  // Google Gemini AI Configuration
  // Default API Key provided via environment variable or in-app settings
  defaultGeminiApiKey: process.env.EXPO_PUBLIC_GEMINI_API_KEY || '',
  geminiModel: 'gemini-3.5-flash-lite',
  fallbackModels: ['gemini-3.5-flash-lite', 'gemini-3.8-flash', 'gemini-flash-latest'],
  geminiApiEndpoint: 'https://generativelanguage.googleapis.com/v1beta/models',

  // Confidence & Prediction Engine Parameters
  minConfidenceThreshold: 93.0, // 93%+ High Confidence Filter
  superPickThreshold: 95.0,    // 95%+ Elite SuperPick
  defaultOddsFormat: 'decimal', // 'decimal' | 'american' | 'fractional'

  // Refresh & Cache
  cacheTtlMinutes: 30,
  maxDailyRequests: 100,
};

export default Config;
