/**
 * Local In-Memory & Storage State Manager for Bets and Preferences
 */

class StorageService {
  constructor() {
    this.betSlip = [];
    this.betHistory = [
      {
        id: 'hist-1',
        date: new Date(Date.now() - 86400000).toLocaleDateString(),
        match: 'Boston Celtics vs LA Lakers',
        pick: 'Celtics -5.5 Spread',
        odds: 1.90,
        stake: 50,
        returnPayout: 95.0,
        status: 'WON',
        confidence: 94.8,
      },
      {
        id: 'hist-2',
        date: new Date(Date.now() - 172800000).toLocaleDateString(),
        match: 'Arsenal vs Chelsea',
        pick: 'Arsenal to Win',
        odds: 1.62,
        stake: 100,
        returnPayout: 162.0,
        status: 'WON',
        confidence: 95.4,
      },
    ];
    this.customApiKey = null;
    this.listeners = new Set();
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    for (const listener of this.listeners) {
      listener(this.getState());
    }
  }

  getState() {
    return {
      betSlip: [...this.betSlip],
      betHistory: [...this.betHistory],
      customApiKey: this.customApiKey,
    };
  }

  addToBetSlip(item) {
    const exists = this.betSlip.find((b) => b.id === item.id);
    if (!exists) {
      this.betSlip.push(item);
      this.notify();
    }
  }

  removeFromBetSlip(id) {
    this.betSlip = (this.betSlip || []).filter((b) => b.id !== id);
    this.notify();
  }

  clearBetSlip() {
    this.betSlip = [];
    this.notify();
  }

  placeBets(stakePerBet, totalReturn) {
    const newHistoryItems = this.betSlip.map((item) => ({
      id: `placed-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      date: new Date().toLocaleDateString(),
      match: `${item.homeTeam} vs ${item.awayTeam}`,
      pick: item.recommendedPick || item.pick,
      odds: item.pickOdds || item.odds,
      stake: stakePerBet,
      returnPayout: totalReturn,
      status: 'PENDING',
      confidence: item.confidence,
    }));

    this.betHistory = [...newHistoryItems, ...this.betHistory];
    this.betSlip = [];
    this.notify();
    return true;
  }
}

export const storageService = new StorageService();
export default storageService;
