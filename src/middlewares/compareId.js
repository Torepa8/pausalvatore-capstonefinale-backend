//confrontiamo l'id dell'azienda 
//con l'id dell'azienda che ha creato la locandina
//e se corrispondono allora possiamo modificare la locandina

import jwt from "jsonwebtoken"
import { Company } from "../models/companies.js"
import { Locandine } from "../models/locandine.js"

const compareId = async (req, res, next) => {
    const companyId = req.Company._id.toString()
    const locandinaId = req.params.id
    const locs=await Locandine.findById(locandinaId)
    if (companyId===locandinaId.company.toString()) {
        next()
            } else {
                const error = new Error("Non puoi modificare le locandine di un'altra azienda")
                error.httpStatusCode = 404
                next(error)
            }
    }

export default compareId