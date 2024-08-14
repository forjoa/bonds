import { io } from 'socket.io-client'

const socket = io(import.meta.env.VITE_SOCKET_URL, {
  autoConnect: false,
  auth: {
    token: localStorage.getItem('userbonds'),
  },
})

export default socket
