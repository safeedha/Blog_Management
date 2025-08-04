import { IGetAllReportsUseCase } from '../usecaseInterface/IGetAllReportsUseCase';
import { IReportRepository } from '../../domain/repositories/IReportRepository';
import { IBlog } from '../../domain/models/blog';

export class GetAllReportsUseCase implements IGetAllReportsUseCase {
  constructor(private reportRepository: IReportRepository) {}

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