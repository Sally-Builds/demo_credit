import HttpException from "@/utils/exceptions/httpExceptions";


export interface UpdateBalanceRepository {
    updateBalance(
      account_no_and_new_balance: UpdateBalanceRepository.Request
    ): Promise<UpdateBalanceRepository.Response>;
  }
  
  export namespace UpdateBalanceRepository {
    export type Request = {account_no: string, new_balance: number};
    export type Response = void | HttpException;
  }