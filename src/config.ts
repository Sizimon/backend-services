type Config = {
    port: number;
    host: string;
    dbUrl: string;
}

export const config: Config = {
    port: 5050,
    host: 'localhost',
    dbUrl: process.env.DATABASE_URL || ''
}