import Modal from '../ui/Modal'
import '../../styles/login.css'
import { FormEvent, useState } from 'react'
import { toast } from 'sonner'
import { useNavigate } from 'react-router'

export default function Login() {
  const [email, setEmail] = useState<string>()
  const [password, setPassword] = useState<string>()
  const navigate = useNavigate()

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    try {
      const result = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/login`,
        {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        }
      ).then((res) => res.json())

      if (!result.success) {
        toast.error(result.message)
      } else {
        localStorage.setItem('userbonds', result.token)
        navigate('/')
      }
    } catch (e) {
      toast.error(e as string)
    }
  }

  return (
    <Modal>
      <h1>Login</h1>
      <span className='subtitle'>
        Welcome back to your favorite social media!
      </span>
      <form className='login-form' onSubmit={handleSubmit}>
        <input
          type='email'
          placeholder='Email'
          onChange={(e) => setEmail(e.target.value)}
        />
        <input type='password' onChange={(e) => setPassword(e.target.value)} />

        <input type='submit' value='Send' />
      </form>
    </Modal>
  )
}
