import { useEffect, useState, useRef } from 'react'
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
  const [page, setPage] = useState<number>(1)
  const [loading, setLoading] = useState<boolean>(false)
  const [hasMore, setHasMore] = useState<boolean>(true)
  const { user } = useUser()
  const observer = useRef<IntersectionObserver | null>(null)

  const lastPostRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const hasReloaded = sessionStorage.getItem('hasReloaded')

    if (!hasReloaded) {
      sessionStorage.setItem('hasReloaded', 'true')
      window.location.reload()
    }
  }, [])

  useEffect(() => {
    const loadPosts = async () => {
      if ('userid' in user && !loading) {
        setLoading(true)
        const res = await getHome(user.userid as number, page, 5)

        setPosts((prevPosts) => {
          const newPosts = res.filter(
            (post: PostsHomeI) =>
              !prevPosts.some((p) => p.postid === post.postid)
          )
          return [...prevPosts, ...newPosts]
        })

        setHasMore(res.length > 0)
        setLoading(false)
      }
    }

    loadPosts()
  }, [user, page, loading])

  useEffect(() => {
    if (observer.current) observer.current.disconnect()

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore && !loading) {
        setPage((prevPage) => prevPage + 1)
      }
    })

    if (lastPostRef.current) observer.current.observe(lastPostRef.current)
  }, [hasMore, loading])

  return (
    <Container>
      <h1>Home</h1>
      <aside className='posts-container'>
        {posts.map((post, index) => (
          <PostCard
            post={post}
            key={post.postid}
            ref={index === posts.length - 1 ? lastPostRef : null}
          />
        ))}
        {loading && <p>Loading more posts...</p>}
        <ViewportSlot>
          <div className='flicking-panel last-panel' />
        </ViewportSlot>
      </aside>
    </Container>
  )
}
