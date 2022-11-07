import User from "./userInterface";
import AuthCredentials from "@/utils/interfaces/authCredential.interface";
import {createToken} from '@/utils/token'
import bcrypt from 'bcryptjs'
import UserDB from "./userPersistence";
import HttpException from "@/utils/exceptions/httpExceptions";

class UserService {

    private userDB = new UserDB()

    /**
     * 
     * @param user - user data
     * @returns - newly created user
     */
    public async create (user: User): Promise<AuthCredentials | HttpException> {
        try {
            //hash user password
            user.password = await bcrypt.hash(user.password, 10)

            const newUser = await (this as any).userDB.insert(user)
            newUser.password = undefined

            console.log(newUser)

            const token = createToken(newUser)

            return {token, user: newUser}
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
    public async login (email:string, password:string): Promise<AuthCredentials | Error> {
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

            return {token, user}
        } catch (error:any) {
            throw new Error(error)
        }
    }

    async comparePassword(dbPassword: string, inputtedPassword: string): Promise<boolean> {
        return await bcrypt.compare(inputtedPassword, dbPassword)
    }
}

export default UserService