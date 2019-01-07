import * as postgres from 'pg';
import query from './database';

const seedData = async () => {
    const createTableText = `
        DROP TABLE IF EXISTS users;
        CREATE EXTENSION IF NOT EXISTS "pgcrypto";
        CREATE TABLE IF NOT EXISTS users (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            userinfo JSONB,
            cartinfo JSONB
            );
        `;
    await query(createTableText);
    const newUser = { email: 'YRATHOD101@gmail.com', password: 'yogeshr' };
    await query('INSERT INTO users(userinfo, cartinfo) VALUES($1, $2)', [
        newUser,
        { cartItems: {} }
    ]);
    const { rows } = await query('SELECT * FROM users');
    console.log('USERS', rows);
};

export default seedData;
