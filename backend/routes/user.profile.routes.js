import express from 'express';

import verifyUser from '../middlewares/token.verify';
import userProfileController from '../controller/user-profile.controller';

const {
  userProfile, follow, unFollow, updatePhoto,
} = userProfileController;

const profileRoute = express.Router();

profileRoute.get('/userprofile/:id', verifyUser, userProfile);
profileRoute.put('/follow', verifyUser, follow);
profileRoute.put('/unfollow', verifyUser, unFollow);
profileRoute.put('/updatephoto', verifyUser, updatePhoto);

export default profileRoute;
