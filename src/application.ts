import * as express from 'express';
import * as expressSession from 'express-session';
import * as bodyParser from 'body-parser';
import * as helmet from 'helmet';
import * as morgan from 'morgan';
import * as compression from 'compression';
import * as errorhandler from 'errorhandler';
import * as passport from 'passport';
import * as expressValidator from 'express-validator';
import * as postgres from 'pg';
import * as methodOverride from 'method-override';

import Controller from './interfaces/controller.interface';
import dbConfig from './config/config';
import seedPostgres from './utils/seed-data';

const app = express();

class App {
    public app: express.Application;

    constructor(controllers: Controller[]) {
        this.app = express();

        this.connectToDatabase();
        this.initializeMiddlewares();
        this.initializeControllers(controllers);
    }

    private async connectToDatabase() {
        const client = new postgres.Pool(dbConfig);
        await client.connect();
        // Seed Postgres with dummy data
        if (process.env.NODE_ENV === 'development') {
            seedPostgres(client);
        }
    }

    private initializeMiddlewares() {
        this.app.use(bodyParser.json());
        this.app.use(
            bodyParser.urlencoded({
                extended: true
            })
        );
        this.app.use(methodOverride());
        this.app.use(morgan('dev'));
        this.app.use(
            expressSession({
                resave: true,
                saveUninitialized: true,
                secret: process.env.SESSION_SECRET,
                cookie: { secure: true, maxAge: 1209600000 }
            })
        );
        this.app.use(helmet());
        this.app.use(compression());
        this.app.use(passport.initialize());
        this.app.use(passport.session());
        this.app.use(expressValidator());

        if (process.env.NODE_ENV === 'development') {
            // only use in development
            this.app.use(errorhandler());
        } else {
            this.app.use((err, req, res, next) => {
                console.error(err);
                res.status(500).send('Server Error');
            });
        }
    }

    private initializeControllers(controllers: Controller[]) {
        controllers.forEach(controller => {
            this.app.use('/', controller.router);
        });
    }

    public listen() {
        this.app.listen(process.env.PORT, () => {
            console.log(`App listening on the port ${process.env.PORT}`);
        });
    }
}

export default App;
