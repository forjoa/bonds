import { useEffect, useState } from 'react'
import Container from '../ui/Container'
import { useUser } from '../../context/AppContext'
import { NotificationInfoI } from '../../types/types'
import NotificationCard from '../ui/NotificationCard'
import '../../styles/notifications.css'
import { IconBook } from '@tabler/icons-react'
import { getNotifications } from '../../lib/getNotifications'

export default function Notifications() {
  const [notifications, setNotifications] = useState<NotificationInfoI[]>([])
  const { user } = useUser()

  useEffect(() => {
    if ('userid' in user) {
      getNotifications(user.userid as number).then((n) => setNotifications(n))
    }
  }, [user])

  const markAllAsRead = async () => {
    if ('userid' in user) {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/notifications/markAsReadAll`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: user.userid }),
          }
        )

        if (response.ok) {
          setNotifications((prevNotifications) =>
            prevNotifications.map((notification) => ({
              ...notification,
              seen: true,
            }))
          )
        } else {
          console.error('Failed to mark notifications as read')
        }
      } catch (error) {
        console.error('Error marking notifications as read:', error)
      }
    }
  }

  return (
    <Container>
      <h1>Notifications</h1>
      <section className='notifications-container'>
        <div>
          <button onClick={markAllAsRead}>
            <IconBook stroke={1.5} />
            Mark all as read
          </button>
        </div>
        {notifications.map((notification, index) => (
          <NotificationCard key={index} notification={notification} />
        ))}
      </section>
    </Container>
  )
}
