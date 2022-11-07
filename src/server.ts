import 'dotenv/config';
import 'module-alias/register';
// import validateEnv from '@/utils/validateEnv';
import App from './app';

import WalletService from './resources/wallet/walletService';
// controller imports below
import UserController from './resources/users/userController';
import CreditController from './resources/transactions/credit/creditController';
import WithdrawController from './resources/transactions/withdraw/withdrawController';

// validateEnv();

new WalletService()
const app = new App(
    [
        new UserController(),
        new CreditController(),
        new WithdrawController(),
    ],
    Number(3000)
);

app.listen();