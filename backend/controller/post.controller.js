/* eslint-disable no-underscore-dangle */
import mongoose from 'mongoose';

const Post = mongoose.model('Post');

const createPost = async (req, res) => {
  const { title, body, pic } = req.body;
  req.user.password = undefined;
  try {
    const post = new Post({
      title,
      body,
      photo: pic,
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
    const allPosts = await Post.find()
      .populate('postedBy', '_id name')
      .populate('comments.postedBy', '_id name');
    return res.status(200).json({
      allPosts,
    });
  } catch (error) {
    console.log(error.message);
  }
};

const getUserFollowingPost = async (req, res) => {
  try {
    const allPosts = await Post.find({
      postedBy: { $in: req.user.following },
    })
      .populate('postedBy', '_id name')
      .populate('comments.postedBy', '_id name');
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

const likePost = async (req, res) => {
  try {
    const like = await Post.findByIdAndUpdate(req.body.postId, {
      $push: { likes: req.user._id },
    }, {
      new: true,
    }).exec();
    return res.status(200).json(like);
  } catch (error) {
    console.log(error);
  }
};

const unLikePost = async (req, res) => {
  try {
    const unlike = await Post.findByIdAndUpdate(req.body.postId, {
      $pull: { likes: req.user._id },
    }, {
      new: true,
    }).exec();
    return res.status(200).json(unlike);
  } catch (error) {
    console.log(error);
  }
};

const commentPost = async (req, res) => {
  const comment = {
    text: req.body.text,
    postedBy: req.user._id,
  };
  try {
    const userComment = await Post.findByIdAndUpdate(req.body.postId, {
      $push: { comments: comment },
    }, {
      new: true,
    })
      .populate('comments.postedBy', '_id name')
      .populate('postedBy', '_id name')
      .exec();
    return res.status(200).json(userComment);
  } catch (error) {
    console.log(error);
  }
};

const deletePost = async (req, res) => {
  try {
    const postDelete = await Post.findOne({ _id: req.params.postId })
      .populate('postedBy, "_id')
      .exec(async (err, post) => {
        if (err || !post) {
          return res.status(422).json({
            error: err,
          });
        }
        if (post.postedBy._id.toString() === req.user._id.toString()) {
          await post.remove();
          return res.status(200).json({
            postDelete,
            message: 'Post Successfully deleted',
          });
        }
      });
  } catch (error) {
    console.log(error);
  }
};

export default {
  createPost,
  getAllPost,
  userPost,
  likePost,
  unLikePost,
  commentPost,
  deletePost,
  getUserFollowingPost,
};
