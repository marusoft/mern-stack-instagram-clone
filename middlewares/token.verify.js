import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import config from '../config';

const User = mongoose.model('User');

const verifyUserToken = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: 'You must be logged in' });
  }
  const token = authorization.replace('Bearer ', '');
  jwt.verify(token, config.jwt_secret, async (err, payload) => {
    if (err) {
      return res.status(401).json({ error: 'You must be logged in' });
    }
    const { _id } = payload;
    const userData = await User.findById(_id);
    req.user = userData;
    next();
  });
};
export default verifyUserToken;
