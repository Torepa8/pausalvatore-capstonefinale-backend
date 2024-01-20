//creo le rotte per le locandine aziendali

import express from 'express';
import { Locandine } from '../models/locandine.js';
import checkCompany from '../middlewares/checkCompany.js';

const locandineRouter = express.Router();

locandineRouter.get('/', async (req, res, next) => {
    try {
        const locandine = await Locandine.find();
        res.json(locandine);
    } catch (err) {
        next(err);
    }
})

.post('/', checkCompany, async (req, res, next) => {
    try {
        const newLocandina = await Locandine.create(req.body).populate("IdCompany")
        res.status(201).json(newLocandina)
    } catch (err) {
        next(err)
    }
})

export default locandineRouter;