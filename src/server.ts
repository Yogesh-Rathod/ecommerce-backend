import envValidate from './utils/env-validate';
import * as dotenv from 'dotenv';
import * as path from 'path';
dotenv.load({ path: `.env.${process.env.NODE_ENV}` });

import UserController from './users/usersController';
import App from './application';
envValidate();

const app = new App([new UserController()]);

app.listen();
