//endpoint per gli utenti da registrare e loggare

import express from 'express';
import { User } from '../models/users.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const usersRouter = express.Router();

usersRouter.get('/', async (req, res, next) => {
    //restituisce tutti gli utenti registrati
    try {
        const users = await User.find().select("-password");
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
        const { mail } = req.body
        const userExist = await User.findOne({ mail })
        console.log(userExist)
        if (userExist) {
            console.log("Utente Registrato!")
            res.json({ message: "Utente già registrato" })
            //qui farò redirect alla pagina di login
            // res.redirect('/login')
        } else {
            try {
                const passwordHashata = await bcrypt.hash(req.body.password, 10)
                const newUser = await User.create({ ...req.body, password: passwordHashata })
                const token = jwt.sign({ userId: newUser._id }, process.env.MYSEC, {
                    expiresIn: "100000h",
                })
                const { password: _, __v, ...newUserWithoutPassword } = newUser.toObject()
                res.status(201).json({ user: newUserWithoutPassword, token })
            } catch (err) {
                next(err)
            }
        }
    })
    .post('/login', async (req, res, next) => {
        //se l'utente è registrato allora gli restituirò il token
        //se l'utente non è registrato lo reindirizzerò alla pagina di registrazione

        const { mail, password } = req.body
        const userExist = await User.findOne({ mail })
        if (userExist) {
            console.log("Utente Registrato!")
            //controlliamo se la password è corretta
            const verifypass = await bcrypt.compare(password, userExist.password)
            if (verifypass) {
                console.log("Password Corretta!")
                //generiamo il nuovo token per l'utente loggato
                const token = jwt.sign({ userId: userExist._id }, process.env.MYSEC, {
                    expiresIn: "48h",
                })
                const { password: _, __v, ...userExistWithoutPassword } = userExist.toObject()
                res.status(201).json({ user: userExistWithoutPassword, token })
            } else {
                console.log("Password Errata!")
                res.json({ message: "Password Errata!" })
            }
        }else{
            console.log("Utente non Registrato!")
            res.status(404).json({ message: "Utente non Registrato!" })
            //redirect alla pagina di registrazione
            // res.redirect('/register')
        }
    })

    .put('/:id', async (req, res, next) => {
        try {
            const newPasswordHashata = await bcrypt.hash(req.body.password, 10)
            const updateUser = await User.findByIdAndUpdate(req.params.id, { ...req.body, password: newPasswordHashata }, {
                new: true,
                runValidators: true,
            }).select("-password")
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