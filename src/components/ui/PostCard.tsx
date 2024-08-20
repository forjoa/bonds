import { useNavigate } from 'react-router'
import { PostsHomeI } from '../../types/types'
import Flicking from '@egjs/react-flicking'
import '@egjs/react-flicking/dist/flicking.css'
import {
  IconHeart,
  IconHeartFilled,
  IconTriangleInverted,
  IconTriangle,
} from '@tabler/icons-react'
import { useState } from 'react'
import { useSocket } from '../../context/SocketContext'
import { useUser } from '../../context/AppContext'

export default function PostCard({ post }: { post: PostsHomeI }) {
  const [showComments, setShowComments] = useState<boolean>(false)
  const [userLiked, setUserLiked] = useState<boolean>(post.userliked)
  const [likeCount, setLikeCount] = useState<number>(post.likecount)
  const navigate = useNavigate()
  const { socket } = useSocket()
  const { user } = useUser()

  const handleLike = async () => {
    const newLikeState = !userLiked
    setUserLiked(newLikeState)
    setLikeCount(newLikeState ? likeCount + 1 : likeCount - 1)

    if (socket) {
      socket.emit('like', {
        postId: post.postid,
        userId: post.userid,
        targetUserId: post.userid,
      })
    }

    if ('userid' in user) {
      await fetch(`${import.meta.env.VITE_API_URL}/api/posts/like`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userid: user.userid, postid: post.postid }),
      })
    }
  }

  return (
    <section>
      <header>
        {post.profilephoto && <img src={post.profilephoto} alt='User photo' />}
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
        </Flicking>
      </main>
      <footer>
        <button className='like' onClick={handleLike}>
          {userLiked ? (
            <IconHeartFilled color='#DD3C3C' stroke={1.5} />
          ) : (
            <IconHeart stroke={1.5} />
          )}
          {likeCount}
        </button>
        <form>
          <input type='text' placeholder='Comment here' />
          <input type='submit' value='Send' />
        </form>
        <button
          className='comments-options'
          onClick={() => setShowComments(!showComments)}
        >
          {showComments ? (
            <>
              <IconTriangle stroke={1.5} color='#3D63DD' size={16} />
              Hide comments
            </>
          ) : (
            <>
              <IconTriangleInverted stroke={1.5} color='#3D63DD' size={16} />
              Show comments
            </>
          )}
        </button>
        {showComments && (
          <div className='comments'>
            {post.comments.map((comment, index) => (
              <aside key={index}>
                <p>{comment.fullname}</p>
                <p>{comment.content}</p>
              </aside>
            ))}
          </div>
        )}
      </footer>
    </section>
  )
}
