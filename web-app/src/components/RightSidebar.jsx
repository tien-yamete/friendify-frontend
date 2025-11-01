import React from "react";
import {
  Box,
  Paper,
  Typography,
  Avatar,
  Button,
  Divider,
  Chip,
  Stack,
  IconButton,
  alpha,
} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import EventIcon from "@mui/icons-material/Event";
import CloseIcon from "@mui/icons-material/Close";

const FRIEND_SUGGESTIONS = [
  {
    id: 1,
    name: "Sarah Johnson",
    avatar: "https://i.pravatar.cc/150?img=1",
    mutualFriends: 12,
  },
  {
    id: 2,
    name: "Mike Chen",
    avatar: "https://i.pravatar.cc/150?img=2",
    mutualFriends: 8,
  },
  {
    id: 3,
    name: "Emma Wilson",
    avatar: "https://i.pravatar.cc/150?img=3",
    mutualFriends: 15,
  },
];

const TRENDING_TOPICS = [
  { id: 1, tag: "#ReactJS", posts: "2.5k posts", color: "#61dafb" },
  { id: 2, tag: "#WebDevelopment", posts: "1.8k posts", color: "#f7df1e" },
  { id: 3, tag: "#AI", posts: "3.2k posts", color: "#ff6b6b" },
  { id: 4, tag: "#Design", posts: "1.2k posts", color: "#a78bfa" },
  { id: 5, tag: "#Startup", posts: "950 posts", color: "#34d399" },
];

const UPCOMING_EVENTS = [
  {
    id: 1,
    title: "Tech Conference 2024",
    date: "Dec 20, 2024",
    time: "10:00 AM",
    interested: 234,
  },
  {
    id: 2,
    title: "React Meetup",
    date: "Dec 25, 2024",
    time: "6:00 PM",
    interested: 89,
  },
  {
    id: 3,
    title: "Design Workshop",
    date: "Dec 28, 2024",
    time: "2:00 PM",
    interested: 156,
  },
];

