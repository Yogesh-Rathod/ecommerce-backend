import * as postgres from 'pg';
import config from '../config/config';

const pool = new postgres.Pool(config);

export default pool;
