import * as express from 'express';
import * as expressSession from 'express-session';
import * as bodyParser from 'body-parser';
import * as helmet from 'helmet';
import * as morgan from 'morgan';
import * as compression from 'compression';
import * as errorhandler from 'errorhandler';
import * as passport from 'passport';
import * as expressValidator from 'express-validator';

const app = express();

class App {
    public app: express.Application;

    constructor() {
        this.app = express();
        this.initializeMiddlewares();
    }

    private initializeMiddlewares() {
        app.use(bodyParser.json());
        app.use(
            expressSession({
                resave: true,
                saveUninitialized: true,
                secret: process.env.SESSION_SECRET,
                cookie: { secure: true, maxAge: 1209600000 }
            })
        );
        app.use(helmet());
        app.use(morgan('dev'));
        app.use(compression());
        app.use(passport.initialize());
        app.use(passport.session());
        app.use(expressValidator());

        if (process.env.NODE_ENV === 'development') {
            // only use in development
            app.use(errorhandler());
        } else {
            app.use((err, req, res, next) => {
                console.error(err);
                res.status(500).send('Server Error');
            });
        }
    }

    public listen() {
        this.app.listen(process.env.PORT, () => {
            console.log(`App listening on the port ${process.env.PORT}`);
        });
    }
}

export default App;
