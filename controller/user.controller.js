/* eslint-disable no-underscore-dangle */
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../config';

const User = mongoose.model('User');

const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const savedUser = await User.findOne({ email });
    if (savedUser) {
      return res.status(422).json({
        error: `User with ${savedUser.email} already exist, please login`,
      });
    }
    const hashpassword = await bcrypt.hash(password, 12);
    const user = new User({
      name,
      email,
      password: hashpassword,
    });
    await user.save();
    return res
      .status(201)
      .json({ message: `${user.email} account successfully created` });
  } catch (error) {
    console.log(error);
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userExist = await User.findOne({ email });
    if (!userExist) {
      return res.status(422).json({
        error: 'email or pasword incorrect',
      });
    }
    const comparePassword = await bcrypt.compare(password, userExist.password);
    if (comparePassword) {
      const token = jwt.sign({ _id: userExist._id }, config.jwt_secret);
      return res.status(200).json({
        token,
        message: `${userExist.email} successfully signed in`,
      });
    }
    return res.status(422).json({ error: 'email or pasword incorrect' });
  } catch (error) {
    console.log(error);
  }
};

export default { createUser, loginUser };
