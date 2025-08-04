import {IBlog} from '../../domain/models/blog'
export interface IGetReportByIdUseCase {
  execute(reportId: string): Promise<IBlog>;
}