import { IGetBlogByIdUseCase } from '../usecaseInterface/IGetReportByIdUseCase';
import { IBlogRepository } from '../../domain/repositories/IReportRepository';
import { IBlog } from '../../domain/models/blog';

export class GetBlogByIdUseCase implements IGetBlogByIdUseCase {
  constructor(private reportRepository: IBlogRepository) {}

  async execute(reportId: string): Promise<IBlog> {
    try {
      return await this.reportRepository.findById(reportId);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      throw new Error(message);
    }
  }
}
