'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import styles from './Compressor.module.css'

import UploadBox from './UploadBox'
import SettingsBox from './SettingsBox'
import Canvas from './Canvas'

const iconUrl = 'https://cdn-icons-png.flaticon.com/512/685/685686.png'

export default function Compressor() {
  const [aspectRatio, setAspectRatio] = useState(1)
  const [imageSrc, setImageSrc] = useState(iconUrl)
  const [imageWidth, setImageWidth] = useState(0)
  const [imageHeight, setImageHeight] = useState(0)
  const [urlToDownload, setUrlToDownload] = useState('')
  const [isDropped, setIsDropped] = useState(false)
  const [isRatio, setIsRatio] = useState(true)
  const [isQuality, setIsQuality] = useState(false)
  const [imageType, setImageType] = useState('')

  const inputRef = useRef<HTMLInputElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (imageSrc !== iconUrl) {
      setIsDropped(true)
    }
  }, [imageSrc])

  function handleClickUpload() {
    if (inputRef.current != null) {
      inputRef.current.click()
    }
  }

  function handleChange(e: any) {
    let file

    if (e.type === 'drop') {
      file = e.dataTransfer.files[0]
    } else {
      file = e.target.files[0]

      if (!file) {
        return
      }
    }

    setImageType(file.type)
    setImageSrc(URL.createObjectURL(file))
  }

  function handleLoadingComplete(e: any) {
    setImageWidth(e.target.naturalWidth)
    setImageHeight(e.target.naturalHeight)
    setAspectRatio(e.target.naturalWidth / e.target.naturalHeight)
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.name === 'width') {
      setImageWidth(parseInt(e.target.value))
      if (isRatio) {
        setImageHeight(Math.round(parseInt(e.target.value) / aspectRatio))
      }
    }
    if (e.target.name === 'height') {
      setImageHeight(parseInt(e.target.value))
      if (isRatio) {
        setImageWidth(Math.round(parseInt(e.target.value) * aspectRatio))
      }
    }
  }

  function handleClick(e: any) {
    if (isDropped) {
      e.target.download = new Date().getTime()
    }
  }

  function handleCheckboxChange(e: any) {
    if (e.target.name === 'ratio') {
      setIsRatio(e.target.checked)
    }
    if (e.target.name === 'quality') {
      setIsQuality(e.target.checked)
    }
  }

  return (
    <div className={styles.card}>
      <UploadBox
        styles={styles}
        inputRef={inputRef}
        imageRef={imageRef}
        imageSrc={imageSrc}
        handleChange={handleChange}
        handleClickUpload={handleClickUpload}
        handleLoadingComplete={handleLoadingComplete}
        handleDrop={handleChange}
        isDropped={isDropped}
      />

      {isDropped ? (
        <>
          <SettingsBox
            styles={styles}
            imageWidth={imageWidth}
            imageHeight={imageHeight}
            isRatio={isRatio}
            isQuality={isQuality}
            handleInputChange={handleInputChange}
            handleCheckboxChange={handleCheckboxChange}
          />
          <Canvas
            imageRef={imageRef}
            imageSrc={imageSrc}
            canvasRef={canvasRef}
            imageWidth={imageWidth}
            imageHeight={imageHeight}
            setUrlToDownload={setUrlToDownload}
            isQuality={isQuality}
            imageType={imageType}
          />

          <Link
            className={styles.button}
            onClick={handleClick}
            href={urlToDownload}
            target="_blank"
          >
            Скачать
          </Link>
        </>
      ) : (
        <></>
      )}
    </div>
  )
}
