import { Request, Response, NextFunction } from 'express';

// ANSI color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  
  // Method colors
  GET: '\x1b[32m',      // Green
  POST: '\x1b[33m',     // Yellow
  PUT: '\x1b[36m',      // Cyan
  DELETE: '\x1b[31m',   // Red
  PATCH: '\x1b[35m',    // Magenta
  
  // Status colors
  success: '\x1b[32m',  // Green (2xx)
  redirect: '\x1b[36m', // Cyan (3xx)
  clientError: '\x1b[33m', // Yellow (4xx)
  serverError: '\x1b[31m', // Red (5xx)
};

const getStatusColor = (status: number): string => {
  if (status >= 500) return colors.serverError;
  if (status >= 400) return colors.clientError;
  if (status >= 300) return colors.redirect;
  if (status >= 200) return colors.success;
  return colors.reset;
};

const getMethodColor = (method: string): string => {
  return colors[method as keyof typeof colors] || colors.reset;
};

export const logger = (req: Request, res: Response, next: NextFunction): void => {
  const startTime = Date.now();
  
  // Log when response finishes
  res.on('finish', () => {
    const duration = Date.now() - startTime;
    const method = req.method;
    const url = req.originalUrl || req.url;
    const status = res.statusCode;
    const ip = req.ip || req.socket.remoteAddress || 'unknown';
    
    // Skip health check logs in production
    if (process.env.NODE_ENV === 'production' && url === '/health') {
      return;
    }
    
    const methodColor = getMethodColor(method);
    const statusColor = getStatusColor(status);
    const timestamp = new Date().toISOString();
    
    // Format: [timestamp] METHOD /path STATUS duration ms - IP
    console.log(
      `${colors.dim}[${timestamp}]${colors.reset} ` +
      `${methodColor}${method.padEnd(7)}${colors.reset} ` +
      `${url.padEnd(30)} ` +
      `${statusColor}${status}${colors.reset} ` +
      `${colors.dim}${duration}ms${colors.reset} ` +
      `${colors.dim}- ${ip}${colors.reset}`
    );
    
    // Log errors with more detail
    if (status >= 400) {
      console.error(
        `${colors.serverError}[ERROR]${colors.reset} ` +
        `${method} ${url} - Status: ${status} - IP: ${ip}`
      );
    }
  });
  
  next();
};

// Advanced logger with different log levels
export class Logger {
  private static log(level: 'INFO' | 'WARN' | 'ERROR' | 'DEBUG', message: string, meta?: any): void {
    const timestamp = new Date().toISOString();
    const color = {
      INFO: '\x1b[36m',    // Cyan
      WARN: '\x1b[33m',    // Yellow
      ERROR: '\x1b[31m',   // Red
      DEBUG: '\x1b[35m',   // Magenta
    }[level];
    
    console.log(
      `${colors.dim}[${timestamp}]${colors.reset} ` +
      `${color}[${level}]${colors.reset} ` +
      `${message}`
    );
    
    if (meta) {
      console.log(JSON.stringify(meta, null, 2));
    }
  }
  
  static info(message: string, meta?: any): void {
    this.log('INFO', message, meta);
  }
  
  static warn(message: string, meta?: any): void {
    this.log('WARN', message, meta);
  }
  
  static error(message: string, meta?: any): void {
    this.log('ERROR', message, meta);
  }
  
  static debug(message: string, meta?: any): void {
    if (process.env.NODE_ENV !== 'production') {
      this.log('DEBUG', message, meta);
    }
  }
}