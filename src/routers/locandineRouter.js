//creo le rotte per le locandine aziendali

import express from 'express';
import { Locandine } from '../models/locandine.js';
import checkCompany from '../middlewares/checkCompany.js';

const locandineRouter = express.Router();

locandineRouter.get('/', async (req, res, next) => {
    try {
        const locandine = await Locandine.find({}).populate("company");
        res.json(locandine);
    } catch (err) {
        next(err);
    }
})

.post('/', async (req, res, next) => {
    try {
        const newLocandina = await Locandine.create(req.body).populate("company")
        res.status(201).json(newLocandina)
    } catch (err) {
        next(err)
    }
})

export default locandineRouter;