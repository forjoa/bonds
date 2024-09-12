import { useParams } from 'react-router'
import Container from '../ui/Container'
import { useEffect, useState } from 'react'
import { useUser } from '../../context/AppContext'
import { PostsHomeI, UserI } from '../../types/types'
import PostCard from '../ui/PostCard'
import '../../styles/home.css'

export default function PostPage() {
  const [post, setPost] = useState<PostsHomeI | undefined>(undefined)
  const { id } = useParams()
  const { user } = useUser()

  const isUserI = (user: object): user is UserI => {
    return (
      user &&
      typeof user === 'object' &&
      'userid' in user &&
      'username' in user &&
      'fullname' in user &&
      'profilephoto' in user
    )
  }

  useEffect(() => {
    if ('userid' in user) {
      fetch(`${import.meta.env.VITE_API_URL}/api/posts/post`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userid: user.userid, postid: id }),
      })
        .then((res) => res.json())
        .then((result) => setPost(result))
    }
  }, [user, id])

  return (
    <Container>
      <div className='posts-container'>
        {isUserI(user) && post != undefined && (
          <PostCard post={post as PostsHomeI} />
        )}
      </div>
    </Container>
  )
}
