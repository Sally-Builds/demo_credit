import User from "../userInterface";
import HttpException from "@/utils/exceptions/httpExceptions";


export interface SignupInterface {
     execute(user: SignupInterface.Request): Promise<SignupInterface.Response>
}

export namespace SignupInterface {
    export type Request = Omit<User, "id">
    export type Response = string | HttpException
}