import { Request, Response, NextFunction, Router } from "express";
import userFactory from "./factory/userFactory";
import Controller from "@/utils/interfaces/Controller.interface";
import HttpException from "@/utils/exceptions/httpExceptions";
import validationMiddleware from "@/middleware/validation.middleware";
import validate from './userValidation'
import authenticate from "@/middleware/authenticate.middleware";
import UserDTO from "./userDTO";
import Wallet from "../wallet/walletInterface";
import LoginDTO from "./loginDTO";

class UserController implements Controller {
    public path = '/users'
    public router = Router()


    constructor(){
        this.initializeRouter()
    }

    private initializeRouter(){
        this.router.post(`${this.path}/signup`, validationMiddleware(validate.create),  this.signup)
        this.router.post(`${this.path}/login`, validationMiddleware(validate.login), this.login)

        this.router.route(`${this.path}`).get(authenticate, this.getMe)
    }

    private signup = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const token = await userFactory.signup(req.body)

            res.status(201).json({
                status: 'success',
                token,
            })
        } catch (error:any) {
           next(new HttpException(error.message, error.statusCode))
        }
    }
    
    private login = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const token = await userFactory.login((req.body as LoginDTO))

            res.status(200).json({
                status: 'success',
                token,
            })
        } catch (error:any) {
            next(new HttpException(error.message, error.statusCode))
        }
    }

    private getMe = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const wallet = await userFactory.getAccount(req.user.id)

            const account:UserDTO = {
                email: req.user.email,
                name: req.user.name,
                role: req.user.role,
                wallet: {
                    balance: (wallet as Wallet).balance,
                    account_no: (wallet as Wallet).account_no
                }
            }

            res.status(200).json({
                status: 'success',
                account: (account as UserDTO),
            })
        } catch (error:any) {
            next(new HttpException(error.message, error.statusCode))
        }
    }
}

export default UserController