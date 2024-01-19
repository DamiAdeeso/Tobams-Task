import multer from 'multer'
import { Request, Response, NextFunction } from 'express'
const storage = multer.memoryStorage()
export const upload = multer({ storage: storage })

export const checkMulterError = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
    
  upload.single('file')(req, res, err => {
   if (err instanceof multer.MulterError) {
      // A Multer error occurred ( file size exceeds limit)
      return res.status(400).json({ error: err.message })
    } else if (err) {
      return res.status(500).json({ error: 'Internal server error' });
    }
    next();
  })
}
