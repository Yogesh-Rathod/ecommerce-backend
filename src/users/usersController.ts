import * as express from 'express';
import Controller from '../interfaces/controller';
import AddUserDTO from './users.dto';
import UserInterface from './usersInterface';

class UserController implements Controller {
    public path = '/users';
    public router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(`${this.path}/`, this.addUser);
    }

    private addUser = async (
        request: express.request,
        response: express.Response
    ) => {
        const userData: AddUserDTO = request.body;
    };
}

export default UserController;
