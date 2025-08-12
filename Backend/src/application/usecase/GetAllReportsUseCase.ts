import { IGetAllBlogsUseCase } from '../usecaseInterface/IGetAllReportsUseCase';
import { IBlogRepository } from '../../domain/repositories/IReportRepository';
import { IBlog } from '../../domain/models/blog';

export class GetAllBlogsUseCase implements IGetAllBlogsUseCase {
  constructor(private reportRepository: IBlogRepository) {}

  async execute(): Promise<IBlog[]> {
    try {
      const report= await this.reportRepository.findAll();
      return report
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      throw new Error(message);
    }
  }
}