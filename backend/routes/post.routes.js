/* eslint-disable no-underscore-dangle */
import express from 'express';

import verifyUser from '../middlewares/token.verify';
import postValidation from '../middlewares/post.validate';
import postController from '../controller/post.controller';

const {
  createPost, getAllPost, userPost, likePost, unLikePost, commentPost,
} = postController;

const postRoute = express.Router();

postRoute.get('/posts', verifyUser, getAllPost);
postRoute.post('/createpost', postValidation, verifyUser, createPost);
postRoute.get('/userpost', verifyUser, userPost);
postRoute.put('/likepost', verifyUser, likePost);
postRoute.put('/unlikepost', verifyUser, unLikePost);
postRoute.put('/commentpost', verifyUser, commentPost);

export default postRoute;
