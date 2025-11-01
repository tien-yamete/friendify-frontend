import { useNavigate } from 'react-router-dom'
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Box,
  IconButton,
  Chip,
} from '@mui/material'
import { MoreVert, Notifications as NotificationsIcon } from '@mui/icons-material'
import Layout from '@/components/Layout'
import EmptyState from '@/components/EmptyState'
import { useNotifications } from '@/hooks/useApi'
import { formatDistanceToNow } from '@/utils/dateUtils'

export default function Notifications() {
  const navigate = useNavigate()
  const { data: notifications } = useNotifications()

  const getNotificationIcon = (type) => {
    const colors = {
      like: 'error',
      comment: 'primary',
      friend_request: 'success',
      birthday: 'warning',
    }
    return colors[type] || 'default'
  }

  return (
    <Layout showRightRail={false}>
      <Card sx={{ mb: 2, p: 2 }}>
        <Typography variant="h5" fontWeight="bold">
          Notifications
        </Typography>
      </Card>

      {!notifications || notifications.length === 0 ? (
        <EmptyState
          icon={NotificationsIcon}
          title="No notifications"
          description="You're all caught up!"
        />
      ) : (
        <Card>
          <List>
            {notifications.map((notif) => (
              <ListItem
                key={notif.id}
                disablePadding
                secondaryAction={
                  <IconButton edge="end">
                    <MoreVert />
                  </IconButton>
                }
              >
                <ListItemButton
                  onClick={() => navigate(notif.link)}
                  sx={{
                    bgcolor: notif.read ? 'transparent' : 'action.hover',
                  }}
                >
                  <ListItemAvatar>
                    <Avatar src={notif.user.avatar}>
                      {notif.user.firstName?.[0]}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography
                          component="span"
                          fontWeight={notif.read ? 'normal' : 'bold'}
                        >
                          {notif.user.firstName} {notif.user.lastName}
                        </Typography>
                        <Typography component="span">
                          {notif.message}
                        </Typography>
                        {!notif.read && (
                          <Chip
                            label="New"
                            size="small"
                            color={getNotificationIcon(notif.type)}
                            sx={{ height: 20 }}
                          />
                        )}
                      </Box>
                    }
                    secondary={formatDistanceToNow(notif.timestamp)}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Card>
      )}
    </Layout>
  )
}
