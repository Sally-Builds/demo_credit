import {Request, Response, NextFunction} from 'express'
import HttpException from 'utils/exceptions/httpExceptions'

function errorMiddleware (err: HttpException, req: Request, res: Response, next: NextFunction):void {
    const statusCode = err.statusCode || 500
    const message = err.message || 'Something went wrong'

    res.status(statusCode).json({
        statusCode,
        message
    })
}

export default errorMiddleware