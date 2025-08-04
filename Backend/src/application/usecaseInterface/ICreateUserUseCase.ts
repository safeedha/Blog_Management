import {IUser} from '../../domain/models/user'

export interface ICreateUserUseCase {
  execute(userData: IUser): Promise<string>;
}