//Route layer for Oktzy module (defining API endpoints)

import { Router } from 'express';
import { login, logout, register, fetchClips } from './oktzy.controller.js';
import { oktzyAuthRateLimiter, oktzyRateLimiter } from '../../middleware/oktzy/oktzyRateLimiter.js';
import { oktzyAuth } from '../../middleware/oktzy/oktzyAuth.js';

const router = Router();


// AUTH ROUTES
router.post('/login', oktzyAuthRateLimiter, login);
router.post('/register', oktzyAuthRateLimiter, register);
router.post('/logout', oktzyAuthRateLimiter, logout);


// CLIP ROUTES
router.get('/clips', oktzyAuth, oktzyRateLimiter, fetchClips);
export default router;