const validatePost = (req, res, next) => {
  const { title, body, pic } = req.body;
  if (!title || !body || !pic) {
    return res.status(422).json({
      error: 'Please supply all the fields',
    });
  }
  next();
};
export default validatePost;
