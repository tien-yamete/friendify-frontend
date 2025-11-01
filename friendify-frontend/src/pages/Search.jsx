import { useSearchParams } from 'react-router-dom'
import {
  Card,
  CardContent,
  Typography,
  Tabs,
  Tab,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Button,
} from '@mui/material'
import { useState } from 'react'
import Layout from '@/components/Layout'
import PostCard from '@/components/PostCard'
import EmptyState from '@/components/EmptyState'
import { useSearch } from '@/hooks/useApi'
import { Search as SearchIcon } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

function TabPanel({ children, value, index }) {
  return value === index ? <Box sx={{ py: 3 }}>{children}</Box> : null
}

export default function Search() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  const [tabValue, setTabValue] = useState(0)
  const { data: results } = useSearch(query)

  if (!query) {
    return (
      <Layout>
        <EmptyState
          icon={SearchIcon}
          title="No search query"
          description="Enter a search term to find people, posts, and more"
        />
      </Layout>
    )
  }

  const totalResults = (results?.users?.length || 0) +
    (results?.posts?.length || 0) +
    (results?.groups?.length || 0) +
    (results?.pages?.length || 0)

  return (
    <Layout>
      <Card sx={{ mb: 2, p: 2 }}>
        <Typography variant="h5" fontWeight="bold">
          Search results for "{query}"
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {totalResults} results found
        </Typography>
      </Card>

      <Card sx={{ mb: 2 }}>
        <Tabs
          value={tabValue}
          onChange={(e, newValue) => setTabValue(newValue)}
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label={`All (${totalResults})`} />
          <Tab label={`People (${results?.users?.length || 0})`} />
          <Tab label={`Posts (${results?.posts?.length || 0})`} />
          <Tab label={`Groups (${results?.groups?.length || 0})`} />
          <Tab label={`Pages (${results?.pages?.length || 0})`} />
        </Tabs>
      </Card>

      <TabPanel value={tabValue} index={0}>
        {totalResults === 0 ? (
          <EmptyState
            icon={SearchIcon}
            title="No results found"
            description="Try different keywords"
          />
        ) : (
          <Box>
            {results?.users?.length > 0 && (
              <Card sx={{ mb: 2 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>People</Typography>
                  <List>
                    {results.users.slice(0, 3).map((user) => (
                      <ListItem key={user.id} disablePadding>
                        <ListItemButton onClick={() => navigate(`/profile/${user.id}`)}>
                          <ListItemAvatar>
                            <Avatar src={user.avatar} />
                          </ListItemAvatar>
                          <ListItemText
                            primary={`${user.firstName} ${user.lastName}`}
                            secondary={user.bio}
                          />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            )}

            {results?.posts?.length > 0 && (
              <Box>
                <Typography variant="h6" gutterBottom>Posts</Typography>
                {results.posts.slice(0, 3).map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </Box>
            )}
          </Box>
        )}
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        {!results?.users || results.users.length === 0 ? (
          <EmptyState title="No people found" />
        ) : (
          <Card>
            <List>
              {results.users.map((user) => (
                <ListItem
                  key={user.id}
                  disablePadding
                  secondaryAction={
                    <Button size="small" variant="contained">
                      Add Friend
                    </Button>
                  }
                >
                  <ListItemButton onClick={() => navigate(`/profile/${user.id}`)}>
                    <ListItemAvatar>
                      <Avatar src={user.avatar} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={`${user.firstName} ${user.lastName}`}
                      secondary={user.bio}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Card>
        )}
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        {!results?.posts || results.posts.length === 0 ? (
          <EmptyState title="No posts found" />
        ) : (
          <Box>
            {results.posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </Box>
        )}
      </TabPanel>

      <TabPanel value={tabValue} index={3}>
        {!results?.groups || results.groups.length === 0 ? (
          <EmptyState title="No groups found" />
        ) : (
          <Card>
            <List>
              {results.groups.map((group) => (
                <ListItem key={group.id} disablePadding>
                  <ListItemButton>
                    <ListItemAvatar>
                      <Avatar src={group.coverPhoto} variant="rounded" />
                    </ListItemAvatar>
                    <ListItemText
                      primary={group.name}
                      secondary={`${group.members.toLocaleString()} members`}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Card>
        )}
      </TabPanel>

      <TabPanel value={tabValue} index={4}>
        {!results?.pages || results.pages.length === 0 ? (
          <EmptyState title="No pages found" />
        ) : (
          <Card>
            <List>
              {results.pages.map((page) => (
                <ListItem key={page.id} disablePadding>
                  <ListItemButton>
                    <ListItemAvatar>
                      <Avatar src={page.avatar} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={page.name}
                      secondary={`${page.likes.toLocaleString()} likes`}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Card>
        )}
      </TabPanel>
    </Layout>
  )
}
