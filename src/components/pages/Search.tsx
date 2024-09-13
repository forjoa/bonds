import { ChangeEvent, useEffect, useState } from 'react'
import Container from '../ui/Container'
import { UserI } from '../../types/types'
import Avatar from '../ui/Avatar'
import '../../styles/search.css'

export default function Search() {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [allUsers, setAllUsers] = useState<UserI[]>([])
  const [filteredUsers, setFilteredUsers] = useState<UserI[]>([])

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/users/`)
      .then((res) => res.json())
      .then((data) => {
        setAllUsers(data)
        setFilteredUsers(data)
      })
  }, [])

  const filterUsers = (e: ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase()
    setSearchTerm(term)

    const filtered = allUsers.filter(
      (user) =>
        user.email.toLowerCase().includes(term) ||
        user.username.toLowerCase().includes(term) ||
        user.fullname.toLowerCase().includes(term)
    )
    setFilteredUsers(filtered)
  }

  return (
    <Container>
      <h1>Search</h1>
      <div className='searcher-container'>
        <input
          type='text'
          placeholder='Username | Fullname | Email'
          onChange={filterUsers}
          value={searchTerm}
        />
        {searchTerm && filteredUsers.map((user, index) => (
          <a href={`/${user.username}`} key={index}>
            <Avatar profilephoto={user.profilephoto} username={user.username} />
            <p>{user.fullname}</p>
          </a>
        ))}
      </div>
    </Container>
  )
}
