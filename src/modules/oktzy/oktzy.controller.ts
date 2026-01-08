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
import { loginUser, registerUser, getUserClips } from './oktzy.service.js';
import { setSessionCookie, clearSessionCookie } from '../../middleware/oktzy/oktzyAuth.js';

// Auth Controllers

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const user = await loginUser(email, password); // Call service
    setSessionCookie(res, {
      id: user.id,
      email: user.email,
      username: user.username,
    });
    res.json({
      success: true,
      data: {
        id: user.id,
        email: user.email,
        username: user.username,
      }
    });
  } catch (error) {
    next(error);
  }
};

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, username, password } = req.body;
    const user = await registerUser(email, username, password); // Call service
    setSessionCookie(res, {
      id: user.id,
      email: user.email,
      username: user.username,
    });
    res.json({
      success: true,
      data: {
        id: user.id,
        email: user.email,
        username: user.username,
      }
    }); // Send response
  } catch (error) {
    next(error);
  }
}

export const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    clearSessionCookie(res);
    res.json({ success: true, message: 'Logged out successfully' });
  } catch (error) {
    next(error);
  }
};

// Clip Controllers

export const fetchClips = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;
    const clips = await getUserClips(Number(userId)); // Call service
    res.json({ success: true, data: clips });
  } catch (error) {
    next(error);
  }
};