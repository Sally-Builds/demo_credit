import HttpException from "@/utils/exceptions/httpExceptions";

export interface IncreaseBalanceInterface {
     execute(data: IncreaseBalanceInterface.Request): Promise<IncreaseBalanceInterface.Response>
}

export namespace IncreaseBalanceInterface {
    export type Request = {credit_wallet: string, amount: number}
    export type Response = void | HttpException
}