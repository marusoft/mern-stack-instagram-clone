const validateUser = (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({
      error: 'user credentials cannot be empty',
    });
  }
  next();
};

export default validateUser;
