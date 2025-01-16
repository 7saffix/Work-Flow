import express from 'express'
import { emailVerify, login, logout, otpVerify, profileRead, profileUpdate, resetPassword, signup } from '../Controllers/userController.js';
import { authVerification } from '../Middlewares/authMiddleware.js';

const router = express.Router();

//user
router.post('/auth/signup',signup);
router.post('/auth/login',login);
router.get('/auth/logout',logout);

router.get('/auth/profile-read',authVerification,profileRead);
router.post('/auth/profile-update',authVerification,profileUpdate);

router.post('/auth/emailVerify',emailVerify);
router.post('/auth/otpVerify',otpVerify);
router.post('/auth/resetPassword/:email',resetPassword);

export default router