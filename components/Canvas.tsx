'use client'

import { useEffect } from 'react'

interface CanvasProps {
  imageHeight: number
  imageWidth: number
  canvasRef: any
  imageRef: any
  imageSrc: string
  isQuality: boolean
  setUrlToDownload: any
  imageType: string
}

export default function Canvas({
  imageHeight,
  imageWidth,
  canvasRef,
  imageRef,
  imageSrc,
  setUrlToDownload,
  isQuality,
  imageType,
}: CanvasProps) {
  function draw(ctx: any) {
    ctx.drawImage(imageRef.current, 0, 0, imageWidth, imageHeight)

    setUrlToDownload(
      canvasRef.current
        ? canvasRef.current.toDataURL(
            imageType === 'image/jpeg' ? imageType : 'image/png',
            isQuality ? 0.7 : 1
          )
        : ''
    )
  }

  useEffect(() => {
    const canvas = canvasRef.current
    canvas.width = imageWidth
    canvas.height = imageHeight

    const context = canvas.getContext('2d')
    draw(context)
    console.log(imageType)
  }, [imageWidth, imageHeight, isQuality])

  return <canvas ref={canvasRef} />
}
