/**
 * Supported Sports and Betting Categories
 */

export const Sports = [
  {
    id: 'basketball',
    name: 'Basketball',
    icon: '🏀',
    leagues: ['NBA', 'EuroLeague', 'NCAA Basketball', 'Liga ACB'],
    defaultMarket: 'Moneyline & Spread',
    markets: ['Moneyline', 'Spread', 'Total Points (Over/Under)', 'Player Points'],
  },
  {
    id: 'football',
    name: 'Football',
    icon: '⚽',
    leagues: ['Premier League', 'UEFA Champions League', 'La Liga', 'Serie A', 'Bundesliga'],
    defaultMarket: 'Match Result (1X2)',
    markets: ['Match Result', 'Both Teams to Score (BTTS)', 'Over/Under 2.5 Goals', 'Double Chance'],
  },
  {
    id: 'tennis',
    name: 'Tennis',
    icon: '🎾',
    leagues: ['ATP Masters', 'WTA Tour', 'Wimbledon', 'US Open'],
    defaultMarket: 'Match Winner',
    markets: ['Match Winner', 'Set Handicap', 'Total Games Over/Under'],
  },
  {
    id: 'american_football',
    name: 'American Football',
    icon: '🏈',
    leagues: ['NFL', 'NCAA Football'],
    defaultMarket: 'Spread & Total',
    markets: ['Moneyline', 'Point Spread', 'Total Points Over/Under'],
  },
  {
    id: 'baseball',
    name: 'Baseball',
    icon: '⚾',
    leagues: ['MLB', 'NPB Japan'],
    defaultMarket: 'Moneyline',
    markets: ['Moneyline', 'Run Line (-1.5)', 'Total Runs Over/Under'],
  },
  {
    id: 'mma',
    name: 'MMA / UFC',
    icon: '🥊',
    leagues: ['UFC', 'Bellator', 'PFL'],
    defaultMarket: 'Bout Winner',
    markets: ['Moneyline Winner', 'Method of Victory', 'Round Over/Under'],
  },
];

export const getSportById = (id) => {
  return Sports.find((s) => s.id === id) || Sports[0];
};

export default Sports;
