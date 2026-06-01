import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Tooltip,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { RARITY_COLORS } from "../../utils/badgeData";

const AchievementCard = ({ badge, isUnlocked, progress, unlockDate }) => {
  const rarity = badge.rarity || "Common";
  const colors = RARITY_COLORS[rarity] || { bg: "#f3f4f6", text: "#4b5563" };
  const percentage = progress?.percentage || 0;

  return (
    <Tooltip 
      title={isUnlocked ? `Unlocked on ${new Date(unlockDate).toLocaleDateString("en-IN", { dateStyle: "medium" })}` : `Progress: ${progress?.current || 0}/${badge.target} ${badge.unit}`} 
      arrow
      placement="top"
    >
      <Card
        elevation={0}
        sx={{
          borderRadius: 4,
          border: "1px solid",
          borderColor: isUnlocked ? "primary.light" : "divider",
          overflow: "hidden",
          position: "relative",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          background: isUnlocked
            ? `linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(240,244,255,0.9) 100%)`
            : "background.paper",
          "&:hover": {
            transform: "translateY(-6px)",
            boxShadow: isUnlocked
              ? "0 12px 30px -10px rgba(63, 81, 181, 0.25)"
              : "0 8px 24px -10px rgba(0,0,0,0.1)",
            borderColor: "primary.main",
          },
          filter: isUnlocked ? "none" : "grayscale(30%)",
          opacity: isUnlocked ? 1 : 0.85,
        }}
      >
        {/* Rarity & Status Header */}
        <Box
          sx={{
            px: 2,
            py: 1.5,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px dashed",
            borderColor: isUnlocked ? "rgba(63,81,181,0.15)" : "divider",
          }}
        >
          <Chip
            label={rarity}
            size="small"
            sx={{
              fontWeight: 800,
              fontSize: "0.65rem",
              bgcolor: colors.bg,
              color: colors.text,
              borderRadius: 1.5,
              textTransform: "uppercase",
            }}
          />
          {isUnlocked ? (
            <Chip
              icon={<CheckCircleIcon sx={{ fontSize: "14px !important", color: "success.main" }} />}
              label="Unlocked"
              size="small"
              color="success"
              variant="outlined"
              sx={{
                fontWeight: 700,
                fontSize: "0.65rem",
                borderRadius: 1.5,
                bgcolor: "rgba(76,175,80,0.08)",
              }}
            />
          ) : (
            <Chip
              icon={<LockIcon sx={{ fontSize: "12px !important", color: "text.secondary" }} />}
              label="Locked"
              size="small"
              sx={{
                fontWeight: 700,
                fontSize: "0.65rem",
                borderRadius: 1.5,
                bgcolor: "action.disabledBackground",
                color: "text.secondary",
              }}
            />
          )}
        </Box>

        <CardContent sx={{ pt: 3, pb: "24px !important", textAlign: "center" }}>
          {/* Badge Icon (Emoji Sphere) */}
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              margin: "0 auto 16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "2.5rem",
              position: "relative",
              background: isUnlocked
                ? `linear-gradient(135deg, ${badge.gradientFrom || "#3f51b5"} 0%, ${badge.gradientTo || "#00bcd4"} 100%)`
                : "linear-gradient(135deg, #e0e0e0 0%, #bdbdbd 100%)",
              boxShadow: isUnlocked
                ? `0 8px 24px -6px ${badge.color || "#3f51b5"}`
                : "none",
              transition: "transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
              "&:hover": {
                transform: "rotate(15deg) scale(1.1)",
              },
            }}
          >
            <span role="img" aria-label={badge.name}>
              {badge.emoji}
            </span>
          </Box>

          <Typography
            variant="h6"
            fontWeight={800}
            gutterBottom
            sx={{
              color: isUnlocked ? "text.primary" : "text.secondary",
              letterSpacing: "-0.3px",
            }}
          >
            {badge.name}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              minHeight: 40,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
              px: 1,
              mb: 2,
              fontSize: "0.8rem",
              lineHeight: 1.4,
            }}
          >
            {badge.description}
          </Typography>

          {/* Progress / Completion Date Indicator */}
          {isUnlocked && unlockDate ? (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 0.5,
                mt: 2,
                color: "text.secondary",
              }}
            >
              <CalendarMonthIcon sx={{ fontSize: 16 }} />
              <Typography variant="caption" fontWeight={600}>
                Earned{" "}
                {new Date(unlockDate).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </Typography>
            </Box>
          ) : (
            <Box sx={{ mt: 2 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 0.5,
                }}
              >
                <Typography variant="caption" color="text.secondary" fontWeight={600}>
                  Progress
                </Typography>
                <Typography variant="caption" color="primary.main" fontWeight={700}>
                  {progress?.current || 0} / {badge.target}
                </Typography>
              </Box>
              <Box
                sx={{
                  height: 6,
                  borderRadius: 3,
                  bgcolor: "action.hover",
                  overflow: "hidden",
                  width: "100%",
                }}
              >
                <Box
                  sx={{
                    height: "100%",
                    borderRadius: 3,
                    bgcolor: "primary.main",
                    width: `${percentage}%`,
                    transition: "width 0.8s ease-out",
                  }}
                />
              </Box>
            </Box>
          )}
        </CardContent>
      </Card>
    </Tooltip>
  );
};

export default AchievementCard;
