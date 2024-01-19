import express from 'express'
import { checkMulterError, upload } from '../config/upload'
import Image from '../models/ImageSchema'
import crypto from 'crypto'
import { checkImageFormat } from '../config/checkImageFormat'
import { getAllImages, getImage, uploadImage } from '../controllers/imageController'

const imageRouter = express.Router()

imageRouter.post('/upload', checkMulterError, checkImageFormat, uploadImage)

imageRouter.get('/get_image/:secureUrl',getImage);

imageRouter.get('/',getAllImages);

export default imageRouter
