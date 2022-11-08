import { GetUserByEmailRepository } from "../interfaces/repository/getUserByEmailRepository";
import { CreateUserRepository } from "../interfaces/repository/createUserRepository";
import db from "@/utils/dbConfig/dbConnection";
import User from "../userInterface";
import HttpException from "@/utils/exceptions/httpExceptions";


export default class UserRepository implements GetUserByEmailRepository, CreateUserRepository {
    async getUserByEmail(email: string): Promise<GetUserByEmailRepository.Response> {
        try {
            const user = await db('users').whereRaw('email = ?', email)
            return user[0];
        } catch (error) {
            throw new HttpException('something went wrong', 500)
        }
    }

    async createUser(user: CreateUserRepository.Request): Promise<CreateUserRepository.Response> {
        try {
            await db('users').insert(user)
            const newUser = await this.getUserByEmail(user.email) 
            return (newUser as User)
        } catch (error:any) {
            const duplicateField = error.sqlMessage.split(" ").pop().split(".")[1].split("_")[1]
            if(error.errno == 1062) {
                throw new HttpException(`${duplicateField} already exist`, 400)
            }
            throw new HttpException(`${duplicateField} already exist`, 400)
        }
    }
}