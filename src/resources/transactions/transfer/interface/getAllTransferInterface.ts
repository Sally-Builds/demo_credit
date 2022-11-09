import HttpException from "@/utils/exceptions/httpExceptions";
import Transfer from "../transferInterface";

export interface GetAllTransferInterface {
     execute(user_id: GetAllTransferInterface.Request): Promise<GetAllTransferInterface.Response>
}

export namespace GetAllTransferInterface {
    export type Request = string
    export type Response = Transfer[] | HttpException
}