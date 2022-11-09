import Wallet from "@/resources/wallet/walletInterface";
import HttpException from "@/utils/exceptions/httpExceptions";

export interface GetMeInterface {
     execute(user_id: GetMeInterface.Request): Promise<GetMeInterface.Response>
}

export namespace GetMeInterface {
    export type Request = string
    export type Response = Wallet | HttpException
}