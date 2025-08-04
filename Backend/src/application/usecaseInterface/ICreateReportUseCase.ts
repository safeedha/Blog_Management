import {IBlog} from '../../domain/models/blog'
export interface ICreateReportUseCase {
  execute(data:IBlog): Promise<string>;
}