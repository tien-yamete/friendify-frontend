import React from "react";
import {
  Box,
  Paper,
  Avatar,
  TextField,
  IconButton,
  Divider,
  alpha,
} from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import VideocamIcon from "@mui/icons-material/Videocam";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import { isAuthenticated } from "../services/authenticationService";

export default function CreatePostComposer({ onClick, user }) {
  if (!isAuthenticated()) return null;

  return (
    <Paper
      elevation={0}
      sx={(t) => ({
        mb: 2.5,
        borderRadius: 4,
        bgcolor: "background.paper",
        border: "1px solid",
        borderColor: "divider",
        p: { xs: 2, sm: 2.5 },
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
        "&:hover": {
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          borderColor: alpha(t.palette.primary.main, 0.2),
        },
      })}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
        <Avatar
          src={user?.avatar || "/avatar.png"}
          sx={(t) => ({
            width: { xs: 44, sm: 48 },
            height: { xs: 44, sm: 48 },
            border: "2px solid",
            borderColor: "divider",
            background: `linear-gradient(135deg, ${t.palette.primary.main} 0%, ${alpha(
              t.palette.primary.main,
              0.7
            )} 100%)`,
            boxShadow: `0 2px 8px ${alpha(t.palette.primary.main, 0.15)}`,
          })}
        >
          {user?.name?.charAt(0) || "U"}
        </Avatar>
        <TextField
          fullWidth
          placeholder="What's on your mind?"
          onClick={onClick}
          variant="outlined"
          sx={{
            cursor: "pointer",
            "& .MuiOutlinedInput-root": {
              borderRadius: 6,
              fontSize: { xs: 14, sm: 15 },
              bgcolor: (t) =>
                t.palette.mode === "dark"
                  ? alpha(t.palette.common.white, 0.03)
                  : alpha(t.palette.common.black, 0.02),
              transition: "all 0.2s",
              "& fieldset": { borderColor: "divider" },
              "&:hover": {
                bgcolor: (t) =>
                  t.palette.mode === "dark"
                    ? alpha(t.palette.common.white, 0.05)
                    : alpha(t.palette.common.black, 0.03),
              },
              "&:hover fieldset": { borderColor: "primary.main" },
              "&.Mui-focused fieldset": {
                borderColor: "primary.main",
                borderWidth: 2,
              },
            },
            "& .MuiInputBase-input": {
              cursor: "pointer",
              py: { xs: 1.25, sm: 1.5 },
            },
          }}
          InputProps={{
            readOnly: true,
          }}
        />
      </Box>

      <Divider sx={{ mb: 1.5, borderColor: "divider" }} />

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          gap: { xs: 0.5, sm: 1 },
        }}
      >
        <IconButton
          onClick={onClick}
          sx={(t) => ({
            color: "#45bd62",
            borderRadius: 3,
            px: { xs: 1.5, sm: 2 },
            py: 1,
            gap: { xs: 0.5, sm: 1 },
            flex: 1,
            transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
            "&:hover": {
              bgcolor: alpha("#45bd62", 0.1),
              transform: "scale(1.02)",
            },
            "&:active": {
              transform: "scale(0.98)",
            },
          })}
        >
          <ImageIcon sx={{ fontSize: { xs: 20, sm: 24 } }} />
          <Box
            component="span"
            sx={{
              fontSize: { xs: 13, sm: 14 },
              fontWeight: 600,
              display: { xs: "none", sm: "inline" },
            }}
          >
            Photo
          </Box>
        </IconButton>

        <IconButton
          onClick={onClick}
          sx={(t) => ({
            color: "#f3425f",
            borderRadius: 3,
            px: { xs: 1.5, sm: 2 },
            py: 1,
            gap: { xs: 0.5, sm: 1 },
            flex: 1,
            transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
            "&:hover": {
              bgcolor: alpha("#f3425f", 0.1),
              transform: "scale(1.02)",
            },
            "&:active": {
              transform: "scale(0.98)",
            },
          })}
        >
          <VideocamIcon sx={{ fontSize: { xs: 20, sm: 24 } }} />
          <Box
            component="span"
            sx={{
              fontSize: { xs: 13, sm: 14 },
              fontWeight: 600,
              display: { xs: "none", sm: "inline" },
            }}
          >
            Video
          </Box>
        </IconButton>

        <IconButton
          onClick={onClick}
          sx={(t) => ({
            color: "#f7b928",
            borderRadius: 3,
            px: { xs: 1.5, sm: 2 },
            py: 1,
            gap: { xs: 0.5, sm: 1 },
            flex: 1,
            transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
            "&:hover": {
              bgcolor: alpha("#f7b928", 0.1),
              transform: "scale(1.02)",
            },
            "&:active": {
              transform: "scale(0.98)",
            },
          })}
        >
          <EmojiEmotionsIcon sx={{ fontSize: { xs: 20, sm: 24 } }} />
          <Box
            component="span"
            sx={{
              fontSize: { xs: 13, sm: 14 },
              fontWeight: 600,
              display: { xs: "none", sm: "inline" },
            }}
          >
            Feeling
          </Box>
        </IconButton>
      </Box>
    </Paper>
  );
}
