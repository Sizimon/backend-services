type Config = {
    port: number;
    host: string;
    dbUrl: string;
}

export const config: Config = {
    port: 3000,
    host: 'localhost',
    dbUrl: 'mongodb://localhost:27017/myapp' // change later ALL
}