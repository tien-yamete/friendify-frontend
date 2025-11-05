// src/pages/Chat.jsx
import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Box,
  Card,
  TextField,
  Typography,
  Paper,
  IconButton,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  Badge,
  CircularProgress,
  Alert,
  Stack,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import AddIcon from "@mui/icons-material/Add";
import RefreshIcon from "@mui/icons-material/Refresh";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Scene from "./Scene";
import NewChatPopover from "../components/NewChatPopover";

// ---------- MOCK data (dễ thay sang API thật) ----------
const MOCK_CONVERSATIONS = [
  {
    id: "conv-1",
    conversationName: "Mai Lê",
    conversationAvatar: "https://i.pravatar.cc/150?img=12",
    modifiedDate: new Date().toISOString(),
    unread: 1,
    lastMessage: "Ok để mình check",
    lastTimestamp: new Date().toISOString(),
  },
  {
    id: "conv-2",
    conversationName: "Nhóm Kiến Trúc",
    conversationAvatar: "https://i.pravatar.cc/150?img=5",
    modifiedDate: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    unread: 0,
    lastMessage: "Meeting 10h sáng mai",
    lastTimestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
];

const MOCK_MESSAGES = {
  "conv-1": [
    {
      id: "m-1",
      message: "Chào bạn, mình đã upload file rồi.",
      createdDate: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
      me: false,
      sender: { avatar: "https://i.pravatar.cc/150?u=other1" },
    },
    {
      id: "m-2",
      message: "Cảm ơn nhé, mình xem rồi.",
      createdDate: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
      me: true,
    },
  ],
  "conv-2": [
    {
      id: "m-3",
      message: "Ai sẽ chuẩn bị slide?",
      createdDate: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
      me: false,
      sender: { avatar: "https://i.pravatar.cc/150?u=other2" },
    },
    {
      id: "m-4",
      message: "Mình sẽ làm phần concept.",
      createdDate: new Date(Date.now() - 1000 * 60 * 60 * 23).toISOString(),
      me: true,
    },
  ],
};

// helper simulate network
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

// ---------- Utilities ----------
const normalizeMessage = (item) => ({
  id: item.id || item._id || `m-${Date.now()}`,
  message: item.message ?? item.content ?? item.text ?? "",
  createdDate: item.createdDate ?? item.timestamp ?? new Date().toISOString(),
  me: !!item.me,
  sender: item.sender ?? item.from ?? null,
  pending: !!item.pending,
  failed: !!item.failed,
});

const mergeMessages = (existing = [], incoming = []) => {
  const map = new Map();
  // keep order: existing first, incoming overwrite duplicates (server copy wins)
  [...existing, ...incoming].forEach((m) => {
    const nm = normalizeMessage(m);
    map.set(nm.id, nm);
  });
  return Array.from(map.values()).sort((a, b) => new Date(a.createdDate) - new Date(b.createdDate));
};

// ---------- Component ----------
export default function Chat() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  
  const [message, setMessage] = useState("");
  const [newChatAnchorEl, setNewChatAnchorEl] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messagesMap, setMessagesMap] = useState({});
  const [showChatOnMobile, setShowChatOnMobile] = useState(false);
  const messageContainerRef = useRef(null);

  // mounted guard to avoid setState on unmounted component
  const mountedRef = useRef(false);
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const scrollToBottom = useCallback(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
      setTimeout(() => {
        if (messageContainerRef.current) {
          messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
        }
      }, 100);
      setTimeout(() => {
        if (messageContainerRef.current) {
          messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
        }
      }, 300);
    }
  }, []);

  // New chat popover handlers
  const handleNewChatClick = (event) => {
    setNewChatAnchorEl(event.currentTarget);
  };
  const handleCloseNewChat = () => {
    setNewChatAnchorEl(null);
  };

  // When user chooses from NewChatPopover: create or select conversation (mock)
  const handleSelectNewChatUser = async (user) => {
    // normalized { userId, displayName, avatar }
    const exists = conversations.find((c) => c.conversationName === user.displayName);
    if (exists) {
      setSelectedConversation(exists);
      if (isMobile) setShowChatOnMobile(true);
      handleCloseNewChat();
      return;
    }

    const convId = `conv-${Date.now()}`;
    const newConversation = {
      id: convId,
      conversationName: user.displayName || `User ${user.userId}`,
      conversationAvatar: user.avatar || `https://i.pravatar.cc/150?u=${user.userId}`,
      modifiedDate: new Date().toISOString(),
      unread: 0,
      lastMessage: "",
      lastTimestamp: new Date().toISOString(),
    };

    // simulate create delay
    await delay(200);
    if (!mountedRef.current) return;

    setConversations((prev) => [newConversation, ...prev]);
    setSelectedConversation(newConversation);
    if (isMobile) setShowChatOnMobile(true);
    setMessagesMap((prev) => ({
      ...prev,
      [convId]: [
        {
          id: `m-${Date.now()}`,
          message: "Xin chào! Đây là cuộc trò chuyện mới.",
          createdDate: new Date().toISOString(),
          me: false,
          sender: { avatar: newConversation.conversationAvatar },
        },
      ],
    }));

    handleCloseNewChat();
  };

  // Fetch conversations (mock)
  const fetchConversations = async () => {
    setLoading(true);
    setError(null);
    try {
      await delay(300);
      if (!mountedRef.current) return;
      setConversations([...MOCK_CONVERSATIONS]);
    } catch (err) {
      console.error("Error loading (mock):", err);
      setError("Failed to load conversations (mock).");
    } finally {
      if (mountedRef.current) setLoading(false);
    }
  };

  useEffect(() => {
    fetchConversations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Initialize selection when conversations arrive (only on desktop)
  useEffect(() => {
    if (conversations.length > 0 && !selectedConversation && !isMobile) {
      setSelectedConversation(conversations[0]);
    }
  }, [conversations, selectedConversation, isMobile]);

  // Load messages when conversation selected
  useEffect(() => {
    let canceled = false;
    const fetchMessages = async (conversationId) => {
      if (!conversationId) return;
      // skip if already loaded
      if (messagesMap[conversationId]?.length > 0) return;
      try {
        await delay(250);
        if (canceled || !mountedRef.current) return;
        const msgs = MOCK_MESSAGES[conversationId] || [];
        setMessagesMap((prev) => ({
          ...prev,
          [conversationId]: mergeMessages(prev[conversationId] || [], msgs.map(normalizeMessage)),
        }));
        // mark read
        setConversations((prev) =>
          prev.map((conv) => (conv.id === conversationId ? { ...conv, unread: 0 } : conv))
        );
      } catch (err) {
        console.error(`Error fetching messages for ${conversationId}:`, err);
      }
    };

    if (selectedConversation?.id) {
      fetchMessages(selectedConversation.id);
    }

    return () => {
      canceled = true;
    };
    // intentionally only depend on selectedConversation
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedConversation]);

  const currentMessages = selectedConversation ? messagesMap[selectedConversation.id] || [] : [];

  // auto-scroll to bottom when messages change or conversation changes
  useEffect(() => {
    scrollToBottom();
  }, [currentMessages, scrollToBottom]);

  useEffect(() => {
    scrollToBottom();
  }, [selectedConversation, scrollToBottom]);

  const handleConversationSelect = (conversation) => {
    setSelectedConversation(conversation);
    if (isMobile) {
      setShowChatOnMobile(true);
    }
  };

  const handleBackToConversations = () => {
    setShowChatOnMobile(false);
  };

  // Send message (optimistic UI) with proper replace of temp message
  const handleSendMessage = async () => {
    if (!message.trim() || !selectedConversation) return;

    const convId = selectedConversation.id;
    const tempId = `temp-${Date.now()}`;
    const optimistic = {
      id: tempId,
      message: message,
      createdDate: new Date().toISOString(),
      me: true,
      pending: true,
    };

    // optimistic update (append)
    setMessagesMap((prev) => ({
      ...prev,
      [convId]: mergeMessages(prev[convId] || [], [optimistic]),
    }));

    // update last message in conversation list
    setConversations((prevConversations) =>
      prevConversations.map((conv) =>
        conv.id === convId
          ? {
              ...conv,
              lastMessage: message,
              modifiedDate: new Date().toISOString(),
              lastTimestamp: new Date().toISOString(),
            }
          : conv
      )
    );

    setMessage("");

    try {
      // simulate network delay & server response
      await delay(700);
      if (!mountedRef.current) return;

      const serverMessage = {
        id: `m-${Date.now()}`,
        message: optimistic.message,
        createdDate: new Date().toISOString(),
        me: true,
      };

      // replace temp with server message (dedupe)
      setMessagesMap((prev) => {
        const existing = prev[convId] || [];
        const filtered = existing.filter((m) => m.id !== tempId);
        return {
          ...prev,
          [convId]: mergeMessages(filtered, [serverMessage]),
        };
      });
    } catch (err) {
      console.error("Failed to send message (mock):", err);
      // mark temp as failed
      setMessagesMap((prev) => {
        const updated = (prev[convId] || []).map((m) =>
          m.id === tempId ? { ...m, failed: true, pending: false } : m
        );
        return { ...prev, [convId]: updated };
      });
    }
  };

  // Calculate height based on screen size
  const cardHeight = isMobile 
    ? 'calc(100vh - 64px - 64px)' // subtract header and bottom nav
    : 'calc(100vh - 64px)'; // only subtract header

  return (
    <Scene>
      <Card
        sx={{
          width: "100%",
          height: cardHeight,
          maxHeight: "100%",
          display: "flex",
          flexDirection: "row",
          overflow: "hidden",
        }}
      >
        {/* Conversations List */}
        <Box
          sx={{
            width: { xs: '100%', md: 300 },
            borderRight: { xs: 0, md: 1 },
            borderColor: "divider",
            display: isMobile && showChatOnMobile ? 'none' : 'flex',
            flexDirection: "column",
            minHeight: 0,
          }}
        >
          <Box
            sx={{
              p: { xs: 1.5, sm: 2 },
              borderBottom: 1,
              borderColor: "divider",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h6" sx={{ fontSize: { xs: '1.1rem', sm: '1.25rem' } }}>
              Chats
            </Typography>
            <IconButton
              color="primary"
              size="small"
              onClick={handleNewChatClick}
              sx={{
                bgcolor: "primary.light",
                color: "white",
                "&:hover": {
                  bgcolor: "primary.main",
                },
              }}
            >
              <AddIcon fontSize="small" />
            </IconButton>
            <NewChatPopover
              anchorEl={newChatAnchorEl}
              open={Boolean(newChatAnchorEl)}
              onClose={handleCloseNewChat}
              onSelectUser={handleSelectNewChatUser}
            />
          </Box>

          <Box sx={{ flexGrow: 1, overflowY: "auto", minHeight: 0 }}>
            {loading ? (
              <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
                <CircularProgress size={28} />
              </Box>
            ) : error ? (
              <Box sx={{ p: 2 }}>
                <Alert
                  severity="error"
                  sx={{ mb: 2 }}
                  action={
                    <IconButton color="inherit" size="small" onClick={fetchConversations}>
                      <RefreshIcon fontSize="small" />
                    </IconButton>
                  }
                >
                  {error}
                </Alert>
              </Box>
            ) : conversations == null || conversations.length === 0 ? (
              <Box sx={{ p: 2, textAlign: "center" }}>
                <Typography color="text.secondary" sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                  No conversations yet. Start a new chat to begin.
                </Typography>
              </Box>
            ) : (
              <List sx={{ width: "100%" }}>
                {conversations.map((conversation) => (
                  <React.Fragment key={conversation.id}>
                    <ListItem
                      alignItems="flex-start"
                      onClick={() => handleConversationSelect(conversation)}
                      sx={{
                        cursor: "pointer",
                        py: { xs: 1, sm: 1.5 },
                        px: { xs: 1.5, sm: 2 },
                        bgcolor: selectedConversation?.id === conversation.id ? "rgba(0,0,0,0.04)" : "transparent",
                        "&:hover": { bgcolor: "rgba(0,0,0,0.08)" },
                      }}
                    >
                      <ListItemAvatar>
                        <Badge color="error" badgeContent={conversation.unread} invisible={conversation.unread === 0} overlap="circular">
                          <Avatar 
                            src={conversation.conversationAvatar || ""} 
                            sx={{ width: { xs: 40, sm: 48 }, height: { xs: 40, sm: 48 } }}
                          />
                        </Badge>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Stack direction="row" display={"flex"} justifyContent="space-between" alignItems="center">
                            <Typography 
                              component="span" 
                              variant="body2" 
                              color="text.primary" 
                              noWrap 
                              sx={{ 
                                display: "inline",
                                fontSize: { xs: '0.875rem', sm: '0.875rem' }
                              }}
                            >
                              {conversation.conversationName}
                            </Typography>
                            <Typography 
                              component="span" 
                              variant="body2" 
                              color="text.secondary" 
                              sx={{ 
                                display: "inline", 
                                fontSize: { xs: '0.65rem', sm: '0.7rem' },
                                ml: 1
                              }}
                            >
                              {new Date(conversation.modifiedDate).toLocaleString("vi-VN", { year: "numeric", month: "numeric", day: "numeric" })}
                            </Typography>
                          </Stack>
                        }
                        secondary={
                          <Typography 
                            sx={{ display: "inline", fontSize: { xs: '0.8rem', sm: '0.875rem' } }} 
                            component="span" 
                            variant="body2" 
                            color="text.primary" 
                            noWrap
                          >
                            {conversation.lastMessage || "Start a conversation"}
                          </Typography>
                        }
                        primaryTypographyProps={{ fontWeight: conversation.unread > 0 ? "bold" : "normal" }}
                        sx={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", pr: 1 }}
                      />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                  </React.Fragment>
                ))}
              </List>
            )}
          </Box>
        </Box>

        {/* Chat Area */}
        <Box
          sx={{
            flexGrow: 1,
            display: isMobile && !showChatOnMobile ? 'none' : 'flex',
            flexDirection: "column",
            minHeight: 0,
            width: isMobile ? '100%' : 'auto',
          }}
        >
          {selectedConversation ? (
            <>
              <Box 
                sx={{ 
                  p: { xs: 1.5, sm: 2 }, 
                  borderBottom: 1, 
                  borderColor: "divider", 
                  display: "flex", 
                  alignItems: "center" 
                }}
              >
                {isMobile && (
                  <IconButton 
                    onClick={handleBackToConversations} 
                    sx={{ mr: 1 }}
                    size="small"
                  >
                    <ArrowBackIcon />
                  </IconButton>
                )}
                <Avatar 
                  src={selectedConversation.conversationAvatar} 
                  sx={{ 
                    mr: { xs: 1.5, sm: 2 },
                    width: { xs: 36, sm: 40 },
                    height: { xs: 36, sm: 40 }
                  }} 
                />
                <Typography 
                  variant="h6" 
                  sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}
                >
                  {selectedConversation.conversationName}
                </Typography>
              </Box>

              <Box
                id="messageContainer"
                ref={messageContainerRef}
                sx={{
                  flex: "1 1 auto",
                  minHeight: 0,
                  p: { xs: 1.5, sm: 2 },
                  overflowY: "auto",
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                }}
              >
                <Box sx={{ display: "flex", flexDirection: "column", width: "100%", justifyContent: "flex-end", flex: "1 1 auto", minHeight: 0 }}>
                  {currentMessages.map((msg) => (
                    <Box 
                      key={msg.id} 
                      sx={{ 
                        display: "flex", 
                        justifyContent: msg.me ? "flex-end" : "flex-start", 
                        mb: { xs: 1.5, sm: 2 } 
                      }}
                    >
                      {!msg.me && (
                        <Avatar 
                          src={msg.sender?.avatar} 
                          sx={{ 
                            mr: 1, 
                            alignSelf: "flex-end", 
                            width: { xs: 28, sm: 32 }, 
                            height: { xs: 28, sm: 32 },
                            display: { xs: 'none', sm: 'flex' }
                          }} 
                        />
                      )}
                      <Paper
                        elevation={1}
                        sx={{
                          p: { xs: 1.5, sm: 2 },
                          maxWidth: { xs: '85%', sm: '80%', md: '70%' },
                          backgroundColor: msg.me ? (msg.failed ? "#ffebee" : "#e3f2fd") : "#f5f5f5",
                          borderRadius: 2,
                          opacity: msg.pending ? 0.7 : 1,
                        }}
                      >
                        <Typography 
                          variant="body1" 
                          sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}
                        >
                          {msg.message}
                        </Typography>
                        <Stack direction="row" spacing={1} alignItems="center" justifyContent="flex-end" sx={{ mt: 1 }}>
                          {msg.failed && (
                            <Typography variant="caption" color="error" sx={{ fontSize: { xs: '0.65rem', sm: '0.75rem' } }}>
                              Gửi thất bại
                            </Typography>
                          )}
                          {msg.pending && (
                            <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.65rem', sm: '0.75rem' } }}>
                              Đang gửi...
                            </Typography>
                          )}
                          <Typography 
                            variant="caption" 
                            sx={{ 
                              display: "block", 
                              textAlign: "right",
                              fontSize: { xs: '0.65rem', sm: '0.75rem' }
                            }}
                          >
                            {new Date(msg.createdDate).toLocaleString()}
                          </Typography>
                        </Stack>
                      </Paper>
                      {msg.me && (
                        <Avatar 
                          sx={{ 
                            ml: 1, 
                            alignSelf: "flex-end", 
                            width: { xs: 28, sm: 32 }, 
                            height: { xs: 28, sm: 32 }, 
                            bgcolor: "#1976d2",
                            fontSize: { xs: '0.7rem', sm: '0.875rem' },
                            display: { xs: 'none', sm: 'flex' }
                          }}
                        >
                          You
                        </Avatar>
                      )}
                    </Box>
                  ))}
                </Box>
              </Box>

              <Box 
                component="form" 
                sx={{ 
                  p: { xs: 1.5, sm: 2 }, 
                  borderTop: 1, 
                  borderColor: "divider", 
                  display: "flex",
                  gap: { xs: 0.5, sm: 1 }
                }} 
                onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}
              >
                <TextField 
                  fullWidth 
                  placeholder="Type a message" 
                  variant="outlined" 
                  value={message} 
                  onChange={(e) => setMessage(e.target.value)} 
                  size="small"
                  sx={{
                    '& .MuiInputBase-input': {
                      fontSize: { xs: '0.875rem', sm: '1rem' }
                    }
                  }}
                />
                <IconButton 
                  color="primary" 
                  onClick={handleSendMessage} 
                  disabled={!message.trim()}
                  size={isSmallScreen ? "small" : "medium"}
                >
                  <SendIcon fontSize={isSmallScreen ? "small" : "medium"} />
                </IconButton>
              </Box>
            </>
          ) : (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%", p: 2 }}>
              <Typography 
                variant="h6" 
                color="text.secondary" 
                sx={{ 
                  fontSize: { xs: '0.875rem', sm: '1.25rem' },
                  textAlign: 'center'
                }}
              >
                Select a conversation to start chatting
              </Typography>
            </Box>
          )}
        </Box>
      </Card>
    </Scene>
  );
}
