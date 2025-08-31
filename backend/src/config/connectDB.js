import mongoose from 'mongoose';
import { config } from 'dotenv';

config(); // Load environment variables

const connectDB = async () => {
  try {
    const conn =  await mongoose.connect(`${process.env.MONGODB_URI}/urlShortner`);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    
    // Handle connection events`
    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected');
    });

    // Handle app termination
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      console.log('MongoDB connection closed through app termination');
      process.exit(0);
    });

  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
};

export default connectDB;