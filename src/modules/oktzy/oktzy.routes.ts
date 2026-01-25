//Route layer for Oktzy module (defining API endpoints)

import { Router } from 'express';
import { login, logout, register, me, fetchClips, createNewClip, updateClipDetails, deleteClipById  } from './oktzy.controller.js';
import { oktzyAuthRateLimiter, oktzyRateLimiter } from '../../middleware/oktzy/oktzyRateLimiter.js';
import { oktzyAuth } from '../../middleware/oktzy/oktzyAuth.js';

const router = Router();


// AUTH ROUTES
router.post('/auth/login', oktzyAuthRateLimiter, login);
router.post('/auth/register', oktzyAuthRateLimiter, register);
router.post('/auth/logout', oktzyAuthRateLimiter, logout);
router.get('/auth/me', oktzyAuth, oktzyRateLimiter, me);


// CLIP ROUTES
router.get('/clips/fetch', oktzyAuth, oktzyRateLimiter, fetchClips);
router.post('/clips/create', oktzyAuth, oktzyRateLimiter, createNewClip);
router.put('/clips/update/:clipId', oktzyAuth, oktzyRateLimiter, updateClipDetails);
router.delete('/clips/delete/:clipId', oktzyAuth, oktzyRateLimiter, deleteClipById);

export default router;