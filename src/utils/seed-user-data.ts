import query from './database';

const seedData = async () => {
    const createTableText = `
        DROP TABLE IF EXISTS users;
        CREATE EXTENSION IF NOT EXISTS "pgcrypto";
        CREATE TABLE IF NOT EXISTS users (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            email text not null unique,
            password text not null
            );
        `;
    await query(createTableText);
    const newUser = ['YRATHOD101@gmail.com', 'yogeshr'];
    await query('INSERT INTO users(email, password) VALUES($1, $2)', newUser);
    const { rows } = await query('SELECT * FROM users');
    console.log('USERS', rows);
};

export default seedData;
