import {IBlog} from '../../domain/models/blog'
export interface IUpdateBlogUseCase {
  execute(
    reportId: string,
    updateData:IBlog
  ): Promise<string>;
}