import express from 'express';
import {body} from 'express-validator';
import { getSellerProfile, loginSeller, logoutSeller, registerSeller } from '../controllers/seller.controller.js';
import { authSeller } from '../middleware/auth.middleware.js';

const router= express.Router();

router.post('/register',[
        body('email').isEmail().withMessage('Please enter a valid email address'),
        body('password').isLength({min: 6}).withMessage('Password must be at least 6 characters long'),
        body('fullName.firstName').isLength({min: 3}).withMessage('First name must be at least 3 characters long'),
], registerSeller);

router.post('/login',[
    body('email').isEmail().withMessage('Please enter a valid email address'),
    body('password').isLength({min: 6}).withMessage('Password must be at least 6 characters long'),
], loginSeller);

router.get('/profile', authSeller, getSellerProfile);
router.get('/logout', authSeller, logoutSeller);

export default router;