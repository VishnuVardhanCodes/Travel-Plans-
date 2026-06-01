import React from "react";
import {
  Grid,
  Paper,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import { BADGE_DEFINITIONS } from "../../utils/badgeData";

const AchievementStats = ({ earned = [] }) => {
  const totalBadges = BADGE_DEFINITIONS.length;
  const earnedCount = earned.length;
  const lockedCount = totalBadges - earnedCount;
  const completionPercentage = Math.round((earnedCount / totalBadges) * 100) || 0;

  // Retrieve calculated statistics from local storage
  let statsObj = {
    totalTrips: 0,
    completedTrips: 0,
    uniqueDestinations: 0,
    weekendTrips: 0,
    adventureTrips: 0,
    tripsWithinBudget: 0,
  };
  try {
    const savedStats = localStorage.getItem("packgo_achievement_stats");
    if (savedStats) {
      statsObj = JSON.parse(savedStats);
    }
  } catch (e) {
    console.error(e);
  }

  const statItems = [
    {
      title: "Achievements Earned",
      value: earnedCount,
      subtitle: `Out of ${totalBadges} badges`,
      icon: <MilitaryTechIcon sx={{ fontSize: 32, color: "warning.main" }} />,
      color: "rgba(255, 152, 0, 0.08)",
    },
    {
      title: "Locked Challenges",
      value: lockedCount,
      subtitle: "Milestones to unlock",
      icon: <LockOutlinedIcon sx={{ fontSize: 30, color: "text.secondary" }} />,
      color: "rgba(158, 158, 158, 0.08)",
    },
    {
      title: "Unique Destinations",
      value: statsObj.uniqueDestinations,
      subtitle: "Globally explored",
      icon: <TravelExploreIcon sx={{ fontSize: 30, color: "info.main" }} />,
      color: "rgba(33, 150, 243, 0.08)",
    },
  ];

  return (
    <Box>
      <Grid container spacing={3}>
        {statItems.map((item, index) => (
          <Grid key={index} item xs={12} sm={6} md={3}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 4,
                border: "1px solid",
                borderColor: "divider",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                height: "100%",
                background: "background.paper",
              }}
            >
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="caption" color="text.secondary" fontWeight={600}>
                  {item.title}
                </Typography>
                <Typography variant="h4" fontWeight={900} sx={{ my: 0.5, letterSpacing: "-0.5px" }}>
                  {item.value}
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ display: "block" }}>
                  {item.subtitle}
                </Typography>
              </Box>
              <Box
                sx={{
                  p: 1.5,
                  borderRadius: 3,
                  bgcolor: item.color,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {item.icon}
              </Box>
            </Paper>
          </Grid>
        ))}

        {/* Completion Ring Card */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 4,
              border: "1px solid",
              borderColor: "divider",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              height: "100%",
              background: "background.paper",
            }}
          >
            <Box>
              <Typography variant="caption" color="text.secondary" fontWeight={600}>
                Total Progress
              </Typography>
              <Typography variant="h4" fontWeight={900} sx={{ my: 0.5, letterSpacing: "-0.5px" }}>
                {completionPercentage}%
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <TrendingUpIcon sx={{ fontSize: 14, color: "success.main" }} />
                <Typography variant="caption" color="success.main" fontWeight={700}>
                  Leveling Up!
                </Typography>
              </Box>
            </Box>
            <Box sx={{ position: "relative", display: "inline-flex" }}>
              <CircularProgress
                variant="determinate"
                value={completionPercentage}
                size={60}
                thickness={6}
                color="primary"
                sx={{
                  "& .MuiCircularProgress-circle": {
                    strokeLinecap: "round",
                  },
                }}
              />
              <Box
                sx={{
                  top: 0,
                  left: 0,
                  bottom: 0,
                  right: 0,
                  position: "absolute",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography variant="caption" component="div" color="text.secondary" fontWeight={800}>
                  🏆
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AchievementStats;

