//creo le rotte per le locandine aziendali

import express from 'express';
import { Locandine } from '../models/locandine.js';
import checkCompany from '../middlewares/checkCompany.js';
import compareId from '../middlewares/compareId.js';
import multer from 'multer';

import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 as cloudinary } from "cloudinary"

const cloudstorage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "capstoneproject",
    },
})

const upload = multer({ storage: cloudstorage });

const locandineRouter = express.Router();

locandineRouter.get('/', async (req, res, next) => {
    //restituisce tutte le locandine aziendali
    try {
        const locandine = await Locandine.find().populate(
            "company",
            "-password -__v -_id -vat")
            .select("-__v -_id");
        res.json(locandine);
    } catch (err) {
        next(err);
    }
})
    .get('/:id', async (req, res, next) => {
        //restituiamo la locandina cliccata
        try {
            const locandina = await Locandine.findById(req.params.id).populate(
                "company",
                "-password -__v -_id -vat")
                .select("-__v -_id");
            res.json(locandina);
        } catch (err) {
            next(err);
        }
    })
    .get('/:id', checkCompany, async (req, res, next) => {
        //restituiamo tutte le locandine dell'azienda loggata
        //per poterle visualizzare nella sua area riservata
        try {
            const locandine = await Locandine.find({ company: req.params.id }).populate(
                "company",
                "-password -__v -_id -vat")
                .select("-__v -_id");
            res.json(locandine);
        } catch (err) {
            next(err);
        }
    })
    .post('/', checkCompany, async (req, res, next) => {
        //recuperiamo l'id dell'azienda che ha fatto la richiesta
        const companyBycheck = req.Company._id

        //creiamo la locandina
        try {
            const newLocandina = await Locandine.create({ ...req.body, company: companyBycheck })
            res.status(201).json(newLocandina)
        } catch (err) {
            next(err)
        }
    })
    .patch('/:id', checkCompany, compareId, upload.single("image"), async (req, res, next) => {
        if (req.file) {
            try {
                const newimageLoc = await Locandine.findByIdAndUpdate(req.params
                    .id, {image:req.file.path}, { new: true })
                res.json(newimageLoc)
            } catch (err) {
                next(err)
            }
        }
    })

export default locandineRouter;