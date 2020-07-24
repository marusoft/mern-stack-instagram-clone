/* eslint-disable no-console */
import express from 'express';
import userValidation from '../middlewares/user.validate';
import userController from '../controller/user.controller';

const { validateUserSignup, validateUserSignin } = userValidation;
const { createUser, loginUser } = userController;

const userRoute = express.Router();

userRoute.post('/signup', validateUserSignup, createUser);
userRoute.post('/signin', validateUserSignin, loginUser);

export default userRoute;
