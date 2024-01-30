// creo tutte le rotte per le companies

import express from 'express';
import { Company } from '../models/companies.js';
import checkCompany from '../middlewares/checkCompany.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const companiesRouter = express.Router();

companiesRouter.get('/', async (req, res, next) => {
    try {
        const companies = await Company.find();
        res.json(companies);
    } catch (err) {
        next(err);
    }
})

    .get('/:id', async (req, res, next) => {
        try {
            const company = await Company.findById(req.params.id);
            res.json(company);
        } catch (err) {
            next(err);
        }
    })

    .post('/', async (req, res, next) => {
        try {
            const passwordHashata = await bcrypt.hash(req.body.password, 10)
            const newCompany = await Company.create({ ...req.body, password: passwordHashata })
            const token = jwt.sign({ userId: newCompany._id }, process.env.MYSEC, {
                expiresIn: "48h",
            })
            const { password: _, __v, ...newCompanyWithoutPassword } = newCompany.toObject()
            res.status(201).json({ Company: newCompanyWithoutPassword, token })
        } catch (err) {
            next(err)
        }
    })

    .post('/login', async (req, res, next) => {
        const isRegistered = await Company.findOne({ mail: req.body.mail })
        if (isRegistered) {
            const isPasswordCorrect = await bcrypt.compare(req.body.password, isRegistered.password)
            if (isPasswordCorrect) {
                console.log("Login effettuato")
                try {
                    const token = jwt.sign({ companyId: isRegistered._id }, process.env.MYSEC, {
                        expiresIn: "100000h",
                    })
                    res.status(200).json({ token })
                }
                catch (err) {
                    next(err)
                }
            } else {
                const error = new Error("Password is not correct")
                error.httpStatusCode = 401
                next(error)
            }
        }
        else {
            const error = new Error("Company not found")
            error.httpStatusCode = 404
            next(error)
        }
    })

    .put('/:id', async (req, res, next) => {
        try {
            const updateCompany = new Company(req.body)
            const { _id } = updateCompany
        } catch (err) {
            next(err)
        }
    })

    .delete('/:id', async (req, res, next) => {
        try {
            const deleteCompany = await Company.findByIdAndDelete(req.params.id)
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

