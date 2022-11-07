import db from "@/utils/dbConfig/dbConnection";
import User from "./userInterface";

export default class UserDB {
    constructor() {}

    public async insert(user: User): Promise<User | Error> {
        try {
            await db('users').insert(user)
            return this.get(user.email) 
        } catch (error:any) {
            const duplicateField = error.sqlMessage.split(" ").pop().split(".")[1].split("_")[1]
            if(error.errno == 1062) {
                throw new Error(`${duplicateField} already exist`)
            }
            throw new Error(error)
        }
    }

    public async get(email: string): Promise<User> {
        const user = await db('users').whereRaw('email = ?', email)
        return user[0];
    }
}