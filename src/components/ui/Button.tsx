import { useState } from 'react'

export default function ButtonAdd() {
  const [count, setCount] = useState<number>(0)

  return (
    <button onClick={() => setCount((count) => count + 1)}>
      count is {count}
    </button>
  )
}
