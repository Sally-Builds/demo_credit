import 'dotenv/config';
import 'module-alias/register';
// import validateEnv from '@/utils/validateEnv';
import App from './app';

// controller imports below
// import UserController from '@/resources/user/user.controller';

// validateEnv();

const app = new App(
    [
        // new UserController(),
    ],
    Number(3000)
);

app.listen();