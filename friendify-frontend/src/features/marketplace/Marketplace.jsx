import { useState } from 'react'
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Avatar,
  Divider,
} from '@mui/material'
import { Store, LocationOn } from '@mui/icons-material'
import Layout from '@/components/Layout'
import EmptyState from '@/components/EmptyState'
import { useMarketplace } from '@/hooks/useApi'
import { formatDistanceToNow } from '@/utils/dateUtils'

export default function Marketplace() {
  const { data: items } = useMarketplace()
  const [selectedItem, setSelectedItem] = useState(null)

  return (
    <Layout>
      <Card sx={{ mb: 2, p: 2 }}>
        <Typography variant="h5" fontWeight="bold">
          Marketplace
        </Typography>
      </Card>

      {!items || items.length === 0 ? (
        <EmptyState
          icon={Store}
          title="No items available"
          description="Check back later for new listings"
        />
      ) : (
        <Grid container spacing={2}>
          {items.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <Card
                sx={{ cursor: 'pointer' }}
                onClick={() => setSelectedItem(item)}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={item.image}
                  alt={item.title}
                />
                <CardContent>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    ${item.price}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {item.title}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}>
                    <LocationOn fontSize="small" color="action" />
                    <Typography variant="caption" color="text.secondary">
                      {item.location}
                    </Typography>
                  </Box>
                  <Chip label={item.condition} size="small" />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <Dialog
        open={!!selectedItem}
        onClose={() => setSelectedItem(null)}
        maxWidth="md"
        fullWidth
      >
        {selectedItem && (
          <>
            <DialogTitle>{selectedItem.title}</DialogTitle>
            <DialogContent>
              <Box
                component="img"
                src={selectedItem.image}
                sx={{ width: '100%', borderRadius: 1, mb: 2 }}
              />
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                ${selectedItem.price}
              </Typography>
              <Chip label={selectedItem.condition} sx={{ mb: 2 }} />
              <Divider sx={{ my: 2 }} />
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <Avatar src={selectedItem.seller.avatar} />
                <Box>
                  <Typography fontWeight="bold">
                    {selectedItem.seller.firstName} {selectedItem.seller.lastName}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Listed {formatDistanceToNow(selectedItem.timestamp)}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 2 }}>
                <LocationOn fontSize="small" color="action" />
                <Typography variant="body2" color="text.secondary">
                  {selectedItem.location}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
                <Button variant="contained" fullWidth>
                  Message Seller
                </Button>
                <Button variant="outlined" fullWidth>
                  Save
                </Button>
              </Box>
            </DialogContent>
          </>
        )}
      </Dialog>
    </Layout>
  )
}
