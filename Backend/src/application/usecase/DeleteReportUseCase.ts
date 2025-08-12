import { IDeleteBlogUseCase } from '../usecaseInterface/IDeleteReportUseCase';
import { IBlogRepository } from '../../domain/repositories/IReportRepository';

export class DeleteBlogUseCase implements IDeleteBlogUseCase {
  constructor(private reportRepository: IBlogRepository) {}

  async execute(reportId: string): Promise<string> {
    try {
      return await this.reportRepository.delete(reportId);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      throw new Error(message);
    }
  }
}
