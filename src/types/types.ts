import { Dispatch, SetStateAction } from 'react'

export interface UserI {
  bio: string
  createdat?: Date
  email: string
  password?: string
  fullname: string
  phone: string
  profilephoto: string | null
  updatedat?: Date
  userid?: number
  username: string
}

export interface NotificationI {
  notificationid: number
  userid: number
  type: string
  referenceid: number
  seen: boolean
  createdat: Date
}

export interface MessageI {
  messageid: number
  userid: number
  conversationid: number
  content: string
  createdat: Date
}

export interface UserContextType {
  tokenIsValid: boolean
  user: UserI | object
  setUser: Dispatch<SetStateAction<UserI>>
  loading: boolean
}

export interface SocketContextType {
  notifications: NotificationI[]
  messages: MessageI[]
  sendMessage: (room: string, msg: string) => void
  joinRoom: (room: string) => void
}

export interface PostsHomeI {
  postid: 1
  content: string
  createdat: Date
  username: string
  userid: number
  photos: string[]
}
