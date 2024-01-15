//inseriremo il codice per il salvataggio delle foto su cloudinary

import cloudinary from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { v2 as cloudinaryV2 } from 'cloudinary';
import multer from 'multer';
import e from 'express';

//configurazione di cloudinary

const cloudinary =new CloudinaryStorage({
    cloudinary:cloudinaryV2,
    params:{
        folder:"capstonefolder",
    },
});

export const cloudinaryMulter = multer({storage:cloudinary});