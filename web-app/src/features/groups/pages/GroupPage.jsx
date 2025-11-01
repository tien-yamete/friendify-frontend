// src/pages/GroupPage.jsx
import { useState } from "react";
import {
  Box,
  Card,
  Typography,
  Avatar,
  Button,
  Tabs,
  Tab,
  TextField,
  InputAdornment,
  Grid,
  Chip,
  IconButton,
  AvatarGroup,
  Paper,
  Stack,
  Divider,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import PeopleIcon from "@mui/icons-material/People";
import LockIcon from "@mui/icons-material/Lock";
import PublicIcon from "@mui/icons-material/Public";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import GroupsIcon from "@mui/icons-material/Groups";
import Scene from "../../../shared/components/layout/Scene";

// Mock data
const MY_GROUPS = [
  {
    id: 1,
    name: "React Developers",
    avatar: "https://i.pravatar.cc/300?img=10",
    coverImage: "https://picsum.photos/seed/group1/800/200",
    members: 1234,
    privacy: "public",
    description: "A community for React developers",
    lastActivity: "2 hours ago",
    memberAvatars: [
      "https://i.pravatar.cc/150?img=1",
      "https://i.pravatar.cc/150?img=2",
      "https://i.pravatar.cc/150?img=3",
      "https://i.pravatar.cc/150?img=4",
    ],
  },
  {
    id: 2,
    name: "Web Design Inspiration",
    avatar: "https://i.pravatar.cc/300?img=11",
    coverImage: "https://picsum.photos/seed/group2/800/200",
    members: 892,
    privacy: "private",
    description: "Share and discuss web design trends",
    lastActivity: "1 day ago",
    memberAvatars: [
      "https://i.pravatar.cc/150?img=5",
      "https://i.pravatar.cc/150?img=6",
      "https://i.pravatar.cc/150?img=7",
    ],
  },
  {
    id: 3,
    name: "JavaScript Lovers",
    avatar: "https://i.pravatar.cc/300?img=12",
    coverImage: "https://picsum.photos/seed/group3/800/200",
    members: 2456,
    privacy: "public",
    description: "Everything about JavaScript",
    lastActivity: "3 hours ago",
    memberAvatars: [
      "https://i.pravatar.cc/150?img=8",
      "https://i.pravatar.cc/150?img=9",
      "https://i.pravatar.cc/150?img=10",
      "https://i.pravatar.cc/150?img=11",
      "https://i.pravatar.cc/150?img=12",
    ],
  },
];

const SUGGESTED_GROUPS = [
  {
    id: 101,
    name: "UI/UX Community",
    avatar: "https://i.pravatar.cc/300?img=13",
    coverImage: "https://picsum.photos/seed/group4/800/200",
    members: 3456,
    privacy: "public",
    description: "Learn and share UI/UX best practices",
    category: "Design",
  },
  {
    id: 102,
    name: "Node.js Developers",
    avatar: "https://i.pravatar.cc/300?img=14",
    coverImage: "https://picsum.photos/seed/group5/800/200",
    members: 1987,
    privacy: "public",
    description: "Backend development with Node.js",
    category: "Development",
  },
  {
    id: 103,
    name: "Startup Founders",
    avatar: "https://i.pravatar.cc/300?img=15",
    coverImage: "https://picsum.photos/seed/group6/800/200",
    members: 678,
    privacy: "private",
    description: "Connect with fellow entrepreneurs",
    category: "Business",
  },
  {
    id: 104,
    name: "Data Science Hub",
    avatar: "https://i.pravatar.cc/300?img=16",
    coverImage: "https://picsum.photos/seed/group7/800/200",
    members: 2134,
    privacy: "public",
    description: "Machine learning and data analytics",
    category: "Science",
  },
];

const DISCOVER_GROUPS = [
  {
    id: 201,
    name: "Photography Masters",
    avatar: "https://i.pravatar.cc/300?img=17",
    members: 5678,
    privacy: "public",
    trending: true,
  },
  {
    id: 202,
    name: "Digital Marketing Pro",
    avatar: "https://i.pravatar.cc/300?img=18",
    members: 4321,
    privacy: "public",
    trending: true,
  },
  {
    id: 203,
    name: "Fitness & Health",
    avatar: "https://i.pravatar.cc/300?img=19",
    members: 8901,
    privacy: "public",
    trending: false,
  },
  {
    id: 204,
    name: "Book Club",
    avatar: "https://i.pravatar.cc/300?img=20",
    members: 1234,
    privacy: "public",
    trending: false,
  },
];

export default function GroupPage() {
  const [tabValue, setTabValue] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setSearchQuery("");
  };

  const filteredMyGroups = MY_GROUPS.filter((group) =>
    group.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredSuggested = SUGGESTED_GROUPS.filter((group) =>
    group.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredDiscover = DISCOVER_GROUPS.filter((group) =>
    group.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Scene>
      <Box sx={{ display: "flex", justifyContent: "center", width: "100%", mt: 4, px: 2 }}>
        <Box sx={{ width: "100%", maxWidth: 1200 }}>
          {/* Header */}
          <Card
            elevation={0}
            sx={(t) => ({
              borderRadius: 4,
              p: 3,
              mb: 3,
              boxShadow: t.shadows[1],
              border: "1px solid",
              borderColor: "divider",
              bgcolor: "background.paper",
            })}
          >
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
              <Typography
                sx={{
                  fontSize: 26,
                  fontWeight: 700,
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Groups
              </Typography>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                sx={{
                  textTransform: "none",
                  fontWeight: 600,
                  borderRadius: 3,
                  px: 3,
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  "&:hover": {
                    background: "linear-gradient(135deg, #5568d3 0%, #63428a 100%)",
                  },
                }}
              >
                Create Group
              </Button>
            </Box>

            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              sx={{
                "& .MuiTab-root": {
                  textTransform: "none",
                  fontSize: 15,
                  fontWeight: 600,
                  minHeight: 48,
                },
                "& .Mui-selected": {
                  color: "primary.main",
                },
              }}
            >
              <Tab label={`My Groups (${MY_GROUPS.length})`} />
              <Tab label="Suggested" />
              <Tab label="Discover" />
            </Tabs>
          </Card>

          {/* Search */}
          <Card
            elevation={0}
            sx={(t) => ({
              borderRadius: 4,
              p: 2.5,
              mb: 3,
              boxShadow: t.shadows[1],
              border: "1px solid",
              borderColor: "divider",
              bgcolor: "background.paper",
            })}
          >
            <TextField
              fullWidth
              placeholder="Search groups..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 3,
                  bgcolor: (t) =>
                    t.palette.mode === "dark" ? "rgba(255,255,255,0.04)" : "background.default",
                  "& fieldset": { borderColor: "divider" },
                  "&:hover fieldset": { borderColor: "primary.main" },
                  "&.Mui-focused fieldset": { borderColor: "primary.main", borderWidth: 2 },
                },
              }}
            />
          </Card>

          {/* Tab 0: My Groups */}
          {tabValue === 0 && (
            <Grid container spacing={2.5}>
              {filteredMyGroups.map((group) => (
                <Grid item xs={12} sm={6} md={4} key={group.id}>
                  <Card
                    elevation={0}
                    sx={(t) => ({
                      borderRadius: 4,
                      overflow: "hidden",
                      boxShadow: t.shadows[1],
                      border: "1px solid",
                      borderColor: "divider",
                      bgcolor: "background.paper",
                      transition: "all 0.3s ease",
                      cursor: "pointer",
                      "&:hover": {
                        boxShadow: t.shadows[4],
                        transform: "translateY(-4px)",
                      },
                    })}
                    onClick={() => (window.location.href = `/groups/${group.id}`)}
                  >
                    <Box
                      sx={{
                        height: 120,
                        backgroundImage: `url(${group.coverImage})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        position: "relative",
                      }}
                    >
                      <Chip
                        icon={group.privacy === "public" ? <PublicIcon /> : <LockIcon />}
                        label={group.privacy}
                        size="small"
                        sx={{
                          position: "absolute",
                          top: 12,
                          right: 12,
                          bgcolor: "rgba(0,0,0,0.6)",
                          color: "white",
                          textTransform: "capitalize",
                          fontWeight: 600,
                        }}
                      />
                    </Box>

                    <Box sx={{ p: 2.5, position: "relative", mt: -4 }}>
                      <Avatar
                        src={group.avatar}
                        sx={{
                          width: 72,
                          height: 72,
                          border: "4px solid",
                          borderColor: "background.paper",
                          mb: 1.5,
                        }}
                      />

                      <Typography variant="h6" fontWeight={700} mb={0.5} noWrap>
                        {group.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        mb={1.5}
                        sx={{
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                          minHeight: 40,
                        }}
                      >
                        {group.description}
                      </Typography>

                      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
                        <AvatarGroup max={4} sx={{ "& .MuiAvatar-root": { width: 28, height: 28, fontSize: 12 } }}>
                          {group.memberAvatars.map((avatar, idx) => (
                            <Avatar key={idx} src={avatar} />
                          ))}
                        </AvatarGroup>
                        <Typography variant="caption" color="text.secondary" fontWeight={600}>
                          {group.members.toLocaleString()} members
                        </Typography>
                      </Box>

                      <Typography variant="caption" color="text.disabled">
                        Last activity: {group.lastActivity}
                      </Typography>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}

          {/* Tab 1: Suggested Groups */}
          {tabValue === 1 && (
            <Grid container spacing={2.5}>
              {filteredSuggested.map((group) => (
                <Grid item xs={12} sm={6} md={4} key={group.id}>
                  <Card
                    elevation={0}
                    sx={(t) => ({
                      borderRadius: 4,
                      overflow: "hidden",
                      boxShadow: t.shadows[1],
                      border: "1px solid",
                      borderColor: "divider",
                      bgcolor: "background.paper",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        boxShadow: t.shadows[4],
                        transform: "translateY(-4px)",
                      },
                    })}
                  >
                    <Box
                      sx={{
                        height: 120,
                        backgroundImage: `url(${group.coverImage})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        position: "relative",
                      }}
                    >
                      <Chip
                        label={group.category}
                        size="small"
                        sx={{
                          position: "absolute",
                          top: 12,
                          right: 12,
                          bgcolor: "primary.main",
                          color: "white",
                          fontWeight: 600,
                        }}
                      />
                    </Box>

                    <Box sx={{ p: 2.5, position: "relative", mt: -4 }}>
                      <Avatar
                        src={group.avatar}
                        sx={{
                          width: 72,
                          height: 72,
                          border: "4px solid",
                          borderColor: "background.paper",
                          mb: 1.5,
                        }}
                      />

                      <Typography variant="h6" fontWeight={700} mb={0.5} noWrap>
                        {group.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        mb={1.5}
                        sx={{
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                          minHeight: 40,
                        }}
                      >
                        {group.description}
                      </Typography>

                      <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, mb: 2 }}>
                        <PeopleIcon fontSize="small" color="action" />
                        <Typography variant="caption" color="text.secondary" fontWeight={600}>
                          {group.members.toLocaleString()} members
                        </Typography>
                        <Box sx={{ width: 4, height: 4, bgcolor: "text.disabled", borderRadius: "50%" }} />
                        <Chip
                          icon={<PublicIcon sx={{ fontSize: 14 }} />}
                          label={group.privacy}
                          size="small"
                          sx={{ height: 20, fontSize: 11, textTransform: "capitalize" }}
                        />
                      </Box>

                      <Button
                        fullWidth
                        variant="contained"
                        sx={{
                          textTransform: "none",
                          fontWeight: 600,
                          borderRadius: 2.5,
                          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                          "&:hover": {
                            background: "linear-gradient(135deg, #5568d3 0%, #63428a 100%)",
                          },
                        }}
                      >
                        Join Group
                      </Button>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}

          {/* Tab 2: Discover Groups */}
          {tabValue === 2 && (
            <Box>
              {/* Trending Section */}
              <Box sx={{ mb: 4 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2.5 }}>
                  <TrendingUpIcon sx={{ color: "primary.main" }} />
                  <Typography variant="h6" fontWeight={700}>
                    Trending Groups
                  </Typography>
                </Box>
                <Grid container spacing={2.5}>
                  {filteredDiscover
                    .filter((g) => g.trending)
                    .map((group) => (
                      <Grid item xs={12} sm={6} md={3} key={group.id}>
                        <Paper
                          elevation={0}
                          sx={(t) => ({
                            borderRadius: 4,
                            p: 2.5,
                            textAlign: "center",
                            boxShadow: t.shadows[1],
                            border: "1px solid",
                            borderColor: "divider",
                            bgcolor: "background.paper",
                            transition: "all 0.3s ease",
                            cursor: "pointer",
                            "&:hover": {
                              boxShadow: t.shadows[4],
                              transform: "translateY(-4px)",
                            },
                          })}
                        >
                          <Avatar
                            src={group.avatar}
                            sx={{ width: 80, height: 80, mx: "auto", mb: 2 }}
                          />
                          <Typography variant="h6" fontWeight={700} mb={0.5} fontSize={15} noWrap>
                            {group.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary" display="block" mb={2}>
                            {group.members.toLocaleString()} members
                          </Typography>
                          <Button
                            fullWidth
                            variant="outlined"
                            size="small"
                            sx={{
                              textTransform: "none",
                              fontWeight: 600,
                              borderRadius: 2.5,
                              borderColor: "divider",
                              "&:hover": {
                                borderColor: "primary.main",
                                bgcolor: "rgba(102, 126, 234, 0.04)",
                              },
                            }}
                          >
                            View Group
                          </Button>
                        </Paper>
                      </Grid>
                    ))}
                </Grid>
              </Box>

              {/* All Groups Section */}
              <Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2.5 }}>
                  <GroupsIcon sx={{ color: "primary.main" }} />
                  <Typography variant="h6" fontWeight={700}>
                    All Groups
                  </Typography>
                </Box>
                <Grid container spacing={2.5}>
                  {filteredDiscover.map((group) => (
                    <Grid item xs={12} sm={6} md={3} key={group.id}>
                      <Paper
                        elevation={0}
                        sx={(t) => ({
                          borderRadius: 4,
                          p: 2.5,
                          textAlign: "center",
                          boxShadow: t.shadows[1],
                          border: "1px solid",
                          borderColor: "divider",
                          bgcolor: "background.paper",
                          transition: "all 0.3s ease",
                          cursor: "pointer",
                          "&:hover": {
                            boxShadow: t.shadows[4],
                            transform: "translateY(-4px)",
                          },
                        })}
                      >
                        <Avatar
                          src={group.avatar}
                          sx={{ width: 80, height: 80, mx: "auto", mb: 2 }}
                        />
                        <Typography variant="h6" fontWeight={700} mb={0.5} fontSize={15} noWrap>
                          {group.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" display="block" mb={2}>
                          {group.members.toLocaleString()} members
                        </Typography>
                        <Button
                          fullWidth
                          variant="outlined"
                          size="small"
                          sx={{
                            textTransform: "none",
                            fontWeight: 600,
                            borderRadius: 2.5,
                            borderColor: "divider",
                            "&:hover": {
                              borderColor: "primary.main",
                              bgcolor: "rgba(102, 126, 234, 0.04)",
                            },
                          }}
                        >
                          View Group
                        </Button>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Box>
          )}

          {/* Empty state */}
          {((tabValue === 0 && filteredMyGroups.length === 0) ||
            (tabValue === 1 && filteredSuggested.length === 0) ||
            (tabValue === 2 && filteredDiscover.length === 0)) && (
            <Card
              elevation={0}
              sx={(t) => ({
                borderRadius: 4,
                p: 6,
                textAlign: "center",
                boxShadow: t.shadows[1],
                border: "1px solid",
                borderColor: "divider",
                bgcolor: "background.paper",
              })}
            >
              <GroupsIcon sx={{ fontSize: 64, color: "text.disabled", mb: 2 }} />
              <Typography variant="h6" color="text.secondary">
                No groups found
              </Typography>
            </Card>
          )}
        </Box>
      </Box>
    </Scene>
  );
}
