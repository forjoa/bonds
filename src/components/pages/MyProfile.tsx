import { useEffect, useState, useRef } from 'react'
import Container from '../ui/Container'
import { getMyPosts } from '../../lib/getMyPosts'
import { useUser } from '../../context/AppContext'
import type { PostsHomeI, UserI } from '../../types/types'
import '../../styles/myprofile.css'
import PostCard from '../ui/PostCard'
import { ViewportSlot } from '@egjs/react-flicking'
import ProfileHeader from '../ui/ProfileHeader'

export default function MyProfile() {
  const [posts, setPosts] = useState<PostsHomeI[]>([])
  const [page, setPage] = useState<number>(1)
  const [loading, setLoading] = useState<boolean>(false)
  const [hasMore, setHasMore] = useState<boolean>(true)
  const { user } = useUser()
  const observer = useRef<IntersectionObserver | null>(null)

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
    const loadPosts = async () => {
      if ('userid' in user && !loading) {
        setLoading(true)
        const res = await getMyPosts(user.userid as number, page, 5)

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, page])

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

  return isUserI(user) ? (
    <Container>
      <ProfileHeader
        profilephoto={user.profilephoto as string}
        fullname={user.fullname}
        username={user.username}
        bio={user.bio}
        myprofile={true}
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
  ) : (
    <p>User not found or invalid user data</p>
  )
}
