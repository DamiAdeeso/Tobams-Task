import mongoose from 'mongoose'

const importSchema = new mongoose.Schema({
  fileName: {
    type: String,
    required: true
  },
  secureUrl: {
    type: String,
    required: true
  },
  file: {
    data: Buffer,
    contentType: String
  },
  uploadTime: {
    type: Date,
    default: Date.now
  }
})

const Image = mongoose.model('Image', importSchema)

export default Image
