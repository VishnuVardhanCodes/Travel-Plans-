import React from "react";
import {
  Paper,
  Typography,
  Box,
  LinearProgress,
  List,
  ListItem,
} from "@mui/material";
import FlagIcon from "@mui/icons-material/Flag";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { BADGE_DEFINITIONS } from "../../utils/badgeData";

const AchievementProgress = ({ earned = [], progress = {} }) => {
  // Find locked badges with highest progress percentage to show as "upcoming" achievements
  const upcomingBadges = BADGE_DEFINITIONS.filter((b) => !earned.includes(b.id))
    .map((badge) => {
      const badgeProgress = progress[badge.id] || { current: 0, target: badge.target, percentage: 0 };
      return {
        ...badge,
        progress: badgeProgress,
      };
    })
    .sort((a, b) => b.progress.percentage - a.progress.percentage)
    .slice(0, 3); // top 3 closest to unlock

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 4,
        border: "1px solid",
        borderColor: "divider",
        height: "100%",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
        <FlagIcon color="primary" />
        <Typography variant="h6" fontWeight={800} letterSpacing="-0.3px">
          Next Up Achievements
        </Typography>
      </Box>

      {upcomingBadges.length > 0 ? (
        <List sx={{ display: "flex", flexDirection: "column", gap: 2.5, p: 0 }}>
          {upcomingBadges.map((badge) => {
            const remaining = badge.target - badge.progress.current;
            return (
              <ListItem
                key={badge.id}
                disablePadding
                sx={{
                  display: "block",
                  p: 2,
                  borderRadius: 3,
                  bgcolor: "background.default",
                  border: "1px solid",
                  borderColor: "rgba(0,0,0,0.04)",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
                  <Box
                    sx={{
                      width: 44,
                      height: 44,
                      borderRadius: "50%",
                      bgcolor: "rgba(0,0,0,0.05)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.4rem",
                    }}
                  >
                    {badge.emoji}
                  </Box>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="subtitle2" fontWeight={800}>
                      {badge.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Need {remaining} more {badge.unit}
                    </Typography>
                  </Box>
                  <ArrowForwardIosIcon sx={{ fontSize: 12, color: "text.disabled" }} />
                </Box>

                <Box sx={{ mt: 1.5 }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                    <Typography variant="caption" color="text.secondary" fontWeight={500}>
                      Progress
                    </Typography>
                    <Typography variant="caption" color="primary.main" fontWeight={700}>
                      {badge.progress.percentage}% completed
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={badge.progress.percentage}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      bgcolor: "action.hover",
                      "& .MuiLinearProgress-bar": {
                        borderRadius: 4,
                      },
                    }}
                  />
                </Box>
              </ListItem>
            );
          })}
        </List>
      ) : (
        <Box sx={{ textAlign: "center", py: 4 }}>
          <Typography variant="body1" fontWeight={700} color="text.secondary">
            🌟 Legend Status Reached!
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            You have unlocked all available badges and achievements. Incredible work!
          </Typography>
        </Box>
      )}
    </Paper>
  );
};

export default AchievementProgress;
