import { Card, CardHeader, CardContent, Skeleton, Box } from '@mui/material'

export default function PostSkeleton() {
  return (
    <Card sx={{ mb: 2 }}>
      <CardHeader
        avatar={<Skeleton variant="circular" width={40} height={40} />}
        title={<Skeleton variant="text" width="40%" />}
        subheader={<Skeleton variant="text" width="20%" />}
      />
      <CardContent>
        <Skeleton variant="text" />
        <Skeleton variant="text" />
        <Skeleton variant="text" width="60%" />
        <Skeleton variant="rectangular" height={200} sx={{ mt: 2 }} />
      </CardContent>
      <Box sx={{ p: 2, display: 'flex', gap: 2 }}>
        <Skeleton variant="text" width={80} />
        <Skeleton variant="text" width={80} />
        <Skeleton variant="text" width={80} />
      </Box>
    </Card>
  )
}
