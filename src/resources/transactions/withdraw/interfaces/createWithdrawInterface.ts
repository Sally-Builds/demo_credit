import HttpException from "@/utils/exceptions/httpExceptions";
import Withdraw from "../withdrawInterface";

export interface CreateWithdrawInterface {
     execute(debit_transaction_payload: CreateWithdrawInterface.Request): Promise<CreateWithdrawInterface.Response>
}

export namespace CreateWithdrawInterface {
    export type Request = {amount: number, user_id: string, bank_name: string, bank_account_no: number}
    export type Response = Withdraw | HttpException
}