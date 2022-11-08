import User from "./userInterface";
import {createToken} from '@/utils/token'
import bcrypt from 'bcryptjs'
import UserDB from "./userPersistence";
import Wallet from "../wallet/walletInterface";
import { WalletDB } from "../wallet/walletPersistence";
import walletService from "../wallet/walletService";

class UserService {

    private userDB = new UserDB()

    /**
     * 
     * @param user - user data
     * @returns - newly created user
     */
    public async create (user: User): Promise<string | Error> {
        try {
            //hash user password
            user.password = await bcrypt.hash(user.password, 10)

            const newUser = await (this as any).userDB.insert(user)
            newUser.password = undefined

            walletService.create(newUser.id)

            const token = createToken(newUser)

            return token
        } catch (error:any) {
                throw new Error(error)
        }
    }

    /**
     * 
     * @param email - Users email address
     * @param password - users password
     * @returns access token and user details
     */
    public async login (email:string, password:string): Promise<string | Error> {
        try {
            const user = await this.userDB.get(email)

            console.log(user)

            if(!user) {
                throw new Error('email or password is not valid')
            }
            
            if(!(await this.comparePassword(user.password, password))) {
                throw new Error('email or password is not valid')
            }

            const token = createToken(user)

            return token
        } catch (error:any) {
            throw new Error(error)
        }
    }

    private async comparePassword(dbPassword: string, inputtedPassword: string): Promise<boolean> {
        return await bcrypt.compare(inputtedPassword, dbPassword)
    }

    public async getAccount(user_id: string): Promise<Wallet | void> {
        try {
            const walletDB = new WalletDB()
            const account_no = await walletDB.getAccountNo(user_id)
            const wallet = await walletDB.getWallet((account_no as string))
            return wallet
        } catch (error:any) {
            throw new Error(error)
        }
    }
}

export default UserService