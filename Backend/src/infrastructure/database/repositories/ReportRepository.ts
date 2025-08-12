import { IBlogRepository } from '../../../domain/repositories/IReportRepository';
import { IBlog } from '../../../domain/models/blog';
import { BlogModel } from '../schemas/blogSchema';

export class BlogRepository implements IBlogRepository {
  
  async create(data: IBlog): Promise<string> {
    try {
      const report = new BlogModel({
        title: data.title,
        content: data.content,
        category: data.category,
        userId:data.userId,
        image: data.image,
      });
      const saved = await report.save();
      return 'report created';
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
      throw new Error('Some error occurred in create');
    }
  }

   async findAll(): Promise<IBlog[]> {
  try {
    const data = await BlogModel.find()
      .populate('userId'); // populate userId and select only username

    const result = data.map((doc) => ({
      _id: doc._id.toString(),
      title: doc.title,
      content: doc.content,
      category: doc.category,
      image: doc.image,
      createdAt: doc.createdAt,
      userId: doc.userId
    }));

    return result;
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
    throw new Error('Some error occurred in findAll');
  }
}

  async findByUserId(userId: string): Promise<IBlog[]> {
    try {
      const data= await BlogModel.find({ userId });
       const result = data.map((doc) => ({
      _id: doc._id.toString(),
      title: doc.title,
      content: doc.content,
      category: doc.category,
      image: doc.image,
      createdAt: doc.createdAt,
    }));
    return result;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Some error occurred in findByUserId');
    }
  }

  async findById(reportId: string): Promise<IBlog> {
  try {
    const data = await BlogModel.findById(reportId);
    if (!data) throw new Error('Report not found');

    const result: IBlog = {
      _id: data._id.toString(),
      title: data.title,
      content: data.content,
      category: data.category,
      image: data.image,
      createdAt: data.createdAt,
    };

    return result;
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
    throw new Error('Some error occurred in findById');
  }
}


  async update(reportId: string, updateData: Partial<IBlog>): Promise<string> {
    try {
      const updatedReport = await BlogModel.findByIdAndUpdate(
        reportId,
        { $set: updateData },
        { new: true }
      );
      if (!updatedReport) throw new Error('Report not found');
      return 'report updated sucessfully';
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
      throw new Error('Some error occurred in update');
    }
  }

  async delete(reportId: string): Promise<string> {
    try {
      const deleted = await BlogModel.findByIdAndDelete(reportId);
      if (!deleted) throw new Error('Report not found');
      return 'report deleted sucessfully';
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
      throw new Error('Some error occurred in delete');
    }
  }
}
