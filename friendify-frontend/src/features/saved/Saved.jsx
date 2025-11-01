import { Card, CardContent, Typography, Box } from '@mui/material'
import { Bookmark } from '@mui/icons-material'
import Layout from '@/components/Layout'
import EmptyState from '@/components/EmptyState'
import PostCard from '@/components/PostCard'
import { useSaved } from '@/hooks/useApi'
import { formatDistanceToNow } from '@/utils/dateUtils'

export default function Saved() {
  const { data: savedItems } = useSaved()

  return (
    <Layout>
      <Card sx={{ mb: 2, p: 2 }}>
        <Typography variant="h5" fontWeight="bold">
          Saved Items
        </Typography>
      </Card>

      {!savedItems || savedItems.length === 0 ? (
        <EmptyState
          icon={Bookmark}
          title="No saved items"
          description="Save posts and items you want to see later"
        />
      ) : (
        <Box>
          {savedItems.map((saved) => (
            <Box key={saved.id} sx={{ mb: 2 }}>
              {saved.type === 'post' && <PostCard post={saved.item} />}
              {saved.type === 'marketplace' && (
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                      <Box
                        component="img"
                        src={saved.item.image}
                        sx={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 1 }}
                      />
                      <Box>
                        <Typography variant="h6" fontWeight="bold">
                          ${saved.item.price}
                        </Typography>
                        <Typography variant="body1">{saved.item.title}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          Saved {formatDistanceToNow(saved.timestamp)}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              )}
            </Box>
          ))}
        </Box>
      )}
    </Layout>
  )
}
