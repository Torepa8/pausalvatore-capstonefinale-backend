//creo le rotte per le locandine aziendali

import express from 'express';
import { Locandine } from '../models/locandine.js';
import checkCompany from '../middlewares/checkCompany.js';
import cloud from '../middlewares/cloud.js';


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
    .post('/', checkCompany, async (req, res, next) => {
        //recuperiamo l'id dell'azienda che ha fatto la richiesta
        const companyBycheck = req.Company._id
        
        //creiamo la locandina
        try {
            const newLocandina = await Locandine.create({...req.body,  company: companyBycheck })
            res.status(201).json(newLocandina)
        } catch (err) {
            next(err)
        }
    })

export default locandineRouter;