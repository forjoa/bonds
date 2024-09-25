import { IconPencil, IconUserPlus } from '@tabler/icons-react'
import { ProfileHeaderProps, UserI } from '../../types/types'
import Avatar from './Avatar'
import { useState } from 'react'
import Modal from './Modal'
import { useUser } from '../../context/AppContext'
import RegisterPhoto from '../cloudinary/RegisterPhoto'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'

const isUserI = (user: object): user is UserI => {
  return (
    user &&
    typeof user === 'object' &&
    'userid' in user &&
    'username' in user &&
    'fullname' in user &&
    'profilephoto' in user
  )
}

export default function ProfileHeader({
  profilephoto,
  fullname,
  username,
  bio,
  myprofile,
}: ProfileHeaderProps) {
  const [editProfileModal, setEditProfileModal] = useState<boolean>(false)

  const [emailC, setEmail] = useState<string>()
  const [fullnameC, setFullname] = useState<string>()
  const [usernameC, setUsername] = useState<string>()
  const [bioC, setBio] = useState<string>()
  const [passwordC, setPassword] = useState<string>()
  const [phoneC, setPhone] = useState<string>()
  const [imageC, setImage] = useState<UserI>({
    bio: '',
    email: '',
    fullname: '',
    phone: '',
    profilephoto: '',
    username: '',
  })

  const navigate = useNavigate()

  const { user } = useUser()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (isUserI(user)) {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/users/editProfile`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userid: user.userid,
              username:
                usernameC == null || username == '' ? user.username : usernameC,
              fullname:
                fullnameC == null || fullname == '' ? user.fullname : fullnameC,
              email: emailC == null || emailC == '' ? user.email : emailC,
              password:
                passwordC == null || passwordC == ''
                  ? user.password
                  : passwordC,
              phone: phoneC == null || phoneC == '' ? user.phone : phoneC,
              profilephoto:
                imageC.profilephoto == null || imageC.profilephoto == ''
                  ? user.profilephoto
                  : imageC.profilephoto,
              bio: bioC == null || bioC == '' ? user.bio : bioC,
            }),
          }
        )
        const result = await response.json()

        if (!result.success) {
          toast.error(result.message)
        } else {
          navigate('/login')
        }
      } catch {
        toast.error('Error during registration.')
      }
    }
  }
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
      {editProfileModal && isUserI(user) && (
        <Modal>
          <span onClick={() => setEditProfileModal(false)}>&times;</span>
          <h1>Edit profile</h1>
          <span className='subtitle'>Edit your profile information here</span>
          <form className='login-form' onSubmit={handleSubmit}>
            <input
              type='text'
              placeholder='Username'
              value={user?.username as string}
              onChange={(e) => setUsername(e.target.value)}
              disabled
            />
            <input
              type='text'
              placeholder='Full name'
              value={user?.fullname as string}
              onChange={(e) => setFullname(e.target.value)}
            />
            <input
              type='text'
              placeholder='Bio'
              value={user?.bio as string}
              onChange={(e) => setBio(e.target.value)}
            />
            <input
              type='text'
              placeholder='Phone'
              value={user.phone as string}
              onChange={(e) => setPhone(e.target.value)}
            />
            <input
              type='email'
              placeholder='Email'
              value={user?.email as string}
              onChange={(e) => setEmail(e.target.value)}
              disabled
            />
            <span className='subtitle'>
              Set new password just in case you want to change it*
            </span>
            <input
              type='password'
              placeholder='Set new password'
              value={passwordC}
              onChange={(e) => setPassword(e.target.value)}
            />
            <img
              src={user.profilephoto as string}
              alt='Profile photo'
              className='profile-photo-update'
            />
            <RegisterPhoto setUser={setImage} />

            <input type='submit' value='Update' />
          </form>
        </Modal>
      )}
    </>
  )
}
