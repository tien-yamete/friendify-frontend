import { useState, useRef, useEffect } from "react";
import {
  Box,
  Card,
  Typography,
  Avatar,
  TextField,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Divider,
  Badge,
  Stack,
  InputAdornment,
  alpha,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import SearchIcon from "@mui/icons-material/Search";
import AddCommentIcon from "@mui/icons-material/AddComment";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Scene from "../../../shared/components/layout/Scene";
import NewChatPopover from "../components/NewChatPopover";

const mockConversations = [
  {
    id: 1,
    userId: "u1",
    displayName: "Sarah Johnson",
    avatar: "https://i.pravatar.cc/150?img=1",
    lastMessage: "Hey! How are you doing?",
    timestamp: "2 min ago",
    unread: 2,
    online: true,
  },
  {
    id: 2,
    userId: "u2",
    displayName: "Mike Chen",
    avatar: "https://i.pravatar.cc/150?img=2",
    lastMessage: "Thanks for your help!",
    timestamp: "1 hour ago",
    unread: 0,
    online: true,
  },
  {
    id: 3,
    userId: "u3",
    displayName: "Emma Wilson",
    avatar: "https://i.pravatar.cc/150?img=3",
    lastMessage: "See you tomorrow 👋",
    timestamp: "3 hours ago",
    unread: 0,
    online: false,
  },
  {
    id: 4,
    userId: "u4",
    displayName: "David Brown",
    avatar: "https://i.pravatar.cc/150?img=4",
    lastMessage: "That sounds great!",
    timestamp: "Yesterday",
    unread: 1,
    online: false,
  },
];

const mockMessages = [
  {
    id: 1,
    senderId: "u1",
    text: "Hey! How's your project going?",
    timestamp: "10:30 AM",
    isMine: false,
  },
  {
    id: 2,
    senderId: "me",
    text: "It's going well! Just finished the main features.",
    timestamp: "10:32 AM",
    isMine: true,
  },
  {
    id: 3,
    senderId: "u1",
    text: "That's awesome! Can't wait to see it.",
    timestamp: "10:33 AM",
    isMine: false,
  },
  {
    id: 4,
    senderId: "me",
    text: "Thanks! I'll send you a demo link soon 🚀",
    timestamp: "10:35 AM",
    isMine: true,
  },
  {
    id: 5,
    senderId: "u1",
    text: "Hey! How are you doing?",
    timestamp: "Just now",
    isMine: false,
  },
];

export default function ChatPage() {
  const [conversations, setConversations] = useState(mockConversations);
  const [selectedChat, setSelectedChat] = useState(conversations[0]);
  const [messages, setMessages] = useState(mockMessages);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [newChatAnchor, setNewChatAnchor] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message = {
      id: messages.length + 1,
      senderId: "me",
      text: newMessage,
      timestamp: "Just now",
      isMine: true,
    };

    setMessages((prev) => [...prev, message]);
    setNewMessage("");
  };

  const handleSelectUser = (user) => {
    const existingConv = conversations.find((c) => c.userId === user.userId);
    
    if (existingConv) {
      setSelectedChat(existingConv);
    } else {
      const newConv = {
        id: Date.now(),
        userId: user.userId,
        displayName: user.displayName,
        avatar: user.avatar,
        lastMessage: "",
        timestamp: "Just now",
        unread: 0,
        online: false,
      };
      setConversations((prev) => [newConv, ...prev]);
      setSelectedChat(newConv);
      setMessages([]);
    }
  };

  const filteredConversations = conversations.filter((conv) =>
    conv.displayName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Scene>
      <Box
        sx={{
          display: "flex",
          height: "calc(100vh - 80px)",
          gap: 0,
          maxWidth: 1400,
          mx: "auto",
          bgcolor: "background.default",
        }}
      >
        {/* Conversations List */}
        <Paper
          elevation={0}
          sx={{
            width: 360,
            borderRight: "1px solid",
            borderColor: "divider",
            display: "flex",
            flexDirection: "column",
            bgcolor: "background.paper",
          }}
        >
          {/* Header */}
          <Box sx={{ p: 2, borderBottom: "1px solid", borderColor: "divider" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                Messages
              </Typography>
              <IconButton
                onClick={(e) => setNewChatAnchor(e.currentTarget)}
                sx={{
                  bgcolor: "primary.main",
                  color: "white",
                  "&:hover": { bgcolor: "primary.dark" },
                }}
                size="small"
              >
                <AddCommentIcon fontSize="small" />
              </IconButton>
            </Box>

            <TextField
              fullWidth
              size="small"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ fontSize: 20, color: "text.secondary" }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 3,
                  bgcolor: (t) => (t.palette.mode === "dark" ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.02)"),
                },
              }}
            />
          </Box>

          {/* Conversations */}
          <List sx={{ flex: 1, overflow: "auto", py: 0 }}>
            {filteredConversations.map((conv) => (
              <ListItem
                key={conv.id}
                onClick={() => {
                  setSelectedChat(conv);
                  setConversations((prev) =>
                    prev.map((c) =>
                      c.id === conv.id ? { ...c, unread: 0 } : c
                    )
                  );
                }}
                sx={{
                  cursor: "pointer",
                  bgcolor: selectedChat?.id === conv.id ? "action.selected" : "transparent",
                  borderLeft: "3px solid",
                  borderLeftColor: selectedChat?.id === conv.id ? "primary.main" : "transparent",
                  "&:hover": {
                    bgcolor: "action.hover",
                  },
                  py: 2,
                }}
              >
                <ListItemAvatar>
                  <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    variant="dot"
                    sx={{
                      "& .MuiBadge-badge": {
                        bgcolor: conv.online ? "#44b700" : "grey.400",
                        width: 12,
                        height: 12,
                        borderRadius: "50%",
                        border: "2px solid",
                        borderColor: "background.paper",
                      },
                    }}
                  >
                    <Avatar src={conv.avatar} sx={{ width: 48, height: 48 }} />
                  </Badge>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 0.5 }}>
                      <Typography variant="body1" sx={{ fontWeight: conv.unread > 0 ? 700 : 600 }}>
                        {conv.displayName}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {conv.timestamp}
                      </Typography>
                    </Box>
                  }
                  secondary={
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          fontWeight: conv.unread > 0 ? 600 : 400,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          maxWidth: 200,
                        }}
                      >
                        {conv.lastMessage}
                      </Typography>
                      {conv.unread > 0 && (
                        <Badge
                          badgeContent={conv.unread}
                          color="primary"
                          sx={{
                            "& .MuiBadge-badge": {
                              fontWeight: 700,
                              fontSize: 11,
                            },
                          }}
                        />
                      )}
                    </Box>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Paper>

        {/* Chat Area */}
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", bgcolor: "background.default" }}>
          {selectedChat ? (
            <>
              {/* Chat Header */}
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  borderBottom: "1px solid",
                  borderColor: "divider",
                  bgcolor: "background.paper",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Badge
                      overlap="circular"
                      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                      variant="dot"
                      sx={{
                        "& .MuiBadge-badge": {
                          bgcolor: selectedChat.online ? "#44b700" : "grey.400",
                          width: 12,
                          height: 12,
                          borderRadius: "50%",
                          border: "2px solid",
                          borderColor: "background.paper",
                        },
                      }}
                    >
                      <Avatar src={selectedChat.avatar} sx={{ width: 48, height: 48 }} />
                    </Badge>
                    <Box>
                      <Typography variant="body1" sx={{ fontWeight: 700 }}>
                        {selectedChat.displayName}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {selectedChat.online ? "Active now" : "Offline"}
                      </Typography>
                    </Box>
                  </Box>
                  <IconButton>
                    <MoreVertIcon />
                  </IconButton>
                </Box>
              </Paper>

              {/* Messages */}
              <Box
                sx={{
                  flex: 1,
                  overflow: "auto",
                  p: 3,
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                }}
              >
                {messages.map((msg) => (
                  <Box
                    key={msg.id}
                    sx={{
                      display: "flex",
                      justifyContent: msg.isMine ? "flex-end" : "flex-start",
                      gap: 1,
                    }}
                  >
                    {!msg.isMine && (
                      <Avatar src={selectedChat.avatar} sx={{ width: 32, height: 32 }} />
                    )}
                    <Box
                      sx={{
                        maxWidth: "60%",
                      }}
                    >
                      <Paper
                        elevation={0}
                        sx={(t) => ({
                          p: 1.5,
                          px: 2,
                          borderRadius: 3,
                          bgcolor: msg.isMine
                            ? "primary.main"
                            : t.palette.mode === "dark"
                            ? "rgba(255,255,255,0.08)"
                            : "rgba(0,0,0,0.04)",
                          color: msg.isMine ? "white" : "text.primary",
                          borderBottomRightRadius: msg.isMine ? 0 : 12,
                          borderBottomLeftRadius: msg.isMine ? 12 : 0,
                        })}
                      >
                        <Typography variant="body2">{msg.text}</Typography>
                      </Paper>
                      <Typography
                        variant="caption"
                        color="text.disabled"
                        sx={{
                          display: "block",
                          mt: 0.5,
                          textAlign: msg.isMine ? "right" : "left",
                          px: 1,
                        }}
                      >
                        {msg.timestamp}
                      </Typography>
                    </Box>
                  </Box>
                ))}
                <div ref={messagesEndRef} />
              </Box>

              {/* Input */}
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  borderTop: "1px solid",
                  borderColor: "divider",
                  bgcolor: "background.paper",
                }}
              >
                <Box sx={{ display: "flex", gap: 1, alignItems: "flex-end" }}>
                  <IconButton size="small" color="primary">
                    <AttachFileIcon />
                  </IconButton>
                  <TextField
                    fullWidth
                    multiline
                    maxRows={4}
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 6,
                        bgcolor: (t) =>
                          t.palette.mode === "dark" ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.02)",
                      },
                    }}
                  />
                  <IconButton size="small" color="primary">
                    <EmojiEmotionsIcon />
                  </IconButton>
                  <IconButton
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                    sx={{
                      bgcolor: "primary.main",
                      color: "white",
                      "&:hover": { bgcolor: "primary.dark" },
                      "&:disabled": {
                        bgcolor: "action.disabledBackground",
                        color: "text.disabled",
                      },
                    }}
                  >
                    <SendIcon />
                  </IconButton>
                </Box>
              </Paper>
            </>
          ) : (
            <Box
              sx={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <AddCommentIcon sx={{ fontSize: 64, color: "text.disabled" }} />
              <Typography variant="h6" color="text.secondary">
                Select a conversation to start chatting
              </Typography>
            </Box>
          )}
        </Box>
      </Box>

      <NewChatPopover
        anchorEl={newChatAnchor}
        open={Boolean(newChatAnchor)}
        onClose={() => setNewChatAnchor(null)}
        onSelectUser={handleSelectUser}
      />
    </Scene>
  );
}
