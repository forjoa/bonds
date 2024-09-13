import { IconThumbUpFilled, IconMessageFilled } from '@tabler/icons-react'
import { NotificationInfoI } from '../../types/types'

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

  return (
    <a
      href={`/p/${notification.postid}`}
      className={notification.seen ? '' : 'not-seen'}
    >
      {!notification.seen && <div className='seen'></div>}
      <img
        src={notification.profilephoto}
        alt={`${notification.username} profile photo`}
      />
      <div className='icon-type'>{config.icon}</div>
      <p>
        <strong>{notification.username}</strong> {config.message}
      </p>
    </a>
  )
}
