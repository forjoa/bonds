import { useUser } from '../../context/AppContext'
import Container from '../ui/Container'
import type { UserI } from '../../types/types'
import '../../styles/myprofile.css'

export default function MyProfile() {
  const { user } = useUser()

  const isUserValid = (user: UserI | object): user is UserI => {
    return (
      user &&
      typeof user === 'object' &&
      'fullname' in user &&
      'username' in user &&
      'profilephoto' in user
    )
  }

  return isUserValid(user) ? (
    <Container>
      <header className='profile-header'>
        <section className='image-container'>
          <img src={user.profilephoto as string} alt='User profile photo' />
        </section>
        <section className='info-container'>
          <h3>{user.fullname}</h3>
          <p className='subtitle'>@{user.username}</p>
          <p>{user.bio}</p>
        </section>
      </header>
    </Container>
  ) : (
    <p>User not found or invalid.</p>
  )
}
