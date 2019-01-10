import envValidate from './utils/env-validate';
import * as dotenv from 'dotenv';
dotenv.load({ path: `.env.${process.env.NODE_ENV}` });

import UserController from './users/usersController';
import ProductsController from './products/products.controller';
import App from './application';
envValidate();

const app = new App([new UserController(), new ProductsController()]);

app.listen();
