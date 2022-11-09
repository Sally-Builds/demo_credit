
import HttpException from "@/utils/exceptions/httpExceptions";


export interface GetAccountNoRepository {
    getAccountNo(
      user_id: GetAccountNoRepository.Request
    ): Promise<GetAccountNoRepository.Response>;
  }
  
  export namespace GetAccountNoRepository {
    export type Request = string;
    export type Response = string | HttpException;
  }