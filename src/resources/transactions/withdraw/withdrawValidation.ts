import Joi from "joi";


const create = Joi.object({
    amount: Joi.number().required(),
    bank_account_no: Joi.string().length(10).pattern(/^[0-9]+$/).required(),
    bank_name: Joi.string().required(),
})

export default {create}