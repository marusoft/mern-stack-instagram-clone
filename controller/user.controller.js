import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const User = mongoose.model('User');

const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const savedUser = await User.findOne({ email });
    if (savedUser) {
      return res
        .status(422)
        .json({ error: `User with ${savedUser.email} already exist, please login` });
    }
    const hashpassword = await bcrypt.hash(password, 12);
    const user = new User({
      name,
      email,
      password: hashpassword
    });
    await user.save();
    res.json({ message: `${user.email} account successfully created` });
  } catch (error) {
    console.log(error);
  }
};
export default createUser;
