import * as postgres from 'pg';
import config from '../config/config';

const pool = new postgres.Pool(config);

const query = (text, params?, callback?) => {
    console.log('query ', text);
    return pool.query(text, params, callback);
};

export default query;
