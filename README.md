# SUPERBET ⚡ AI Sports Betting Prediction App

> **93%+ Accuracy-Filtered Quantitative Sports Predictions Powered by Google Gemini AI**

SUPERBET is a next-generation sports prediction platform built with **Expo SDK 57** and **React Native**. It incorporates a **Google Gemini 1.5** predictive model to evaluate upcoming fixtures across basketball, football, tennis, and more—surfacing only high-confidence betting opportunities meeting or exceeding a strict **93%+ probability threshold**.

---

## 🎨 Brand Design Tokens

The application features a modern high-contrast aesthetic tailored for sports gaming:
* **Primary (Warm Lime)**: `HEX: #CFFF74` — Highlighting active states, primary CTA buttons, odds pills, and SuperPick badges.
* **Secondary (Olive Ink)**: `HEX: #2F3A1D` — Grounding surface cards, header tags, and structural containers.
* **Deep Canvas**: `#15190D` — Deep dark canvas for maximum readability and contrast.

---

## 🚀 Key Features

### 1. 🏀 Multi-Sport & Fixture Selection
* **Basketball First**: NBA, EuroLeague, and NCAA fixtures with detailed spread, moneyline, and total points modeling.
* **Football (Soccer)**: Premier League, UEFA Champions League, La Liga, and Serie A.
* **Tennis**: ATP Masters, WTA Tour, and Grand Slam matchups.
* **American Football, Baseball & Combat Sports**: NFL, MLB, and UFC championship fights.

### 2. 📅 Match Day Timeframe Filtering
* **Today**: Instant access to live and upcoming fixtures scheduled today.
* **Tomorrow**: Advance day-before edge detection.
* **This Weekend**: High-volume weekend fixtures and multi-game parlays.
* **Next 7 Days**: Comprehensive upcoming schedule.

### 3. 🧠 Google Gemini 1.5 AI Integration
* **Deep Match Dossier**: Explores tactical matchups, rest advantages, injury impacts, shot quality ratings, and line movement.
* **Live AI Refresh**: Directly triggers real-time query re-computation against the Gemini 1.5 API.
* **Interactive AI Analyst**: Dedicated chat consultation room where users can query Gemini about specific matchups, player props, or custom parlays.

### 4. ⚡ 93%+ Verified High-Confidence Filter
* Built-in statistical filter that automatically isolates picks with `>= 93.0%` analytical confidence.
* Visual distinctions between **High Confidence** (`93.0% - 94.9%`) and **SuperPick** (`>= 95.0%`).

### 5. 📋 Simulated Bet Slip & Parlay Calculator
* Single and Multi/Parlay accumulator calculations.
* Real-time potential payout computation based on wager amounts.
* Bet tracking log with historical win/loss audit.

### 6. ⚙️ Settings & Configuration
* Integrated Gemini API Key manager with user-customizable overrides.
* Configurable confidence cutoff sensitivity (93.0%, 94.0%, 95.0%).
* Odds format switcher (Decimal, American, Fractional).

---

## 📂 Project Architecture

```
SUPERBET/
├── App.js                      # Root application & screen controller
├── constants/
│   ├── colors.js               # Brand tokens (Warm Lime & Olive Ink)
│   ├── theme.js                # Typography, spacing & border tokens
│   ├── config.js               # Gemini credentials & prediction thresholds
│   ├── sports.js               # Supported sports & market categories
│   ├── dates.js                # Match day timeframe helpers
│   └── index.js
├── data/
│   └── mockMatches.js          # Fixture database across sports & dates
├── services/
│   ├── geminiService.js        # Gemini REST API client & prompt builder
│   ├── predictionEngine.js     # 93%+ filter & parlay payout calculator
│   ├── storageService.js       # Bet slip & tracker state manager
│   └── index.js
├── components/
│   ├── Header.js               # Brand header with AI status tag
│   ├── SportSelector.js        # Horizontal scrolling sports carousel
│   ├── DateFilter.js           # Match day filter selector
│   ├── ConfidenceFilter.js     # 93%+ toggle & match count badge
│   ├── PredictionCard.js       # High-confidence prediction card
│   ├── MatchDetailModal.js     # Full Gemini AI breakdown dossier
│   ├── BetSlipModal.js         # Parlay bet slip & stake calculator
│   ├── AIAnalystView.js        # Interactive AI chat with Gemini
│   ├── StatsTrackerView.js     # 93%+ accuracy rate historical audit
│   ├── SettingsView.js         # API Key & preferences manager
│   ├── TabNavigation.js        # Bottom navigation bar
│   └── index.js
├── scripts/
│   └── testSuite.mjs           # Automated verification test suite
└── package.json
```

---

## 🛠️ Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Verification Suite
```bash
npm test
```

### 3. Start Expo Development Server
```bash
npm start
# or
npm run web
```

---

## 🔗 Repository
* **GitHub**: [https://github.com/beastcodes27/superbet-front.git](https://github.com/beastcodes27/superbet-front.git)
