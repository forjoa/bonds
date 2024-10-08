import { IconThumbUpFilled, IconMessageFilled } from '@tabler/icons-react'
import { NotificationInfoI } from '../../types/types'
import Avatar from './Avatar'

type NotificationType = 'like' | 'comment'

interface NotificationConfig {
  message: string
  icon: React.ReactNode
}

const notificationConfigs: Record<NotificationType, NotificationConfig> = {
  like: {
    message: 'just liked your post.',
    icon: <IconThumbUpFilled color='#3970B8' />,
  },
  comment: {
    message: 'just commented your post.',
    icon: <IconMessageFilled color='#38B763' />,
  },
}

export default function NotificationCard({
  notification,
}: {
  notification: NotificationInfoI
}) {
  const config = notificationConfigs[notification.type as NotificationType]

  const markAsRead = (id: number) => {
    fetch(`${import.meta.env.VITE_API_URL}/api/notifications/markAsRead`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    })
  }

  return (
    <a
      href={`/p/${notification.postid}`}
      className={notification.seen ? '' : 'not-seen'}
      onClick={() => markAsRead(notification.notificationid)}
    >
      {!notification.seen && <div className='seen'></div>}
      <Avatar
        profilephoto={notification.profilephoto}
        username={notification.username}
      />
      <div className='icon-type'>{config.icon}</div>
      <p>
        <strong>{notification.username}</strong> {config.message}
      </p>
    </a>
  )
}
