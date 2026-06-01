import {
  FETCH_ACHIEVEMENTS,
  UNLOCK_ACHIEVEMENT,
  UPDATE_PROGRESS,
  RESET_ACHIEVEMENTS,
  SET_ACHIEVEMENT_LOADING,
  ACHIEVEMENT_ERROR,
  DISMISS_UNLOCK_MODAL,
} from "../types/achievementTypes";
import { BADGE_DEFINITIONS } from "../../utils/badgeData";

// ─── Initial State ────────────────────────────────────────────────────────────
/**
 * Builds initial progress map from badge definitions.
 * Each badge starts at 0 progress and is locked.
 */
const buildInitialProgress = () => {
  const progress = {};
  BADGE_DEFINITIONS.forEach((badge) => {
    progress[badge.id] = {
      current: 0,
      target: badge.target,
      percentage: 0,
    };
  });
  return progress;
};

const initialState = {
  /** Array of badge IDs that have been earned */
  earned: [],
  /** Map of badgeId → { current, target, percentage } */
  progress: buildInitialProgress(),
  /** Map of badgeId → ISO date string when unlocked */
  unlockDates: {},
  /** The most recently unlocked badge object (drives the celebration modal) */
  pendingUnlock: null,
  loading: false,
  error: null,
};

// ─── Reducer ──────────────────────────────────────────────────────────────────
const achievementReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ACHIEVEMENT_LOADING:
      return { ...state, loading: true, error: null };

    case FETCH_ACHIEVEMENTS:
      return {
        ...state,
        loading: false,
        earned: action.payload.earned ?? state.earned,
        progress: action.payload.progress ?? state.progress,
        unlockDates: action.payload.unlockDates ?? state.unlockDates,
      };

    case UPDATE_PROGRESS: {
      const { badgeId, current } = action.payload;
      const target = state.progress[badgeId]?.target ?? 1;
      const percentage = Math.min(Math.round((current / target) * 100), 100);
      return {
        ...state,
        progress: {
          ...state.progress,
          [badgeId]: { current, target, percentage },
        },
      };
    }

    case UNLOCK_ACHIEVEMENT: {
      const badge = action.payload;
      // Avoid duplicate unlocks
      if (state.earned.includes(badge.id)) return state;
      const unlockDate = new Date().toISOString();
      return {
        ...state,
        earned: [...state.earned, badge.id],
        unlockDates: { ...state.unlockDates, [badge.id]: unlockDate },
        pendingUnlock: badge,
        progress: {
          ...state.progress,
          [badge.id]: {
            ...state.progress[badge.id],
            current: state.progress[badge.id]?.target ?? 1,
            percentage: 100,
          },
        },
      };
    }

    case DISMISS_UNLOCK_MODAL:
      return { ...state, pendingUnlock: null };

    case ACHIEVEMENT_ERROR:
      return { ...state, loading: false, error: action.payload };

    case RESET_ACHIEVEMENTS:
      return initialState;

    default:
      return state;
  }
};

export default achievementReducer;
