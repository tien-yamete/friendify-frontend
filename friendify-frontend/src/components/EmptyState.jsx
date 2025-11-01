import { Box, Typography, Button } from '@mui/material'
import { Inbox } from '@mui/icons-material'

export default function EmptyState({ 
  icon: Icon = Inbox, 
  title = 'No items found', 
  description,
  action,
  actionLabel 
}) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        py: 8,
        textAlign: 'center',
      }}
    >
      <Icon sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      {description && (
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          {description}
        </Typography>
      )}
      {action && (
        <Button variant="contained" onClick={action}>
          {actionLabel || 'Get Started'}
        </Button>
      )}
    </Box>
  )
}
