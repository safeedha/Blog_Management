import { IGetReportsByUserIdUseCase } from '../usecaseInterface/IGetReportsByUserIdUseCase';
import { IReportRepository } from '../../domain/repositories/IReportRepository';
import { IBlog } from '../../domain/models/blog';

export class GetReportsByUserIdUseCase implements IGetReportsByUserIdUseCase {
  constructor(private reportRepository: IReportRepository) {}

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