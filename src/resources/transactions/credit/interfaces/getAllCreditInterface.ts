import HttpException from "@/utils/exceptions/httpExceptions";
import { Credit } from "../creditInterface";

export interface GetAllCreditInterface {
     execute(user_id: GetAllCreditInterface.Request): Promise<GetAllCreditInterface.Response>
}

export namespace GetAllCreditInterface {
    export type Request = string
    export type Response = Credit[] | HttpException
}