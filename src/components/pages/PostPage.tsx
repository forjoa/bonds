import { useParams } from 'react-router'
import Container from '../ui/Container'

export default function PostPage() {
  const { id } = useParams()

  return (
    <Container>
      <p>{id}</p>
    </Container>
  )
}
