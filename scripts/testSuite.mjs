/**
 * SUPERBET Automated Verification Suite (ESM)
 */

import { Config } from '../constants/config.js';
import { MockMatches, getMatchesBySportAndDate } from '../data/mockMatches.js';
import {
  filterHighConfidenceMatches,
  calculateParlayOdds,
  calculatePayout,
  calculateExpectedValue,
  getPredictionConfidenceBadge,
} from '../services/predictionEngine.js';

function runTests() {
  console.log('🧪 Starting SUPERBET Verification Suite...\n');

  // Test 1: Config
  console.log('Test 1: App Config & Thresholds');
  if (Config.minConfidenceThreshold !== 93.0) {
    throw new Error('Config minConfidenceThreshold must be 93.0%');
  }
  console.log('  ✓ 93%+ min confidence threshold verified');

  // Test 2: Basketball Fixtures
  console.log('\nTest 2: Basketball Fixtures Data');
  const bballMatches = MockMatches.filter((m) => m.sport === 'basketball');
  if (bballMatches.length < 3) {
    throw new Error('Expected at least 3 basketball matches');
  }
  console.log(`  ✓ Found ${bballMatches.length} basketball matches with rich data`);

  // Test 3: 93%+ Filter
  console.log('\nTest 3: 93%+ High Confidence Filtering');
  const highConfMatches = filterHighConfidenceMatches(MockMatches, 93.0);
  if (highConfMatches.length === 0) {
    throw new Error('High confidence filter returned 0 matches');
  }
  highConfMatches.forEach((m) => {
    if (m.prediction.confidence < 93.0) {
      throw new Error(`Match ${m.id} has confidence ${m.prediction.confidence} < 93.0`);
    }
  });
  console.log(`  ✓ All ${highConfMatches.length} filtered matches have >= 93.0% confidence`);

  // Test 4: Parlay & Payout Calculations
  console.log('\nTest 4: Parlay & Payout Calculations');
  const selections = [{ odds: 1.90 }, { odds: 1.88 }];
  const parlayOdds = calculateParlayOdds(selections);
  const expectedOdds = Number((1.90 * 1.88).toFixed(2));
  if (parlayOdds !== expectedOdds) {
    throw new Error(`Expected parlay odds ${expectedOdds}, got ${parlayOdds}`);
  }
  const payout = calculatePayout(100, parlayOdds);
  if (payout !== Number((100 * parlayOdds).toFixed(2))) {
    throw new Error(`Payout calculation incorrect: ${payout}`);
  }
  console.log(`  ✓ Parlay calculation: 1.90 * 1.88 = ${parlayOdds}x, $100 stake payout = $${payout}`);

  // Test 5: Confidence Badge
  console.log('\nTest 5: Confidence Badging');
  const superPickBadge = getPredictionConfidenceBadge(96.2);
  if (superPickBadge.type !== 'super') {
    throw new Error('Expected super badge for 96.2%');
  }
  const highBadge = getPredictionConfidenceBadge(94.1);
  if (highBadge.type !== 'high') {
    throw new Error('Expected high badge for 94.1%');
  }
  console.log('  ✓ Confidence badge categorization verified (SuperPick vs High Confidence)');

  console.log('\n🎉 ALL TESTS PASSED SUCCESSFULLY! SUPERBET engine is solid.\n');
}

runTests();
