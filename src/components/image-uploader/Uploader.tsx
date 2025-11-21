import React, { useEffect, useState } from 'react'
import { t } from 'i18next'
import axios from 'axios'
import { useDropzone } from 'react-dropzone'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { FiUploadCloud, FiXCircle } from 'react-icons/fi'
// @ts-expect-error: pica has no type definition
import Pica from 'pica'

import useUtilsFunction from '@/hooks/useUtilsFunction'
import { notifyError, notifySuccess } from '@/utils/toast'
import Container from '@/components/image-uploader/Container'

interface UploaderProps {
  setImageUrl: React.Dispatch<React.SetStateAction<string>>
  imageUrl: string
  product?: boolean
  folder: string
  targetWidth?: number
  targetHeight?: number
}

interface PreviewFile extends File {
  preview: string
}

const Uploader: React.FC<UploaderProps> = ({
  setImageUrl,
  imageUrl,
  product,
  folder,
  targetWidth = 800,
  targetHeight = 800,
}) => {
  const [files, setFiles] = useState<PreviewFile[]>([])
  const [loading, setLoading] = useState(false)
  const [err, setError] = useState('')
  const pica = Pica()
  const { globalSetting } = useUtilsFunction()

  const { getRootProps, getInputProps, fileRejections } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp'],
    },
    multiple: !!product,
    maxSize: 5242880,
    maxFiles: globalSetting?.number_of_image_per_product || 2,
    onDrop: async (acceptedFiles) => {
      const resizedFiles = await Promise.all(
        acceptedFiles.map((file) => resizeImageToFixedDimensions(file, targetWidth, targetHeight))
      )
      setFiles(
        resizedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      )
    },
  })

  const resizeImageToFixedDimensions = async (file: File, width: number, height: number): Promise<File> => {
    const img = new Image()
    img.src = URL.createObjectURL(file)
    await img.decode()
    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    return new Promise((resolve) => {
      pica
        .resize(img, canvas, {
          unsharpAmount: 80,
          unsharpRadius: 0.6,
          unsharpThreshold: 2,
        })
        .then((result: HTMLCanvasElement) => pica.toBlob(result, file.type, 0.9))
        .then((blob: Blob) => {
          const resizedFile = new File([blob], file.name, { type: file.type })
          resolve(resizedFile)
        })
    })
  }

  useEffect(() => {
    if (fileRejections) {
      fileRejections.map(({ file, errors }) => (
        <li key={file.path}>
          {file.path} - {file.size} bytes
          <ul>
            {errors.map((e) => (
              <li key={e.code}>
                {e.code === 'too-many-files'
                  ? notifyError(`Maximum ${globalSetting?.number_of_image_per_product} Image Can be Upload!`)
                  : notifyError(e.message)}
              </li>
            ))}
          </ul>
        </li>
      ))
    }

    if (files) {
      files.forEach((file) => {
        if (
          product &&
          Array.isArray(imageUrl) &&
          imageUrl.length + files.length > (globalSetting?.number_of_image_per_product || 0)
        ) {
          return notifyError(`Maximum ${globalSetting?.number_of_image_per_product} Image Can be Upload!`)
        }

        setLoading(true)
        setError('Uploading....')

        const name = file.name.replaceAll(/\s/g, '')
        const public_id = name.substring(0, name.lastIndexOf('.'))

        const formData = new FormData()
        formData.append('file', file)
        formData.append('upload_preset', import.meta.env.VITE_APP_CLOUDINARY_UPLOAD_PRESET as string)
        formData.append('cloud_name', import.meta.env.VITE_APP_CLOUD_NAME as string)
        formData.append('folder', folder)
        formData.append('public_id', public_id)

        axios({
          url: import.meta.env.VITE_APP_CLOUDINARY_URL as string,
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          data: formData,
        })
          .then((res) => {
            notifySuccess(t('productsScreen.drawer.imageNotification'))
            setLoading(false)
            setImageUrl(res.data.secure_url)
          })
          .catch((err) => {
            console.error('err', err)
            notifyError(err.Message)
            setLoading(false)
          })
      })
    }
  }, [files])

  const thumbs = files.map((file) => (
    <div key={file.name}>
      <div>
        <img className="inline-flex border-2 border-gray-100 w-24 max-h-24" src={file.preview} alt={file.name} />
      </div>
    </div>
  ))

  useEffect(
    () => () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview))
    },
    [files]
  )

  const handleRemoveImage = async (_img: string) => {
    setFiles((prev) => prev.filter((f) => f.preview !== _img))
    try {
      setLoading(false)
      notifyError(t('common.imageDeleteMessage'))
      setImageUrl('')
    } catch (err: any) {
      console.error('err', err)
      notifyError(err.Message)
      setLoading(false)
    }
  }
  const imageList = product
    ? [...files.map((file) => file.preview), ...(Array.isArray(imageUrl) ? imageUrl : [])]
    : imageUrl
      ? [imageUrl]
      : []

  return (
    <div className="w-full text-center">
      <div
        className="border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-md cursor-pointer px-6 pt-5 pb-6"
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <span className="mx-auto flex justify-center">
          <FiUploadCloud className="text-3xl text-emerald-500" />
        </span>
        <p className="text-sm mt-2">{t('categoriesScreen.categoryDrawer.dragYourImage')}</p>
        <em className="text-xs text-gray-400">{t('categoriesScreen.categoryDrawer.imageFormat')}</em>
      </div>

      <div className="text-emerald-500">{loading && err}</div>
      <aside className="flex flex-row flex-wrap mt-4">
        {product ? (
          <DndProvider backend={HTML5Backend}>
            <Container setImageUrl={setImageUrl} imageUrl={imageList} handleRemoveImage={handleRemoveImage} />
          </DndProvider>
        ) : !product && imageUrl ? (
          <div className="relative">
            <img
              className="inline-flex border rounded-md border-gray-100 dark:border-gray-600 w-24 max-h-24 p-2"
              src={imageUrl as string}
              alt="product"
            />
            <button
              type="button"
              className="absolute top-0 right-0 text-red-500 focus:outline-none"
              onClick={() => handleRemoveImage(imageUrl as string)}
            >
              <FiXCircle />
            </button>
          </div>
        ) : (
          thumbs
        )}
      </aside>
    </div>
  )
}

export default Uploader
