//controlliamo se l'utente è autorizzato a fare una determinata richiesta
import jwt from "jsonwebtoken"
import { User } from "../models/users.js"


const checkUser = async (req, res, next) => {
    let token = ""
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1]
    }

    if (token) {
        try {
            const decoded = await jwt.verify(token, process.env.MYSEC)
            const user = await User.findById(decoded.userId)
            if (user) {
                req.user = user
                next()
            } else {
                const error = new Error("User not found")
                error.httpStatusCode = 404
                next(error)
            }
        } catch (err) {
            next(err)
        }
    }
    else {
        const error = new Error("Token not provided")
        error.httpStatusCode = 401
        next(error)
    }
}

export default checkUser
