import { useEffect, useState } from 'react'
import Container from '../ui/Container'
import { useUser } from '../../context/AppContext'
import { NotificationInfoI } from '../../types/types'
import NotificationCard from '../ui/NotificationCard'
import '../../styles/notifications.css'

export default function Notifications() {
  const [notifications, setNotifications] = useState<NotificationInfoI[]>([])
  const { user } = useUser()

  useEffect(() => {
    if ('userid' in user) {
      fetch(
        `${import.meta.env.VITE_API_URL}/api/notifications/getNotifications`,
        {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: user.userid }),
        }
      )
        .then((res) => res.json())
        .then((data) => {
          setNotifications(data.reverse())
        })
    }
  }, [user])

  return (
    <Container>
      <h1>Notifications</h1>
      <section className='notifications-container'>
        {notifications &&
          notifications.map((notification, index) => (
            <NotificationCard notification={notification} key={index} />
          ))}
      </section>
    </Container>
  )
}
