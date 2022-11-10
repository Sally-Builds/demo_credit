import { PasswordHashGenerate } from '../../interfaces/cryptography/passwordHash/passwordHashGenerate'
import { PasswordHashVerify } from '../../interfaces/cryptography/passwordHash/passwordHashVerify'
import bcrypt from 'bcryptjs'

export class BcryptAdapter implements PasswordHashGenerate, PasswordHashVerify {
  constructor (private readonly salt: number) {}

  async hash (password: string): Promise<string> {
    const hash = await bcrypt.hash(password, this.salt)
    return hash
  }

  async verify (dbPassword: string, inputtedPassword: string): Promise<boolean> {
    return await bcrypt.compare(inputtedPassword, dbPassword)
  }
}
