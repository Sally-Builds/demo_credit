class HttpException extends Error {
    public message: string
    public statusCode: number

    constructor(message: string, statusCode: number) {
        super(message)
        this.message = message
        this.statusCode = statusCode
        Error.captureStackTrace(this, this.constructor)
    }
}

export default HttpException