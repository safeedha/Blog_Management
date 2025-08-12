import {IBlog} from '../../domain/models/blog'
export interface IGetAllBlogsUseCase {
  execute(): Promise<IBlog[]>;
}