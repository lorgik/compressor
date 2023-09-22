'use client'

import { Props } from '@/types/interfaces'
import Image from 'next/image'

interface UploadBoxProps extends Props {
  imageSrc: string
  inputRef: any
  imageRef: any
  handleChange: (e: React.FormEvent<HTMLInputElement>) => void
  handleClickUpload: () => void
  handleLoadingComplete: any
  handleDrop: any
  isDropped: boolean
}

export default function UploadBox({
  styles,
  inputRef,
  imageRef,
  imageSrc,
  handleChange,
  handleClickUpload,
  isDropped,
  handleLoadingComplete,
}: UploadBoxProps) {
  const handleDragEnter = (e: any) => {
    e.preventDefault()
    e.stopPropagation()
    console.log('ENTER')
  }
  const handleDragLeave = (e: any) => {
    e.preventDefault()
    e.stopPropagation()
    console.log('LEAVE')
  }
  const handleDragOver = (e: any) => {
    e.preventDefault()
    e.stopPropagation()
    console.log('OVER')
  }
  const handleDrop = (e: any) => {
    e.preventDefault()
    e.stopPropagation()
    handleChange(e)
  }

  return (
    <div
      className={styles.uploadBox}
      onClick={handleClickUpload}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <img
        className={styles.icon}
        src={imageSrc}
        alt="upload-icon"
        width="100"
        height="100"
        ref={imageRef}
        onLoad={handleLoadingComplete}
        style={isDropped ? { objectPosition: '0' } : { objectPosition: '10px' }}
      />
      <p className={styles.title}>Дропай сюда картинку</p>
      <input
        className={styles.button}
        onChange={handleChange}
        ref={inputRef}
        type="file"
        accept="image/*"
        hidden
      />
    </div>
  )
}
