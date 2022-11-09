import HttpException from "@/utils/exceptions/httpExceptions";

export interface LoginInterface {
     execute(email: LoginInterface.Request): Promise<LoginInterface.Response>
}

export namespace LoginInterface {
    export type Request = {email: string, password: string}
    export type Response = string | HttpException
}