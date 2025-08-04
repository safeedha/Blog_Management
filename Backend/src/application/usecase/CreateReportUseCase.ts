import { ICreateReportUseCase } from '../usecaseInterface/ICreateReportUseCase';
import { IReportRepository } from '../../domain/repositories/IReportRepository';
import { IBlog } from '../../domain/models/blog';

export class CreateReportUseCase implements ICreateReportUseCase {
  constructor(private reportRepository: IReportRepository) {}

  async execute(data: IBlog): Promise<string> {
    try {
      const result = await this.reportRepository.create(data);
      return result;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      throw new Error(message);
    }
  }
}
