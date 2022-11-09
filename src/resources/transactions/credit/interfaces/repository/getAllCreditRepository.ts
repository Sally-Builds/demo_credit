
import HttpException from "@/utils/exceptions/httpExceptions";
import { Credit } from "../../creditInterface";


export interface GetAllCreditRepository {
    getAll(
      account_no: GetAllCreditRepository.Request
    ): Promise<GetAllCreditRepository.Response>;
  }
  
  export namespace GetAllCreditRepository {
    export type Request = string;
    export type Response = Credit[] | HttpException;
  }