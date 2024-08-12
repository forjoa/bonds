import Modal from '../ui/Modal'
import '../../styles/login.css'

export default function Login() {
  return (
    <Modal>
      <h1>Login</h1>
      <span className='subtitle'>
        Welcome back to your favorite social media!
      </span>
      <form className='login-form'>
        <input type='email' placeholder='Email' />
        <input type='password' />

        <input type='submit' value='Send' />
      </form>
    </Modal>
  )
}
