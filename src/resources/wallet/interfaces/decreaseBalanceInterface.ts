import HttpException from "@/utils/exceptions/httpExceptions";

export interface DecreaseBalanceInterface {
     execute(data: DecreaseBalanceInterface.Request): Promise<DecreaseBalanceInterface.Response>
}

export namespace DecreaseBalanceInterface {
    export type Request = {debit_wallet: string, amount: number}
    export type Response = void | HttpException
}