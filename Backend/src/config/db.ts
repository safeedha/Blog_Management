import mongoose from 'mongoose';

export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect('mongodb+srv://mksafeedha:mujpNxmsLgs3Owiz@cluster0.lo7phuu.mongodb.net/blogdb?retryWrites=true&w=majority&appName=Cluster0');
    console.log('✅ MongoDB connected');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};
