import * as express from 'express';
import Controller from '../interfaces/controller.interface';
import AddUserDTO from './users.dto';
import UserInterface from './usersInterface';
import * as postgres from 'pg';
import dbConfig from '../config/config';

class UserController implements Controller {
    public path = '/users';
    public router = express.Router();
    private client;

    constructor() {
        this.connectToDatabase();
        this.initializeRoutes();
    }

    private async connectToDatabase() {
        this.client = new postgres.Pool(dbConfig);
        await this.client.connect();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}/getAllUsers`, this.getAllUsers);
        this.router.post(`${this.path}/`, this.addUser);
    }

    private getAllUsers = async (
        req: express.Request,
        res: express.Response
    ) => {
        const { rows } = await this.client.query('SELECT * FROM users');
        res.send(rows);
    };

    private addUser = async (req: express.Request, res: express.Response) => {
        // console.log('req ');
        const userData: AddUserDTO = req.body;
        // try {

        // } catch (error) {

        // }
        // const { rows } = await this.client.query('SELECT * FROM users');
        res.send(userData);
    };
}

export default UserController;
