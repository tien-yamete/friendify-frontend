import { useState } from 'react'
import {
  Box,
  Card,
  CardContent,
  Typography,
  Tabs,
  Tab,
  Grid,
  Avatar,
  Button,
  Chip,
} from '@mui/material'
import { People } from '@mui/icons-material'
import Layout from '@/components/Layout'
import EmptyState from '@/components/EmptyState'
import { useFriends, useFriendRequests, useFriendSuggestions } from '@/hooks/useApi'
import { useNavigate } from 'react-router-dom'

function TabPanel({ children, value, index }) {
  return value === index ? <Box sx={{ py: 3 }}>{children}</Box> : null
}

export default function Friends() {
  const navigate = useNavigate()
  const [tabValue, setTabValue] = useState(0)
  const { data: friends } = useFriends()
  const { data: requests } = useFriendRequests()
  const { data: suggestions } = useFriendSuggestions()

  return (
    <Layout>
      <Card sx={{ mb: 2 }}>
        <Tabs
          value={tabValue}
          onChange={(e, newValue) => setTabValue(newValue)}
          variant="fullWidth"
        >
          <Tab label={`Friends (${friends?.length || 0})`} />
          <Tab
            label={
              <Box>
                Requests
                {requests?.length > 0 && (
                  <Chip
                    label={requests.length}
                    size="small"
                    color="primary"
                    sx={{ ml: 1 }}
                  />
                )}
              </Box>
            }
          />
          <Tab label="Suggestions" />
        </Tabs>
      </Card>

      <TabPanel value={tabValue} index={0}>
        {friends?.length === 0 ? (
          <EmptyState
            icon={People}
            title="No friends yet"
            description="Start adding friends to connect"
          />
        ) : (
          <Grid container spacing={2}>
            {friends?.map((friend) => (
              <Grid item xs={12} sm={6} md={4} key={friend.id}>
                <Card>
                  <CardContent>
                    <Box sx={{ textAlign: 'center' }}>
                      <Avatar
                        src={friend.avatar}
                        sx={{ width: 80, height: 80, mx: 'auto', mb: 2 }}
                      />
                      <Typography variant="h6" fontWeight="bold">
                        {friend.firstName} {friend.lastName}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        {friend.mutualFriends} mutual friends
                      </Typography>
                      <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                        <Button
                          variant="outlined"
                          size="small"
                          fullWidth
                          onClick={() => navigate(`/profile/${friend.id}`)}
                        >
                          View Profile
                        </Button>
                        <Button variant="outlined" size="small" fullWidth>
                          Message
                        </Button>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        {requests?.length === 0 ? (
          <EmptyState
            icon={People}
            title="No friend requests"
            description="You're all caught up!"
          />
        ) : (
          <Grid container spacing={2}>
            {requests?.map((request) => (
              <Grid item xs={12} sm={6} md={4} key={request.id}>
                <Card>
                  <CardContent>
                    <Box sx={{ textAlign: 'center' }}>
                      <Avatar
                        src={request.user.avatar}
                        sx={{ width: 80, height: 80, mx: 'auto', mb: 2 }}
                      />
                      <Typography variant="h6" fontWeight="bold">
                        {request.user.firstName} {request.user.lastName}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        {request.mutualFriends} mutual friends
                      </Typography>
                      <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                        <Button variant="contained" size="small" fullWidth>
                          Accept
                        </Button>
                        <Button variant="outlined" size="small" fullWidth>
                          Decline
                        </Button>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        {suggestions?.length === 0 ? (
          <EmptyState
            icon={People}
            title="No suggestions"
            description="Check back later for friend suggestions"
          />
        ) : (
          <Grid container spacing={2}>
            {suggestions?.map((suggestion) => (
              <Grid item xs={12} sm={6} md={4} key={suggestion.id}>
                <Card>
                  <CardContent>
                    <Box sx={{ textAlign: 'center' }}>
                      <Avatar
                        src={suggestion.user.avatar}
                        sx={{ width: 80, height: 80, mx: 'auto', mb: 2 }}
                      />
                      <Typography variant="h6" fontWeight="bold">
                        {suggestion.user.firstName} {suggestion.user.lastName}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        {suggestion.mutualFriends} mutual friends
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {suggestion.reason}
                      </Typography>
                      <Box sx={{ mt: 2 }}>
                        <Button variant="contained" size="small" fullWidth>
                          Add Friend
                        </Button>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </TabPanel>
    </Layout>
  )
}
