
import HttpException from '@/utils/exceptions/httpExceptions'
import { Credit } from '../../creditInterface'

export interface CreateCreditRepository {
    createCredit(
      credit_transaction_payload: CreateCreditRepository.Request
    ): Promise<CreateCreditRepository.Response>;
  }

export namespace CreateCreditRepository {
    export type Request = Omit<Credit, 'id'>;
    export type Response = Credit | HttpException;
  }
