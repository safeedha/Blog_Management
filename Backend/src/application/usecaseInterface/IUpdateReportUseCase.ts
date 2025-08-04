import {IBlog} from '../../domain/models/blog'
export interface IUpdateReportUseCase {
  execute(
    reportId: string,
    updateData:IBlog
  ): Promise<string>;
}