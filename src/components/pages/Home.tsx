import { useState } from 'react'

export default function Home() {
  const [count, setCount] = useState<number>(0)

  return (
    <>
      <h1>This is bonds</h1>
      <div className='card'>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </>
  )
}
