import { SignupInterface } from '../interfaces/signupInterface'
import { JwtGenerate } from '../interfaces/cryptography/jwt/jwtGenerate'
import { PasswordHashGenerate } from '../interfaces/cryptography/passwordHash/passwordHashGenerate'
import HttpException from '@/utils/exceptions/httpExceptions'
import { GetUserByEmailRepository } from '../interfaces/repository/getUserByEmailRepository'
import { CreateUserRepository } from '../interfaces/repository/createUserRepository'
import User from '../userInterface'
import CreateWalletUsecase from '@/resources/wallet/usecase/createWalletUsecase'

export default class SignupUsecase implements SignupInterface {
  constructor (
        private readonly passwordHash: PasswordHashGenerate,
        private readonly jwtGenerate: JwtGenerate,
        private readonly getUserByEmailRepository: GetUserByEmailRepository,
        private readonly createUserRepository: CreateUserRepository,
        private readonly createWalletUsecase: CreateWalletUsecase
  ) {}

  async execute (user: SignupInterface.Request): Promise<SignupInterface.Response> {
    try {
      // check if email exist

      if (await this.getUserByEmailRepository.getUserByEmail(user.email)) {
        throw new HttpException('email already exist', 400)
      }

      // check if password is upto 8 characters
      if (user.password.length < 8) {
        throw new HttpException('password must be greater than 8', 400)
      }

      // hash password
      user.password = await this.passwordHash.hash(user.password)

      // store user
      const newUser = await this.createUserRepository.createUser(user)

      console.log(newUser)

      // create wallet for user
      await this.createWalletUsecase.execute((newUser as User).id)

      // generate token
      const token = this.jwtGenerate.sign((newUser as User).id)

      // return token
      return await token
    } catch (error:any) {
      throw new HttpException(error.message, error.statusCode)
    }
  }
}
