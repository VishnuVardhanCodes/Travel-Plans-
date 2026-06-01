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

// Fetch achievements from local storage or backend
export const fetchAchievements = () => async (dispatch) => {
  try {
    dispatch({ type: SET_ACHIEVEMENT_LOADING });

    // Load from localStorage for persistent local progress
    const storedAchievements = localStorage.getItem("packgo_achievements");
    let payload = {
      earned: [],
      progress: {},
      unlockDates: {},
    };

    if (storedAchievements) {
      payload = JSON.parse(storedAchievements);
    } else {
      // Initialize progress map
      BADGE_DEFINITIONS.forEach((badge) => {
        payload.progress[badge.id] = {
          current: 0,
          target: badge.target,
          percentage: 0,
        };
      });
      localStorage.setItem("packgo_achievements", JSON.stringify(payload));
    }

    dispatch({
      type: FETCH_ACHIEVEMENTS,
      payload,
    });
  } catch (err) {
    dispatch({
      type: ACHIEVEMENT_ERROR,
      payload: err.message,
    });
  }
};

// Update progress of a specific badge and check if it unlocks
export const updateProgress = (badgeId, current) => async (dispatch, getState) => {
  try {
    const { achievements } = getState();
    const target = achievements.progress[badgeId]?.target || 1;
    const isEarned = achievements.earned.includes(badgeId);

    // Only update progress if the badge is not already earned
    if (!isEarned) {
      dispatch({
        type: UPDATE_PROGRESS,
        payload: { badgeId, current },
      });

      // Fetch the updated state to check for unlock
      const updatedValue = current;
      if (updatedValue >= target) {
        const badge = BADGE_DEFINITIONS.find((b) => b.id === badgeId);
        if (badge) {
          dispatch(unlockAchievement(badge));
        }
      } else {
        // Save current progress to localStorage
        const latestState = getState().achievements;
        localStorage.setItem(
          "packgo_achievements",
          JSON.stringify({
            earned: latestState.earned,
            progress: latestState.progress,
            unlockDates: latestState.unlockDates,
          })
        );
      }
    }
  } catch (err) {
    dispatch({
      type: ACHIEVEMENT_ERROR,
      payload: err.message,
    });
  }
};

// Unlock an achievement
export const unlockAchievement = (badge) => async (dispatch, getState) => {
  try {
    dispatch({
      type: UNLOCK_ACHIEVEMENT,
      payload: badge,
    });

    // Save to localStorage
    const latestState = getState().achievements;
    localStorage.setItem(
      "packgo_achievements",
      JSON.stringify({
        earned: latestState.earned,
        progress: latestState.progress,
        unlockDates: latestState.unlockDates,
      })
    );
  } catch (err) {
    dispatch({
      type: ACHIEVEMENT_ERROR,
      payload: err.message,
    });
  }
};

// Dismiss the unlock congratulatory modal
export const dismissUnlockModal = () => ({
  type: DISMISS_UNLOCK_MODAL,
});

// Reset achievements progress/earned state
export const resetAchievements = () => async (dispatch) => {
  localStorage.removeItem("packgo_achievements");
  dispatch({
    type: RESET_ACHIEVEMENTS,
  });
  dispatch(fetchAchievements());
};
