import User from "../../userInterface";


export interface signupInterface {
     execute(user: signupInterface.Request): Promise<signupInterface.Response>
}

export namespace signupInterface {
    export type Request = Omit<User, "id">
    export type Response = string
}