export default function RightSidebar() {
  const [friendSuggestions, setFriendSuggestions] = React.useState(FRIEND_SUGGESTIONS);

  const handleAddFriend = (id) => {
    setFriendSuggestions((prev) => prev.filter((friend) => friend.id !== id));
  };

  const handleRemoveSuggestion = (id) => {
    setFriendSuggestions((prev) => prev.filter((friend) => friend.id !== id));
  };

  return (
    <Box
      sx={{
        width: 340,
        display: { xs: "none", lg: "block" },
        position: "sticky",
        top: 88,
        height: "calc(100vh - 112px)",
        overflowY: "auto",
        overflowX: "hidden",
        pl: 2,
        pr: 1,
        py: 1,
        "&::-webkit-scrollbar": {
          width: "6px",
        },
        "&::-webkit-scrollbar-track": {
          backgroundColor: "transparent",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: (t) => alpha(t.palette.text.primary, 0.15),
          borderRadius: "3px",
          "&:hover": {
            backgroundColor: (t) => alpha(t.palette.text.primary, 0.25),
          },
        },
      }}
    >
      <Paper
        elevation={0}
        sx={(t) => ({
          borderRadius: 4,
          p: 2.5,
          mb: 2.5,
          border: "1px solid",
          borderColor: "divider",
          bgcolor: "background.paper",
          boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
          transition: "all 0.3s",
          "&:hover": {
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          },
        })}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2.5 }}>
          <Box
            sx={(t) => ({
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 32,
              height: 32,
              borderRadius: 2,
              bgcolor: alpha(t.palette.primary.main, 0.1),
            })}
          >
            <PersonAddIcon sx={{ fontSize: 18, color: "primary.main" }} />
          </Box>
          <Typography variant="h6" sx={{ fontWeight: 700, fontSize: 16, flex: 1 }}>
            Friend Suggestions
          </Typography>
        </Box>

        {friendSuggestions.length === 0 ? (
          <Typography variant="body2" color="text.secondary" sx={{ py: 3, textAlign: "center", fontSize: 14 }}>
            No suggestions available
          </Typography>
        ) : (
          <Stack spacing={2}>
            {friendSuggestions.map((friend, index) => (
              <Box key={friend.id}>
                <Box
                  sx={(t) => ({
                    p: 1.5,
                    borderRadius: 3,
                    position: "relative",
                    transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                    bgcolor: "transparent",
                    "&:hover": {
                      bgcolor: t.palette.action.hover,
                      transform: "translateX(2px)",
                    },
                  })}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1.5 }}>
                    <Avatar
                      src={friend.avatar}
                      sx={{
                        width: 48,
                        height: 48,
                        border: "2px solid",
                        borderColor: "divider",
                      }}
                    />
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography
                        variant="body2"
                        sx={{ fontWeight: 700, fontSize: 14, mb: 0.25 }}
                        noWrap
                      >
                        {friend.name}
                      </Typography>
                      <Typography variant="caption" sx={{ fontSize: 12, color: "text.secondary" }}>
                        {friend.mutualFriends} mutual friends
                      </Typography>
                    </Box>
                    <IconButton
                      size="small"
                      onClick={() => handleRemoveSuggestion(friend.id)}
                      sx={(t) => ({
                        width: 24,
                        height: 24,
                        color: "text.secondary",
                        transition: "all 0.2s",
                        "&:hover": {
                          bgcolor: t.palette.action.selected,
                          color: "error.main",
                          transform: "scale(1.1)",
                        },
                      })}
                    >
                      <CloseIcon sx={{ fontSize: 16 }} />
                    </IconButton>
                  </Box>
                  <Button
                    fullWidth
                    size="small"
                    variant="contained"
                    onClick={() => handleAddFriend(friend.id)}
                    sx={(t) => ({
                      textTransform: "none",
                      fontWeight: 600,
                      fontSize: 13,
                      borderRadius: 2.5,
                      py: 0.75,
                      background: `linear-gradient(135deg, ${t.palette.primary.main} 0%, ${alpha(
                        t.palette.primary.main,
                        0.85
                      )} 100%)`,
                      boxShadow: "none",
                      transition: "all 0.2s",
                      "&:hover": {
                        boxShadow: `0 4px 12px ${alpha(t.palette.primary.main, 0.35)}`,
                        transform: "translateY(-1px)",
                      },
                    })}
                  >
                    Add Friend
                  </Button>
                </Box>
                {index < friendSuggestions.length - 1 && (
                  <Divider sx={{ mt: 2, borderColor: "divider" }} />
                )}
              </Box>
            ))}
          </Stack>
        )}
      </Paper>

      <Paper
        elevation={0}
        sx={(t) => ({
          borderRadius: 4,
          p: 2.5,
          mb: 2.5,
          border: "1px solid",
          borderColor: "divider",
          bgcolor: "background.paper",
          boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
          transition: "all 0.3s",
          "&:hover": {
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          },
        })}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2.5 }}>
          <Box
            sx={(t) => ({
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 32,
              height: 32,
              borderRadius: 2,
              bgcolor: alpha(t.palette.primary.main, 0.1),
            })}
          >
            <TrendingUpIcon sx={{ fontSize: 18, color: "primary.main" }} />
          </Box>
          <Typography variant="h6" sx={{ fontWeight: 700, fontSize: 16 }}>
            Trending Topics
          </Typography>
        </Box>

        <Stack spacing={1}>
          {TRENDING_TOPICS.map((topic) => (
            <Box
              key={topic.id}
              sx={(t) => ({
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                p: 1.5,
                borderRadius: 3,
                cursor: "pointer",
                transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                bgcolor: "transparent",
                border: "1px solid transparent",
                "&:hover": {
                  bgcolor: t.palette.action.hover,
                  borderColor: alpha(topic.color, 0.3),
                  transform: "translateX(4px)",
                  "& .topic-icon": {
                    transform: "scale(1.2) rotate(5deg)",
                  },
                },
              })}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <Box
                  className="topic-icon"
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    bgcolor: topic.color,
                    transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
                  }}
                />
                <Box>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 700,
                      fontSize: 14,
                      color: "text.primary",
                      mb: 0.25,
                    }}
                  >
                    {topic.tag}
                  </Typography>
                  <Typography variant="caption" sx={{ fontSize: 12, color: "text.secondary" }}>
                    {topic.posts}
                  </Typography>
                </Box>
              </Box>
              <Chip
                label="Hot"
                size="small"
                sx={(t) => ({
                  height: 22,
                  fontSize: 11,
                  fontWeight: 700,
                  bgcolor: alpha(topic.color, 0.15),
                  color: topic.color,
                  border: `1px solid ${alpha(topic.color, 0.3)}`,
                })}
              />
            </Box>
          ))}
        </Stack>
      </Paper>

      <Paper
        elevation={0}
        sx={(t) => ({
          borderRadius: 4,
          p: 2.5,
          border: "1px solid",
          borderColor: "divider",
          bgcolor: "background.paper",
          boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
          transition: "all 0.3s",
          "&:hover": {
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          },
        })}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2.5 }}>
          <Box
            sx={(t) => ({
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 32,
              height: 32,
              borderRadius: 2,
              bgcolor: alpha(t.palette.primary.main, 0.1),
            })}
          >
            <EventIcon sx={{ fontSize: 18, color: "primary.main" }} />
          </Box>
          <Typography variant="h6" sx={{ fontWeight: 700, fontSize: 16 }}>
            Upcoming Events
          </Typography>
        </Box>

        <Stack spacing={2}>
          {UPCOMING_EVENTS.map((event) => (
            <Box
              key={event.id}
              sx={(t) => ({
                p: 2,
                borderRadius: 3,
                border: "1px solid",
                borderColor: "divider",
                cursor: "pointer",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                bgcolor: "transparent",
                "&:hover": {
                  bgcolor: t.palette.action.hover,
                  borderColor: alpha(t.palette.primary.main, 0.3),
                  transform: "translateY(-2px)",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                },
              })}
            >
              <Typography
                variant="body2"
                sx={{ fontWeight: 700, fontSize: 14, mb: 1.25, color: "text.primary" }}
              >
                {event.title}
              </Typography>
              <Stack spacing={0.5} sx={{ mb: 1.5 }}>
                <Typography variant="caption" sx={{ fontSize: 12, color: "text.secondary" }}>
                  📅 {event.date}
                </Typography>
                <Typography variant="caption" sx={{ fontSize: 12, color: "text.secondary" }}>
                  🕐 {event.time}
                </Typography>
              </Stack>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 1 }}>
                <Chip
                  label={`${event.interested} interested`}
                  size="small"
                  sx={(t) => ({
                    height: 24,
                    fontSize: 11,
                    fontWeight: 600,
                    bgcolor: t.palette.action.selected,
                    color: "text.secondary",
                  })}
                />
                <Button
                  size="small"
                  variant="text"
                  sx={(t) => ({
                    textTransform: "none",
                    fontSize: 12,
                    fontWeight: 600,
                    minWidth: "auto",
                    px: 2,
                    py: 0.5,
                    borderRadius: 2,
                    color: "primary.main",
                    transition: "all 0.2s",
                    "&:hover": {
                      bgcolor: alpha(t.palette.primary.main, 0.1),
                    },
                  })}
                >
                  Interested
                </Button>
              </Box>
            </Box>
          ))}
        </Stack>
      </Paper>
    </Box>
  );
}
