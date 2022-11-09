import { Request, Response, NextFunction, Router } from "express";
import Controller from "@/utils/interfaces/Controller.interface";
import HttpException from "@/utils/exceptions/httpExceptions";
import validationMiddleware from "@/middleware/validation.middleware";
import validate from './creditValidation'
import authenticate from "@/middleware/authenticate.middleware";
import { Credit } from "./creditInterface";
import CreditDTO from "./creditDTO";

import creditFactory from "./factory/creditFactory";

export default class CreditController implements Controller {
    public path = '/transactions'
    public router = Router()

    constructor(){
        this.initializeRouter()
    }

    private initializeRouter(){
        this.router.post(`${this.path}/credit`, authenticate, validationMiddleware(validate.create),  this.create)

        this.router.get(`${this.path}/credit`, authenticate,  this.getAllCreditTransactions)
    }

    private create = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const data = await creditFactory.create({amount: req.body.amount, user_id:req.user.id})

            const creditDTO:CreditDTO = {
                date: (data as Credit).date,
                reference_id: (data as Credit).reference_id, 
                transaction_type: (data as Credit).transaction_type,
                credit_wallet: (data as Credit).credit_wallet,
                amount: (data as Credit).amount,
            }

            res.status(201).json({
                status: 'success',
                data: creditDTO,
            })
        } catch (error:any) {
           next(new HttpException(error.message, error.statusCode))
        }
    }

    private getAllCreditTransactions = async(req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {

            // const data = await this.creditService.getAll(req.user.id)
            const data = await creditFactory.getAll(req.user.id)

            const creditDTO:CreditDTO[] = (data as Credit[]).map((data:Credit) => {
                return {
                    date: data.date,
                    reference_id: data.reference_id, 
                    transaction_type: data.transaction_type,
                    credit_wallet: data.credit_wallet,
                    amount: data.amount,
                }
            })

            res.status(201).json({
                status: 'success',
                result: (data as Credit[]).length,
                credit_transactions: creditDTO,
            })
        } catch (error:any) {
           next(new HttpException(error.message, error.statusCode))
        }
    }
    
}