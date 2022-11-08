import { Request, Response, NextFunction, Router } from "express";
import CreditService from "./creditService";
import Controller from "@/utils/interfaces/Controller.interface";
import HttpException from "@/utils/exceptions/httpExceptions";
import validationMiddleware from "@/middleware/validation.middleware";
import validate from './creditValidation'
import authenticate from "@/middleware/authenticate.middleware";
import { Credit } from "./creditInterface";

export default class CreditController implements Controller {
    public path = '/transactions'
    public router = Router()

    private creditService = new CreditService()

    constructor(){
        this.initializeRouter()
    }

    private initializeRouter(){
        this.router.post(`${this.path}/credit`, authenticate, validationMiddleware(validate.create),  this.create)

        this.router.get(`${this.path}/credit`, authenticate,  this.getAllCreditTransactions)
    }

    private create = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const data = await this.creditService.create(req.body.amount, req.user.id)

            res.status(201).json({
                status: 'success',
                data: data,
            })
        } catch (error:any) {
           next(new HttpException(error.message, error.statusCode))
        }
    }

    private getAllCreditTransactions = async(req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {

            const data = await this.creditService.getAll(req.user.id)

            res.status(201).json({
                status: 'success',
                result: (data as Credit[]).length,
                credit_transactions: data,
            })
        } catch (error:any) {
           next(new HttpException(error.message, error.statusCode))
        }
    }
    
}