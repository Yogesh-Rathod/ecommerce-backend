import { cleanEnv, port, str } from 'envalid';

const envValidate = () => {
    cleanEnv(process.env, {
        JWT_SECRET: str(),
        SESSION_SECRET: str(),
        PORT: port()
    });
};

export default envValidate;
