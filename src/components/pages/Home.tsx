import { useEffect, useState } from 'react'
import Container from '../ui/Container'
import { getHome } from '../../lib/getHome'
import { useUser } from '../../context/AppContext'
import { PostsHomeI } from '../../types/types'
import '../../styles/home.css'
import '@egjs/react-flicking/dist/flicking.css'
import PostCard from '../ui/PostCard'
import { ViewportSlot } from '@egjs/react-flicking'

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
      <aside className='posts-container'>
        {posts.map((post, index) => (
          <PostCard post={post} key={index} />
        ))}
        <ViewportSlot>
          <div className='flicking-panel last-panel' />
        </ViewportSlot>
      </aside>
    </Container>
  )
}
