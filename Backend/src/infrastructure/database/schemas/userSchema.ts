import mongoose, { Schema } from 'mongoose';
import {IUser} from '../../../domain/models/user'


const userSchema: Schema = new Schema<IUser>({
   username: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  phone: {
    type: String,
    required: true,
    match: /^[0-9]{10}$/, // Validates 10-digit phone numbers
    unique: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    unique: true,
    match: /^\S+@\S+\.\S+$/, // Basic email pattern
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const UserModel = mongoose.model<IUser>('User', userSchema);
