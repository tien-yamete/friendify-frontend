import { useParams } from 'react-router-dom'
import { Box, Card, CardContent, Typography, Divider } from '@mui/material'
import Layout from '@/components/Layout'
import PostCard from '@/components/PostCard'
import CommentList from '@/components/CommentList'
import PostSkeleton from '@/components/PostSkeleton'
import { usePost } from '@/hooks/useApi'

export default function PostDetail() {
  const { id } = useParams()
  const { data: post, isLoading } = usePost(id)

  if (isLoading) {
    return (
      <Layout>
        <PostSkeleton />
      </Layout>
    )
  }

  if (!post) {
    return (
      <Layout>
        <Card>
          <CardContent>
            <Typography>Post not found</Typography>
          </CardContent>
        </Card>
      </Layout>
    )
  }

  return (
    <Layout>
      <PostCard post={post} />
      
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Comments
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <CommentList postId={id} />
        </CardContent>
      </Card>
    </Layout>
  )
}
