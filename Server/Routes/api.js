import express from 'express'
import { login, logout, profileRead, signup } from '../Controllers/userController.js';
import { authVerification } from '../Middlewares/authMiddleware.js';

const router = express.Router();

//user
router.post('/auth/signup',signup);
router.post('/auth/login',login);
router.get('/auth/logout',logout);

router.get('/auth/profile-read',authVerification,profileRead)

export default router