
import HttpException from "@/utils/exceptions/httpExceptions";
import Withdraw from "../../withdrawInterface";


export interface GetAllWithdrawRepository {
    getAll(
      account_no: GetAllWithdrawRepository.Request
    ): Promise<GetAllWithdrawRepository.Response>;
  }
  
  export namespace GetAllWithdrawRepository {
    export type Request = string;
    export type Response = Withdraw[] | HttpException;
  }