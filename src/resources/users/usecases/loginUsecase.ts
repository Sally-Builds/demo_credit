import { LoginInterface } from "../interfaces/loginInterface";
import { JwtGenerate } from "../interfaces/cryptography/jwt/jwtGenerate";
import { PasswordHashVerify } from "../interfaces/cryptography/passwordHash/passwordHashVerify";
import HttpException from "@/utils/exceptions/httpExceptions";
import { GetUserByEmailRepository } from "../interfaces/repository/getUserByEmailRepository";
import User from "../userInterface";


export default class LoginUsecase implements LoginInterface {
    constructor(
        private readonly jwtGenerate: JwtGenerate,
        private readonly getUserByEmailRepository: GetUserByEmailRepository,
        private readonly passwordHashVerify: PasswordHashVerify
    ){}

    async execute(loginCredentials: LoginInterface.Request): Promise<LoginInterface.Response> {
        try {
            //check if email exist
            const user = await await this.getUserByEmailRepository.getUserByEmail(loginCredentials.email)

            if(!user) {
                throw new HttpException('email or password incorrect', 400)
            }

        //check if password is upto 8 characters
        if(loginCredentials.password.length < 8) {
            throw new HttpException('password must be greater than 8', 400)
        }

        //check if password is correct
        if(!(await this.passwordHashVerify.verify(user.password, loginCredentials.password))) {
            throw new HttpException('email or password incorrect', 400)
        }

        //generate token
        const token = this.jwtGenerate.sign((user as User).id)

        //return token
        return await token
        } catch (error:any) {
            throw new HttpException(error.message, error.statusCode)
        }
    }

}