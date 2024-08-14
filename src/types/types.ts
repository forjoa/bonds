import { Dispatch, SetStateAction } from 'react'

export interface UserI {
  bio: string
  createdat: Date
  email: string
  fullname: string
  phone: string
  profilephoto: string | null
  updatedat: Date
  userid: number
  username: string
}

export interface UserContextType {
  tokenIsValid: boolean
  user: UserI | object
  setUser: Dispatch<SetStateAction<UserI>>
  loading: boolean
}
