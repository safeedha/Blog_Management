import {IBlog} from '../../domain/models/blog'
export interface IGetAllReportsUseCase {
  execute(): Promise<IBlog[]>;
}