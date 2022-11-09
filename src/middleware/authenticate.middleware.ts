import  jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import Token from '@/utils/interfaces/token.interface'
import HttpException from '@/utils/exceptions/httpExceptions'
import UserRepository from "@/resources/users/repository/userRepository";
import {JwtAdapter} from "@/resources/users/factory/cryptography/jwtAdapter"

async function authenticate (req:Request, res:Response, next:NextFunction): Promise<Response | void> {
    const bearer = req.headers.authorization

    if(!bearer || !bearer.startsWith('Bearer')){
     return next(new HttpException('Unauthorized access', 401))
    }
    const accessToken = bearer.split('Bearer ')[1].trim()
    try {
        const payload: Token | jwt.JsonWebTokenError = await new JwtAdapter('secret', '30d').verify(accessToken)


        if(payload instanceof jwt.JsonWebTokenError) {
        return next(new HttpException('Unauthorized access', 401))
        }

        const user = await new UserRepository().getById(payload.id)

        if(!user) {
            return next(new HttpException('Unauthorized access', 401))
        }

        user.password = (undefined as any)

        req.user = user
        next()

    } catch (error:any) {
        next(new HttpException('Unauthorized access', 401))
    }
}

export default authenticate
