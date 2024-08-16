import { ChangeEvent, FormEvent, useState } from 'react'
import Modal from '../ui/Modal'
import { useNavigate } from 'react-router'
import { UserI } from '../../types/types'
import RegisterPhoto from '../cloudinary/RegisterPhoto'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'

export default function Register() {
  const [user, setUser] = useState<UserI>({
    username: '',
    fullname: '',
    email: '',
    password: '',
    phone: '',
    profilephoto: '',
    bio: '',
  })

  const navigate = useNavigate()

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const isFormComplete = Object.values(user).every((value) => value !== '')

    if (isFormComplete) {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/users/register`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
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
    } else {
      toast.error('Complete all the form, please.')
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }))
  }

  return (
    <Modal>
      <h1>Sign up</h1>
      <span className='subtitle'>Thanks for giving us an opportunity</span>
      <form className='login-form' onSubmit={handleSubmit}>
        <input
          type='text'
          name='username'
          placeholder='Username'
          value={user.username}
          onChange={handleChange}
        />
        <input
          type='text'
          name='fullname'
          placeholder='Full Name'
          value={user.fullname}
          onChange={handleChange}
        />
        <input
          type='email'
          name='email'
          placeholder='Email'
          value={user.email}
          onChange={handleChange}
        />
        <input
          type='password'
          name='password'
          placeholder='Password'
          value={user.password}
          onChange={handleChange}
        />
        <input
          type='text'
          name='phone'
          placeholder='Phone'
          value={user.phone}
          onChange={handleChange}
        />
        <RegisterPhoto setUser={setUser} />
        <input
          type='text'
          name='bio'
          placeholder='Bio'
          value={user.bio}
          onChange={handleChange}
        />

        <input type='submit' value='Send' />
      </form>
      <Link to='/login' className='link-form'>
        Sign in
      </Link>
    </Modal>
  )
}
