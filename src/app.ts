import express from 'express';
import cookieParser from 'cookie-parser';
import oktzyRouter from './modules/oktzy/oktzy.routes.js';
import { errorHandler, notFoundHandler } from './middleware/common/errorHandler.js';
// import helmet from 'helmet'; 
import cors from 'cors';

const app = express();

app.set('trust proxy', 1);

// Cors configuration to allow all subdomains of head domain.
app.use(cors({
    origin: function(origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        
        if (origin.match(/^https?:\/\/(.+\.)?szymonsamus\.dev$/)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
}));

app.use(express.json());
app.use(cookieParser());
app.use('/api/oktzy', oktzyRouter);

// Error handling middleware
app.use(notFoundHandler);
app.use(errorHandler);
export default app;