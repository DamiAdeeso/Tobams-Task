import { Request, Response, NextFunction } from 'express'
import sizeOf from 'image-size'

const allowedFormats = [
  'jpg',
  'jpeg',
  'png',
  'gif',
  'bmp',
  'tiff',
  'svg',
  'webp',
  'heif',
  'heic'
]

export const checkImageFormat = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.file) {
      const dimensions = sizeOf(req.file.buffer)
      if (dimensions && dimensions.type) {
        const format = dimensions.type.toLowerCase()

        if (allowedFormats.includes(format)) {
          // Add the format information to the request object for later use if needed
          req.body.imageFormat = format
          next()
        } else {
          res.status(400).json({ message: 'Invalid image format' })
        }
      } else {
        res.status(500).json({ message: 'Error getting image dimensions' })
      }
    }
  } catch (error) {
    if (isNonImageError(error)) {
      res.status(400).json({ message: 'Invalid file type' })
    } else {
      res.status(500).json({ error, message: 'Error checking image format' })
    }
  }
}
const isNonImageError = (error: any): boolean => {
  return (
    error instanceof Error && error.message.includes('unsupported file type')
  )
}
