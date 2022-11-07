import Joi from "joi";


const create = Joi.object({
    amount: Joi.number().required(),
    credit_wallet: Joi.string().length(10).pattern(/^[0-9]+$/).required(),
})

export default {create}