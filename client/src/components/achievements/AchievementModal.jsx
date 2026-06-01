import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  Typography,
  Box,
  Button,
  Zoom,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import StarIcon from "@mui/icons-material/Star";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

// Custom slide/zoom transition
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Zoom style={{ transitionDelay: "150ms" }} ref={ref} {...props} />;
});

const AchievementModal = ({ badge, open, onClose }) => {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (open) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 6000);
      return () => clearTimeout(timer);
    }
  }, [open]);

  if (!badge) return null;

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: 6,
          maxWidth: 450,
          width: "100%",
          textAlign: "center",
          overflow: "visible",
          bgcolor: "background.paper",
          backgroundImage: "radial-gradient(circle at 50% 0%, rgba(63, 81, 181, 0.08) 0%, rgba(255, 255, 255, 0) 70%)",
          border: "1px solid",
          borderColor: "rgba(63, 81, 181, 0.12)",
          p: 3,
        },
      }}
    >
      {/* Confetti Particles (CSS Only) */}
      {showConfetti && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
            overflow: "hidden",
            borderRadius: 6,
          }}
        >
          {Array.from({ length: 40 }).map((_, i) => {
            const size = Math.random() * 8 + 6;
            const left = Math.random() * 100;
            const animDuration = Math.random() * 3 + 2;
            const animDelay = Math.random() * 2;
            const colors = ["#FFD700", "#FF5722", "#4CAF50", "#2196F3", "#9C27B0", "#FF007F"];
            const color = colors[Math.floor(Math.random() * colors.length)];

            return (
              <Box
                key={i}
                sx={{
                  position: "absolute",
                  top: -20,
                  left: `${left}%`,
                  width: size,
                  height: size,
                  borderRadius: "50%",
                  bgcolor: color,
                  opacity: 0.8,
                  animation: `fall ${animDuration}s linear infinite`,
                  animationDelay: `${animDelay}s`,
                  "@keyframes fall": {
                    "0%": {
                      transform: "translateY(0) rotate(0deg)",
                      opacity: 1,
                    },
                    "100%": {
                      transform: "translateY(500px) rotate(360deg)",
                      opacity: 0,
                    },
                  },
                }}
              />
            );
          })}
        </Box>
      )}

      <IconButton
        onClick={onClose}
        sx={{
          position: "absolute",
          right: 16,
          top: 16,
          color: "text.secondary",
          bgcolor: "action.hover",
          "&:hover": { bgcolor: "action.selected" },
          borderRadius: "50%",
        }}
      >
        <CloseIcon fontSize="small" />
      </IconButton>

      <DialogContent sx={{ p: 2 }}>
        {/* Celebration Badges Sphere */}
        <Box
          sx={{
            position: "relative",
            width: 140,
            height: 140,
            margin: "24px auto 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "50%",
            background: `linear-gradient(135deg, ${badge.gradientFrom || "#3f51b5"} 0%, ${badge.gradientTo || "#00bcd4"} 100%)`,
            boxShadow: `0 16px 40px -10px ${badge.color || "#3f51b5"}`,
            fontSize: "4.5rem",
            animation: "pulseRotate 2.5s infinite ease-in-out",
            "@keyframes pulseRotate": {
              "0%, 100%": {
                transform: "scale(1) rotate(0deg)",
              },
              "50%": {
                transform: "scale(1.1) rotate(5deg)",
              },
            },
          }}
        >
          <span role="img" aria-label={badge.name}>
            {badge.emoji}
          </span>
          <Box
            sx={{
              position: "absolute",
              bottom: -4,
              right: -4,
              bgcolor: "success.main",
              color: "white",
              borderRadius: "50%",
              p: 0.75,
              border: "4px solid",
              borderColor: "background.paper",
              display: "flex",
            }}
          >
            <StarIcon sx={{ fontSize: 18 }} />
          </Box>
        </Box>

        <Typography
          variant="caption"
          fontWeight={900}
          letterSpacing="2px"
          sx={{
            color: "primary.main",
            textTransform: "uppercase",
            display: "block",
            mb: 1,
          }}
        >
          🎉 Achievement Unlocked!
        </Typography>

        <Typography
          variant="h4"
          fontWeight={900}
          gutterBottom
          sx={{
            background: "linear-gradient(45deg, #1976D2 30%, #00BCD4 90%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            letterSpacing: "-0.5px",
            mb: 2,
          }}
        >
          {badge.name}
        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
          sx={{
            px: 2,
            mb: 4,
            fontWeight: 500,
            lineHeight: 1.6,
          }}
        >
          {badge.description}
        </Typography>

        <Button
          variant="contained"
          fullWidth
          size="large"
          onClick={onClose}
          startIcon={<EmojiEventsIcon />}
          sx={{
            py: 1.5,
            borderRadius: 3.5,
            fontWeight: 800,
            textTransform: "none",
            boxShadow: "0 10px 25px -6px rgba(25, 118, 210, 0.4)",
            background: "linear-gradient(135deg, #1976D2 0%, #00BCD4 100%)",
            "&:hover": {
              background: "linear-gradient(135deg, #1565C0 0%, #00acc1 100%)",
            },
          }}
        >
          Awesome, Show Me!
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default AchievementModal;
