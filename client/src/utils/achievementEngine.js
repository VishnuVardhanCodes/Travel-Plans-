// ─── Achievement Engine ──────────────────────────────────────────────────────
/**
 * Automatically computes statistics and evaluates achievements.
 * Triggers dispatches to unlock achievements or update progress as needed.
 */

import { computeTravelStats } from "./achievementRules";
import { updateProgress, unlockAchievement } from "../redux/actions/achievementActions";
import { BADGE_DEFINITIONS } from "./badgeData";
import { toast } from "react-toastify";

/**
 * Run evaluation of all achievements based on current state.
 * 
 * @param {Object} storeState - Redux global state
 * @param {Function} dispatch - Redux dispatch function
 */
export const evaluateAchievements = (storeState, dispatch) => {
  const trips = storeState.trips?.trips || [];
  const expenses = storeState.expenses?.expenses || [];
  const activeTripId = storeState.expenses?.activeTripId;

  // Build a map of tripId -> expenses.
  // Since Redux might only have the current active trip's expenses,
  // we combine what's in the store and fallback to a persisted local cache
  // of expenses across different trips to ensure stats are 100% accurate.
  let cachedExpenses = {};
  try {
    const savedCache = localStorage.getItem("packgo_expenses_cache");
    if (savedCache) {
      cachedExpenses = JSON.parse(savedCache);
    }
  } catch (e) {
    console.error("Failed to parse expenses cache", e);
  }

  // Update cache with currently loaded expenses
  if (activeTripId && expenses.length > 0) {
    cachedExpenses[activeTripId] = expenses;
    localStorage.setItem("packgo_expenses_cache", JSON.stringify(cachedExpenses));
  }

  // Compute stats
  const { stats } = computeTravelStats(trips, cachedExpenses);

  // Save calculated statistics for display in achievement stats panel
  localStorage.setItem("packgo_achievement_stats", JSON.stringify(stats));

  const earnedBadges = storeState.achievements?.earned || [];

  // Iterate over all badge definitions and update progress/unlock
  BADGE_DEFINITIONS.forEach((badge) => {
    const currentVal = stats[badge.statKey] || 0;
    const isEarned = earnedBadges.includes(badge.id);

    // Update progress in Redux store
    dispatch(updateProgress(badge.id, currentVal));

    // If progress met target and badge is not yet unlocked
    if (currentVal >= badge.target && !isEarned) {
      dispatch(unlockAchievement(badge));
      
      // Toast notification for user delight
      toast.success(`🎉 Achievement Unlocked: ${badge.name}!`, {
        position: "bottom-right",
        autoClose: 5000,
        style: {
          borderRadius: "16px",
          background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
          color: "#fff",
          fontWeight: 600,
          boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
        },
        icon: badge.emoji,
      });
    }
  });
};
