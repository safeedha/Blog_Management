import {IBlog} from '../../domain/models/blog'
export interface IGetBlogByIdUseCase {
  execute(reportId: string): Promise<IBlog>;
}