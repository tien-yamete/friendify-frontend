import { useState } from 'react'
import {
  Box,
  Card,
  List,
  ListItem,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
  Avatar,
  TextField,
  IconButton,
  Typography,
  Divider,
  Badge,
  Paper,
} from '@mui/material'
import { Send } from '@mui/icons-material'
import Layout from '@/components/Layout'
import UserAvatar from '@/components/UserAvatar'
import { useConversations, useMessages, useSendMessage } from '@/hooks/useApi'
import { useAuth } from '@/contexts/AuthContext'
import { formatMessageTime } from '@/utils/dateUtils'

function MessageBubble({ message, isOwn }) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: isOwn ? 'flex-end' : 'flex-start',
        mb: 2,
      }}
    >
      {!isOwn && (
        <Avatar
          src={message.sender.avatar}
          sx={{ width: 32, height: 32, mr: 1 }}
        />
      )}
      <Box sx={{ maxWidth: '70%' }}>
        <Paper
          sx={{
            p: 1.5,
            bgcolor: isOwn ? 'primary.main' : 'background.paper',
            color: isOwn ? 'primary.contrastText' : 'text.primary',
            borderRadius: 2,
          }}
        >
          <Typography variant="body2">{message.content}</Typography>
        </Paper>
        <Typography variant="caption" color="text.secondary" sx={{ px: 1 }}>
          {formatMessageTime(message.timestamp)}
        </Typography>
      </Box>
    </Box>
  )
}

export default function Chat() {
  const { user } = useAuth()
  const { data: conversations } = useConversations()
  const [selectedConversation, setSelectedConversation] = useState(null)
  const { data: messages } = useMessages(selectedConversation?.id)
  const sendMessage = useSendMessage()
  const [newMessage, setNewMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedConversation) return

    try {
      await sendMessage.mutateAsync({
        conversationId: selectedConversation.id,
        content: newMessage,
      })
      setNewMessage('')
    } catch (error) {
      console.error('Failed to send message:', error)
    }
  }

  return (
    <Layout showRightRail={false}>
      <Card sx={{ height: 'calc(100vh - 100px)', display: 'flex' }}>
        <Box
          sx={{
            width: { xs: '100%', md: 350 },
            borderRight: 1,
            borderColor: 'divider',
            display: { xs: selectedConversation ? 'none' : 'block', md: 'block' },
          }}
        >
          <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
            <Typography variant="h6" fontWeight="bold">
              Messages
            </Typography>
          </Box>
          <List sx={{ overflow: 'auto', height: 'calc(100% - 73px)' }}>
            {conversations?.map((conv) => (
              <ListItem key={conv.id} disablePadding>
                <ListItemButton
                  selected={selectedConversation?.id === conv.id}
                  onClick={() => setSelectedConversation(conv)}
                >
                  <ListItemAvatar>
                    <UserAvatar user={conv.participant} showOnline />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography fontWeight={conv.unread > 0 ? 'bold' : 'normal'}>
                          {conv.participant.firstName} {conv.participant.lastName}
                        </Typography>
                        {conv.unread > 0 && (
                          <Badge badgeContent={conv.unread} color="primary" />
                        )}
                      </Box>
                    }
                    secondary={
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        noWrap
                        fontWeight={conv.unread > 0 ? 'bold' : 'normal'}
                      >
                        {conv.lastMessage}
                      </Typography>
                    }
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>

        <Box
          sx={{
            flex: 1,
            display: { xs: selectedConversation ? 'flex' : 'none', md: 'flex' },
            flexDirection: 'column',
          }}
        >
          {selectedConversation ? (
            <>
              <Box
                sx={{
                  p: 2,
                  borderBottom: 1,
                  borderColor: 'divider',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                }}
              >
                <UserAvatar user={selectedConversation.participant} showOnline />
                <Box>
                  <Typography fontWeight="bold">
                    {selectedConversation.participant.firstName}{' '}
                    {selectedConversation.participant.lastName}
                  </Typography>
                  {selectedConversation.participant.isOnline && (
                    <Typography variant="caption" color="success.main">
                      Active now
                    </Typography>
                  )}
                </Box>
              </Box>

              <Box
                sx={{
                  flex: 1,
                  overflow: 'auto',
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {messages?.map((message) => (
                  <MessageBubble
                    key={message.id}
                    message={message}
                    isOwn={message.sender.id === user.id}
                  />
                ))}
                {isTyping && (
                  <Typography variant="caption" color="text.secondary" sx={{ ml: 5 }}>
                    Typing...
                  </Typography>
                )}
              </Box>

              <Divider />

              <Box sx={{ p: 2, display: 'flex', gap: 1 }}>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault()
                      handleSendMessage()
                    }
                  }}
                />
                <IconButton
                  color="primary"
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim() || sendMessage.isPending}
                >
                  <Send />
                </IconButton>
              </Box>
            </>
          ) : (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
              }}
            >
              <Typography variant="h6" color="text.secondary">
                Select a conversation to start messaging
              </Typography>
            </Box>
          )}
        </Box>
      </Card>
    </Layout>
  )
}
