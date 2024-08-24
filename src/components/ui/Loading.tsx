import '../../styles/loading.css'
import { Comment } from 'react-loader-spinner'

export default function Loading() {
  return (
    <div className='loading'>
      <Comment
        visible={true}
        height='150'
        width='150'
        ariaLabel='comment-loading'
        wrapperStyle={{}}
        wrapperClass='comment-wrapper'
        color='#000'
        backgroundColor='#999'
      />
    </div>
  )
}
