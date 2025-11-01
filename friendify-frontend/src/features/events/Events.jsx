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
  Avatar,
  Divider,
} from '@mui/material'
import { Event, CalendarToday, LocationOn, People } from '@mui/icons-material'
import Layout from '@/components/Layout'
import EmptyState from '@/components/EmptyState'
import { useEvents } from '@/hooks/useApi'

function TabPanel({ children, value, index }) {
  return value === index ? <Box sx={{ py: 3 }}>{children}</Box> : null
}

function EventCard({ event }) {
  const eventDate = new Date(event.date)
  const isPast = eventDate < new Date()
  
  return (
    <Card>
      <CardMedia
        component="img"
        height="180"
        image={event.coverPhoto}
        alt={event.title}
      />
      <CardContent>
        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
          <Box
            sx={{
              bgcolor: 'primary.main',
              color: 'primary.contrastText',
              p: 1,
              borderRadius: 1,
              textAlign: 'center',
              minWidth: 60,
            }}
          >
            <Typography variant="h6" fontWeight="bold">
              {eventDate.getDate()}
            </Typography>
            <Typography variant="caption">
              {eventDate.toLocaleDateString('en-US', { month: 'short' })}
            </Typography>
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              {event.title}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5 }}>
              <CalendarToday fontSize="small" color="action" />
              <Typography variant="body2" color="text.secondary">
                {eventDate.toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })} at {eventDate.toLocaleTimeString('en-US', {
                  hour: 'numeric',
                  minute: '2-digit',
                })}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <LocationOn fontSize="small" color="action" />
              <Typography variant="body2" color="text.secondary">
                {event.location}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Typography variant="body2" color="text.secondary" paragraph>
          {event.description}
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <Avatar src={event.host.avatar} sx={{ width: 32, height: 32 }} />
          <Box>
            <Typography variant="caption" color="text.secondary">
              Hosted by
            </Typography>
            <Typography variant="body2" fontWeight="bold">
              {event.host.firstName} {event.host.lastName}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
          <Chip
            icon={<People />}
            label={`${event.attendees} going`}
            size="small"
            variant="outlined"
          />
          <Chip
            label={`${event.interested} interested`}
            size="small"
            variant="outlined"
          />
        </Box>

        {!isPast && (
          <Box sx={{ display: 'flex', gap: 1 }}>
            {event.isGoing ? (
              <Button variant="contained" fullWidth disabled>
                Going
              </Button>
            ) : event.isInterested ? (
              <Button variant="outlined" fullWidth>
                Interested
              </Button>
            ) : (
              <>
                <Button variant="contained" fullWidth>
                  Interested
                </Button>
                <Button variant="outlined" fullWidth>
                  Going
                </Button>
              </>
            )}
          </Box>
        )}
        
        {isPast && (
          <Chip label="Past Event" size="small" />
        )}
      </CardContent>
    </Card>
  )
}

export default function Events() {
  const [tabValue, setTabValue] = useState(0)
  const { data: allEvents } = useEvents()

  const now = new Date()
  const upcomingEvents = allEvents?.filter(e => new Date(e.date) >= now) || []
  const goingEvents = upcomingEvents.filter(e => e.isGoing) || []
  const interestedEvents = upcomingEvents.filter(e => e.isInterested) || []
  const pastEvents = allEvents?.filter(e => new Date(e.date) < now) || []

  return (
    <Layout>
      <Card sx={{ mb: 2 }}>
        <Tabs
          value={tabValue}
          onChange={(e, newValue) => setTabValue(newValue)}
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label={`Upcoming (${upcomingEvents.length})`} />
          <Tab label={`Going (${goingEvents.length})`} />
          <Tab label={`Interested (${interestedEvents.length})`} />
          <Tab label={`Past (${pastEvents.length})`} />
        </Tabs>
      </Card>

      <TabPanel value={tabValue} index={0}>
        {upcomingEvents.length === 0 ? (
          <EmptyState
            icon={Event}
            title="No upcoming events"
            description="Check back later for new events in your area"
          />
        ) : (
          <Grid container spacing={2}>
            {upcomingEvents.map((event) => (
              <Grid item xs={12} md={6} key={event.id}>
                <EventCard event={event} />
              </Grid>
            ))}
          </Grid>
        )}
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        {goingEvents.length === 0 ? (
          <EmptyState
            icon={Event}
            title="No events you're attending"
            description="Find events you're interested in and mark yourself as going"
            action={() => setTabValue(0)}
            actionLabel="Browse Events"
          />
        ) : (
          <Grid container spacing={2}>
            {goingEvents.map((event) => (
              <Grid item xs={12} md={6} key={event.id}>
                <EventCard event={event} />
              </Grid>
            ))}
          </Grid>
        )}
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        {interestedEvents.length === 0 ? (
          <EmptyState
            icon={Event}
            title="No events you're interested in"
            description="Browse events and mark the ones that interest you"
            action={() => setTabValue(0)}
            actionLabel="Browse Events"
          />
        ) : (
          <Grid container spacing={2}>
            {interestedEvents.map((event) => (
              <Grid item xs={12} md={6} key={event.id}>
                <EventCard event={event} />
              </Grid>
            ))}
          </Grid>
        )}
      </TabPanel>

      <TabPanel value={tabValue} index={3}>
        {pastEvents.length === 0 ? (
          <EmptyState
            icon={Event}
            title="No past events"
            description="Events you've attended will appear here"
          />
        ) : (
          <Grid container spacing={2}>
            {pastEvents.map((event) => (
              <Grid item xs={12} md={6} key={event.id}>
                <EventCard event={event} />
              </Grid>
            ))}
          </Grid>
        )}
      </TabPanel>
    </Layout>
  )
}
