import UserRepository from "../repository/userRepository";
import SignupUsecase from "../usecases/signupUsecase";
import { BcryptAdapter } from "./cryptography/bcryptAdapter";
import { JwtAdapter } from "./cryptography/jwtAdapter";
import User from "../userInterface";
import HttpException from "@/utils/exceptions/httpExceptions";

class UserFactory {
    private userDB;
    private SignupUsecase;
    private bcryptAdapter;
    private jwtAdapter;
    constructor() {
         this.userDB = new UserRepository()
         this.bcryptAdapter = new BcryptAdapter(12)
         this.jwtAdapter = new JwtAdapter('secret', '30d')
         this.SignupUsecase = new SignupUsecase(this.bcryptAdapter, this.jwtAdapter, this.userDB, this.userDB)
    }

    async signup(user: User) {    
        try {
            const newUser = await this.SignupUsecase.execute(user)
            return newUser;
        } catch (error: any) {
            throw new HttpException(error.message, error.statusCode)
        }

    }
}

const userFactory = new UserFactory()

export default userFactory

