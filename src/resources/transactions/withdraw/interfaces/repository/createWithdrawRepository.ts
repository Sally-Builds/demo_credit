
import HttpException from "@/utils/exceptions/httpExceptions";
import Withdraw from "../../withdrawInterface";


export interface CreateWithdrawRepository {
    createWithdraw(
      debit_transaction_payload: CreateWithdrawRepository.Request
    ): Promise<CreateWithdrawRepository.Response>;
  }
  
  export namespace CreateWithdrawRepository {
    export type Request = Omit<Withdraw, 'id'>;
    export type Response = Withdraw | HttpException;
  }