import User from "../userInterface";
import { BcryptAdapter } from "./cryptography/bcryptAdapter";
import { JwtAdapter } from "./cryptography/jwtAdapter";
import HttpException from "@/utils/exceptions/httpExceptions";
import SignupUsecase from "../usecases/signupUsecase";
import LoginUsecase from "../usecases/loginUsecase";
import UserRepository from "../repository/userRepository";
import { SignupInterface } from "../interfaces/signupInterface";
import { LoginInterface } from "../interfaces/loginInterface";
import LoginDTO from "../loginDTO";
import CreateWalletUsecase from "@/resources/wallet/usecase/createWalletUsecase";
import WalletRepository from "@/resources/wallet/repository/walletRepository";
import GetMeUsecase from "../usecases/getMeUsecase";
import { GetMeInterface } from "../interfaces/getMeInterface";

class UserFactory {
    private userDB;
    private SignupUsecase;
    private bcryptAdapter;
    private jwtAdapter;
    private LoginUsecase
    private GetMeUsecase;
    private walletDB;
    constructor() {
         this.userDB = new UserRepository()
         this.walletDB = new WalletRepository()
         this.bcryptAdapter = new BcryptAdapter(12)
         this.jwtAdapter = new JwtAdapter('secret', '30d')
         this.SignupUsecase = new SignupUsecase(this.bcryptAdapter, this.jwtAdapter, this.userDB, this.userDB, new CreateWalletUsecase(this.walletDB))
        this.LoginUsecase = new LoginUsecase(this.jwtAdapter, this.userDB, this.bcryptAdapter)
        this.GetMeUsecase = new GetMeUsecase(this.walletDB, this.walletDB)
    }

    async signup(user: User): Promise<SignupInterface.Response> {    
        try {
            const token = await this.SignupUsecase.execute(user)
            return token;
        } catch (error: any) {
            throw new HttpException(error.message, error.statusCode)
        }

    }

    async login(loginCredentials: LoginDTO): Promise<LoginInterface.Response> {
        try {
            const token = await this.LoginUsecase.execute(loginCredentials)
            return token
        } catch (error:any) {
            throw new HttpException(error.message, error.statusCode)
        }
    }

    async getAccount(user_id: GetMeInterface.Request): Promise<GetMeInterface.Response> {
        try {
            const accountWallet = this.GetMeUsecase.execute(user_id)
            return accountWallet
        } catch (error:any) {
            throw new HttpException(error.message, error.statusCode)
        }
    }
}

const userFactory = new UserFactory()

export default userFactory

