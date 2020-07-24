import express from 'express';
import verifyUser from '../middlewares/token.verify';
import postValidation from '../middlewares/post.validate';
import postController from '../controller/post.controller';

const createPost = postController;

const postRoute = express.Router();

postRoute.post('/createpost', postValidation, verifyUser, createPost);

export default postRoute;
