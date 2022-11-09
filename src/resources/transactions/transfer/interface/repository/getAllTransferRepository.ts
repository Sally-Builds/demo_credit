
import HttpException from "@/utils/exceptions/httpExceptions";
import Transfer from "../../transferInterface";


export interface GetAllTransferRepository {
    getAll(
      account_no: GetAllTransferRepository.Request
    ): Promise<GetAllTransferRepository.Response>;
  }
  
  export namespace GetAllTransferRepository {
    export type Request = string;
    export type Response = Transfer[] | HttpException;
  }