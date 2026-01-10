import express from 'express';
import cookieParser from 'cookie-parser';
import oktzyRouter from './modules/oktzy/oktzy.routes.js';
// import helmet from 'helmet'; 
// import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use('/api/oktzy', oktzyRouter);


export default app;