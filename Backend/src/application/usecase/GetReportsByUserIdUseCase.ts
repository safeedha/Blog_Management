import { IGetBlogsByUserIdUseCase } from '../usecaseInterface/IGetReportsByUserIdUseCase';
import { IBlogRepository } from '../../domain/repositories/IReportRepository';
import { IBlog } from '../../domain/models/blog';

export class GetBlogsByUserIdUseCase implements IGetBlogsByUserIdUseCase {
  constructor(private reportRepository: IBlogRepository) {}

  async execute(userId: string): Promise<IBlog[]> {
    try {
      const report= await this.reportRepository.findByUserId(userId);
      return report
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      throw new Error(message);
    }
  }
}