import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import {
  AppBar, Toolbar, Box, Avatar, IconButton, InputBase, Badge,
  MenuItem, Menu, Divider, Button, Switch, Typography, Paper, List,
  ListItem, ListItemAvatar, ListItemText, Popper, ClickAwayListener
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import SettingsOutlined from "@mui/icons-material/SettingsOutlined";
import LogoutOutlined from "@mui/icons-material/LogoutOutlined";
import WbSunnyOutlined from "@mui/icons-material/WbSunnyOutlined";
import DarkModeOutlined from "@mui/icons-material/DarkModeOutlined";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import HistoryIcon from "@mui/icons-material/History";
import { isAuthenticated, logOut } from "@/features/auth/services/authService";

const SEARCH_SUGGESTIONS = [
  { id: 1, type: "user", name: "Sarah Johnson", avatar: "https://i.pravatar.cc/150?img=1" },
  { id: 2, type: "user", name: "Mike Chen", avatar: "https://i.pravatar.cc/150?img=2" },
  { id: 3, type: "trending", name: "#ReactJS", subtitle: "2.5k posts" },
  { id: 4, type: "trending", name: "#WebDev", subtitle: "1.8k posts" },
  { id: 5, type: "recent", name: "JavaScript Tutorial", subtitle: "Recent search" },
];

const SearchRoot = styled("div")(({ theme }) => {
  const isDark = theme.palette.mode === "dark";
  const baseBg = isDark ? alpha(theme.palette.common.white, 0.08) : alpha(theme.palette.common.black, 0.04);
  const hoverBg = isDark ? alpha(theme.palette.common.white, 0.12) : alpha(theme.palette.common.black, 0.06);
  const focusBg = isDark ? alpha(theme.palette.common.white, 0.15) : alpha(theme.palette.common.black, 0.08);
  return {
    position: "relative",
    borderRadius: 24,
    backgroundColor: baseBg,
    border: `1px solid ${theme.palette.divider}`,
    transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
    "&:hover": {
      backgroundColor: hoverBg,
      borderColor: alpha(theme.palette.primary.main, 0.2),
    },
    "&:focus-within": {
      backgroundColor: focusBg,
      boxShadow: `0 0 0 3px ${alpha(theme.palette.primary.main, 0.15)}`,
      borderColor: alpha(theme.palette.primary.main, 0.4),
    },
    marginLeft: theme.spacing(2),
    width: "100%",
    [theme.breakpoints.up("sm")]: { width: "auto" },
  };
});

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.text.secondary,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1.25, 1.25, 1.25, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: { width: "24ch" },
    "&::placeholder": {
      opacity: 0.7,
    },
  },
}));

