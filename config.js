import dotenv from 'dotenv';

dotenv.config();

const mongoUri = process.env.URL;

export default mongoUri;
