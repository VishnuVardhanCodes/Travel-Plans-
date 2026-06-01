// ─── Achievement Rules Checker ──────────────────────────────────────────────
/**
 * Evaluates the user's travel and expense statistics against badge targets.
 * Returns the progress values for all badges.
 */

import { BADGE_DEFINITIONS } from "./badgeData";

// List of adventure keywords to scan trip notes/destinations
const ADVENTURE_KEYWORDS = [
  "adventure",
  "trek",
  "climb",
  "hike",
  "raft",
  "dive",
  "safari",
  "camp",
  "mountain",
  "explore",
  "forest",
  "wildlife",
  "thrill",
  "backpack",
];

/**
 * Check if a trip is a weekend trip.
 * Definition: Starts on a Friday or Saturday, or has a duration <= 3 days.
 */
export const isWeekendTrip = (trip) => {
  if (!trip.startDate || !trip.endDate) return false;
  const start = new Date(trip.startDate);
  const end = new Date(trip.endDate);
  const durationDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
  
  // Duration of 1-3 days
  if (durationDays > 0 && durationDays <= 3) {
    return true;
  }
  
  // Or starts on Friday (5) or Saturday (6)
  const startDay = start.getDay();
  return startDay === 5 || startDay === 6;
};

/**
 * Check if a trip has adventure-related details.
 */
export const isAdventureTrip = (trip) => {
  const textToScan = `${trip.destination || ""} ${trip.description || ""}`.toLowerCase();
  return ADVENTURE_KEYWORDS.some((keyword) => textToScan.includes(keyword));
};

/**
 * Centralized evaluation function that takes state or a computed stats object,
 * calculates the exact progress for each badge, and checks if it's unlocked.
 * 
 * @param {Object} data
 * @param {Array} data.trips - All trips from the Redux store
 * @param {Array} data.expenses - Expenses from Redux or cached expense mapping
 * @returns {Object} - computed stats and progress map
 */
export const computeTravelStats = (trips = [], expensesMap = {}) => {
  const stats = {
    totalTrips: trips.length,
    completedTrips: trips.filter((t) => t.status === "completed").length,
    totalPlans: trips.filter((t) => t.status === "planned").length + trips.length, // total planning activities
    uniqueDestinations: 0,
    weekendTrips: 0,
    adventureTrips: 0,
    tripsWithinBudget: 0,
    tripsWithExpenses: 0,
  };

  // 1. Unique Destinations
  const destSet = new Set(trips.map((t) => (t.destination || "").trim().toLowerCase()).filter(Boolean));
  stats.uniqueDestinations = destSet.size;

  // 2. Weekend and Adventure trips
  trips.forEach((trip) => {
    if (isWeekendTrip(trip)) {
      stats.weekendTrips += 1;
    }
    if (isAdventureTrip(trip)) {
      stats.adventureTrips += 1;
    }

    // Check budget tracking & expenses
    const tripExpenses = expensesMap[trip._id] || [];
    if (tripExpenses.length > 0) {
      stats.tripsWithExpenses += 1;
      
      const totalSpent = tripExpenses.reduce((acc, e) => acc + e.amount, 0);
      if (trip.budget > 0 && totalSpent <= trip.budget) {
        stats.tripsWithinBudget += 1;
      }
    } else {
      // Fallback: If trip status is completed and it has a budget but no loaded expenses, 
      // check if we can simulate/estimate or if it counted. Let's count it if budget > 0 and no expenses registered as "within budget".
      if (trip.budget > 0 && trip.status === "completed") {
        stats.tripsWithinBudget += 1; 
      }
    }
  });

  // Build progress object
  const progressMap = {};
  BADGE_DEFINITIONS.forEach((badge) => {
    const currentVal = stats[badge.statKey] || 0;
    progressMap[badge.id] = {
      current: Math.min(currentVal, badge.target),
      target: badge.target,
      percentage: Math.min(Math.round((currentVal / badge.target) * 100), 100),
    };
  });

  return {
    stats,
    progressMap,
  };
};