export default function Header({
  user = { name: "Tạ Văn Tiến", title: "Web Developer", avatar: "/avatar.png" },
  onToggleTheme = () => {},
  isDarkMode = false,
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [searchAnchor, setSearchAnchor] = React.useState(null);
  const searchRef = React.useRef(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const isSearchOpen = Boolean(searchAnchor) && searchQuery.trim().length > 0;

  const handleProfileMenuOpen = (e) => setAnchorEl(e.currentTarget);
  const handleMobileMenuOpen = (e) => setMobileMoreAnchorEl(e.currentTarget);
  const handleMobileMenuClose = () => setMobileMoreAnchorEl(null);
  const handleMenuClose = () => { setAnchorEl(null); handleMobileMenuClose(); };

  const handleOpenProfile = () => { handleMenuClose(); window.location.href = "/profile"; };
  const handleLogout = () => { handleMenuClose(); logOut(); window.location.href = "/login"; };

  const handleSearchFocus = (e) => setSearchAnchor(e.currentTarget);
  const handleSearchChange = (e) => setSearchQuery(e.target.value);
  const handleSearchClose = () => {
    setSearchAnchor(null);
    setSearchQuery("");
  };

  const filteredSuggestions = SEARCH_SUGGESTIONS.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const menuId = "primary-profile-menu";
  const mobileMenuId = "primary-profile-menu-mobile";

  const ProfileCardMenu = (
    <Menu
      id={menuId}
      anchorEl={anchorEl}
      open={isMenuOpen}
      onClose={handleMenuClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      PaperProps={{
        elevation: 0,
        sx: (t) => ({
          mt: 1.5,
          borderRadius: 4,
          minWidth: 320,
          border: `1px solid ${t.palette.divider}`,
          boxShadow: "0 12px 32px rgba(0,0,0,0.15)",
          overflow: "visible",
          p: 2,
          "&:before": {
            content: '""',
            position: "absolute",
            top: 0,
            right: 20,
            width: 12,
            height: 12,
            bgcolor: "background.paper",
            transform: "translateY(-50%) rotate(45deg)",
            borderLeft: `1px solid ${t.palette.divider}`,
            borderTop: `1px solid ${t.palette.divider}`,
          },
        }),
      }}
    >
      {isAuthenticated() ? (
        <>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, px: 1, mb: 1.5 }}>
            <Avatar src={user.avatar} alt={user.name} sx={{ width: 44, height: 44 }} />
            <Box sx={{ minWidth: 0, flex: 1 }}>
              <Typography noWrap sx={{ fontWeight: 700, fontSize: 16, color: "text.primary" }}>{user.name}</Typography>
              <Typography noWrap sx={{ color: "text.secondary", fontSize: 13 }}>{user.title}</Typography>
            </Box>
          </Box>
          <Button
            fullWidth
            size="small"
            onClick={handleOpenProfile}
            variant="outlined"
            sx={(t) => ({
              textTransform: "none",
              borderRadius: 2.5,
              fontWeight: 600,
              mb: 1.5,
              py: 1,
              fontSize: 14,
              borderColor: "divider",
              "&:hover": {
                borderColor: "primary.main",
                bgcolor: alpha(t.palette.primary.main, 0.08),
              },
            })}
          >
            View Profile
          </Button>

          <Divider sx={{ my: 1.5 }} />

          <MenuItem
            onClick={() => { handleMenuClose(); window.location.href = "/settings"; }}
            sx={(t) => ({
              py: 1.5,
              px: 1.5,
              borderRadius: 2.5,
              mb: 0.5,
              transition: "all 0.2s",
              "&:hover": {
                backgroundColor: t.palette.action.hover,
                transform: "translateX(4px)",
              },
            })}
          >
            <SettingsOutlined sx={{ mr: 1.5, fontSize: 20 }} />
            <Typography sx={{ fontSize: 14, fontWeight: 600 }}>Settings & Privacy</Typography>
          </MenuItem>

          <MenuItem
            onClick={handleLogout}
            sx={(t) => ({
              py: 1.5,
              px: 1.5,
              borderRadius: 2.5,
              color: "error.main",
              transition: "all 0.2s",
              "&:hover": {
                backgroundColor: alpha(t.palette.error.main, 0.1),
                transform: "translateX(4px)",
              },
            })}
          >
            <LogoutOutlined sx={{ mr: 1.5, fontSize: 20 }} />
            <Typography sx={{ fontSize: 14, fontWeight: 600 }}>Sign Out</Typography>
          </MenuItem>

          <Divider sx={{ my: 1.5 }} />

          <Box
            sx={(t) => ({
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              px: 1.5,
              py: 1.25,
              borderRadius: 2.5,
              bgcolor: t.palette.action.hover,
            })}
          >
            <WbSunnyOutlined fontSize="small" sx={{ color: "text.secondary" }} />
            <Typography sx={{ fontSize: 14, fontWeight: 600, flex: 1, color: "text.primary" }}>Dark mode</Typography>
            <Switch
              edge="end"
              checked={isDarkMode}
              onChange={(e) => onToggleTheme?.(e.target.checked)}
              sx={(t) => ({
                "& .MuiSwitch-switchBase.Mui-checked": {
                  color: t.palette.primary.main,
                },
                "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                  backgroundColor: t.palette.primary.main,
                },
              })}
            />
            <DarkModeOutlined fontSize="small" sx={{ color: "text.secondary" }} />
          </Box>
        </>
      ) : (
        <Box sx={{ p: 1 }}>
          <Button
            fullWidth
            variant="contained"
            onClick={() => (window.location.href = "/login")}
            sx={{ textTransform: "none", borderRadius: 2.5, fontWeight: 600 }}
          >
            Login
          </Button>
        </Box>
      )}
    </Menu>
  );

  const MobileMenu = (
    <Menu
      id={mobileMenuId}
      anchorEl={mobileMoreAnchorEl}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      PaperProps={{
        sx: (t) => ({
          mt: 1.5,
          borderRadius: 4,
          border: `1px solid ${t.palette.divider}`,
          boxShadow: "0 12px 32px rgba(0,0,0,0.15)",
          minWidth: 240,
        }),
      }}
    >
      {isAuthenticated() ? (
        <>
          <MenuItem
            sx={(t) => ({
              py: 1.5,
              px: 2,
              transition: "all 0.2s",
              "&:hover": { bgcolor: t.palette.action.hover },
            })}
          >
            <IconButton
              size="large"
              color="inherit"
              sx={{ mr: 1.5, p: 0 }}
            >
              <Badge badgeContent={2} color="error"><MailIcon /></Badge>
            </IconButton>
            <Typography sx={{ fontSize: 14, fontWeight: 600 }}>Messages</Typography>
          </MenuItem>
          <MenuItem
            sx={(t) => ({
              py: 1.5,
              px: 2,
              transition: "all 0.2s",
              "&:hover": { bgcolor: t.palette.action.hover },
            })}
          >
            <IconButton
              size="large"
              color="inherit"
              sx={{ mr: 1.5, p: 0 }}
            >
              <Badge badgeContent={4} color="error"><NotificationsIcon /></Badge>
            </IconButton>
            <Typography sx={{ fontSize: 14, fontWeight: 600 }}>Notifications</Typography>
          </MenuItem>
          <MenuItem
            onClick={(e) => { handleMobileMenuClose(); handleProfileMenuOpen(e); }}
            sx={(t) => ({
              py: 1.5,
              px: 2,
              transition: "all 0.2s",
              "&:hover": { bgcolor: t.palette.action.hover },
            })}
          >
            <Avatar src={user.avatar} sx={{ width: 32, height: 32, mr: 1.5 }} />
            <Typography sx={{ fontSize: 14, fontWeight: 600 }}>Profile</Typography>
          </MenuItem>
        </>
      ) : (
        <MenuItem
          onClick={() => { handleMobileMenuClose(); window.location.href = "/login"; }}
          sx={(t) => ({
            py: 1.5,
            px: 2,
            transition: "all 0.2s",
            "&:hover": { bgcolor: t.palette.action.hover },
          })}
        >
          <Avatar sx={{ width: 32, height: 32, mr: 1.5 }} />
          <Typography sx={{ fontSize: 14, fontWeight: 600 }}>Login</Typography>
        </MenuItem>
      )}
    </Menu>
  );

  return (
    <AppBar
      position="fixed"
      elevation={0}
      color="transparent"
      sx={(t) => ({
        width: "100vw",
        left: 0,
        right: 0,
        ml: "calc(50% - 50vw)",
        mr: "calc(50% - 50vw)",
        bgcolor: t.palette.mode === "dark"
          ? alpha(t.palette.grey[900], 0.9)
          : alpha(t.palette.background.paper, 0.95),
        backdropFilter: "saturate(180%) blur(20px)",
        borderBottom: "1px solid",
        borderColor: "divider",
        zIndex: t.zIndex.appBar,
        boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
      })}
    >
      <Toolbar sx={{ minHeight: { xs: 64, md: 72 }, px: { xs: 2, md: 4 } }}>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="logo"
          onClick={() => (window.location.href = "/")}
          sx={(t) => ({
            mr: 2,
            transition: "all 0.2s",
            "&:hover": {
              backgroundColor: t.palette.action.hover,
              transform: "scale(1.05)",
            },
          })}
        >
          <Box
            component="img"
            src="/logo/logo.png"
            alt="logo"
            sx={{ width: { xs: 38, md: 44 }, height: { xs: 38, md: 44 }, borderRadius: 2 }}
          />
        </IconButton>

        <SearchRoot ref={searchRef}>
          <SearchIconWrapper><SearchIcon fontSize="small" /></SearchIconWrapper>
          <StyledInputBase
            placeholder="Search..."
            inputProps={{ "aria-label": "search" }}
            value={searchQuery}
            onChange={handleSearchChange}
            onFocus={handleSearchFocus}
          />
        </SearchRoot>

        <Popper
          open={isSearchOpen}
          anchorEl={searchAnchor}
          placement="bottom-start"
          sx={{ zIndex: (t) => t.zIndex.modal + 1, width: searchRef.current?.offsetWidth || 350 }}
        >
          <ClickAwayListener onClickAway={handleSearchClose}>
            <Paper
              elevation={8}
              sx={(t) => ({
                mt: 1,
                borderRadius: 4,
                border: "1px solid",
                borderColor: "divider",
                overflow: "hidden",
                maxHeight: 420,
                overflowY: "auto",
                boxShadow: "0 12px 32px rgba(0,0,0,0.15)",
                "&::-webkit-scrollbar": {
                  width: "6px",
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: alpha(t.palette.text.primary, 0.2),
                  borderRadius: "3px",
                },
              })}
            >
              <List sx={{ py: 1 }}>
                {filteredSuggestions.length > 0 ? (
                  filteredSuggestions.map((item) => (
                    <ListItem
                      key={item.id}
                      button
                      onClick={handleSearchClose}
                      sx={(t) => ({
                        py: 1.5,
                        px: 2,
                        transition: "all 0.2s",
                        "&:hover": {
                          bgcolor: t.palette.action.hover,
                        },
                      })}
                    >
                      <ListItemAvatar>
                        {item.type === "user" ? (
                          <Avatar src={item.avatar} sx={{ width: 42, height: 42 }} />
                        ) : item.type === "trending" ? (
                          <Avatar sx={{ width: 42, height: 42, bgcolor: "primary.main" }}>
                            <TrendingUpIcon fontSize="small" />
                          </Avatar>
                        ) : (
                          <Avatar sx={{ width: 42, height: 42, bgcolor: "action.selected" }}>
                            <HistoryIcon fontSize="small" />
                          </Avatar>
                        )}
                      </ListItemAvatar>
                      <ListItemText
                        primary={item.name}
                        secondary={item.subtitle}
                        primaryTypographyProps={{ fontWeight: 600, fontSize: 14 }}
                        secondaryTypographyProps={{ fontSize: 12 }}
                      />
                    </ListItem>
                  ))
                ) : (
                  <ListItem sx={{ py: 3 }}>
                    <ListItemText
                      primary="No results found"
                      secondary={`Try searching for "${searchQuery}"`}
                      primaryTypographyProps={{ fontSize: 14, color: "text.secondary", textAlign: "center" }}
                      secondaryTypographyProps={{ fontSize: 12, textAlign: "center" }}
                    />
                  </ListItem>
                )}
              </List>
            </Paper>
          </ClickAwayListener>
        </Popper>

        <Box sx={{ flexGrow: 1 }} />

        <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", gap: 1 }}>
          {isAuthenticated() ? (
            <>
              <IconButton
                size="large"
                aria-label="mails"
                color="inherit"
                sx={(t) => ({
                  transition: "all 0.2s",
                  "&:hover": {
                    backgroundColor: t.palette.action.hover,
                    transform: "scale(1.08)",
                  },
                })}
              >
                <Badge badgeContent={4} color="error"><MailIcon /></Badge>
              </IconButton>
              <IconButton
                size="large"
                aria-label="notifications"
                color="inherit"
                sx={(t) => ({
                  transition: "all 0.2s",
                  "&:hover": {
                    backgroundColor: t.palette.action.hover,
                    transform: "scale(1.08)",
                  },
                })}
              >
                <Badge badgeContent={17} color="error"><NotificationsIcon /></Badge>
              </IconButton>
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
                sx={(t) => ({
                  ml: 1,
                  transition: "all 0.2s",
                  "&:hover": {
                    backgroundColor: t.palette.action.hover,
                    transform: "scale(1.08)",
                  },
                })}
              >
                <Avatar src={user.avatar} alt={user.name} sx={{ width: 36, height: 36 }} />
              </IconButton>
            </>
          ) : (
            <Button
              onClick={() => (window.location.href = "/login")}
              variant="outlined"
              sx={(t) => ({
                borderColor: t.palette.divider,
                color: "text.primary",
                textTransform: "none",
                fontWeight: 600,
                borderRadius: 3,
                px: 3,
                py: 1,
                transition: "all 0.2s",
                "&:hover": {
                  backgroundColor: t.palette.action.hover,
                  borderColor: t.palette.primary.main,
                  transform: "translateY(-1px)",
                },
              })}
            >
              Login
            </Button>
          )}
        </Box>

        <Box sx={{ display: { xs: "flex", md: "none" } }}>
          <IconButton
            size="large"
            aria-label="show more"
            aria-controls={mobileMenuId}
            aria-haspopup="true"
            onClick={handleMobileMenuOpen}
            color="inherit"
            sx={(t) => ({
              transition: "all 0.2s",
              "&:hover": {
                backgroundColor: t.palette.action.hover,
              },
            })}
          >
            <MoreIcon />
          </IconButton>
        </Box>
      </Toolbar>

      {MobileMenu}
      {ProfileCardMenu}
    </AppBar>
  );
}
