import dotenv from 'dotenv';

dotenv.config();

// const mongoUri = process.env.URL;
const config = {
  mongoUri: process.env.URL,
  jwt_secret: process.env.SECRECT_KEY,
};

export default config;
