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
  photo: {
    type: String,
    default: 'https://res.cloudinary.com/marusofteamwork/image/upload/v1606332287/No_Image_Available_s2hxem.png',
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
