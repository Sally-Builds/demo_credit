import { Request, Response, NextFunction, Router } from "express";
import Controller from "@/utils/interfaces/Controller.interface";
import HttpException from "@/utils/exceptions/httpExceptions";
import validationMiddleware from "@/middleware/validation.middleware";
import validate from './transferValidation'
import authenticate from "@/middleware/authenticate.middleware";
import Transfer from "./transferInterface";
import TransferDTO from "./transferDTO";
import transferFactory from "./factory/transferFactory";

export default class TransferController implements Controller {
    public path = '/transactions'
    public router = Router()

    constructor(){
        this.initializeRouter()
    }

    private initializeRouter(){
        this.router.post(`${this.path}/transfer`, authenticate, validationMiddleware(validate.create),  this.create)
        this.router.get(`${this.path}/transfer`, authenticate,  this.getAllTransferTransactions)
    }

    private create = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const {amount, credit_wallet} = (req.body as Transfer)
            const data = await transferFactory.create({amount, credit_wallet, user_id:req.user.id})

            const transferDTO:TransferDTO = {
                date: (data as Transfer).date,
                reference_id: (data as Transfer).reference_id, 
                transaction_type: (data as Transfer).transaction_type,
                credit_wallet: (data as Transfer).credit_wallet,
                debit_wallet: (data as Transfer).debit_wallet,
                amount: (data as Transfer).amount,
            }

            res.status(201).json({
                status: 'success',
                data: transferDTO,
            })
        } catch (error:any) {
           next(new HttpException(error.message, error.statusCode))
        }
    }

    private getAllTransferTransactions = async(req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {

            const data = await transferFactory.getAll(req.user.id)

            const transferDTOs:TransferDTO[] = (data as Transfer[]).map((data:Transfer) => {
                return {
                    date: data.date,
                    reference_id: data.reference_id, 
                    transaction_type: data.transaction_type,
                    credit_wallet: data.credit_wallet,
                    debit_wallet: data.debit_wallet,
                    amount: data.amount,
                }
            })

            res.status(201).json({
                status: 'success',
                result: (data as Transfer[]).length,
                transfer_transactions: transferDTOs,
            })
        } catch (error:any) {
           next(new HttpException(error.message, error.statusCode))
        }
    }
    
}