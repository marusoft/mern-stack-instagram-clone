import mongoose from 'mongoose';

const Post = mongoose.model('Post');

const createPost = async (req, res) => {
  const { title, body } = req.body;
  try {
    const post = new Post({
      title,
      body,
      postedBy: req.user,
    });
    req.user.password = undefined;
    const savePost = await post.save();
    return res.status(201).json({
      savePost,
      message: 'Post successfully created',
    });
  } catch (error) {
    console.log(error);
  }
};

export default createPost;
