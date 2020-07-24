const validatePost = (req, res, next) => {
  const { title, body } = req.body;
  if (!title || !body) {
    return res.status(422).json({
      error: 'Please supply all the fields',
    });
  }
  next();
};
export default validatePost;
