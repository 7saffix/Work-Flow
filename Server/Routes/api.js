import express from 'express'
import { emailVerify, login, logout, otpVerify, profileRead, profileUpdate, resetPassword, signup } from '../Controllers/userController.js';
import { authVerification } from '../Middlewares/authMiddleware.js';
import { countTask, createTask, deleteTask, listByTaskStatus, updateTaskStatus } from '../Controllers/taskController.js';

const router = express.Router();

//user api
router.post('/auth/signup',signup);
router.post('/auth/login',login);
router.get('/auth/logout',logout);

router.get('/auth/profile-read',authVerification,profileRead);
router.post('/auth/profile-update',authVerification,profileUpdate);

router.post('/auth/emailVerify',emailVerify);
router.post('/auth/otpVerify',otpVerify);
router.post('/auth/resetPassword/:email',resetPassword);

//task api
router.post('/createTask',authVerification,createTask);
router.post('/updateTaskStatus/:id/:status',authVerification,updateTaskStatus);
router.delete('/deleteTask/:id',authVerification,deleteTask);
router.get('/taskListByStatus/:status',authVerification,listByTaskStatus);
router.get('/countTask',authVerification,countTask);

export default router