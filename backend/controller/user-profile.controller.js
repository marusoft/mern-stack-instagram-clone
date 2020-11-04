/* eslint-disable no-underscore-dangle */
import mongoose from 'mongoose';

const Post = mongoose.model('Post');
const User = mongoose.model('User');

const userProfile = async (req, res) => {
  try {
    const findUser = await User.findOne({ _id: req.params.id })
      .select('-password');
    const findUserPost = await Post.find({ postedBy: req.params.id })
      .populate('postedBy', '_id name')
      .exec(async (err, posts) => {
        if (err) {
          return res.status(422).json({
            error: err,
          });
        }
        return res.status(200).json({
          findUser, posts, findUserPost,
        });
      });
  } catch (error) {
    return res.status(404).json({
      error: 'User not found',
    });
  }
};

export default userProfile;
