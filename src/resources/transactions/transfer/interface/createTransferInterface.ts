import HttpException from "@/utils/exceptions/httpExceptions";
import Transfer from "../transferInterface";

export interface CreateTransferInterface {
     execute(credit_transaction_payload: CreateTransferInterface.Request): Promise<CreateTransferInterface.Response>
}

export namespace CreateTransferInterface {
    export type Request = {amount: number, credit_wallet: string, user_id: string}
    export type Response = Transfer | HttpException
}