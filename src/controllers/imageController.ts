import expressAsyncHandler from "express-async-handler";
import { Request, Response } from "express";
import crypto from 'crypto';
import Image from "../models/ImageSchema";

export const uploadImage = expressAsyncHandler(async (req: Request, res: Response): Promise<void> => {
  try {
    const generateUrl: string = crypto.randomBytes(32).toString('hex');

    if (!req.file) {
      res.status(400).send({ message: 'Must Send an Image' });
      return;
    }

    const imageObject = {
      file: {
        data: req.file.buffer,
        contentType: req.file.mimetype
      },
      fileName:req.body.fileName,
      secureUrl: generateUrl
    };

    const uploadObject = new Image(imageObject);
    const uploadProcess = await uploadObject.save();

    res.status(201).send({ secureUrl: uploadProcess.secureUrl, message: 'Image Uploaded Successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
});

export const getImage = expressAsyncHandler(async(req:Request, res:Response,):Promise<void>=>{
    try {
        const { secureUrl } = req.params
    
        const image = await Image.findOne({ secureUrl })
    
        if (!image) {
          res.status(404).send({ message: 'Image not found.' })
          return;
        }
    
        res.status(200).send(image.file)
      } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Internal Server Error' })
      }
})

export const getAllImages = expressAsyncHandler(async(req:Request,res:Response):Promise<void>=>{
    try {
       
        const images = await Image.find();

        res.status(200).send({images,message:"Image Fetch Successful"});
    }catch(err){
        res.status(400).send({message:"Image Fetch Failed"});
    }
});