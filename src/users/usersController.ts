import * as express from 'express';
import * as jwt from 'jsonwebtoken';

import Controller from '../interfaces/controller.interface';
import AddUserDTO from './users.dto';
import UserInterface from './usersInterface';
import query from '../utils/database';
import validationMiddleware from '../middlewares/validation.middleware';
import UserWithThatEmailAlreadyExistsException from '../middlewares/UserWithThatEmailAlreadyExistsException';
import LogInDto from './logIn.dto';

class UserController implements Controller {
    public path = '/users';
    public router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}/getAllUsers`, this.getAllUsers);
        this.router.post(
            `${this.path}/`,
            validationMiddleware(AddUserDTO),
            this.addUser
        );
        this.router.post(
            `${this.path}/login`,
            validationMiddleware(LogInDto),
            this.logIn
        );
    }

    private getAllUsers = async (
        req: express.Request,
        res: express.Response
    ) => {
        const { rows } = await query('SELECT * FROM users');
        return res.send(rows);
    };

    private addUser = async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) => {
        try {
            const userData: AddUserDTO = req.body;
            // Check if email available
            const queryString = `SELECT * from users WHERE data->>'email'=$1 FETCH FIRST ROW ONLY`,
                values = [req.body.email];
            const { rows } = await query(queryString, values);
            if (rows && rows.length) {
                next(
                    new UserWithThatEmailAlreadyExistsException(userData.email)
                );
            } else {
                const queryString =
                    'INSERT INTO users(data) VALUES($1) RETURNING *';
                const values = [userData];
                const { rows } = await query(queryString, values);
                res.status(200).send(rows);
            }
        } catch (error) {
            console.log('error ', error);
            res.status(400).send(error);
        }
    };

    private logIn = async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) => {
        try {
            const logInData: LogInDto = req.body;
            const queryString = `SELECT * from users WHERE data->>'email'=$1 FETCH FIRST ROW ONLY`,
                values = [req.body.email];
            const { rows } = await query(queryString, values);
            console.log('rows ', rows);
            if (rows && rows.length) {
                const checkPassword =
                    rows[0].data.password === logInData.password;
                if (checkPassword) {
                    res.send('Login Successfull');
                } else {
                    res.send('Login Failed Password Not matching');
                }
            }
        } catch (error) {
            console.log('error ', error);
        }
    };
}

export default UserController;
