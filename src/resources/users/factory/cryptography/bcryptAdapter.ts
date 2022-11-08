import { PasswordHashGenerate } from "../../interfaces/cryptography/passwordHash/passwordHashGenerate";
import { PasswordHashVerify } from "../../interfaces/cryptography/passwordHash/passwordHashVerify";
import bcrypt from 'bcryptjs'

export class BcryptAdapter implements PasswordHashGenerate, PasswordHashVerify {

    constructor (private readonly salt: number) {}

    async hash(password: string): Promise<string> {
        return  await bcrypt.hash(password, this.salt)
    }

    async verify(password: string, userPassword: string): Promise<boolean> {
        return await bcrypt.compare(password, userPassword)
    }
}