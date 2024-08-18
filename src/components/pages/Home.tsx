import { useEffect, useState } from 'react'
import Container from '../ui/Container'
import { getHome } from '../../lib/getHome'
import { useUser } from '../../context/AppContext'
import { PostsHomeI } from '../../types/types'
import { useNavigate } from 'react-router'
import '../../styles/home.css'
import Flicking from '@egjs/react-flicking'
import '@egjs/react-flicking/dist/flicking.css'
import { ViewportSlot } from '@egjs/react-flicking'

export default function Home() {
  const [posts, setPosts] = useState<PostsHomeI[]>([])
  const { user } = useUser()
  const navigate = useNavigate()

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
          <section key={index}>
            <header>
              {post.profilephoto && (
                <img src={post.profilephoto} alt='User photo' />
              )}
              <nav onClick={() => navigate(`/users/${post.userid}`)}>
                <p>{post.fullname}</p>
                <span className='subtitle'>@{post.username}</span>
              </nav>
            </header>
            <main>
              <p>{post.content}</p>
              <Flicking
                align='prev'
                circular={false}
                bounce={200}
                bound={true}
                duration={500}
                moveType='snap'
                preventDefaultOnDrag={true}
                className='flicking-wrapper'
              >
                {post.photos.map((url, index) => (
                  <img
                    src={url}
                    alt='Post photo'
                    key={index}
                    className='flicking-panel'
                  />
                ))}
                <ViewportSlot>
                  <div className='flicking-panel last-panel' />
                </ViewportSlot>
              </Flicking>
            </main>
          </section>
        ))}
      </aside>
    </Container>
  )
}
