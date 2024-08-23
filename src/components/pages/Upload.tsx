import UploadFiles from '../cloudinary/PostPhotos'
import Container from '../ui/Container'
import '../../styles/uploadpost.css'
import { FormEvent, useState } from 'react'
import { IconX } from '@tabler/icons-react'
import { useUser } from '../../context/AppContext'
import { toast } from 'sonner'
import { useNavigate } from 'react-router'

export default function Upload() {
  const [files, setFiles] = useState<string[]>([])
  const [loading, setLoading] = useState<boolean | null>(null)
  const [content, setContent] = useState<string>('')
  const { user } = useUser()
  const navigate = useNavigate()

  const removeFile = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if ('userid' in user && (content !== '' || files.length !== 0)) {
      const result = await fetch(
        `${import.meta.env.VITE_API_URL}/api/posts/uploadPost`,
        {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userid: user.userid, content, files }),
        }
      ).then((res) => res.json())

      if (result.success) {
        toast.success(result.message)
        setTimeout(() => {
          navigate('/')
        }, 1500)
      } else {
        toast.error(result.message)
      }
    } else {
      toast.error('Complete the content in order to upload the post.')
    }
  }

  return (
    <Container>
      <h1>Upload</h1>
      <div className='upload-post-container'>
      <form className='upload-post' onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Your content here'
          className='content'
          onChange={(e) => setContent(e.target.value)}
        />
        <UploadFiles
          files={files}
          setFiles={setFiles}
          loading={loading}
          setLoading={setLoading}
        />
        {loading ? (
          <span className='subtitle'>Uploading...</span>
        ) : (
          <div className='preview-container'>
            {files.map((file, index) => (
              <div key={index} className='preview-item'>
                {file.includes('image') ? (
                  <img src={file} alt={`Preview ${index + 1}`} />
                ) : (
                  <video src={file} controls />
                )}
                <button
                  className='remove-btn'
                  onClick={() => removeFile(index)}
                >
                  <IconX size={18} />
                </button>
              </div>
            ))}
          </div>
        )}
        <input type='submit' value='Upload post' className='submit' />
      </form>
      </div>
    </Container>
  )
}
