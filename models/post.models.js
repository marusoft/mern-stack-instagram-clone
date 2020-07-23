import mongoose from 'mongoose';

const { objectId } = mongoose.Schema.Types;

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    default: 'no photo',
  },
  postedby: {
    type: objectId,
    ref: 'User',
  },
});

mongoose.model('Post', postSchema);
