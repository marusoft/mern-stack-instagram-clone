/* eslint-disable no-unused-vars */
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

const follow = async (req, res) => {
  try {
    // eslint-disable-next-line no-unused-vars
    const userFollower = await User.findByIdAndUpdate(req.body.followId, {
      $push: { followers: req.user._id },
    }, {
      new: true,
    });
    const userFollowerDetails = await User.findByIdAndUpdate(req.user._id, {
      $push: { following: req.body.followId },
    }, {
      new: true,
    })
      .select('-password');
    return res.status(200).json(
      userFollowerDetails,
    );
  } catch (e) {
    console.log(e);
  }
};

const unFollow = async (req, res) => {
  try {
    const userUnFollower = await User.findByIdAndUpdate(req.body.unfollowId, {
      $pull: { followers: req.user._id },
    }, {
      new: true,
    });
    const userUnFollowerDetails = await User.findByIdAndUpdate(req.user._id, {
      $pull: { following: req.body.unfollowId },
    }, {
      new: true,
    })
      .select('-password');
    return res.status(200).json(
      userUnFollowerDetails,
    );
  } catch (e) {
    console.log(e);
  }
};

export default { userProfile, follow, unFollow };
