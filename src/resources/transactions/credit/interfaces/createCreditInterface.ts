import HttpException from "@/utils/exceptions/httpExceptions";
import { Credit } from "../creditInterface";

export interface CreateCreditInterface {
     execute(credit_transaction_payload: CreateCreditInterface.Request): Promise<CreateCreditInterface.Response>
}

export namespace CreateCreditInterface {
    export type Request = {amount: number, user_id: string}
    export type Response = Credit | HttpException
}