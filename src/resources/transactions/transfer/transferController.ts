import { Request, Response, NextFunction, Router } from "express";
import TransferService from "./transferService";
import Controller from "@/utils/interfaces/Controller.interface";
import HttpException from "@/utils/exceptions/httpExceptions";
import validationMiddleware from "@/middleware/validation.middleware";
import validate from './transferValidation'
import authenticate from "@/middleware/authenticate.middleware";
import Transfer from "./transferInterface";

export default class TransferController implements Controller {
    public path = '/transactions'
    public router = Router()

    private withdrawService = new TransferService()

    constructor(){
        this.initializeRouter()
    }

    private initializeRouter(){
        this.router.post(`${this.path}/transfer`, authenticate, validationMiddleware(validate.create),  this.create)
    }

    private create = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const {amount, credit_wallet} = (req.body as Transfer)
            const data = await this.withdrawService.create(amount, credit_wallet, req.user.id)

            res.status(201).json({
                status: 'success',
                data: data,
            })
        } catch (error:any) {
           next(new HttpException(error.message, error.statusCode))
        }
    }
    
}