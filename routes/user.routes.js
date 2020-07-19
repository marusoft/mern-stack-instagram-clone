/* eslint-disable no-console */
import express from 'express';
import userValidation from '../middlewares/user.validate';
import userController from '../controller/user.controller';
import verifyUser from '../middlewares/token.verify';

const { validateUserSignup, validateUserSignin } = userValidation;
const { createUser, loginUser, helloMarusoft } = userController;

const userRoute = express.Router();

userRoute.post('/signup', validateUserSignup, createUser);
userRoute.post('/signin', validateUserSignin, loginUser);
userRoute.post('/protected', verifyUser, helloMarusoft);

export default userRoute;
