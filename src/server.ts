import envValidate from './utils/env-validate';
import * as dotenv from 'dotenv';
import * as path from 'path';
import App from './application';

dotenv.load({ path: `.env.${process.env.NODE_ENV}` });
envValidate();

const app = new App();

app.listen();
