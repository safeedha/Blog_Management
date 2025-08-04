import { IUser } from '../../domain/models/user';
export interface IGetUserUseCase{
  execute(userId:string):Promise<IUser>
}