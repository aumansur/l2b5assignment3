import dotenv from 'dotenv';
dotenv.config();

export default {
  port: 5000,
  db_url: process.env.MONGODB_URL,
};
