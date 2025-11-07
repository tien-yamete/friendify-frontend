import { useNavigate, useLocation } from "react-router-dom";
import { Paper, BottomNavigation, BottomNavigationAction, Box } from "@mui/material";
import { alpha } from "@mui/material/styles";
import HomeIcon from "@mui/icons-material/Home";
import GroupsIcon from "@mui/icons-material/Groups";
import PeopleIcon from "@mui/icons-material/People";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";

const NAV_ITEMS = [
  { label: "Home", value: "/", icon: HomeIcon },
  { label: "Groups", value: "/groups", icon: GroupsIcon },
  { label: "Friends", value: "/friends", icon: PeopleIcon },
  { label: "Messages", value: "/chat", icon: ChatBubbleIcon },
];

export default function MobileBottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const currentValue = NAV_ITEMS.find(item => item.value === location.pathname)?.value || "/";
  const currentIndex = NAV_ITEMS.findIndex(item => item.value === currentValue);

  const handleChange = (event, newValue) => {
    navigate(newValue);
  };

  return (
    <Paper
      sx={(t) => ({
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        display: { xs: "block", md: "none" },
        zIndex: t.zIndex.appBar,
        borderTop: "1px solid",
        borderColor: "divider",
        boxShadow: t.palette.mode === "dark"
          ? `0 -4px 24px rgba(0, 0, 0, 0.4), 0 -1px 0 ${alpha(t.palette.primary.main, 0.1)}`
          : `0 -4px 24px rgba(0, 0, 0, 0.08), 0 -1px 0 ${alpha(t.palette.primary.main, 0.05)}`,
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          background: t.palette.mode === "dark"
            ? `linear-gradient(180deg, ${alpha(t.palette.primary.main, 0.08)} 0%, transparent 100%)`
            : `linear-gradient(180deg, ${alpha(t.palette.primary.main, 0.04)} 0%, transparent 100%)`,
          pointerEvents: "none",
          opacity: 0.5,
        },
      })}
      elevation={3}
    >
      <BottomNavigation
        value={currentValue}
        onChange={handleChange}
        showLabels
        sx={(t) => ({
          height: 64,
          bgcolor: t.palette.mode === "dark"
            ? alpha(t.palette.background.paper, 0.95)
            : alpha(t.palette.background.paper, 0.95),
          backdropFilter: "saturate(180%) blur(20px)",
          position: "relative",
          "& .MuiBottomNavigationAction-root": {
            minWidth: 60,
            color: "text.secondary",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            position: "relative",
            overflow: "visible",
            "&.Mui-selected": {
              color: "primary.main",
              "& .MuiBottomNavigationAction-label": {
                fontWeight: 700,
              },
              "& .MuiSvgIcon-root": {
                transform: "scale(1.15)",
                filter: t.palette.mode === "dark"
                  ? "drop-shadow(0 2px 8px rgba(139, 154, 255, 0.4))"
                  : "drop-shadow(0 2px 8px rgba(102, 126, 234, 0.3))",
              },
            },
            "&:hover": {
              "& .MuiSvgIcon-root": {
                transform: "scale(1.1) translateY(-2px)",
              },
            },
            "&:active": {
              "& .MuiSvgIcon-root": {
                transform: "scale(0.95)",
              },
            },
            "& .MuiSvgIcon-root": {
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            },
          },
        })}
      >
        {NAV_ITEMS.map((item, index) => {
          const IconComponent = item.icon;
          const isActive = currentValue === item.value;
          return (
            <BottomNavigationAction
              key={item.value}
              label={item.label}
              value={item.value}
              icon={
                <Box
                  sx={{
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {isActive && (
                    <Box
                      sx={(t) => ({
                        position: "absolute",
                        inset: -8,
                        borderRadius: "50%",
                        background: t.palette.mode === "dark"
                          ? `radial-gradient(circle, ${alpha(t.palette.primary.main, 0.15)} 0%, transparent 70%)`
                          : `radial-gradient(circle, ${alpha(t.palette.primary.main, 0.12)} 0%, transparent 70%)`,
                        animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                        "@keyframes pulse": {
                          "0%, 100%": {
                            opacity: 1,
                            transform: "scale(1)",
                          },
                          "50%": {
                            opacity: 0.6,
                            transform: "scale(1.3)",
                          },
                        },
                      })}
                    />
                  )}
                  <IconComponent />
                </Box>
              }
            />
          );
        })}
      </BottomNavigation>
      <Box
        sx={(t) => ({
          position: "absolute",
          bottom: 58,
          left: `calc(${(currentIndex / NAV_ITEMS.length) * 100}% + ${(100 / NAV_ITEMS.length / 2)}%)`,
          transform: "translateX(-50%)",
          width: 40,
          height: 3,
          borderRadius: "3px 3px 0 0",
          background: t.palette.mode === "dark"
            ? "linear-gradient(135deg, #8b9aff 0%, #9775d4 100%)"
            : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          boxShadow: t.palette.mode === "dark"
            ? "0 -2px 12px rgba(139, 154, 255, 0.6)"
            : "0 -2px 12px rgba(102, 126, 234, 0.5)",
          transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        })}
      />
    </Paper>
  );
}
