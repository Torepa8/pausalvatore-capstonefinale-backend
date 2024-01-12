// creo tutte le rotte per le companies

import express from 'express';
import { company } from '../models/companies.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const companiesRouter = express.Router();

companiesRouter.get('/', async (req, res, next) => {
    try {
        const companies = await company.find();
        res.json(companies);
    } catch (err) {
        next(err);
    }
})

    .get('/:id', async (req, res, next) => {
        try {
            const company = await company.findById(req.params.id);
            res.json(company);
        } catch (err) {
            next(err);
        }
    })

    .post('/', async (req, res, next) => {
        try {
            const passwordHashata = await bcrypt.hash(req.body.password, 10)
            const newCompany = await company.create({ ...req.body, password: passwordHashata })
            const token = jwt.sign({ userId: newCompany._id }, process.env.MYSEC, {
                expiresIn: "48h",
            })
            const { password: _, __v, ...newCompanyWithoutPassword } = newCompany.toObject()
            res.status(201).json({ company: newCompanyWithoutPassword, token })
        } catch (err) {
            next(err)
        }
    })

    .put('/:id', async (req, res, next) => {
        try {
            const updateCompany = new company(req.body)
            const { _id } = updateCompany
        } catch (err) {
            next(err)
        }
    })

    .delete('/:id', async (req, res, next) => {
        try {
            const deleteCompany = await company.findByIdAndDelete(req.params.id)
            if (deleteCompany) {
                res.status(204).send()
            }
            else {
                const error = new Error(`Company with id ${req.params.id} not found`)
                error.httpStatusCode = 404
                next(error)
            }
        } catch (err) {
            next(err)
        }
    });

export default companiesRouter;

