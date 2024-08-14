import { PropsWithChildren } from 'react'
import '../../styles/modal.css'

export default function Modal({ children }: PropsWithChildren) {
  return (
    <main className='modal-layout'>
      <section className='modal'>{children}</section>
    </main>
  )
}
