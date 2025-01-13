import express from 'express'
import { login, signup } from '../Controllers/userController.js';

const router = express.Router();

//user
router.post('/auth/signup',signup);
router.post('/auth/login',login);

export default router