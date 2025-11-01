import * as React from "react";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import { alpha } from "@mui/material/styles";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import GroupsIcon from "@mui/icons-material/Groups";
import ChatIcon from "@mui/icons-material/Chat";
import FlagIcon from "@mui/icons-material/Flag";
import StorefrontIcon from "@mui/icons-material/Storefront";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { Link, useLocation } from "react-router-dom";

function SideMenu() {
  const location = useLocation();
  const [activeItem, setActiveItem] = React.useState(() => {
    const p = location.pathname || "/";
    if (p.startsWith("/friends")) return "friends";
    if (p.startsWith("/groups")) return "groups";
    if (p.startsWith("/chat")) return "chat";
    if (p.startsWith("/pages")) return "pages";
    if (p.startsWith("/marketplace")) return "marketplace";
    if (p.startsWith("/saved")) return "saved";
    return "home";
  });

  React.useEffect(() => {
    const p = location.pathname || "/";
    if (p.startsWith("/friends")) setActiveItem("friends");
    else if (p.startsWith("/groups")) setActiveItem("groups");
    else if (p.startsWith("/chat")) setActiveItem("chat");
    else if (p.startsWith("/pages")) setActiveItem("pages");
    else if (p.startsWith("/marketplace")) setActiveItem("marketplace");
    else if (p.startsWith("/saved")) setActiveItem("saved");
    else setActiveItem("home");
  }, [location.pathname]);

  const menuItems = [
    { key: "home", icon: <HomeIcon />, text: "News Feed", to: "/" },
    { key: "chat", icon: <ChatIcon />, text: "Messages", to: "/chat" },
    { key: "friends", icon: <PeopleIcon />, text: "Friends", to: "/friends" },
    { key: "groups", icon: <GroupsIcon />, text: "Groups", to: "/groups" },
    { key: "pages", icon: <FlagIcon />, text: "Pages", to: "/pages" },
    { key: "marketplace", icon: <StorefrontIcon />, text: "Marketplace", to: "/marketplace" },
    { key: "saved", icon: <BookmarkIcon />, text: "Saved", to: "/saved" },
  ];

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        bgcolor: "background.paper",
      }}
    >
      <Toolbar sx={{ minHeight: { xs: 64, md: 72 } }} />
      <List sx={{ px: 2.5, py: 2, flex: 1 }}>
        {menuItems.map((item) => {
          const isActive = activeItem === item.key;
          return (
            <ListItem key={item.key} disablePadding sx={{ mb: 0.75 }}>
              <ListItemButton
                component={Link}
                to={item.to}
                onClick={() => setActiveItem(item.key)}
                selected={isActive}
                sx={(t) => ({
                  borderRadius: 3,
                  py: 1.75,
                  px: 2,
                  transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                  position: "relative",
                  overflow: "hidden",
                  background: isActive
                    ? `linear-gradient(135deg, ${alpha(t.palette.primary.main, 0.12)} 0%, ${alpha(
                        t.palette.primary.main,
                        0.08
                      )} 100%)`
                    : "transparent",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    left: 0,
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: 4,
                    height: isActive ? "70%" : "0%",
                    bgcolor: "primary.main",
                    borderRadius: "0 4px 4px 0",
                    transition: "height 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  },
                  "&:hover": {
                    background: isActive
                      ? `linear-gradient(135deg, ${alpha(t.palette.primary.main, 0.15)} 0%, ${alpha(
                          t.palette.primary.main,
                          0.1
                        )} 100%)`
                      : t.palette.action.hover,
                    transform: "translateX(4px)",
                    "& .menu-icon": {
                      transform: "scale(1.1)",
                    },
                  },
                  "&:active": {
                    transform: "translateX(2px) scale(0.98)",
                  },
                })}
              >
                <ListItemIcon
                  className="menu-icon"
                  sx={{
                    minWidth: 48,
                    color: isActive ? "primary.main" : "text.secondary",
                    transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    fontWeight: isActive ? 700 : 600,
                    fontSize: 15,
                    color: isActive ? "primary.main" : "text.primary",
                    transition: "all 0.25s",
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
      <Divider sx={{ mx: 2.5 }} />
      <Box sx={{ p: 2.5, textAlign: "center" }}>
        <Box
          component="span"
          sx={{
            fontSize: 12,
            color: "text.secondary",
            fontWeight: 500,
          }}
        >
          © 2024 SocialApp
        </Box>
      </Box>
    </Box>
  );
}

export default SideMenu;
