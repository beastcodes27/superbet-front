/**
 * Date Filter Options and Timeframe Helpers
 */

export const DateFilters = [
  { id: 'today', label: 'Today', shortLabel: 'Today' },
  { id: 'tomorrow', label: 'Tomorrow', shortLabel: 'Tmrw' },
  { id: 'weekend', label: 'This Weekend', shortLabel: 'Wknd' },
  { id: 'upcoming', label: 'Next 7 Days', shortLabel: '7 Days' },
];

export const formatDate = (date) => {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
};

export const formatTime = (timeStr) => {
  if (!timeStr) return '';
  return timeStr;
};

export const isDateMatch = (matchDateString, filterId) => {
  const now = new Date();
  const todayStr = now.toISOString().split('T')[0];

  const tomorrow = new Date(now);
  tomorrow.setDate(now.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split('T')[0];

  if (filterId === 'today') {
    return matchDateString === todayStr;
  }
  if (filterId === 'tomorrow') {
    return matchDateString === tomorrowStr;
  }
  if (filterId === 'weekend') {
    // Check if match day is Friday, Saturday, or Sunday
    const matchDate = new Date(matchDateString);
    const day = matchDate.getDay();
    return day === 5 || day === 6 || day === 0;
  }
  return true; // 'upcoming'
};

export default DateFilters;
