/* eslint-disable no-console */
import express from 'express';
import validateUser from '../middlewares/user.validate';
import createUser from '../controller/user.controller';

const userRoute = express.Router();

userRoute.post('/signup', validateUser, createUser);

export default userRoute;
