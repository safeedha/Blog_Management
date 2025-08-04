import { IDeleteReportUseCase } from '../usecaseInterface/IDeleteReportUseCase';
import { IReportRepository } from '../../domain/repositories/IReportRepository';

export class DeleteReportUseCase implements IDeleteReportUseCase {
  constructor(private reportRepository: IReportRepository) {}

  async execute(reportId: string): Promise<string> {
    try {
      return await this.reportRepository.delete(reportId);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      throw new Error(message);
    }
  }
}
