import fs from 'fs'
import express, { Application } from 'express';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import Controller from '@/utils/interfaces/Controller.interface';
import ErrorMiddleware from '@/middleware/error.middleware';
import makeTable from './utils/dbConfig/makeTables';

class App {
    public port: number;
    public app: Application;

    constructor(controllers: Controller[], port: number) {
        this.port = port;
        this.app = express();
        this.initializeMiddleware();
        this.initializeControllers(controllers);
        this.initializeDB();
        // this.intializeErrorHandler();
    }

    private initializeMiddleware() {
        this.app.use(cors());
        this.app.use(compression());
        this.app.use(morgan('dev'));
        this.app.use(helmet());
        this.app.use(cookieParser());
        this.app.use(bodyParser.json());

        this.app.use(bodyParser.urlencoded({ extended: true }));
    }

    private initializeControllers(controllers: Controller[]) {
        controllers.map((controller: Controller) => {
            this.app.use('/api', controller.router);
        });
    }

    // private intializeErrorHandler() {
    //     this.app.use(ErrorMiddleware);
    // }

    private initializeDB() {
        makeTable().then(() => {
            console.log('Database connected')
        }).catch((e) => {
            console.log(e)
        })
    }


    public listen() {
        this.app.listen(this.port, () => {
            console.log(`Application running on port ${this.port}`);
        });
    }
}

export default App;