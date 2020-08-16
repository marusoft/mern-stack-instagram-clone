/* eslint-disable no-underscore-dangle */
import express from 'express';

import verifyUser from '../middlewares/token.verify';
import postValidation from '../middlewares/post.validate';
import postController from '../controller/post.controller';

const { createPost, getAllPost, userPost } = postController;

const postRoute = express.Router();

postRoute.get('/posts', getAllPost);
postRoute.post('/createpost', postValidation, verifyUser, createPost);
postRoute.get('/userpost', verifyUser, userPost);

export default postRoute;
