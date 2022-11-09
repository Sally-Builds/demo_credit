import HttpException from "@/utils/exceptions/httpExceptions";


export interface CreateWalletRepository {
    createWallet(
      walletCred: CreateWalletRepository.Request
    ): Promise<CreateWalletRepository.Response>;
  }
  
  export namespace CreateWalletRepository {
    export type Request = {balance: number, user_id: string, account_no: string};
    export type Response = void | HttpException;
  }