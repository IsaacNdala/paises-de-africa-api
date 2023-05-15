import fs from 'fs';
import { Request } from 'express';
import multer, { FileFilterCallback } from 'multer';
import path from 'path';
import cypto, { randomBytes } from 'crypto'; 

type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, filename: string) => void;

const storage = multer.diskStorage({
  destination: (
    req: Request,
    file: Express.Multer.File,
    cb: DestinationCallback,
  ) => {
    cb(null, 'dist/uploads');
  },
  filename: (req: Request, file: Express.Multer.File, cb: FileNameCallback) => {
    cb(null, 'pa_' + randomBytes(12).toString('hex') +  path.extname(file.originalname));
  },
});

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback,
) => {
  if (
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/png'
  ) {
    cb(null, true);
  } else {
    const error: IError = new Error(`O arquivo '${file.originalname}' não é suportado!`);
    error.statusCode = 422;
    cb(error);
  }
};

export const upload = multer({
  // limits: {
  //   fileSize: 1024 * 1024 * 10, // Tamanho máximo 10MB
  // },
  storage: storage, 
  fileFilter: fileFilter
});