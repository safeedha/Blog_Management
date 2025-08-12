import { IUpdateBlogUseCase } from '../usecaseInterface/IUpdateReportUseCase';
import { IBlogRepository } from '../../domain/repositories/IReportRepository';
import { IBlog } from '../../domain/models/blog';

export class UpdateBlogUseCase implements IUpdateBlogUseCase {
  constructor(private reportRepository: IBlogRepository) {}

  async execute(
    reportId: string,
    updateData: IBlog
  ): Promise<string> {
    try {
      const result = await this.reportRepository.update(reportId, updateData);
      return result;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      throw new Error(message);
    }
  }
}
