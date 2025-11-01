import { useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  Box,
  Card,
  CardContent,
  Avatar,
  Typography,
  Button,
  Tabs,
  Tab,
  Grid,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Divider,
} from '@mui/material'
import { Edit, PhotoCamera, LocationOn, Link as LinkIcon, Event } from '@mui/icons-material'
import Layout from '@/components/Layout'
import PostCard from '@/components/PostCard'
import { useUser, useUpdateUser, useInfinitePosts } from '@/hooks/useApi'
import { useAuth } from '@/contexts/AuthContext'

function TabPanel({ children, value, index }) {
  return value === index ? <Box sx={{ py: 3 }}>{children}</Box> : null
}

export default function Profile() {
  const { id } = useParams()
  const { user: currentUser } = useAuth()
  const { data: user } = useUser(id)
  const { data: postsData } = useInfinitePosts()
  const updateUser = useUpdateUser()
  
  const [tabValue, setTabValue] = useState(0)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [editFormData, setEditFormData] = useState({})

  const isOwnProfile = currentUser?.id === id

  const userPosts = postsData?.pages
    .flatMap(page => page.posts)
    .filter(post => post.author.id === id) || []

  const handleEditOpen = () => {
    setEditFormData({
      firstName: user.firstName,
      lastName: user.lastName,
      bio: user.bio || '',
      location: user.location || '',
      website: user.website || '',
    })
    setEditModalOpen(true)
  }

  const handleEditSave = async () => {
    try {
      await updateUser.mutateAsync({ id, data: editFormData })
      setEditModalOpen(false)
    } catch (error) {
      console.error('Failed to update profile:', error)
    }
  }

  if (!user) return null

  return (
    <Layout showRightRail={false}>
      <Card sx={{ mb: 2 }}>
        <Box
          sx={{
            height: 300,
            backgroundImage: `url(${user.coverPhoto})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'relative',
          }}
        >
          {isOwnProfile && (
            <IconButton
              sx={{
                position: 'absolute',
                bottom: 16,
                right: 16,
                bgcolor: 'background.paper',
              }}
            >
              <PhotoCamera />
            </IconButton>
          )}
        </Box>

        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 2, position: 'relative', mt: -8 }}>
            <Avatar
              src={user.avatar}
              sx={{
                width: 160,
                height: 160,
                border: '4px solid',
                borderColor: 'background.paper',
              }}
            />
            <Box sx={{ flex: 1, mt: 8 }}>
              <Typography variant="h4" fontWeight="bold">
                {user.firstName} {user.lastName}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {user.friendsCount?.toLocaleString()} friends
              </Typography>
            </Box>
            {isOwnProfile && (
              <Button
                variant="contained"
                startIcon={<Edit />}
                onClick={handleEditOpen}
                sx={{ mt: 8 }}
              >
                Edit Profile
              </Button>
            )}
            {!isOwnProfile && (
              <Box sx={{ mt: 8, display: 'flex', gap: 1 }}>
                <Button variant="contained">Add Friend</Button>
                <Button variant="outlined">Message</Button>
              </Box>
            )}
          </Box>

          {user.bio && (
            <Typography variant="body1" paragraph>
              {user.bio}
            </Typography>
          )}

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 2 }}>
            {user.location && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <LocationOn fontSize="small" color="action" />
                <Typography variant="body2">{user.location}</Typography>
              </Box>
            )}
            {user.website && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <LinkIcon fontSize="small" color="action" />
                <Typography variant="body2">{user.website}</Typography>
              </Box>
            )}
            {user.joinedDate && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Event fontSize="small" color="action" />
                <Typography variant="body2">
                  Joined {new Date(user.joinedDate).toLocaleDateString()}
                </Typography>
              </Box>
            )}
          </Box>
        </CardContent>

        <Divider />

        <Tabs
          value={tabValue}
          onChange={(e, newValue) => setTabValue(newValue)}
          variant="fullWidth"
        >
          <Tab label="Posts" />
          <Tab label="About" />
          <Tab label="Friends" />
          <Tab label="Photos" />
        </Tabs>
      </Card>

      <TabPanel value={tabValue} index={0}>
        {userPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
        {userPosts.length === 0 && (
          <Card>
            <CardContent>
              <Typography textAlign="center" color="text.secondary">
                No posts yet
              </Typography>
            </CardContent>
          </Card>
        )}
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              About
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {user.bio && (
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Bio
                  </Typography>
                  <Typography>{user.bio}</Typography>
                </Box>
              )}
              {user.location && (
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Location
                  </Typography>
                  <Typography>{user.location}</Typography>
                </Box>
              )}
              {user.website && (
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Website
                  </Typography>
                  <Typography>{user.website}</Typography>
                </Box>
              )}
            </Box>
          </CardContent>
        </Card>
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Friends
            </Typography>
            <Typography color="text.secondary">
              {user.friendsCount?.toLocaleString()} friends
            </Typography>
          </CardContent>
        </Card>
      </TabPanel>

      <TabPanel value={tabValue} index={3}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Photos
            </Typography>
            <Grid container spacing={1}>
              {userPosts
                .flatMap(post => post.images || [])
                .slice(0, 9)
                .map((image) => (
                  <Grid item xs={4} key={image}>
                    <Box
                      component="img"
                      src={image}
                      sx={{
                        width: '100%',
                        height: 150,
                        objectFit: 'cover',
                        borderRadius: 1,
                      }}
                    />
                  </Grid>
                ))}
            </Grid>
          </CardContent>
        </Card>
      </TabPanel>

      <Dialog open={editModalOpen} onClose={() => setEditModalOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="First Name"
            value={editFormData.firstName || ''}
            onChange={(e) => setEditFormData({ ...editFormData, firstName: e.target.value })}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Last Name"
            value={editFormData.lastName || ''}
            onChange={(e) => setEditFormData({ ...editFormData, lastName: e.target.value })}
            margin="normal"
          />
          <TextField
            fullWidth
            multiline
            rows={3}
            label="Bio"
            value={editFormData.bio || ''}
            onChange={(e) => setEditFormData({ ...editFormData, bio: e.target.value })}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Location"
            value={editFormData.location || ''}
            onChange={(e) => setEditFormData({ ...editFormData, location: e.target.value })}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Website"
            value={editFormData.website || ''}
            onChange={(e) => setEditFormData({ ...editFormData, website: e.target.value })}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditModalOpen(false)}>Cancel</Button>
          <Button onClick={handleEditSave} variant="contained" disabled={updateUser.isPending}>
            {updateUser.isPending ? 'Saving...' : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>
    </Layout>
  )
}
