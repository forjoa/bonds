import { IconPencil, IconUserPlus } from '@tabler/icons-react'
import { ProfileHeaderProps } from '../../types/types'
import Avatar from './Avatar'
import { useState } from 'react'
import Modal from './Modal'

export default function ProfileHeader({
  profilephoto,
  fullname,
  username,
  bio,
  myprofile,
}: ProfileHeaderProps) {
  const [editProfileModal, setEditProfileModal] = useState<boolean>(false)
  return (
    <>
      <header className='profile-header'>
        <div>
          <section className='image-container'>
            <Avatar profilephoto={profilephoto as string} username='' />
          </section>
          <section className='info-container'>
            <h3>{fullname}</h3>
            <p className='subtitle'>@{username}</p>
            <p>{bio}</p>
          </section>
        </div>
        {myprofile ? (
          <button onClick={() => setEditProfileModal(true)}>
            <IconPencil stroke={1.5} /> Edit profile
          </button>
        ) : (
          <button>
            <IconUserPlus stroke={1.5} /> Send friend request
          </button>
        )}
      </header>
      {editProfileModal && (
        <Modal>
          <span onClick={() => setEditProfileModal(false)}>&times;</span>
          <h1>Edit profile</h1>
          <span className='subtitle'>Edit your profile information here</span>
        </Modal>
      )}
    </>
  )
}
