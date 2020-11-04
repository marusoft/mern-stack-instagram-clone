import express from 'express';
import logger from 'morgan';
import mongoose from 'mongoose';
import config from './config';
import 'colors';
import './models/user.models';
import './models/post.models';

import userRouter from './routes/user.routes';
import postRouter from './routes/post.routes';
import profileRouter from './routes/user.profile.routes';

const app = express();
const port = process.env.PORT || 5000;

app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/v1', userRouter);
app.use('/api/v1', postRouter);
app.use('/api/v1', profileRouter);

mongoose.Promise = Promise;
mongoose.connect(config.mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Successfully connected to the database'.yellow.bold);
});

mongoose.connection.on('Error', (err) => {
  console.log('Unable to established database connection', err);
});

app.listen(port, () => console.log(`Server running on port ${port} 🔥`.cyan.bold));
