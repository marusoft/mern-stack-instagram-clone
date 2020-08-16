/* eslint-disable no-underscore-dangle */
import mongoose from 'mongoose';

const Post = mongoose.model('Post');

const createPost = async (req, res) => {
  const { title, body } = req.body;
  req.user.password = undefined;
  try {
    const post = new Post({
      title,
      body,
      postedBy: req.user,
    });
    const savePost = await post.save();
    return res.status(201).json({
      savePost,
      message: 'Post successfully created',
    });
  } catch (error) {
    console.log(error);
  }
};

const getAllPost = async (req, res) => {
  try {
    const allPosts = await Post.find().populate('postedBy', '_id name');
    return res.status(200).json({
      allPosts,
    });
  } catch (error) {
    console.log(error.message);
  }
};

const userPost = async (req, res) => {
  try {
    const myPosts = await Post.find({ postedBy: req.user._id })
      .populate('postedBy', '_id name');
    return res.status(200).json({
      myPosts,
    });
  } catch (error) {
    console.log(error);
  }
};

export default { createPost, getAllPost, userPost };