import HttpException from "@/utils/exceptions/httpExceptions";
import Withdraw from "../withdrawInterface";

export interface GetAllWithdrawInterface {
     execute(user_id: GetAllWithdrawInterface.Request): Promise<GetAllWithdrawInterface.Response>
}

export namespace GetAllWithdrawInterface {
    export type Request = string
    export type Response = Withdraw[] | HttpException
}