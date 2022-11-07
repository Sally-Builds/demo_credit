import Joi from "joi";


const create = Joi.object({
    amount: Joi.number().required(),
})

export default {create}