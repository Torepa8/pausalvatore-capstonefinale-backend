//controlliamo se l'azienda che accede ha i permessi per fare una determinata richiesta

import jwt from "jsonwebtoken"
import { company } from "../models/companies.js"

const checkCompany = async (req, res, next) => {
    let token = ""

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1]
    }

    // console.log(token)

    if (token) {
        try {
            const decoded = await jwt.verify(token, process.env.MYSEC)
            const companyId = await company.findById(decoded.companyId)
            if (companyId) {
                req.company = company
                next()
            } else {
                const error = new Error("Company not found")
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

export default checkCompany