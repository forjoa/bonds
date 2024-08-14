import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react'
import socket from '../socket.ts'
import { MessageI, NotificationI, SocketContextType } from '../types/types.ts'

const SocketContext = createContext<SocketContextType | undefined>(undefined)

export const SocketProvider = ({ children }: PropsWithChildren) => {
  const [notifications, setNotifications] = useState<NotificationI[]>([])
  const [messages, setMessages] = useState<MessageI[]>([])

  useEffect(() => {
    socket.connect()

    socket.on('notification', (notification) => {
      setNotifications((prev) => [...prev, notification])
    })

    socket.on('chat message', (message) => {
      setMessages((prev) => [...prev, message])
    })

    socket.on('connect', () => {
      console.log('Conectado al servidor de sockets')
    })

    socket.on('disconnect', () => {
      console.log('Desconectado del servidor de sockets')
    })

    return () => {
      socket.off('notification')
      socket.off('chat message')
      socket.off('connect')
      socket.off('disconnect')
      socket.disconnect()
    }
  }, [])

  const sendMessage = (room: string, msg: string) => {
    socket.emit('chat message', { room, msg })
  }

  const joinRoom = (room: string) => {
    socket.emit('joinRoom', room)
  }

  return (
    <SocketContext.Provider
      value={{ notifications, messages, sendMessage, joinRoom }}
    >
      {children}
    </SocketContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useSocket = () => {
  const context = useContext(SocketContext)
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider')
  }
  return context
}
