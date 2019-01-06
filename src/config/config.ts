const dbConfig = {
    user: process.env.POSTGRES_USERNAME,
    host: process.env.POSTGRES_HOST,
    database: 'ecommerce',
    password: process.env.POSTGRES_PASSWORD,
    port: 5432
};

export default dbConfig;
