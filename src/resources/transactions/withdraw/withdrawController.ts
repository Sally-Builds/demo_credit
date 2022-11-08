import { Request, Response, NextFunction, Router } from "express";
import WithdrawService from "./withdrawService";
import Controller from "@/utils/interfaces/Controller.interface";
import HttpException from "@/utils/exceptions/httpExceptions";
import validationMiddleware from "@/middleware/validation.middleware";
import validate from './withdrawValidation'
import authenticate from "@/middleware/authenticate.middleware";
import Withdraw from "./withdrawInterface";
import WithdrawDTO from "./withdrawDTO";

export default class WithdrawController implements Controller {
    public path = '/transactions'
    public router = Router()

    private withdrawService = new WithdrawService()

    constructor(){
        this.initializeRouter()
    }

    private initializeRouter(){
        this.router.post(`${this.path}/withdraw`, authenticate, validationMiddleware(validate.create),  this.create)
        this.router.get(`${this.path}/withdraw`, authenticate,  this.getAllDebitTransactions)
    }

    private create = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const {amount, bank_name, bank_account_no} = (req.body as Withdraw)
            const data = await this.withdrawService.create(amount, bank_name, bank_account_no, req.user.id)

            const withdrawDTO:WithdrawDTO = {
                date: (data as Withdraw).date,
                reference_id: (data as Withdraw).reference_id, 
                transaction_type: (data as Withdraw).transaction_type,
                debit_wallet: (data as Withdraw).debit_wallet,
                amount: (data as Withdraw).amount,
                bank_account_no: (data as Withdraw).bank_account_no,
                bank_name: (data as Withdraw).bank_name
            }

            res.status(201).json({
                status: 'success',
                data: withdrawDTO,
            })
        } catch (error:any) {
           next(new HttpException(error.message, error.statusCode))
        }
    }

    private getAllDebitTransactions = async(req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {

            const data = await this.withdrawService.getAll(req.user.id)

            const withdrawDTO:WithdrawDTO[] = (data as WithdrawDTO[]).map((data:WithdrawDTO) => {
                return {
                    date: data.date,
                    reference_id: data.reference_id, 
                    transaction_type: data.transaction_type,
                    debit_wallet: data.debit_wallet,
                    amount: data.amount,
                    bank_account_no: data.bank_account_no,
                    bank_name: data.bank_name
                }
            })

            res.status(201).json({
                status: 'success',
                result: withdrawDTO.length,
                withdraw_transactions: withdrawDTO,
            })
        } catch (error:any) {
           next(new HttpException(error.message, error.statusCode))
        }
    }
    
}