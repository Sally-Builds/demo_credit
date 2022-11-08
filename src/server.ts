import 'dotenv/config';
import 'module-alias/register';
// import validateEnv from '@/utils/validateEnv';
import App from './app';

// controller imports below
import UserController from './resources/users/userController';
import CreditController from './resources/transactions/credit/creditController';
import WithdrawController from './resources/transactions/withdraw/withdrawController';
import TransferController from './resources/transactions/transfer/transferController';

// validateEnv();

const app = new App(
    [
        new UserController(),
        new CreditController(),
        new WithdrawController(),
        new TransferController()
    ],
    Number(3000)
);

app.listen();