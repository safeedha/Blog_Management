import { IGetReportByIdUseCase } from '../usecaseInterface/IGetReportByIdUseCase';
import { IReportRepository } from '../../domain/repositories/IReportRepository';
import { IBlog } from '../../domain/models/blog';

export class GetReportByIdUseCase implements IGetReportByIdUseCase {
  constructor(private reportRepository: IReportRepository) {}

  async execute(reportId: string): Promise<IBlog> {
    try {
      return await this.reportRepository.findById(reportId);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      throw new Error(message);
    }
  }
}
