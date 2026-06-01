// ─── Badge Definitions ────────────────────────────────────────────────────────
/**
 * Central registry of all achievement badges.
 * Each badge defines its ID, display info, category, target count, and the
 * field from the achievement engine's computed stats used to measure progress.
 */

export const BADGE_CATEGORIES = {
  MILESTONE: "milestone",
  BUDGET: "budget",
  EXPLORER: "explorer",
  PLANNING: "planning",
  ADVENTURE: "adventure",
};

export const BADGE_DEFINITIONS = [
  {
    id: "first_trip",
    name: "First Trip",
    description: "Complete your very first trip and start your adventure!",
    emoji: "🌟",
    color: "#FFD700",
    gradientFrom: "#FFD700",
    gradientTo: "#FFA500",
    category: BADGE_CATEGORIES.MILESTONE,
    target: 1,
    statKey: "totalTrips",           // which computed stat this tracks
    unit: "trip",
    rarity: "Common",
  },
  {
    id: "budget_master",
    name: "Budget Master",
    description:
      "Complete 5 trips without exceeding your budget — financial discipline at its finest!",
    emoji: "💰",
    color: "#4CAF50",
    gradientFrom: "#43A047",
    gradientTo: "#66BB6A",
    category: BADGE_CATEGORIES.BUDGET,
    target: 5,
    statKey: "tripsWithinBudget",
    unit: "trips within budget",
    rarity: "Rare",
  },
  {
    id: "frequent_traveler",
    name: "Frequent Traveler",
    description: "Complete 10 trips — you're a true globe-trotter!",
    emoji: "✈️",
    color: "#2196F3",
    gradientFrom: "#1976D2",
    gradientTo: "#42A5F5",
    category: BADGE_CATEGORIES.MILESTONE,
    target: 10,
    statKey: "totalTrips",
    unit: "trips",
    rarity: "Rare",
  },
  {
    id: "world_explorer",
    name: "World Explorer",
    description:
      "Visit 10 unique destinations and broaden your horizons!",
    emoji: "🌍",
    color: "#9C27B0",
    gradientFrom: "#7B1FA2",
    gradientTo: "#CE93D8",
    category: BADGE_CATEGORIES.EXPLORER,
    target: 10,
    statKey: "uniqueDestinations",
    unit: "unique destinations",
    rarity: "Epic",
  },
  {
    id: "weekend_explorer",
    name: "Weekend Explorer",
    description:
      "Complete 5 weekend trips — make the most of every weekend!",
    emoji: "🏖️",
    color: "#FF5722",
    gradientFrom: "#E64A19",
    gradientTo: "#FF8A65",
    category: BADGE_CATEGORIES.EXPLORER,
    target: 5,
    statKey: "weekendTrips",
    unit: "weekend trips",
    rarity: "Uncommon",
  },
  {
    id: "adventure_seeker",
    name: "Adventure Seeker",
    description:
      "Complete adventure-related trips and embrace the thrill!",
    emoji: "🧗",
    color: "#FF9800",
    gradientFrom: "#F57C00",
    gradientTo: "#FFB74D",
    category: BADGE_CATEGORIES.ADVENTURE,
    target: 3,
    statKey: "adventureTrips",
    unit: "adventure trips",
    rarity: "Uncommon",
  },
  {
    id: "travel_planner",
    name: "Travel Planner",
    description: "Create 10 trip plans — planning is half the journey!",
    emoji: "📋",
    color: "#00BCD4",
    gradientFrom: "#0097A7",
    gradientTo: "#4DD0E1",
    category: BADGE_CATEGORIES.PLANNING,
    target: 10,
    statKey: "totalPlans",
    unit: "trip plans",
    rarity: "Rare",
  },
  {
    id: "expense_tracker",
    name: "Expense Tracker",
    description:
      "Track expenses for 5 trips — stay on top of your finances!",
    emoji: "📊",
    color: "#607D8B",
    gradientFrom: "#455A64",
    gradientTo: "#90A4AE",
    category: BADGE_CATEGORIES.PLANNING,
    target: 5,
    statKey: "tripsWithExpenses",
    unit: "trips tracked",
    rarity: "Common",
  },
];

/** Quick lookup map: badgeId → badge definition */
export const BADGE_MAP = Object.fromEntries(
  BADGE_DEFINITIONS.map((b) => [b.id, b])
);

/** Rarity colours for chips */
export const RARITY_COLORS = {
  Common: { bg: "#E8F5E9", text: "#2E7D32" },
  Uncommon: { bg: "#E3F2FD", text: "#1565C0" },
  Rare: { bg: "#F3E5F5", text: "#6A1B9A" },
  Epic: { bg: "#FFF3E0", text: "#E65100" },
  Legendary: { bg: "#FCE4EC", text: "#880E4F" },
};
