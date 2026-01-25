// Control layer for Oktzy (handling HTTP requests and responses)

import { Request, Response, NextFunction } from 'express';
import { loginUser, registerUser, getUserClips, getUserById, addClip, editClip, removeClip } from './oktzy.service.js';
import { setSessionCookie, clearSessionCookie } from '../../middleware/oktzy/oktzyAuth.js';

// AUTH CONTROLLERS

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const user = await loginUser(email, password); // Call service
    setSessionCookie(res, {
      id: user.id,
      email: user.email,
      username: user.username,
    });
    res.status(200).json({ message: 'Login successful' });
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
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    next(error);
  }
}

export const logout = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    clearSessionCookie(res);
    res.json({ success: true, message: 'Logged out successfully' });
  } catch (error) {
    next(error);
  }
};


export const me = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;
    const user = await getUserById(Number(userId)); // Call service
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    
    res.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
      }
    });
  } catch (error) {
    next(error);
  }
};

// CLIP CONTROLLERS
export const fetchClips = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;
    const clips = await getUserClips(Number(userId)); // Call service
    res.json({ success: true, data: clips });
  } catch (error) {
    next(error);
  }
};

export const createNewClip = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;
    const { title, url, timestamps } = req.body;
    const newClip = await addClip(Number(userId), title, url, timestamps); // Call service
    res.status(201).json({ success: true, data: newClip });
  } catch (error) {
    next(error);
  }
};

export const updateClipDetails = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;
    const clipId = Number(req.params.clipId);
    const { title, timestamps } = req.body;
    const updatedClip = await editClip(Number(userId), clipId, title, timestamps);
    res.json({ success: true, data: updatedClip });
  } catch (error) {
    next(error);
  }
};

export const deleteClipById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;
    const clipId = Number(req.params.clipId);
    const deletedClip = await removeClip(Number(userId), clipId);
    res.json({ success: true, data: deletedClip });
  } catch (error) {
    next(error);
  }
}

