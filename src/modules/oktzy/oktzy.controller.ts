// Controllers handle HTTP request/response logic. They're the bridge between HTTP and your business logic.
/* 
Example: 
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await loginUser(email, password); // Call service
    res.json({ success: true, data: result }); // Send response
  } catch (error) {
    next(error);
  }
};
*/

import { Request, Response, NextFunction } from 'express';
import { loginUser, registerUser } from './oktzy.service.js';

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const result = await loginUser(email, password); // Call service
    res.json({ success: true, data: result }); // Send response
  } catch (error) {
    next(error);
  }
};

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, username, password } = req.body;
    const result = await registerUser(email, username, password); // Call service
    res.json({ success: true, data: result }); // Send response
  } catch (error) {
    next(error);
  }
}
