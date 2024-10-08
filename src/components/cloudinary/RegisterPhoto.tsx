import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react'
import { UserI } from '../../types/types'
import { toast } from 'sonner'
import '../../styles/registerphoto.css'
import { IconUpload } from '@tabler/icons-react'
import Loading from '../ui/Loading'

interface RegisterPhotoI {
  setUser: Dispatch<SetStateAction<UserI>>
}

export default function RegisterPhoto({ setUser }: RegisterPhotoI) {
  const presetname = import.meta.env.VITE_PRESET_NAME ?? 'bondsimages'

  const [image, setImage] = useState<string>('')
  const [loading, setLoading] = useState<boolean | null>(null)

  const uploadImage = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files?.length) return

    const data = new FormData()
    data.append('file', files[0])
    data.append('upload_preset', presetname)

    setLoading(true)

    try {
      const response = await fetch(import.meta.env.VITE_CLOUDINARY_ENDPOINT, {
        method: 'POST',
        body: data,
      })

      const file = await response.json()
      setImage(file.secure_url)
      setUser((prevUser: UserI) => ({
        ...prevUser,
        profilephoto: file.secure_url,
      }))
    } catch {
      toast.error('Error uploading image.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='upload-photo-container'>
      <span>Profile photo</span>

      {!image && (
        <>
          <input
            type='file'
            id='file-upload'
            name='file'
            onChange={uploadImage}
          />
          <label htmlFor='file-upload' className='custom-file-upload'>
            <IconUpload stroke={1.5} />
          </label>
        </>
      )}

      {loading ? (
        <Loading />
      ) : (
        image && <img src={image} alt='Uploaded image' />
      )}
    </div>
  )
}
