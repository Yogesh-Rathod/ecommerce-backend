import * as postgres from 'pg';
// import query from '../utils/database';

const seedData = async _client => {
    const createTableText = `
        DROP TABLE IF EXISTS users;
        CREATE EXTENSION IF NOT EXISTS "pgcrypto";
        CREATE TABLE IF NOT EXISTS users (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            data JSONB
            );
        `;
    await _client.query(createTableText);
    const newUser = { email: 'YRATHOD101@gmail.com', password: 'yogeshr' };
    await _client.query('INSERT INTO users(data) VALUES($1)', [newUser]);
    const { rows } = await _client.query('SELECT * FROM users');
    console.log('USERS', rows);
};

export default seedData;
