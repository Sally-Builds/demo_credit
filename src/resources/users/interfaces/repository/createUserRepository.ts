import User from "@/resources/users/userInterface";
import HttpException from "@/utils/exceptions/httpExceptions";


export interface CreateUserRepository {
    createUser(
      user: CreateUserRepository.Request
    ): Promise<CreateUserRepository.Response>;
  }
  
  export namespace CreateUserRepository {
    export type Request = Omit<User, 'id'>;
    export type Response = User | HttpException;
  }