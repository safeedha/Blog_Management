import {IBlog} from '../../domain/models/blog'
export interface IGetBlogsByUserIdUseCase {
  execute(userId: string): Promise<IBlog[]>;
}