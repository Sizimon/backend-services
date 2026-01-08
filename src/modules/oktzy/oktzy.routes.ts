// Routes define your API endpoints and handle HTTP routing. They map URLs to controller functions.
/* 
EXAMPLE:
router.post('/login', validateRequest, login);
router.get('/profile', authenticate, getProfile);
*/

import { Router } from 'express';
import { login, logout, register } from './oktzy.controller.js';
import { oktzyAuthRateLimiter } from '../../middleware/oktzy/oktzyRateLimiter.js';
// import { oktzyAuth } from '../../middleware/oktzy/oktzyAuth.js';

const router = Router();

router.post('/login', oktzyAuthRateLimiter, login);
router.post('/register', oktzyAuthRateLimiter, register);
router.post('/logout', oktzyAuthRateLimiter, logout);
export default router;