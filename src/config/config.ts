const dbConfig = {
    user: process.env.POSTGRES_USERNAME,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    // port: 5432,
    ssl: true
};

export default dbConfig;
