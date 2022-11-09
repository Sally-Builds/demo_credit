import HttpException from "@/utils/exceptions/httpExceptions";

export interface CreateWalletInterface {
     execute(user_id: CreateWalletInterface.Request): Promise<CreateWalletInterface.Response>
}

export namespace CreateWalletInterface {
    export type Request = string
    export type Response = void | HttpException
}