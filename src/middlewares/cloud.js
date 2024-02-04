//inseriremo il codice per il salvataggio delle foto su cloudinary

import { CloudinaryStorage } from "multer-storage-cloudinary";
import {v2 as cloudinary} from "cloudinary"

const cloudstorage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "capstoneproject",
    },
})

export default cloudstorage