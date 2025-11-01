import React, { forwardRef, useRef, useState } from "react";
import {
  Box,
  Avatar,
  Typography,
  Paper,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Button,
  Collapse,
  Divider,
  Popover,
  Tooltip,
  Chip,
} from "@mui/material";
import {
  ThumbUpOutlined,
  ChatBubbleOutline,
  Share,
  MoreVert,
  Send,
} from "@mui/icons-material";
import { alpha } from "@mui/material/styles";

const REACTIONS = [
  { emoji: "👍", label: "Like", color: "#3b82f6" },
  { emoji: "❤️", label: "Love", color: "#ef4444" },
  { emoji: "😂", label: "Haha", color: "#f59e0b" },
  { emoji: "😮", label: "Wow", color: "#8b5cf6" },
  { emoji: "😢", label: "Sad", color: "#6366f1" },
  { emoji: "😡", label: "Angry", color: "#f97316" },
];

const Post = forwardRef((props, ref) => {
  const { avatar, username, created, content, id } = props.post;
  const { onEdit, onDelete } = props;

  const [anchorEl, setAnchorEl] = useState(null);
  const [reactionAnchor, setReactionAnchor] = useState(null);
  const [reaction, setReaction] = useState(null);
  const [likeCount, setLikeCount] = useState(0);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);

  const longPressTimer = useRef(null);
  const likeButtonRef = useRef(null);

  const handleMenuOpen = (e) => setAnchorEl(e.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleLikeMouseDown = (e) => {
    e.preventDefault();
    longPressTimer.current = setTimeout(() => {
      setReactionAnchor(likeButtonRef.current);
    }, 500);
  };
  const handleLikeMouseUp = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      if (!reactionAnchor) handleQuickLike();
    }
  };
  const handleLikeMouseLeave = () => {
    if (longPressTimer.current) clearTimeout(longPressTimer.current);
  };

  const handleQuickLike = () => {
    if (reaction) {
      setReaction(null);
      setLikeCount((p) => Math.max(p - 1, 0));
    } else {
      setReaction({ emoji: "👍", label: "Like", color: "#3b82f6" });
      setLikeCount((p) => p + 1);
    }
  };

  const handleSelectReaction = (react) => {
    if (reaction?.label === react.label) {
      setReaction(null);
      setLikeCount((p) => Math.max(p - 1, 0));
    } else {
      if (!reaction) setLikeCount((p) => p + 1);
      setReaction(react);
    }
    setReactionAnchor(null);
  };

  const handleCloseReactions = () => setReactionAnchor(null);

  const handleComment = () => {
    if (commentText.trim()) {
      setComments((prev) => [
        ...prev,
        { id: Date.now(), text: commentText, author: "You", time: "Just now" },
      ]);
      setCommentText("");
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    handleMenuClose();
  };
  const handleSaveEdit = () => {
    onEdit?.(id, editedContent);
    setIsEditing(false);
  };
  const handleCancelEdit = () => {
    setEditedContent(content);
    setIsEditing(false);
  };
  const handleDelete = () => {
    onDelete?.(id);
    handleMenuClose();
  };

  return (
    <Paper
      ref={ref}
      elevation={0}
      sx={(t) => ({
        mb: 2.5,
        borderRadius: 4,
        bgcolor: "background.paper",
        border: "1px solid",
        borderColor: "divider",
        overflow: "hidden",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
        "&:hover": {
          boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
          borderColor: alpha(t.palette.primary.main, 0.2),
          transform: "translateY(-1px)",
        },
      })}
    >
      <Box sx={{ p: { xs: 2, sm: 2.5 } }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, flex: 1 }}>
            <Box sx={{ position: "relative" }}>
              <Avatar
                src={avatar}
                sx={(t) => ({
                  width: { xs: 44, sm: 48 },
                  height: { xs: 44, sm: 48 },
                  background: `linear-gradient(135deg, ${t.palette.primary.main} 0%, ${alpha(
                    t.palette.primary.main,
                    0.7
                  )} 100%)`,
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: { xs: 18, sm: 20 },
                  border: "2px solid",
                  borderColor: "background.paper",
                  boxShadow: `0 2px 8px ${alpha(t.palette.primary.main, 0.2)}`,
                })}
              >
                {username?.charAt(0)}
              </Avatar>
              <Box
                sx={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  width: 14,
                  height: 14,
                  bgcolor: "#10b981",
                  borderRadius: "50%",
                  border: "2px solid",
                  borderColor: "background.paper",
                }}
              />
            </Box>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography sx={{ fontWeight: 700, fontSize: { xs: 15, sm: 16 }, color: "text.primary" }} noWrap>
                {username}
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, flexWrap: "wrap" }}>
                <Typography sx={{ fontSize: { xs: 11, sm: 12 }, color: "text.secondary" }}>
                  {created}
                </Typography>
                <Box sx={{ width: 3, height: 3, bgcolor: "text.secondary", borderRadius: "50%", opacity: 0.6 }} />
                <Chip
                  label="Public"
                  size="small"
                  icon={<Box component="span" sx={{ fontSize: 10 }}>🌎</Box>}
                  sx={(t) => ({
                    height: 20,
                    fontSize: 11,
                    fontWeight: 600,
                    bgcolor: t.palette.action.selected,
                    color: "text.secondary",
                    "& .MuiChip-icon": {
                      ml: 0.5,
                    },
                  })}
                />
              </Box>
            </Box>
          </Box>
          <IconButton
            onClick={handleMenuOpen}
            size="small"
            sx={(t) => ({
              color: "text.secondary",
              transition: "all 0.2s",
              "&:hover": {
                bgcolor: t.palette.action.hover,
                color: "text.primary",
                transform: "scale(1.1)",
              },
            })}
          >
            <MoreVert fontSize="small" />
          </IconButton>
        </Box>

        {isEditing ? (
          <Box sx={{ mb: 2 }}>
            <TextField
              fullWidth
              multiline
              rows={3}
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              sx={(t) => ({
                mb: 2,
                "& .MuiOutlinedInput-root": {
                  borderRadius: 3,
                  fontSize: 15,
                  lineHeight: 1.6,
                  bgcolor: t.palette.mode === "dark" ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)",
                  "& fieldset": { borderColor: "divider" },
                  "&:hover fieldset": { borderColor: "primary.main" },
                  "&.Mui-focused fieldset": { borderColor: "primary.main", borderWidth: 2 },
                },
              })}
            />
            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1.5 }}>
              <Button
                variant="outlined"
                size="small"
                onClick={handleCancelEdit}
                sx={{
                  borderRadius: 3,
                  textTransform: "none",
                  fontWeight: 600,
                  px: 2.5,
                  fontSize: 14,
                }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                size="small"
                onClick={handleSaveEdit}
                sx={(t) => ({
                  borderRadius: 3,
                  textTransform: "none",
                  fontWeight: 600,
                  px: 2.5,
                  fontSize: 14,
                  background: `linear-gradient(135deg, ${t.palette.primary.main} 0%, ${alpha(
                    t.palette.primary.main,
                    0.8
                  )} 100%)`,
                })}
              >
                Save
              </Button>
            </Box>
          </Box>
        ) : (
          <Typography
            sx={{
              fontSize: { xs: 14, sm: 15 },
              lineHeight: 1.7,
              color: "text.primary",
              whiteSpace: "pre-line",
              mb: 2,
            }}
          >
            {editedContent}
          </Typography>
        )}
      </Box>

      {(likeCount > 0 || comments.length > 0) && (
        <>
          <Divider sx={{ borderColor: "divider" }} />
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", px: { xs: 2, sm: 2.5 }, py: 1.25 }}>
            {likeCount > 0 && (
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
                <Box
                  sx={(t) => ({
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                    bgcolor: reaction?.color
                      ? alpha(reaction.color, 0.1)
                      : t.palette.action.selected,
                    px: 1.25,
                    py: 0.5,
                    borderRadius: 3,
                    transition: "all 0.2s",
                    cursor: "pointer",
                    "&:hover": {
                      transform: "scale(1.05)",
                    },
                  })}
                >
                  <Typography sx={{ fontSize: 14 }}>{reaction?.emoji || "👍"}</Typography>
                  <Typography sx={{ fontSize: 13, fontWeight: 600, color: reaction?.color || "text.secondary" }}>
                    {likeCount}
                  </Typography>
                </Box>
              </Box>
            )}
            {comments.length > 0 && (
              <Typography
                sx={(t) => ({
                  fontSize: 13,
                  color: "text.secondary",
                  cursor: "pointer",
                  fontWeight: 500,
                  transition: "all 0.2s",
                  "&:hover": {
                    color: t.palette.primary.main,
                    textDecoration: "underline",
                  },
                })}
                onClick={() => setShowComments(!showComments)}
              >
                {comments.length} comment{comments.length > 1 ? "s" : ""}
              </Typography>
            )}
          </Box>
        </>
      )}

      <Divider sx={{ borderColor: "divider" }} />
      <Box
        sx={(t) => ({
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          px: 1,
          py: 0.5,
          bgcolor: t.palette.mode === "dark" ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.01)",
        })}
      >
        <Box sx={{ position: "relative", flex: 1 }}>
          <IconButton
            ref={likeButtonRef}
            onMouseDown={handleLikeMouseDown}
            onMouseUp={handleLikeMouseUp}
            onMouseLeave={handleLikeMouseLeave}
            onTouchStart={handleLikeMouseDown}
            onTouchEnd={handleLikeMouseUp}
            sx={(t) => ({
              color: reaction ? reaction.color : "text.secondary",
              borderRadius: 3,
              py: 1.2,
              width: "100%",
              gap: 0.75,
              transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
              "&:hover": {
                bgcolor: reaction
                  ? alpha(reaction.color, 0.1)
                  : t.palette.action.hover,
                transform: "scale(1.03)",
              },
              "&:active": {
                transform: "scale(0.98)",
              },
            })}
          >
            {reaction ? (
              <>
                <Box
                  component="span"
                  sx={{
                    fontSize: "20px",
                    animation: "bounceIn 0.5s ease",
                    "@keyframes bounceIn": {
                      "0%": { transform: "scale(0)" },
                      "50%": { transform: "scale(1.2)" },
                      "100%": { transform: "scale(1)" },
                    },
                  }}
                >
                  {reaction.emoji}
                </Box>
                <Typography sx={{ fontSize: { xs: 13, sm: 14 }, fontWeight: 600 }}>{reaction.label}</Typography>
              </>
            ) : (
              <>
                <ThumbUpOutlined sx={{ fontSize: { xs: 18, sm: 20 } }} />
                <Typography sx={{ fontSize: { xs: 13, sm: 14 }, fontWeight: 600 }}>Like</Typography>
              </>
            )}
          </IconButton>

          <Popover
            open={Boolean(reactionAnchor)}
            anchorEl={reactionAnchor}
            onClose={handleCloseReactions}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            transformOrigin={{ vertical: "bottom", horizontal: "center" }}
            disableRestoreFocus
            PaperProps={{
              sx: {
                px: 2.5,
                py: 2,
                borderRadius: 6,
                display: "flex",
                gap: 1,
                boxShadow: "0 12px 40px rgba(0,0,0,0.2)",
                bgcolor: "background.paper",
                border: "1px solid",
                borderColor: "divider",
              },
              onMouseLeave: handleCloseReactions,
            }}
          >
            {REACTIONS.map((r) => (
              <Tooltip title={r.label} key={r.label} placement="top">
                <Box
                  onClick={() => handleSelectReaction(r)}
                  sx={{
                    fontSize: 32,
                    cursor: "pointer",
                    transition: "all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)",
                    p: 1,
                    borderRadius: 3,
                    "&:hover": {
                      transform: "scale(1.4) translateY(-6px)",
                      bgcolor: alpha(r.color, 0.1),
                    },
                  }}
                >
                  {r.emoji}
                </Box>
              </Tooltip>
            ))}
          </Popover>
        </Box>

        <IconButton
          onClick={() => setShowComments(!showComments)}
          sx={(t) => ({
            color: "text.secondary",
            borderRadius: 3,
            py: 1.2,
            flex: 1,
            gap: 0.75,
            transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
            "&:hover": {
              bgcolor: t.palette.action.hover,
              color: "primary.main",
              transform: "scale(1.03)",
            },
            "&:active": {
              transform: "scale(0.98)",
            },
          })}
        >
          <ChatBubbleOutline sx={{ fontSize: { xs: 18, sm: 20 } }} />
          <Typography sx={{ fontSize: { xs: 13, sm: 14 }, fontWeight: 600 }}>Comment</Typography>
        </IconButton>

        <IconButton
          sx={(t) => ({
            color: "text.secondary",
            borderRadius: 3,
            py: 1.2,
            flex: 1,
            gap: 0.75,
            transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
            "&:hover": {
              bgcolor: t.palette.action.hover,
              color: "primary.main",
              transform: "scale(1.03)",
            },
            "&:active": {
              transform: "scale(0.98)",
            },
          })}
        >
          <Share sx={{ fontSize: { xs: 18, sm: 20 } }} />
          <Typography sx={{ fontSize: { xs: 13, sm: 14 }, fontWeight: 600 }}>Share</Typography>
        </IconButton>
      </Box>

      <Collapse in={showComments}>
        <Divider sx={{ borderColor: "divider" }} />
        <Box
          sx={(t) => ({
            p: { xs: 2, sm: 2.5 },
            bgcolor: t.palette.mode === "dark" ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.015)",
          })}
        >
          {comments.map((c) => (
            <Box key={c.id} sx={{ display: "flex", gap: 1.5, mb: 2.5 }}>
              <Avatar sx={{ width: 36, height: 36, bgcolor: "primary.main", fontWeight: 700, fontSize: 14 }}>
                {c.author.charAt(0)}
              </Avatar>
              <Box sx={{ flex: 1 }}>
                <Box
                  sx={(t) => ({
                    bgcolor: "background.paper",
                    borderRadius: 4,
                    p: 1.5,
                    border: "1px solid",
                    borderColor: "divider",
                    transition: "all 0.2s",
                    "&:hover": {
                      boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                    },
                  })}
                >
                  <Typography sx={{ fontSize: 13, fontWeight: 700, mb: 0.5, color: "text.primary" }}>
                    {c.author}
                  </Typography>
                  <Typography sx={{ fontSize: 14, color: "text.primary", lineHeight: 1.6 }}>{c.text}</Typography>
                </Box>
                <Box sx={{ display: "flex", gap: 2, mt: 0.75, px: 1.5 }}>
                  <Typography
                    sx={{
                      fontSize: 12,
                      color: "text.secondary",
                      cursor: "pointer",
                      fontWeight: 600,
                      "&:hover": { textDecoration: "underline" },
                    }}
                  >
                    {c.time}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: 12,
                      color: "text.secondary",
                      cursor: "pointer",
                      fontWeight: 600,
                      "&:hover": { color: "primary.main" },
                    }}
                  >
                    Like
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: 12,
                      color: "text.secondary",
                      cursor: "pointer",
                      fontWeight: 600,
                      "&:hover": { color: "primary.main" },
                    }}
                  >
                    Reply
                  </Typography>
                </Box>
              </Box>
            </Box>
          ))}

          <Box sx={{ display: "flex", gap: 1.5, mt: 2 }}>
            <Avatar sx={{ width: 36, height: 36, bgcolor: "primary.main", fontWeight: 700, fontSize: 14 }}>
              Y
            </Avatar>
            <TextField
              fullWidth
              size="small"
              placeholder="Write a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleComment();
                }
              }}
              InputProps={{
                endAdornment: (
                  <IconButton
                    size="small"
                    onClick={handleComment}
                    disabled={!commentText.trim()}
                    sx={(t) => ({
                      color: "primary.main",
                      transition: "all 0.2s",
                      "&:disabled": { color: "text.disabled" },
                      "&:hover": {
                        bgcolor: alpha(t.palette.primary.main, 0.1),
                        transform: "scale(1.1)",
                      },
                    })}
                  >
                    <Send sx={{ fontSize: 18 }} />
                  </IconButton>
                ),
              }}
              sx={(t) => ({
                "& .MuiOutlinedInput-root": {
                  borderRadius: 5,
                  bgcolor: "background.paper",
                  fontSize: 14,
                  "& fieldset": { borderColor: "divider" },
                  "&:hover fieldset": { borderColor: "primary.main" },
                  "&.Mui-focused fieldset": { borderColor: "primary.main", borderWidth: 2 },
                },
              })}
            />
          </Box>
        </Box>
      </Collapse>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          sx: {
            borderRadius: 3,
            boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
            minWidth: 180,
            border: "1px solid",
            borderColor: "divider",
            bgcolor: "background.paper",
          },
        }}
      >
        <MenuItem
          onClick={handleEdit}
          sx={(t) => ({
            fontSize: 14,
            py: 1.5,
            px: 2,
            fontWeight: 600,
            gap: 1.5,
            "&:hover": { bgcolor: t.palette.action.hover },
          })}
        >
          <Box component="span">✏️</Box>
          Edit Post
        </MenuItem>
        <MenuItem
          onClick={handleDelete}
          sx={(t) => ({
            fontSize: 14,
            py: 1.5,
            px: 2,
            fontWeight: 600,
            gap: 1.5,
            color: "error.main",
            "&:hover": { bgcolor: alpha(t.palette.error.main, 0.1) },
          })}
        >
          <Box component="span">🗑️</Box>
          Delete Post
        </MenuItem>
      </Menu>
    </Paper>
  );
});

export default Post;
