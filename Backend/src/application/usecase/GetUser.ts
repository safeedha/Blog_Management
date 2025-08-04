import {IGetUserUseCase} from '../../application/usecaseInterface/IgetUserUseCase'
import {IUser} from '../../domain/models/user'
import {IUserRepository} from '../../domain/repositories/IUserRepository'
export class GetUser implements IGetUserUseCase {
  constructor(private userRepo: IUserRepository) {}

  async execute(userId: string): Promise<IUser> {
    return await this.userRepo.getSingledetail(userId);
  }
}