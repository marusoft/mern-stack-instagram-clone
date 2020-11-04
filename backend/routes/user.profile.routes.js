import express from 'express';

import verifyUser from '../middlewares/token.verify';
import userProfile from '../controller/user-profile.controller';

const profileRoute = express.Router();

profileRoute.get('/userprofile/:id', verifyUser, userProfile);

export default profileRoute;
