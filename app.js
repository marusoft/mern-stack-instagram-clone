/* eslint-disable no-console */
import express from 'express';
import logger from 'morgan';
import mongoose from 'mongoose';
import mongoUri from './config';
import './models/user.models';
import userRouter from './routes/user.routes';

const app = express();
const port = process.env.PORT || 4000;

app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/v1', userRouter);

mongoose.Promise = Promise;
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Successfully connected to the database');
});

mongoose.connection.on('Error', (err) => {
  console.log('Unable to established database connection', err);
});

app.get('/', (req, res) => res.status(200).json({
  message: 'Hello Marusoft',
}));

app.listen(port, () => console.log(`Server running on port ${port} 🔥`));