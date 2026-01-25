import { Request, Response, NextFunction } from 'express';
// import { loginUser, registerUser, getUserClips, getUserById } from './oktzy.service.js';
import { setSessionCookie, clearSessionCookie } from '../../middleware/noto/notoAuth.js';