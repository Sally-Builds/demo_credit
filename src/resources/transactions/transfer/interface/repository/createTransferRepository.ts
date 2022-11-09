
import HttpException from "@/utils/exceptions/httpExceptions";
import Transfer from "../../transferInterface";


export interface CreateTransferRepository {
    createTransfer(
      transfer_transaction_payload: CreateTransferRepository.Request
    ): Promise<CreateTransferRepository.Response>;
  }
  
  export namespace CreateTransferRepository {
    export type Request = Omit<Transfer, 'id'>;
    export type Response = Transfer | HttpException;
  }