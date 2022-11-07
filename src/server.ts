import 'dotenv/config';
import 'module-alias/register';
// import validateEnv from '@/utils/validateEnv';
import App from './app';

// controller imports below
import UserController from './resources/users/userController';
import WalletService from './resources/wallet/walletService';

// validateEnv();

new WalletService()
const app = new App(
    [
        new UserController(),
    ],
    Number(3000)
);

app.listen();