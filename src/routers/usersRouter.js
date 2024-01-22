//endpoint per gli utenti da registrare e loggare

import express from 'express';
import { User } from '../models/users.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import checkUser from '../middlewares/checkUser.js';

const usersRouter = express.Router();

usersRouter.get('/', async (req, res, next) => {
    //restituisce tutti gli utenti registrati
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        next(err);
    }
})

    .get('/:id', async (req, res, next) => {
        //restituisce un utente registrato in base all'id
        try {
            const user = await User.findById(req.params.id);
            res.json(user);
        } catch (err) {
            next(err);
        }
    })

    //crea un nuovo utente
    .post('/', async (req, res, next) => {
        //controlliamo se l'utente è già registrato
        const {mail} = req.body
        const userExist = await User.findOne({ mail })
        if (userExist) {
            console.log("Utente Registrato!")
            res.json({ message: "Utente già registrato" })
            //qui farò redirect alla pagina di login
            
        } else {
            try {
                const passwordHashata = await bcrypt.hash(req.body.password, 10)
                const newUser = await User.create({ ...req.body, password: passwordHashata })
                const token = jwt.sign({ userId: newUser._id }, process.env.MYSEC, {
                    expiresIn: "48h",
                })
                const { password: _, __v, ...newUserWithoutPassword } = newUser.toObject()
                res.status(201).json({ user: newUserWithoutPassword, token })
            } catch (err) {
                next(err)
            }
        }
    })

    .put('/:id', async (req, res, next) => {
        try {
            const newPasswordHashata = await bcrypt.hash(req.body.password, 10)
            const updateUser = await User.findByIdAndUpdate(req.params.id, { ...req.body, password: newPasswordHashata }, {
                new: true,
                runValidators: true,
            })
            res.json(updateUser)
        } catch (err) {
            next(err)
        }
    })
    .delete('/:id', async (req, res, next) => {
        try {
            const deleteUser = await User.findByIdAndDelete(req.params.id)
            if (deleteUser) {
                res.status(204).send()
            }
            else {
                const error = new Error(`User with id ${req.params.id} not found`)
                error.httpStatusCode = 404
                next(error)
            }
        } catch (err) {
            next(err)
        }
    });

export default usersRouter;