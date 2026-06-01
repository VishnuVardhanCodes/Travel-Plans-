import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Typography,
  Box,
  Button,
  Grid,
  Divider,
} from "@mui/material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";

// Import achievement components
import BadgeShowcase from "../../components/achievements/BadgeShowcase";
import AchievementProgress from "../../components/achievements/AchievementProgress";
import AchievementModal from "../../components/achievements/AchievementModal";
import AchievementStats from "../../components/achievements/AchievementStats";

// Import Redux Actions
import {
  fetchAchievements,
  dismissUnlockModal,
  resetAchievements,
} from "../../redux/actions/achievementActions";
import { getTrips } from "../../redux/actions/tripActions";

// Import Engine
import { evaluateAchievements } from "../../utils/achievementEngine";

const AchievementsView = () => {
  const dispatch = useDispatch();
  const storeState = useSelector((state) => state);
  const { earned, progress, unlockDates, pendingUnlock } = useSelector(
    (state) => state.achievements
  );
  const { trips } = useSelector((state) => state.trips);
  const { expenses } = useSelector((state) => state.expenses);

  useEffect(() => {
    // 1. Fetch initial achievements state
    dispatch(fetchAchievements());
    // 2. Fetch trips to ensure we have data to evaluate
    dispatch(getTrips());
  }, [dispatch]);

  useEffect(() => {
    // 3. Evaluate achievements whenever trips or achievements finish loading
    if (trips && trips.length >= 0) {
      evaluateAchievements(storeState, dispatch);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trips, expenses]);

  const handleEvaluate = () => {
    evaluateAchievements(storeState, dispatch);
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset your achievements and badge progress?")) {
      dispatch(resetAchievements());
    }
  };

  const handleCloseModal = () => {
    dispatch(dismissUnlockModal());
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1400, margin: "0 auto" }}>
      {/* Celebration modal for new achievement unlock */}
      <AchievementModal
        badge={pendingUnlock}
        open={Boolean(pendingUnlock)}
        onClose={handleCloseModal}
      />

      {/* Header Banner */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "stretch", sm: "center" },
          gap: 2,
          mb: 4,
        }}
      >
        <Box>
          <Typography
            variant="h4"
            fontWeight={900}
            sx={{
              background: "linear-gradient(90deg, #1976D2 0%, #9C27B0 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              letterSpacing: "-0.5px",
            }}
          >
            Travel Achievements & Badges
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 0.5 }}>
            Gamify your travel journey, achieve milestones, and showcase your badges!
          </Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 1.5, justifyContent: "flex-end" }}>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<AutoFixHighIcon />}
            onClick={handleEvaluate}
            sx={{
              borderRadius: 3,
              fontWeight: 700,
              textTransform: "none",
              px: 2.5,
              borderWidth: "1.5px",
              "&:hover": { borderWidth: "1.5px" },
            }}
          >
            Check Progress
          </Button>
          <Button
            variant="outlined"
            color="error"
            startIcon={<RestartAltIcon />}
            onClick={handleReset}
            sx={{
              borderRadius: 3,
              fontWeight: 700,
              textTransform: "none",
              px: 2.5,
              borderWidth: "1.5px",
              "&:hover": { borderWidth: "1.5px" },
            }}
          >
            Reset
          </Button>
        </Box>
      </Box>

      {/* Statistics Row */}
      <Box sx={{ mb: 4 }}>
        <AchievementStats earned={earned} />
      </Box>

      {/* Secondary Dashboard Components Layout */}
      <Grid container spacing={4}>
        {/* Main Badge Showcase Grid */}
        <Grid item xs={12} md={8.5}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
            <EmojiEventsIcon color="primary" />
            <Typography variant="h5" fontWeight={900} letterSpacing="-0.5px">
              Badge Showcase
            </Typography>
          </Box>
          <Divider sx={{ mb: 3 }} />
          <BadgeShowcase
            earned={earned}
            progress={progress}
            unlockDates={unlockDates}
          />
        </Grid>

        {/* Sidebar for milestone upcoming progress */}
        <Grid item xs={12} md={3.5} sx={{ mt: { xs: 4, md: 0 } }}>
          <AchievementProgress earned={earned} progress={progress} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default AchievementsView;

