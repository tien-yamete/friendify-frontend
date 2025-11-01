import { useState } from 'react'
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Tabs,
  Tab,
  Grid,
  Chip,
} from '@mui/material'
import { Group } from '@mui/icons-material'
import Layout from '@/components/Layout'
import EmptyState from '@/components/EmptyState'
import { useGroups } from '@/hooks/useApi'

function TabPanel({ children, value, index }) {
  return value === index ? <Box sx={{ py: 3 }}>{children}</Box> : null
}

export default function Groups() {
  const [tabValue, setTabValue] = useState(0)
  const { data: groups } = useGroups()

  const myGroups = groups?.filter(g => g.isMember) || []
  const discoverGroups = groups?.filter(g => !g.isMember) || []

  return (
    <Layout>
      <Card sx={{ mb: 2 }}>
        <Tabs
          value={tabValue}
          onChange={(e, newValue) => setTabValue(newValue)}
          variant="fullWidth"
        >
          <Tab label={`Your Groups (${myGroups.length})`} />
          <Tab label="Discover" />
        </Tabs>
      </Card>

      <TabPanel value={tabValue} index={0}>
        {myGroups.length === 0 ? (
          <EmptyState
            icon={Group}
            title="No groups yet"
            description="Join groups to connect with people who share your interests"
            action={() => setTabValue(1)}
            actionLabel="Discover Groups"
          />
        ) : (
          <Grid container spacing={2}>
            {myGroups.map((group) => (
              <Grid item xs={12} sm={6} key={group.id}>
                <Card>
                  <CardMedia
                    component="img"
                    height="140"
                    image={group.coverPhoto}
                    alt={group.name}
                  />
                  <CardContent>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      {group.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {group.description}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="caption" color="text.secondary">
                        {group.members.toLocaleString()} members
                      </Typography>
                      <Chip label="Member" color="primary" size="small" />
                    </Box>
                    <Button variant="outlined" fullWidth sx={{ mt: 2 }}>
                      View Group
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
          {discoverGroups.map((group) => (
            <Grid item xs={12} sm={6} key={group.id}>
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image={group.coverPhoto}
                  alt={group.name}
                />
                <CardContent>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    {group.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {group.description}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {group.members.toLocaleString()} members
                  </Typography>
                  <Button variant="contained" fullWidth sx={{ mt: 2 }}>
                    Join Group
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
