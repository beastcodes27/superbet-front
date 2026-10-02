/**
 * Comprehensive Match Fixtures Database
 * Covers Basketball, Football, Tennis, American Football, Baseball, MMA
 * With dynamically computed relative dates (Today, Tomorrow, Weekend)
 */

const getRelativeDate = (offsetDays) => {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().split('T')[0];
};

// Offsets
const TODAY = getRelativeDate(0);
const TOMORROW = getRelativeDate(1);
const WEEKEND = getRelativeDate(2);
const NEXT_WEEK = getRelativeDate(4);

export const MockMatches = [
  // --- BASKETBALL (User's primary focus) ---
  {
    id: 'bball-1',
    sport: 'basketball',
    league: 'NBA',
    homeTeam: 'Boston Celtics',
    awayTeam: 'Los Angeles Lakers',
    homeShort: 'BOS',
    awayShort: 'LAL',
    date: TODAY,
    time: '20:00 EST',
    venue: 'TD Garden, Boston',
    status: 'Upcoming',
    odds: {
      home: 1.48,
      away: 2.75,
      spread: 'BOS -5.5',
      spreadOdds: 1.90,
      overUnder: 'Over 226.5',
      overUnderOdds: 1.92,
    },
    prediction: {
      recommendedPick: 'Boston Celtics -5.5 Spread',
      market: 'Spread',
      pickOdds: 1.90,
      confidence: 94.8, // 93%+ High Confidence
      isSuperPick: false,
      predictedScore: 'BOS 119 - 107 LAL',
      aiSummary:
        'Gemini analysis detects a massive perimeter offensive rating edge for Boston (+9.8 net rating at home). Lakers interior defense is severely compromised with Anthony Davis managing minutes on the second night of a back-to-back.',
      keyFactors: [
        'Celtics are 18-2 ATS following a home loss this season',
        'Lakers allowing 121.4 PPG on zero days of rest',
        'Tatum and Brown averaging combined 56.4 PPG against bottom-10 pick-and-roll defenses',
        'Boston 3-point frequency is 44.2% vs Lakers perimeter coverage yielding 39% opponent 3PT%',
      ],
      h2h: 'Boston won 4 of last 5 matchups by an average margin of 9.2 points',
      riskRating: 'Low Risk • High Value',
      recommendedStake: '3 Units (Strong Confidence)',
      probability: '74.2% cover probability against the spread',
    },
  },
  {
    id: 'bball-2',
    sport: 'basketball',
    league: 'NBA',
    homeTeam: 'Golden State Warriors',
    awayTeam: 'Milwaukee Bucks',
    homeShort: 'GSW',
    awayShort: 'MIL',
    date: TODAY,
    time: '22:30 EST',
    venue: 'Chase Center, San Francisco',
    status: 'Upcoming',
    odds: {
      home: 1.75,
      away: 2.15,
      spread: 'GSW -2.5',
      spreadOdds: 1.91,
      overUnder: 'Over 231.5',
      overUnderOdds: 1.88,
    },
    prediction: {
      recommendedPick: 'Total Points OVER 231.5',
      market: 'Totals (Over/Under)',
      pickOdds: 1.88,
      confidence: 93.6, // 93%+ High Confidence
      isSuperPick: false,
      predictedScore: 'GSW 122 - 118 MIL',
      aiSummary:
        'Both teams rank in the top 5 in overall offensive pace (Warriors 101.8, Bucks 102.4). Bucks backcourt defense ranks 24th in points allowed to opposing shooting guards, creating prime scoring bursts for Curry and Thompson.',
      keyFactors: [
        'Over has hit in 7 of the last 8 meetings between these teams',
        'Bucks defensive rating drops from 111.2 to 118.9 when traveling West Coast',
        'Fast break points projected at 38.5 combined',
        'Zero key perimeter defenders on active rotation for Milwaukee',
      ],
      h2h: 'Last 3 meetings averaged 243.6 total points',
      riskRating: 'Low Risk • Value Totals',
      recommendedStake: '2.5 Units',
      probability: '71.8% over probability',
    },
  },
  {
    id: 'bball-3',
    sport: 'basketball',
    league: 'EuroLeague',
    homeTeam: 'Real Madrid Baloncesto',
    awayTeam: 'FC Barcelona',
    homeShort: 'RMB',
    awayShort: 'BAR',
    date: TOMORROW,
    time: '20:45 CET',
    venue: 'WiZink Center, Madrid',
    status: 'Upcoming',
    odds: {
      home: 1.40,
      away: 3.10,
      spread: 'RMB -6.5',
      spreadOdds: 1.92,
      overUnder: 'Under 164.5',
      overUnderOdds: 1.87,
    },
    prediction: {
      recommendedPick: 'Real Madrid Moneyline & Under 168.5',
      market: 'Combo Moneyline + Under',
      pickOdds: 2.15,
      confidence: 96.2, // 95%+ SuperPick
      isSuperPick: true,
      predictedScore: 'RMB 84 - 72 BAR',
      aiSummary:
        'EL Clásico EuroLeague clash where Real Madrid rim protection via Walter Tavares shuts down Barcelona paint drives. Madrid is 15-1 at WiZink Center in European competitions this season with dominant defensive efficiency.',
      keyFactors: [
        'Real Madrid allows lowest 2-point FG% in Europe (44.1%)',
        'Barcelona shooting 28.4% from three on road games this month',
        'Tavares + Poirier rebound advantage projected at +8.4 boards',
        'Barcelona missing primary playmaker Laprovittola due to groin soreness',
      ],
      h2h: 'Madrid defeated Barcelona in last 2 Supercopa and EuroLeague meetings',
      riskRating: 'Very Low Risk • SuperPick',
      recommendedStake: '4 Units (Elite Pick)',
      probability: '82.5% outright win probability',
    },
  },
  {
    id: 'bball-4',
    sport: 'basketball',
    league: 'NBA',
    homeTeam: 'Denver Nuggets',
    awayTeam: 'Phoenix Suns',
    homeShort: 'DEN',
    awayShort: 'PHX',
    date: TOMORROW,
    time: '21:00 EST',
    venue: 'Ball Arena, Denver (Altitude)',
    status: 'Upcoming',
    odds: {
      home: 1.55,
      away: 2.50,
      spread: 'DEN -4.5',
      spreadOdds: 1.91,
      overUnder: 'Over 222.0',
      overUnderOdds: 1.90,
    },
    prediction: {
      recommendedPick: 'Denver Nuggets -4.5 Spread',
      market: 'Spread',
      pickOdds: 1.91,
      confidence: 94.2, // 93%+ High Confidence
      isSuperPick: false,
      predictedScore: 'DEN 116 - 106 PHX',
      aiSummary:
        'Nikola Jokic efficiency against Jusuf Nurkic is historically elite (64.2% TS). Denver home court altitude factor creates notable 4th quarter scoring drop-off for visiting backcourts.',
      keyFactors: [
        'Nuggets have 24-4 home record when Jokic and Murray both play',
        'Suns bench scoring ranks 27th in the league',
        'Denver assists/possession ratio is 68.4% vs Suns 57.1%',
        'Phoenix fatigue rating elevated after overtime finish 48h prior',
      ],
      h2h: 'Denver 6-1 straight up in last 7 home games against Phoenix',
      riskRating: 'Low Risk • High Value',
      recommendedStake: '3 Units',
      probability: '72.9% cover probability',
    },
  },
  {
    id: 'bball-5',
    sport: 'basketball',
    league: 'EuroLeague',
    homeTeam: 'Olympiacos BC',
    awayTeam: 'AS Monaco',
    homeShort: 'OLY',
    awayShort: 'MON',
    date: WEEKEND,
    time: '20:15 CET',
    venue: 'Peace and Friendship Stadium, Piraeus',
    status: 'Upcoming',
    odds: {
      home: 1.62,
      away: 2.35,
      spread: 'OLY -3.5',
      spreadOdds: 1.90,
      overUnder: 'Under 159.5',
      overUnderOdds: 1.89,
    },
    prediction: {
      recommendedPick: 'Olympiacos BC Moneyline',
      market: 'Moneyline',
      pickOdds: 1.62,
      confidence: 93.9, // 93%+ High Confidence
      isSuperPick: false,
      predictedScore: 'OLY 81 - 74 MON',
      aiSummary:
        'Bartzokas half-court defensive scheme traps Mike James effectively in ball-screen sets. Piraeus atmosphere has produced an 88% win rate in high-leverage European fixtures.',
      keyFactors: [
        'Olympiacos 1st in defensive turnover generation',
        'Monaco commits 14.8 turnovers on Greek soil historically',
        'Home rebounding percentage of 54.8%',
      ],
      h2h: 'Olympiacos 3-1 in last 4 direct clashes',
      riskRating: 'Low Risk',
      recommendedStake: '2.5 Units',
      probability: '75.1% win probability',
    },
  },
  {
    id: 'bball-6',
    sport: 'basketball',
    league: 'NCAA Basketball',
    homeTeam: 'Duke Blue Devils',
    awayTeam: 'North Carolina Tar Heels',
    homeShort: 'DUKE',
    awayShort: 'UNC',
    date: WEEKEND,
    time: '18:00 EST',
    venue: 'Cameron Indoor Stadium',
    status: 'Upcoming',
    odds: {
      home: 1.60,
      away: 2.40,
      spread: 'DUKE -3.5',
      spreadOdds: 1.91,
      overUnder: 'Over 148.5',
      overUnderOdds: 1.88,
    },
    prediction: {
      recommendedPick: 'Duke Blue Devils -3.5 Spread',
      market: 'Spread',
      pickOdds: 1.91,
      confidence: 93.1, // 93%+ High Confidence
      isSuperPick: false,
      predictedScore: 'DUKE 79 - 72 UNC',
      aiSummary:
        'Duke freshman frontcourt size creates significant matchup issues on defensive glass. Cameron Indoor home court edge worth 4.2 points in analytical models.',
      keyFactors: [
        'Duke 12-1 ATS at home against ACC opponents',
        'Tar Heels transition scoring limited by Duke 4-back transition scheme',
      ],
      h2h: 'Teams split last 4, home team covered in 3 of 4',
      riskRating: 'Moderate Risk • High Reward',
      recommendedStake: '2 Units',
      probability: '69.4% cover probability',
    },
  },

  // --- FOOTBALL / SOCCER ---
  {
    id: 'foot-1',
    sport: 'football',
    league: 'Premier League',
    homeTeam: 'Arsenal FC',
    awayTeam: 'Chelsea FC',
    homeShort: 'ARS',
    awayShort: 'CHE',
    date: TODAY,
    time: '17:30 GMT',
    venue: 'Emirates Stadium, London',
    status: 'Upcoming',
    odds: {
      home: 1.62,
      draw: 4.10,
      away: 5.25,
      btts: 'Yes 1.70 / No 2.10',
      overUnder: 'Over 2.5 @ 1.65',
    },
    prediction: {
      recommendedPick: 'Arsenal FC to Win (Moneyline)',
      market: 'Match Result (1X2)',
      pickOdds: 1.62,
      confidence: 95.4, // 95%+ SuperPick
      isSuperPick: true,
      predictedScore: 'ARS 3 - 1 CHE',
      aiSummary:
        'Arteta tactical structure completely overwhelms Chelsea disorganized transition midfield. Arsenal expected goals (xG) at home is 2.45 per 90, while Chelsea allows 1.84 xGA in away London derbies.',
      keyFactors: [
        'Arsenal unbeaten in last 7 Premier League home fixtures',
        'Saka and Odegaard generating 6.2 shot-creating actions per match',
        'Chelsea conceded 2+ goals in 5 of their last 6 road matches against top-6 sides',
        'Saliba and Gabriel partnership ranks #1 in Premier League aerial duel win rate (74%)',
      ],
      h2h: 'Arsenal won 3 and drew 1 of the last 4 London derbies',
      riskRating: 'Very Low Risk • SuperPick',
      recommendedStake: '4 Units (Max Confidence)',
      probability: '78.5% win probability',
    },
  },
  {
    id: 'foot-2',
    sport: 'football',
    league: 'UEFA Champions League',
    homeTeam: 'Manchester City',
    awayTeam: 'Bayern Munich',
    homeShort: 'MCI',
    awayShort: 'BAY',
    date: TOMORROW,
    time: '20:00 CET',
    venue: 'Etihad Stadium, Manchester',
    status: 'Upcoming',
    odds: {
      home: 1.80,
      draw: 3.90,
      away: 4.20,
      btts: 'Yes 1.55',
      overUnder: 'Over 3.0 @ 1.85',
    },
    prediction: {
      recommendedPick: 'Both Teams to Score & Over 2.5 Goals',
      market: 'BTTS + Over 2.5',
      pickOdds: 1.82,
      confidence: 94.1, // 93%+ High Confidence
      isSuperPick: false,
      predictedScore: 'MCI 2 - 2 BAY',
      aiSummary:
        'Erling Haaland vs Harry Kane clash guarantees attacking fire. Both teams average over 2.6 goals scored per Champions League game with aggressive high lines.',
      keyFactors: [
        'Over 2.5 has landed in 85% of Champions League knockout matches for both clubs',
        'Neither defense has kept a clean sheet against a top-4 European opponent this season',
      ],
      h2h: 'Last 3 competitive meetings averaged 3.6 goals',
      riskRating: 'Low Risk • High Value',
      recommendedStake: '3 Units',
      probability: '76.4% goal probability',
    },
  },
  {
    id: 'foot-3',
    sport: 'football',
    league: 'La Liga',
    homeTeam: 'Real Madrid',
    awayTeam: 'Atletico Madrid',
    homeShort: 'RMA',
    awayShort: 'ATM',
    date: WEEKEND,
    time: '21:00 CET',
    venue: 'Santiago Bernabéu, Madrid',
    status: 'Upcoming',
    odds: {
      home: 1.95,
      draw: 3.60,
      away: 3.80,
      btts: 'Yes 1.75',
      overUnder: 'Under 2.5 @ 1.95',
    },
    prediction: {
      recommendedPick: 'Real Madrid Draw No Bet (DNB)',
      market: 'Draw No Bet',
      pickOdds: 1.44,
      confidence: 93.8, // 93%+ High Confidence
      isSuperPick: false,
      predictedScore: 'RMA 2 - 1 ATM',
      aiSummary:
        'Vinicius Jr and Bellingham combination at the Bernabéu produces 1.9 goals per match. Simeone defensive low block struggles when trailing away.',
      keyFactors: [
        'Real Madrid unbeaten at home in all domestic competitions',
        'Atletico have won only 1 in their last 8 visits to the Bernabéu',
      ],
      h2h: 'Madrid 4 wins, 3 draws, 1 loss in last 8 derbies',
      riskRating: 'Low Risk • High Safety',
      recommendedStake: '3 Units',
      probability: '81.0% DNB safety rating',
    },
  },

  // --- TENNIS ---
  {
    id: 'tennis-1',
    sport: 'tennis',
    league: 'ATP Masters 1000',
    homeTeam: 'Jannik Sinner',
    awayTeam: 'Daniil Medvedev',
    homeShort: 'SIN',
    awayShort: 'MED',
    date: TODAY,
    time: '15:00 GMT',
    venue: 'Center Court',
    status: 'Upcoming',
    odds: {
      home: 1.45,
      away: 2.85,
      spread: 'SIN -3.5 Games @ 1.90',
      overUnder: 'Over 22.5 Games @ 1.85',
    },
    prediction: {
      recommendedPick: 'Jannik Sinner to Win (-3.5 Games)',
      market: 'Game Handicap',
      pickOdds: 1.90,
      confidence: 95.1, // 95%+ SuperPick
      isSuperPick: true,
      predictedScore: '6-4, 6-3',
      aiSummary:
        'Sinner dominant hard-court baseline power has solved the Medvedev deep return positioning. Sinner holds 91.4% service games on indoor/fast hard courts.',
      keyFactors: [
        'Sinner won 5 of the last 6 head-to-head meetings',
        'Medvedev 2nd serve return points won has dropped to 46% against top-5 players',
        'Sinner unforced error rate under 14 per set over the past 3 tournaments',
      ],
      h2h: 'Sinner leads recent trend 5-1',
      riskRating: 'Very Low Risk • SuperPick',
      recommendedStake: '4 Units',
      probability: '84.0% win probability',
    },
  },
  {
    id: 'tennis-2',
    sport: 'tennis',
    league: 'ATP Tour',
    homeTeam: 'Carlos Alcaraz',
    awayTeam: 'Alexander Zverev',
    homeShort: 'ALC',
    awayShort: 'ZVE',
    date: TOMORROW,
    time: '19:00 CET',
    venue: 'Stadium 1',
    status: 'Upcoming',
    odds: {
      home: 1.50,
      away: 2.65,
      spread: 'ALC -2.5 Games @ 1.85',
      overUnder: 'Over 23.0 Games @ 1.90',
    },
    prediction: {
      recommendedPick: 'Carlos Alcaraz Match Winner',
      market: 'Match Winner',
      pickOdds: 1.50,
      confidence: 93.5, // 93%+ High Confidence
      isSuperPick: false,
      predictedScore: '7-6, 6-4',
      aiSummary:
        'Alcaraz drop shots and variation disrupt Zverev lateral movement. Alcaraz break point conversion rate stands at 48.2% this week.',
      keyFactors: [
        'Alcaraz 82% win rate in night session matches',
        'Zverev second serve double faults increase under pressure (avg 4.2 per match)',
      ],
      h2h: 'Tied 5-5 overall, but Alcaraz won 2 of last 3',
      riskRating: 'Low Risk',
      recommendedStake: '3 Units',
      probability: '76.8% win probability',
    },
  },

  // --- AMERICAN FOOTBALL (NFL) ---
  {
    id: 'nfl-1',
    sport: 'american_football',
    league: 'NFL',
    homeTeam: 'Kansas City Chiefs',
    awayTeam: 'Buffalo Bills',
    homeShort: 'KC',
    awayShort: 'BUF',
    date: WEEKEND,
    time: '16:25 EST',
    venue: 'GEHA Field at Arrowhead Stadium',
    status: 'Upcoming',
    odds: {
      home: 1.72,
      away: 2.20,
      spread: 'KC -2.5 @ 1.91',
      overUnder: 'Over 47.5 @ 1.90',
    },
    prediction: {
      recommendedPick: 'Kansas City Chiefs Moneyline',
      market: 'Moneyline',
      pickOdds: 1.72,
      confidence: 94.4, // 93%+ High Confidence
      isSuperPick: false,
      predictedScore: 'KC 27 - 23 BUF',
      aiSummary:
        'Spagnuolo blitz scheme consistently forces Josh Allen into checkdowns. Patrick Mahomes at home in high-stakes winter games is 16-2 straight up.',
      keyFactors: [
        'Chiefs defense allows only 16.8 PPG at Arrowhead',
        'Bills secondary missing key starting free safety',
        'Chiefs 3rd down conversion rate 48.1% (3rd in NFL)',
      ],
      h2h: 'Mahomes 3-0 against Allen in postseason/pivotal playoff matchups',
      riskRating: 'Low Risk • High Value',
      recommendedStake: '3 Units',
      probability: '74.5% win probability',
    },
  },

  // --- MMA / UFC ---
  {
    id: 'mma-1',
    sport: 'mma',
    league: 'UFC',
    homeTeam: 'Islam Makhachev',
    awayTeam: 'Arman Tsarukyan',
    homeShort: 'MAK',
    awayShort: 'TSA',
    date: WEEKEND,
    time: '23:00 EST',
    venue: 'T-Mobile Arena, Las Vegas',
    status: 'Upcoming',
    odds: {
      home: 1.38,
      away: 3.15,
      overUnder: 'Over 3.5 Rounds @ 1.75',
    },
    prediction: {
      recommendedPick: 'Islam Makhachev to Win by Decision or Submission',
      market: 'Double Chance Method of Victory',
      pickOdds: 1.55,
      confidence: 96.0, // 95%+ SuperPick
      isSuperPick: true,
      predictedScore: 'Round 4 Submission or Unanimous Decision',
      aiSummary:
        'Makhachev elite sambo wrestling control, chain takedowns, and counter-striking accuracy nullify Tsarukyan aggressive forward pressure over 5 championship rounds.',
      keyFactors: [
        'Makhachev has landed 65% of takedowns against ranked opponents',
        'Tsarukyan has never faced a 5-round wrestling pace of this caliber',
        'Makhachev strike absorption rate is lowest in lightweight division (1.24 per min)',
      ],
      h2h: 'Makhachev defeated Tsarukyan in their first encounter (2019)',
      riskRating: 'Very Low Risk • SuperPick',
      recommendedStake: '4 Units',
      probability: '83.2% victory probability',
    },
  },
];

export const getMatchesBySportAndDate = (sportId, dateFilterId) => {
  const matches = Array.isArray(MockMatches) ? MockMatches : [];
  return matches.filter((match) => {
    const matchesSport = !sportId || match.sport === sportId;
    const matchesDate = !dateFilterId || dateFilterId === 'all'
      ? true
      : match.date === getRelativeDate(
          dateFilterId === 'today' ? 0 : dateFilterId === 'tomorrow' ? 1 : 2
        ) || dateFilterId === 'upcoming';
    return matchesSport && matchesDate;
  });
};

export default MockMatches;
