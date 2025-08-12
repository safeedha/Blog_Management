import { IBlog } from '../models/blog';


export interface IBlogRepository {
  create(data: IBlog): Promise<string>;
  findAll(): Promise<IBlog[]>;
  findByUserId(userId: string): Promise<IBlog[]>;
  findById(reportId: string): Promise<IBlog>;
  update(reportId: string, updateData: IBlog): Promise<string>;
  delete(reportId: string): Promise<string>;

}
