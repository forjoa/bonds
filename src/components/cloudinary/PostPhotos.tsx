import { ChangeEvent, Dispatch, SetStateAction } from 'react'
import { toast } from 'sonner'
import { IconPaperclip } from '@tabler/icons-react'

interface UploadFilesProps {
  files: string[]
  setFiles: Dispatch<SetStateAction<string[]>>
  loading: boolean | null
  setLoading: Dispatch<SetStateAction<boolean | null>>
}

export default function UploadFiles({
  setFiles,
  loading,
  setLoading,
}: UploadFilesProps) {
  const presetname = import.meta.env.VITE_PRESET_NAME ?? 'bondsimages'

  const uploadFiles = async (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files
    if (!selectedFiles?.length) return

    const uploads: string[] = []
    setLoading(true)

    for (const file of Array.from(selectedFiles)) {
      const data = new FormData()
      data.append('file', file)
      data.append('upload_preset', presetname)

      try {
        const response = await fetch(import.meta.env.VITE_CLOUDINARY_ENDPOINT, {
          method: 'POST',
          body: data,
        })

        const uploadedFile = await response.json()
        uploads.push(uploadedFile.secure_url)
      } catch {
        toast.error('Error uploading file.')
        setLoading(false)
        return
      }
    }

    setFiles((prevFiles) => [...prevFiles, ...uploads])
    setLoading(false)
  }

  return (
    <div className='upload-post-container'>
      {!loading && (
        <>
          <label htmlFor='file-upload' className='custom-file-upload'>
            <input
              type='file'
              id='file-upload'
              name='file'
              multiple
              onChange={uploadFiles}
              accept='image/*,video/*'
            />
            <div>
              <IconPaperclip stroke={1.5} size={24} />
            </div>
          </label>
        </>
      )}
    </div>
  )
}
