import { ReactNode } from 'react'
import '../../styles/modal.css'

interface ModalProps {
  children: ReactNode
}
export default function Modal({ children }: ModalProps) {
  return <main className='modal'>{children}</main>
}
