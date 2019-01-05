import * as postgres from 'pg';

const seedData = async _client => {
    await _client.query('DROP TABLE IF EXISTS users');
    await _client.query(
        'CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY, email VARCHAR(150) NOT NULL, password VARCHAR(250) NOT NULL)'
    );
    await _client.query(
        `INSERT INTO users(id, email, password) VALUES(1, 'yogesh', 'yrathod101@gmail.com')`
    );
    const { rows } = await _client.query('SELECT * FROM users');
};

export default seedData;
