// src/pages/Groups.jsx
import { useState, useEffect } from "react";
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
  Divider,
  Stack,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Badge,
  CircularProgress,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import GroupsIcon from "@mui/icons-material/Groups";
import PublicIcon from "@mui/icons-material/Public";
import LockIcon from "@mui/icons-material/Lock";
import PeopleIcon from "@mui/icons-material/People";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import SettingsIcon from "@mui/icons-material/Settings";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import PageLayout from "./PageLayout";
import { 
  getMyGroups, 
  getJoinedGroups, 
  searchGroups, 
  createGroup, 
  joinGroup, 
  leaveGroup 
} from "../services/groupService";
import { extractArrayFromResponse } from "../utils/apiHelper";

export default function GroupPage() {
  const [tabValue, setTabValue] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [myGroups, setMyGroups] = useState([]);
  const [joinedGroups, setJoinedGroups] = useState([]);
  const [suggestedGroups, setSuggestedGroups] = useState([]);
  const [discoverGroups, setDiscoverGroups] = useState([]);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [creating, setCreating] = useState(false);
  const [newGroup, setNewGroup] = useState({
    name: "",
    description: "",
    privacy: "PUBLIC",
    category: "",
  });

  useEffect(() => {
    loadGroups();
  }, [tabValue]);

  const loadGroups = async () => {
    setLoading(true);
    try {
      if (tabValue === 0) {
        const [myGroupsRes, joinedGroupsRes] = await Promise.all([
          getMyGroups(1, 20),
          getJoinedGroups(1, 20)
        ]);
        const myGroupsData = extractArrayFromResponse(myGroupsRes.data);
        const joinedGroupsData = extractArrayFromResponse(joinedGroupsRes.data);
        setMyGroups(myGroupsData.items || []);
        setJoinedGroups(joinedGroupsData.items || []);
      } else if (tabValue === 1) {
        const res = await searchGroups("", 1, 20);
        const data = extractArrayFromResponse(res.data);
        setSuggestedGroups(data.items || []);
      } else if (tabValue === 2) {
        const res = await searchGroups("", 1, 20);
        const data = extractArrayFromResponse(res.data);
        setDiscoverGroups(data.items || []);
      }
    } catch (error) {
      console.error('Error loading groups:', error);
      setSnackbar({
        open: true,
        message: error.response?.data?.message || "Không thể tải danh sách nhóm",
        severity: "error"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setSearchQuery("");
  };

  const handleJoinGroup = async (groupId) => {
    try {
      await joinGroup(groupId);
      setSnackbar({ open: true, message: "Đã tham gia nhóm thành công!", severity: "success" });
      loadGroups();
    } catch (error) {
      console.error('Error joining group:', error);
      setSnackbar({
        open: true,
        message: error.response?.data?.message || "Không thể tham gia nhóm",
        severity: "error"
      });
    }
  };

  const handleLeaveGroup = async (groupId) => {
    try {
      await leaveGroup(groupId);
      setSnackbar({ open: true, message: "Đã rời khỏi nhóm!", severity: "info" });
      loadGroups();
    } catch (error) {
      console.error('Error leaving group:', error);
      setSnackbar({
        open: true,
        message: error.response?.data?.message || "Không thể rời khỏi nhóm",
        severity: "error"
      });
    }
  };

  const handleRemoveSuggestion = (id) => {
    setSuggestedGroups((prev) => prev.filter((g) => g.id !== id));
    setSnackbar({ open: true, message: "Đã xóa gợi ý này!", severity: "info" });
  };

  const handleCreateGroup = async () => {
    if (!newGroup.name.trim()) {
      setSnackbar({ open: true, message: "Vui lòng nhập tên nhóm!", severity: "error" });
      return;
    }
    setCreating(true);
    try {
      const groupData = {
        name: newGroup.name.trim(),
        description: newGroup.description.trim() || null,
        privacy: newGroup.privacy,
        category: newGroup.category || null,
      };
      const response = await createGroup(groupData);
      const createdGroup = response.data?.result || response.data;
      setMyGroups((prev) => [createdGroup, ...prev]);
      setCreateDialogOpen(false);
      setNewGroup({ name: "", description: "", privacy: "PUBLIC", category: "" });
      setSnackbar({ open: true, message: "Đã tạo nhóm mới thành công!", severity: "success" });
    } catch (error) {
      console.error('Error creating group:', error);
      setSnackbar({
        open: true,
        message: error.response?.data?.message || "Không thể tạo nhóm",
        severity: "error"
      });
    } finally {
      setCreating(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const allMyGroups = [...myGroups, ...joinedGroups];
  const filteredMyGroups = allMyGroups.filter((group) =>
    group?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatGroup = (group) => {
    if (!group) return null;
    return {
      id: group.id,
      name: group.name || "Không có tên",
      avatar: group.avatarUrl || group.avatar || group.imageUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(group.name || 'Group')}&background=667eea&color=fff&size=128`,
      members: group.memberCount || group.members || 0,
      privacy: group.privacy || "PUBLIC",
      description: group.description || "",
      category: group.category || "",
      createdDate: group.createdDate,
      modifiedDate: group.modifiedDate,
    };
  };

  return (
    <PageLayout>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          overflow: "auto",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box sx={{ width: "100%", maxWidth: 1200, py: { xs: 1, sm: 2 }, pl: 0, pr: { xs: 0.5, sm: 2 } }}>
          {/* Header */}
          <Card
            elevation={0}
            sx={(t) => ({
              borderRadius: { xs: 2, sm: 4 },
              p: { xs: 1.5, sm: 3 },
              mb: { xs: 2, sm: 3 },
              boxShadow: t.shadows[1],
              border: "1px solid",
              borderColor: "divider",
              bgcolor: "background.paper",
            })}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
              <Typography variant="h5" sx={{ fontWeight: 700, fontSize: { xs: 18, sm: 24 } }}>
                Nhóm
              </Typography>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => setCreateDialogOpen(true)}
                sx={{
                  borderRadius: 2,
                  textTransform: "none",
                  px: { xs: 1.5, sm: 3 },
                  py: { xs: 0.75, sm: 1 },
                  fontSize: { xs: 12, sm: 14 },
                  fontWeight: 600,
                }}
              >
                <Box component="span" sx={{ display: { xs: "none", sm: "inline" } }}>Tạo nhóm mới</Box>
                <Box component="span" sx={{ display: { xs: "inline", sm: "none" } }}>Tạo nhóm</Box>
              </Button>
            </Box>

            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              variant="scrollable"
              scrollButtons="auto"
              allowScrollButtonsMobile
              sx={{
                minHeight: { xs: 40, sm: 48 },
                "& .MuiTab-root": {
                  textTransform: "none",
                  fontSize: { xs: 12, sm: 15 },
                  fontWeight: 600,
                  minHeight: { xs: 40, sm: 48 },
                  px: { xs: 1.5, sm: 3 },
                  minWidth: { xs: "auto", sm: 90 },
                },
                "& .Mui-selected": {
                  color: "primary.main",
                },
                "& .MuiTabs-scrollButtons": {
                  width: { xs: 30, sm: 40 },
                },
              }}
            >
              <Tab label="Nhóm của bạn" />
              <Tab label="Gợi ý" />
              <Tab label="Khám phá" />
            </Tabs>
          </Card>

          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
              <CircularProgress />
            </Box>
          ) : (
            <>
              {tabValue === 0 && (
                <Box>
                  {filteredMyGroups.length === 0 ? (
                    <Card sx={{ p: 3, textAlign: "center" }}>
                      <Typography variant="body1" color="text.secondary">
                        Bạn chưa tham gia nhóm nào
                      </Typography>
                    </Card>
                  ) : (
                    <Grid container spacing={2}>
                      {filteredMyGroups.map((group) => {
                        const formatted = formatGroup(group);
                        if (!formatted) return null;
                        return (
                          <Grid item xs={12} sm={6} md={4} key={formatted.id}>
                            <Card
                              sx={{
                                p: 2,
                                height: "100%",
                                display: "flex",
                                flexDirection: "column",
                                "&:hover": { boxShadow: 3 },
                              }}
                            >
                              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                                <Avatar src={formatted.avatar} sx={{ width: 56, height: 56, mr: 2 }} />
                                <Box sx={{ flex: 1 }}>
                                  <Typography variant="h6" sx={{ fontSize: 16, fontWeight: 600, mb: 0.5 }}>
                                    {formatted.name}
                                  </Typography>
                                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                    {formatted.privacy === "PUBLIC" ? (
                                      <PublicIcon sx={{ fontSize: 16, color: "text.secondary" }} />
                                    ) : (
                                      <LockIcon sx={{ fontSize: 16, color: "text.secondary" }} />
                                    )}
                                    <Typography variant="caption" color="text.secondary">
                                      {formatted.members} thành viên
                                    </Typography>
                                  </Box>
                                </Box>
                              </Box>
                              {formatted.description && (
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 2, flex: 1 }}>
                                  {formatted.description}
                                </Typography>
                              )}
                              <Button
                                variant="outlined"
                                size="small"
                                onClick={() => handleLeaveGroup(formatted.id)}
                                sx={{ mt: "auto" }}
                              >
                                Rời nhóm
                              </Button>
                            </Card>
                          </Grid>
                        );
                      })}
                    </Grid>
                  )}
                </Box>
              )}

              {tabValue === 1 && (
                <Box>
                  {suggestedGroups.length === 0 ? (
                    <Card sx={{ p: 3, textAlign: "center" }}>
                      <Typography variant="body1" color="text.secondary">
                        Không có nhóm gợi ý
                      </Typography>
                    </Card>
                  ) : (
                    <Grid container spacing={2}>
                      {suggestedGroups.map((group) => {
                        const formatted = formatGroup(group);
                        if (!formatted) return null;
                        return (
                          <Grid item xs={12} sm={6} md={4} key={formatted.id}>
                            <Card
                              sx={{
                                p: 2,
                                height: "100%",
                                display: "flex",
                                flexDirection: "column",
                                "&:hover": { boxShadow: 3 },
                              }}
                            >
                              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                                <Avatar src={formatted.avatar} sx={{ width: 56, height: 56, mr: 2 }} />
                                <Box sx={{ flex: 1 }}>
                                  <Typography variant="h6" sx={{ fontSize: 16, fontWeight: 600, mb: 0.5 }}>
                                    {formatted.name}
                                  </Typography>
                                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                    {formatted.privacy === "PUBLIC" ? (
                                      <PublicIcon sx={{ fontSize: 16, color: "text.secondary" }} />
                                    ) : (
                                      <LockIcon sx={{ fontSize: 16, color: "text.secondary" }} />
                                    )}
                                    <Typography variant="caption" color="text.secondary">
                                      {formatted.members} thành viên
                                    </Typography>
                                  </Box>
                                </Box>
                              </Box>
                              {formatted.description && (
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 2, flex: 1 }}>
                                  {formatted.description}
                                </Typography>
                              )}
                              <Button
                                variant="contained"
                                size="small"
                                onClick={() => handleJoinGroup(formatted.id)}
                                sx={{ mt: "auto" }}
                              >
                                Tham gia
                              </Button>
                            </Card>
                          </Grid>
                        );
                      })}
                    </Grid>
                  )}
                </Box>
              )}

              {tabValue === 2 && (
                <Box>
                  {discoverGroups.length === 0 ? (
                    <Card sx={{ p: 3, textAlign: "center" }}>
                      <Typography variant="body1" color="text.secondary">
                        Không có nhóm để khám phá
                      </Typography>
                    </Card>
                  ) : (
                    <Grid container spacing={2}>
                      {discoverGroups.map((group) => {
                        const formatted = formatGroup(group);
                        if (!formatted) return null;
                        return (
                          <Grid item xs={12} sm={6} md={4} key={formatted.id}>
                            <Card
                              sx={{
                                p: 2,
                                height: "100%",
                                display: "flex",
                                flexDirection: "column",
                                "&:hover": { boxShadow: 3 },
                              }}
                            >
                              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                                <Avatar src={formatted.avatar} sx={{ width: 56, height: 56, mr: 2 }} />
                                <Box sx={{ flex: 1 }}>
                                  <Typography variant="h6" sx={{ fontSize: 16, fontWeight: 600, mb: 0.5 }}>
                                    {formatted.name}
                                  </Typography>
                                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                    {formatted.privacy === "PUBLIC" ? (
                                      <PublicIcon sx={{ fontSize: 16, color: "text.secondary" }} />
                                    ) : (
                                      <LockIcon sx={{ fontSize: 16, color: "text.secondary" }} />
                                    )}
                                    <Typography variant="caption" color="text.secondary">
                                      {formatted.members} thành viên
                                    </Typography>
                                  </Box>
                                </Box>
                              </Box>
                              {formatted.description && (
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 2, flex: 1 }}>
                                  {formatted.description}
                                </Typography>
                              )}
                              <Button
                                variant="contained"
                                size="small"
                                onClick={() => handleJoinGroup(formatted.id)}
                                sx={{ mt: "auto" }}
                              >
                                Tham gia
                              </Button>
                            </Card>
                          </Grid>
                        );
                      })}
                    </Grid>
                  )}
                </Box>
              )}
            </>
          )}
        </Box>
      </Box>

      {/* Create Group Dialog */}
      <Dialog open={createDialogOpen} onClose={() => setCreateDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Tạo nhóm mới</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Tên nhóm"
            value={newGroup.name}
            onChange={(e) => setNewGroup({ ...newGroup, name: e.target.value })}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Mô tả"
            value={newGroup.description}
            onChange={(e) => setNewGroup({ ...newGroup, description: e.target.value })}
            margin="normal"
            multiline
            rows={3}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Quyền riêng tư</InputLabel>
            <Select
              value={newGroup.privacy}
              onChange={(e) => setNewGroup({ ...newGroup, privacy: e.target.value })}
              label="Quyền riêng tư"
            >
              <MenuItem value="PUBLIC">Công khai</MenuItem>
              <MenuItem value="PRIVATE">Riêng tư</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCreateDialogOpen(false)}>Hủy</Button>
          <Button onClick={handleCreateGroup} variant="contained" disabled={creating}>
            {creating ? "Đang tạo..." : "Tạo nhóm"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </PageLayout>
  );
}
