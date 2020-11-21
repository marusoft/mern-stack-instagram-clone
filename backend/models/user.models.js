import mongoose from 'mongoose';

const { ObjectId } = mongoose.Schema.Types;
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  followers: [{
    type: ObjectId,
    ref: 'User',
  }],
  following: [{
    type: ObjectId,
    ref: 'User',
  }],
});
mongoose.model('User', userSchema);
