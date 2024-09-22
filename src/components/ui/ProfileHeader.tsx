import { ProfileHeaderProps } from '../../types/types'
import Avatar from './Avatar'

export default function ProfileHeader({
  profilephoto,
  fullname,
  username,
  bio,
}: ProfileHeaderProps) {
  return (
    <header className='profile-header'>
      <section className='image-container'>
        <Avatar profilephoto={profilephoto as string} username='' />
      </section>
      <section className='info-container'>
        <h3>{fullname}</h3>
        <p className='subtitle'>@{username}</p>
        <p>{bio}</p>
      </section>
    </header>
  )
}
