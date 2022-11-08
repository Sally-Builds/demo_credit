import User from "@/resources/users/userInterface"

export interface GetUserByEmailRepository {
    getUserByEmail(email: GetUserByEmailRepository.Request): Promise<GetUserByEmailRepository.Response>
}

export namespace GetUserByEmailRepository {
    export type Request = string
    export type Response = User | null
}