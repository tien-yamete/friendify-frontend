import { useState } from 'react'
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Tabs,
  Tab,
  Grid,
  Avatar,
  Chip,
} from '@mui/material'
import { Description } from '@mui/icons-material'
import Layout from '@/components/Layout'
import EmptyState from '@/components/EmptyState'
import { usePages } from '@/hooks/useApi'

function TabPanel({ children, value, index }) {
  return value === index ? <Box sx={{ py: 3 }}>{children}</Box> : null
}

export default function Pages() {
  const [tabValue, setTabValue] = useState(0)
  const { data: pages } = usePages()

  const followingPages = pages?.filter(p => p.isFollowing) || []
  const discoverPages = pages?.filter(p => !p.isFollowing) || []

  return (
    <Layout>
      <Card sx={{ mb: 2 }}>
        <Tabs
          value={tabValue}
          onChange={(e, newValue) => setTabValue(newValue)}
          variant="fullWidth"
        >
          <Tab label={`Following (${followingPages.length})`} />
          <Tab label="Discover" />
        </Tabs>
      </Card>

      <TabPanel value={tabValue} index={0}>
        {followingPages.length === 0 ? (
          <EmptyState
            icon={Description}
            title="No pages yet"
            description="Follow pages to get updates from brands and organizations"
            action={() => setTabValue(1)}
            actionLabel="Discover Pages"
          />
        ) : (
          <Grid container spacing={2}>
            {followingPages.map((page) => (
              <Grid item xs={12} sm={6} key={page.id}>
                <Card>
                  <Box
                    sx={{
                      height: 120,
                      backgroundImage: `url(${page.coverPhoto})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  />
                  <CardContent>
                    <Box sx={{ display: 'flex', gap: 2, mb: 2, mt: -6 }}>
                      <Avatar
                        src={page.avatar}
                        sx={{
                          width: 80,
                          height: 80,
                          border: '4px solid',
                          borderColor: 'background.paper',
                        }}
                      />
                      <Box sx={{ mt: 6 }}>
                        <Typography variant="h6" fontWeight="bold">
                          {page.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {page.category}
                        </Typography>
                      </Box>
                    </Box>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {page.description}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="caption" color="text.secondary">
                        {page.likes.toLocaleString()} likes
                      </Typography>
                      <Chip label="Following" color="primary" size="small" />
                    </Box>
                    <Button variant="outlined" fullWidth sx={{ mt: 2 }}>
                      View Page
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <Grid container spacing={2}>
          {discoverPages.map((page) => (
            <Grid item xs={12} sm={6} key={page.id}>
              <Card>
                <Box
                  sx={{
                    height: 120,
                    backgroundImage: `url(${page.coverPhoto})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
                <CardContent>
                  <Box sx={{ display: 'flex', gap: 2, mb: 2, mt: -6 }}>
                    <Avatar
                      src={page.avatar}
                      sx={{
                        width: 80,
                        height: 80,
                        border: '4px solid',
                        borderColor: 'background.paper',
                      }}
                    />
                    <Box sx={{ mt: 6 }}>
                      <Typography variant="h6" fontWeight="bold">
                        {page.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {page.category}
                      </Typography>
                    </Box>
                  </Box>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {page.description}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {page.likes.toLocaleString()} likes
                  </Typography>
                  <Button variant="contained" fullWidth sx={{ mt: 2 }}>
                    Follow
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </TabPanel>
    </Layout>
  )
}
