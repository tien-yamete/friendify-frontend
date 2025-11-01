import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  Switch,
  Divider,
  Box,
} from '@mui/material'
import Layout from '@/components/Layout'

export default function Settings() {
  return (
    <Layout showRightRail={false}>
      <Card sx={{ mb: 2, p: 2 }}>
        <Typography variant="h5" fontWeight="bold">
          Settings
        </Typography>
      </Card>

      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Account Settings
          </Typography>
          <List>
            <ListItem>
              <ListItemText
                primary="Email Notifications"
                secondary="Receive email notifications for new messages and updates"
              />
              <Switch defaultChecked />
            </ListItem>
            <Divider component="li" />
            <ListItem>
              <ListItemText
                primary="Push Notifications"
                secondary="Receive push notifications on your device"
              />
              <Switch defaultChecked />
            </ListItem>
            <Divider component="li" />
            <ListItem>
              <ListItemText
                primary="Two-Factor Authentication"
                secondary="Add an extra layer of security to your account"
              />
              <Switch />
            </ListItem>
          </List>
        </CardContent>
      </Card>

      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Privacy Settings
          </Typography>
          <List>
            <ListItem>
              <ListItemText
                primary="Profile Visibility"
                secondary="Allow everyone to see your profile"
              />
              <Switch defaultChecked />
            </ListItem>
            <Divider component="li" />
            <ListItem>
              <ListItemText
                primary="Show Online Status"
                secondary="Let friends see when you're online"
              />
              <Switch defaultChecked />
            </ListItem>
            <Divider component="li" />
            <ListItem>
              <ListItemText
                primary="Activity Status"
                secondary="Share your activity status with friends"
              />
              <Switch defaultChecked />
            </ListItem>
            <Divider component="li" />
            <ListItem>
              <ListItemText
                primary="Search Engine Indexing"
                secondary="Allow search engines to index your profile"
              />
              <Switch />
            </ListItem>
          </List>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Content Preferences
          </Typography>
          <List>
            <ListItem>
              <ListItemText
                primary="Auto-play Videos"
                secondary="Videos play automatically in your feed"
              />
              <Switch defaultChecked />
            </ListItem>
            <Divider component="li" />
            <ListItem>
              <ListItemText
                primary="Show Suggested Posts"
                secondary="See recommended content in your feed"
              />
              <Switch defaultChecked />
            </ListItem>
            <Divider component="li" />
            <ListItem>
              <ListItemText
                primary="Data Saver"
                secondary="Reduce data usage by loading lower quality images"
              />
              <Switch />
            </ListItem>
          </List>
        </CardContent>
      </Card>
    </Layout>
  )
}
