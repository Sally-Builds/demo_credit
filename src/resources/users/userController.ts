import { Request, Response, NextFunction, Router } from "express";
import UserService from "./userService";
import Controller from "@/utils/interfaces/Controller.interface";
import HttpException from "@/utils/exceptions/httpExceptions";
import validationMiddleware from "@/middleware/validation.middleware";
import validate from './userValidation'
import authenticate from "@/middleware/authenticate.middleware";

class UserController implements Controller {
    public path = '/users'
    public router = Router()

    private userService = new UserService()

    constructor(){
        this.initializeRouter()
    }

    private initializeRouter(){
        this.router.post(`${this.path}/signup`, validationMiddleware(validate.create),  this.signup)
        this.router.post(`${this.path}/login`, validationMiddleware(validate.login), this.login)

        this.router.route(`${this.path}`).get(authenticate, this.getMe)

        // this.router.route(`${this.path}/:id`)
        // .patch(authenticate, this.updateUser)
    }

    private signup = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const token = await this.userService.create(req.body)

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
            const token = await this.userService.login(req.body.email, req.body.password)

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
            const wallet = await this.userService.getAccount(req.user.id)
            console.log(req.user)
            const account = {...req.user, wallet}

            res.status(200).json({
                status: 'success',
                account,
            })
        } catch (error:any) {
            next(new HttpException(error.message, error.statusCode))
        }
    }
}

export default UserController