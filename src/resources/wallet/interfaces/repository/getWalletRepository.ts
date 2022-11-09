
import HttpException from "@/utils/exceptions/httpExceptions";
import Wallet from "../../walletInterface";


export interface GetWalletRepository {
    getWallet(
      account_no: GetWalletRepository.Request
    ): Promise<GetWalletRepository.Response>;
  }
  
  export namespace GetWalletRepository {
    export type Request = string;
    export type Response = Wallet | HttpException;
  }