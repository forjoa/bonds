import { useParams } from 'react-router-dom'
import Container from '../ui/Container'
import ProfileHeader from '../ui/ProfileHeader'
import { useEffect, useRef, useState } from 'react'
import { getUserInfo } from '../../lib/getUserInfo'
import { PostsHomeI, UserI } from '../../types/types'
import PostCard from '../ui/PostCard'
import { ViewportSlot } from '@egjs/react-flicking'

export default function UserProfile() {
  const [posts, setPosts] = useState<PostsHomeI[]>([])
  const [page, setPage] = useState<number>(1)
  const [loading, setLoading] = useState<boolean>(false)
  const [hasMore, setHasMore] = useState<boolean>(true)
  const observer = useRef<IntersectionObserver | null>(null)
  const { ui } = useParams()
  const username = ui?.split('+')[0]
  const userid = ui?.split('+')[1]
  const [user, setUser] = useState<UserI | null>(null)

  useEffect(() => {
    if (ui) {
      const getAllUser = async () => {
        setLoading(true)
        const res = await getUserInfo(parseInt(userid as string), page, 5)
        setPosts(res.posts)
        setUser(res.user)

        setHasMore(res.length > 0)
        setLoading(false)
      }

      getAllUser()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ui])

  const lastPostRef = useRef<HTMLDivElement | null>(null)

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
      <ProfileHeader
        profilephoto={user?.profilephoto as string}
        fullname={user?.fullname as string}
        username={username as string}
        bio={user?.bio as string}
        myprofile={false}
      />
      <aside className='posts-container'>
        <h1>Posts</h1>
        {posts.map((post, index) => (
          <PostCard
            post={post}
            key={index}
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
