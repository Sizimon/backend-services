import { Request, Response, NextFunction } from 'express';
import { logError, logWarn } from './logger.js';

// Custom error type
export interface AppError extends Error {
    statusCode?: number;
    isOperational?: boolean;
}

// Helper function to create custom errors
export const createError = (message: string, statusCode: number): AppError => {
    const error: AppError = new Error(message);
    error.statusCode = statusCode;
    error.isOperational = true;
    return error;
};

// Not found error handler
export const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
    logWarn(`Route not found: ${req.method} ${req.path}`, {
        ip: req.ip || req.socket.remoteAddress,
        userAgent: req.get('user-agent')
    });
    
    res.status(404).json({
        success: false,
        error: 'Route not found',
        path: req.path
    });
};

// Global error handler
export const errorHandler = (
    err: AppError,
    req: Request,
    res: Response,
    _next: NextFunction
) => {
    // Default error
    let statusCode = err.statusCode || 500;
    let message = err.message || 'Internal server error';

    // Handle specific error types
    if (err.name === 'ValidationError') {
        statusCode = 400;
        message = err.message;
    }

    if (err.name === 'UnauthorizedError' || err.message.includes('Invalid credentials')) {
        statusCode = 401;
        message = err.message;
    }

    if (err.message.includes('Email already in use')) {
        statusCode = 409;
        message = err.message;
    }

    if (err.message.includes('Not found')) {
        statusCode = 404;
        message = err.message;
    }

    // Log error with appropriate level
    if (statusCode >= 500) {
        logError(`Server error: ${message}`, {
            path: req.path,
            method: req.method,
            statusCode,
            stack: err.stack,
            ip: req.ip || req.socket.remoteAddress,
            userAgent: req.get('user-agent')
        });
    } else {
        logWarn(`Client error: ${message}`, {
            path: req.path,
            method: req.method,
            statusCode,
            ip: req.ip || req.socket.remoteAddress
        });
    }

    // Send error response
    res.status(statusCode).json({
        success: false,
        error: message,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
};