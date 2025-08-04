import { IUser } from '../../domain/models/user';

export interface IUserRepository {
  create(userData: IUser): Promise<string >;
  login(email:string,password:string):Promise<IUser>
   changePassword(userId: string, newPassword: string): Promise<string>
  updateProfile(userId: string, username: string, phone: string): Promise<string>
  getSingledetail(userId: string):Promise<IUser>
}