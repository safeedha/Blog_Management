import { ICreateUserUseCase } from '../usecaseInterface/ICreateUserUseCase';
import {IUser} from '../../domain/models/user'
import {IUserRepository} from '../../domain/repositories/IUserRepository'
export class CreateUser implements ICreateUserUseCase {
  constructor(private userRepo: IUserRepository) {}

  async execute(userData: IUser): Promise<string> {
    return await this.userRepo.create(userData);
  }
}