import { useEffect, useState } from 'react'
import Container from '../ui/Container'
import { UserI } from '../../types/types'
import Avatar from '../ui/Avatar'

export default function Search() {
  const [allUsers, setAllUsers] = useState<UserI[]>()

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/users/`)
      .then((res) => res.json())
      .then((data) => setAllUsers(data))
  }, [])
  return (
    <Container>
      <h1>Search</h1>
      {allUsers &&
        allUsers.map((user, index) => (
          <a href={`/${user.username}`}>
            <Avatar profilephoto={user.profilephoto} username={user.username} />
            <p key={index}>{user.fullname}</p>
          </a>
        ))}
    </Container>
  )
}
