import {IBlog} from '../../domain/models/blog'
export interface IGetReportsByUserIdUseCase {
  execute(userId: string): Promise<IBlog[]>;
}