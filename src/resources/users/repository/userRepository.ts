import { v4 as uuidv4 } from 'uuid'
import { GetUserByEmailRepository } from '../interfaces/repository/getUserByEmailRepository'
import { CreateUserRepository } from '../interfaces/repository/createUserRepository'
import db from '@/utils/dbConfig/dbConnection'
import User from '../userInterface'
import HttpException from '@/utils/exceptions/httpExceptions'

export default class UserRepository implements GetUserByEmailRepository, CreateUserRepository {
  async getUserByEmail (email: string): Promise<GetUserByEmailRepository.Response> {
    try {
      const user = await db('users').whereRaw('email = ?', email)
      return user[0]
    } catch (error) {
      throw new HttpException('something went wrong', 500)
    }
  }

  async createUser (user: CreateUserRepository.Request): Promise<CreateUserRepository.Response> {
    try {
      await db('users').insert({ ...user, id: uuidv4() })
      const newUser = await this.getUserByEmail(user.email)
      return (newUser as User)
    } catch (error:any) {
      console.log(error)
      throw new HttpException('Oops!!! something went wrong', 500)
    }
  }

  public async getById (id: string): Promise<User | void> {
    try {
      const user = await db('users').whereRaw('id = ?', id)
      return user[0]
    } catch (error) {
      null
    }
  }
}
