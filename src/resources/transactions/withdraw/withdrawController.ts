import { Request, Response, NextFunction, Router } from "express";
import WithdrawService from "./withdrawService";
import Controller from "@/utils/interfaces/Controller.interface";
import HttpException from "@/utils/exceptions/httpExceptions";
import validationMiddleware from "@/middleware/validation.middleware";
import validate from './withdrawValidation'
import authenticate from "@/middleware/authenticate.middleware";
import Withdraw from "./withdrawInterface";

export default class WithdrawController implements Controller {
    public path = '/transactions'
    public router = Router()

    private withdrawService = new WithdrawService()

    constructor(){
        this.initializeRouter()
    }

    private initializeRouter(){
        this.router.post(`${this.path}/withdraw`, authenticate, validationMiddleware(validate.create),  this.create)
    }

    private create = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const {amount, bank_name, bank_account_no} = (req.body as Withdraw)
            const data = await this.withdrawService.create(amount, bank_name, bank_account_no, req.user.id)

            res.status(201).json({
                status: 'success',
                data: data,
            })
        } catch (error:any) {
           next(new HttpException(error.message, error.statusCode))
        }
    }
    
}