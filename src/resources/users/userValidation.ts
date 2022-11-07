import Joi from "joi";


const create = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    role: Joi.string().valid('borrower', 'lender').required()
})

const login = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
})

const update = Joi.object({
    firstName: Joi.string().required(),
    otherNames: Joi.string(),
    lastName: Joi.string().required(),
    dob: Joi.date(),
    gender: Joi.string().required(),
})

export default {create, login, update}