import {IBlog} from '../../domain/models/blog'
export interface ICreateBlogUseCase {
  execute(data:IBlog): Promise<string>;
}