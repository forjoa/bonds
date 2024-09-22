import { forwardRef, FormEvent, useState } from 'react'
import { useNavigate } from 'react-router'
import { CommentInPostI, PostsHomeI } from '../../types/types'
import Flicking from '@egjs/react-flicking'
import '@egjs/react-flicking/dist/flicking.css'
import {
  IconHeart,
  IconHeartFilled,
  IconTriangleInverted,
  IconTriangle,
} from '@tabler/icons-react'
import { useSocket } from '../../context/SocketContext'
import { useUser } from '../../context/AppContext'
import { toast } from 'sonner'
import Avatar from './Avatar'

interface PostCardProps {
  post: PostsHomeI
}

const PostCard = forwardRef<HTMLDivElement, PostCardProps>(({ post }, ref) => {
  const [showComments, setShowComments] = useState<boolean>(false)
  const [userLiked, setUserLiked] = useState<boolean>(post.userliked)
  const [likeCount, setLikeCount] = useState<number>(post.likecount)
  const [comments, setComments] = useState<CommentInPostI[]>(post.comments)
  const [comment, setComment] = useState<string>('')
  const navigate = useNavigate()
  const { socket } = useSocket()
  const { user } = useUser()

  const onLike = async () => {
    const newLikeState = !userLiked
    setUserLiked(newLikeState)
    setLikeCount(newLikeState ? Number(likeCount) + 1 : likeCount - 1)

    if ('userid' in user) {
      const result = await fetch(
        `${import.meta.env.VITE_API_URL}/api/posts/like`,
        {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userid: user.userid, postid: post.postid }),
        }
      ).then((res) => res.json())

      if (socket) {
        socket.emit('like', {
          postId: post.postid,
          userId: post.userid,
          targetUserId: post.userid,
        })
      }

      await fetch(
        `${import.meta.env.VITE_API_URL}/api/notifications/newNotification`,
        {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userid: post.userid,
            type: 'like',
            referenceid: result.referenceid,
          }),
        }
      )
    }
  }

  const onComment = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (comment.trim() !== '' && 'userid' in user) {
      const result = await fetch(
        `${import.meta.env.VITE_API_URL}/api/posts/comment`,
        {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userid: user.userid,
            postid: post.postid,
            content: comment.trim(),
          }),
        }
      ).then((res) => res.json())

      if (socket) {
        socket.emit('comment', {
          postId: post.postid,
          userId: post.userid,
          targetUserId: post.userid,
          comment,
        })
      }

      setComment('')

      if (result.success) {
        await fetch(
          `${import.meta.env.VITE_API_URL}/api/notifications/newNotification`,
          {
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userid: post.userid,
              type: 'comment',
              referenceid: result.referenceid,
            }),
          }
        )

        setComments([
          ...comments,
          { fullname: user.fullname, content: comment },
        ])
        toast.success(result.message)
      } else {
        toast.error(result.message)
      }
    } else {
      toast.error('You need to write a comment.')
    }
  }

  return (
    <section ref={ref}>
      {' '}
      <header>
        <Avatar profilephoto={post.profilephoto} username={post.username} />
        <nav onClick={() => navigate(`/u/${post.username}+${post.userid}`)}>
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
        <button className='like' onClick={onLike}>
          {userLiked ? (
            <IconHeartFilled color='#DD3C3C' stroke={1.5} />
          ) : (
            <IconHeart stroke={1.5} />
          )}
          {likeCount}
        </button>
        <form onSubmit={onComment}>
          <input
            type='text'
            placeholder='Comment here'
            onChange={(e) => setComment(e.target.value)}
          />
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
            {comments.map((comment, index) => (
              <aside key={index}>
                <div>
                  <p>{comment.fullname}</p>
                  <p>{comment.content}</p>
                </div>
                <small>
                  {comment.createdat &&
                    new Date(comment.createdat).toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: '2-digit',
                    })}
                </small>
              </aside>
            ))}
          </div>
        )}
      </footer>
    </section>
  )
})

export default PostCard
