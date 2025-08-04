import { IUpdateReportUseCase } from '../usecaseInterface/IUpdateReportUseCase';
import { IReportRepository } from '../../domain/repositories/IReportRepository';
import { IBlog } from '../../domain/models/blog';

export class UpdateReportUseCase implements IUpdateReportUseCase {
  constructor(private reportRepository: IReportRepository) {}

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
