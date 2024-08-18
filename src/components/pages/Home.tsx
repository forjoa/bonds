import { useEffect, useState } from 'react'
import Container from '../ui/Container'
import { getHome } from '../../lib/getHome'
import { useUser } from '../../context/AppContext'
import { PostsHomeI } from '../../types/types'

export default function Home() {
  const [posts, setPosts] = useState<PostsHomeI[]>([])
  const { user } = useUser()

  useEffect(() => {
    if ('userid' in user) {
      getHome(user.userid as number).then((res) => {
        setPosts(res)
      })
    }
  }, [user])

  return (
    <Container>
      <h1>Home</h1>
      {posts.map((post, index) => (
        <div key={index}>
          <p>{post.content}</p>
        </div>
      ))}
    </Container>
  )
}
