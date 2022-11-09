import HttpException from "@/utils/exceptions/httpExceptions";


export interface GetBalanceRepository {
    getBalance(
      account_no: GetBalanceRepository.Request
    ): Promise<GetBalanceRepository.Response>;
  }
  
  export namespace GetBalanceRepository {
    export type Request = string;
    export type Response = number | HttpException;
  }