import { ChangeEvent } from 'react'

import { Config } from '../data'

export const handleScreenshot = (canvasEl: HTMLCanvasElement | null) => {
  if (!canvasEl) return
  const link = document.createElement('a')
  link.setAttribute('download', 'canvas.png')
  link.setAttribute(
    'href',
    canvasEl.toDataURL('image/png').replace('image/png', 'image/octet-stream')
  )
  link.click()
}

export const createImageUrl = (buffer: ArrayBuffer, type: string) => {
  const blob = new Blob([buffer], { type })
  const urlCreator = window.URL || window.webkitURL
  const imageUrl = urlCreator.createObjectURL(blob)
  return imageUrl
}

export const getTexturePath = async (e: ChangeEvent<HTMLInputElement>) => {
  const files = e.target.files
  if (!files || files.length === 0) return ''
  const file = files[0]
  const { type } = file
  const buffer = await file.arrayBuffer()
  const imageUrl = createImageUrl(buffer, type)
  return imageUrl
}

export const handleJSONUpload = (
  e: ChangeEvent<HTMLInputElement>,
  callback: (data: Config) => void
): Config | void => {
  const files = e.target.files
  if (!files) return
  const file = files[0]
  const fileReader = new FileReader()
  fileReader.readAsText(file, 'UTF-8')
  fileReader.onload = (e) => {
    console.log('e.target.result', e.target?.result)
    if (e.target?.result) {
      const data = JSON.parse(e.target.result as string)
      console.log('Json Data', data)
      callback(data)
    }
  }
}

export const encodeImageFileAsURL = async (
  e: ChangeEvent<HTMLInputElement>,
  callback: (textureBase64: string) => void
) => {
  if (!e.target.files) return
  const file = e.target.files[0]
  const reader = new FileReader()
  reader.onloadend = async () => {
    callback(reader.result as string)
  }
  reader.readAsDataURL(file)
}

export const handleJSONDownload = (config: Config) => {
  const fileName = 'table_config.json'
  const data = new Blob([JSON.stringify(config)], { type: 'text/json' })
  const jsonURL = window.URL.createObjectURL(data)
  const link = document.createElement('a')
  document.body.appendChild(link)
  link.href = jsonURL
  link.setAttribute('download', fileName)
  link.click()
  document.body.removeChild(link)
}
