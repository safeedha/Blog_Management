import { IUpdateUserUseCase } from '../usecaseInterface/IUpdateUserUseCase ';
import { IBlogRepository } from '../../domain/repositories/IReportRepository';
import { IUserRepository } from '../../domain/repositories/IUserRepository';

export class UpdateUserUseCase implements IUpdateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(userId: string,username:string, phone:string): Promise<string> {
    try {
      const result = await this.userRepository.updateProfile(userId,username,phone)
      return result;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      throw new Error(message);
    }
  }
}