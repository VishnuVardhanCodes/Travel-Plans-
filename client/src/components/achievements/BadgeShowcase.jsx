import React, { useState } from "react";
import {
  Grid,
  Box,
  Typography,
  TextField,
  InputAdornment,
  MenuItem,
  Paper,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import { BADGE_DEFINITIONS, BADGE_CATEGORIES } from "../../utils/badgeData";
import AchievementCard from "./AchievementCard";

const BadgeShowcase = ({ earned = [], progress = {}, unlockDates = {} }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all"); // 'all' | 'unlocked' | 'locked'

  const filteredBadges = BADGE_DEFINITIONS.filter((badge) => {
    // 1. Search term match
    const matchesSearch =
      badge.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      badge.description.toLowerCase().includes(searchTerm.toLowerCase());

    // 2. Category match
    const matchesCategory =
      selectedCategory === "all" || badge.category === selectedCategory;

    // 3. Unlocked/Locked match
    const isUnlocked = earned.includes(badge.id);
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "unlocked" && isUnlocked) ||
      (statusFilter === "locked" && !isUnlocked);

    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <Box sx={{ mt: 4 }}>
      {/* Search and Filters panel */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          borderRadius: 4,
          mb: 4,
          border: "1px solid",
          borderColor: "divider",
          background: "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(20px)",
        }}
      >
        <Typography variant="h6" fontWeight={800} sx={{ mb: 2 }}>
          Filter Achievements
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={5}>
            <TextField
              fullWidth
              placeholder="Search achievements..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: "text.disabled" }} />
                    </InputAdornment>
                  ),
                  style: { borderRadius: 12 },
                },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3.5}>
            <TextField
              select
              fullWidth
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <FilterListIcon sx={{ color: "text.disabled" }} />
                    </InputAdornment>
                  ),
                  style: { borderRadius: 12 },
                },
              }}
            >
              <MenuItem value="all">All Categories</MenuItem>
              {Object.entries(BADGE_CATEGORIES).map(([key, val]) => (
                <MenuItem key={val} value={val}>
                  {key.charAt(0) + key.slice(1).toLowerCase()}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6} md={3.5}>
            <TextField
              select
              fullWidth
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              slotProps={{
                input: {
                  style: { borderRadius: 12 },
                },
              }}
            >
              <MenuItem value="all">All Badges</MenuItem>
              <MenuItem value="unlocked">🏆 Unlocked Only</MenuItem>
              <MenuItem value="locked">🔒 Locked Only</MenuItem>
            </TextField>
          </Grid>
        </Grid>
      </Paper>

      {/* Grid of badges */}
      <Grid container spacing={3}>
        {filteredBadges.length > 0 ? (
          filteredBadges.map((badge) => (
            <Grid key={badge.id} item xs={12} sm={6} md={4} lg={3}>
              <AchievementCard
                badge={badge}
                isUnlocked={earned.includes(badge.id)}
                progress={progress[badge.id]}
                unlockDate={unlockDates[badge.id]}
              />
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Paper
              elevation={0}
              sx={{
                p: 8,
                textAlign: "center",
                borderRadius: 4,
                border: "2px dashed",
                borderColor: "divider",
                bgcolor: "background.default",
              }}
            >
              <EmojiEventsIcon sx={{ fontSize: 56, color: "text.disabled", mb: 2 }} />
              <Typography variant="h6" color="text.secondary" fontWeight={700}>
                No badges match your criteria.
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                Try adjusting your filters or search term to discover achievements.
              </Typography>
            </Paper>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default BadgeShowcase;

