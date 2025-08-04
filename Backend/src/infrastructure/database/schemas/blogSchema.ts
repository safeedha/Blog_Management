import mongoose, { Schema, model } from 'mongoose';
import { IBlog } from '../../../domain/models/blog';

const blogSchema: Schema = new Schema<IBlog>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String, required: true },
    category:{type: String, required: true},
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
  },
  {
    timestamps: true 
  }
);

export const BlogModel = model<IBlog>('Blog', blogSchema);


