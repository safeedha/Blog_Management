import { IChangePasswordUseCase } from '../usecaseInterface/IChangePasswordUseCase';
import { IBlogRepository } from '../../domain/repositories/IReportRepository';
import { IUserRepository } from '../../domain/repositories/IUserRepository';

export class ChangePasswordUseCase implements IChangePasswordUseCase {
  constructor(private userRepository: IUserRepository) {}
  async execute(userId: string, newPassword: string): Promise<string> {
    try {
      const result = await this.userRepository.changePassword(userId,newPassword);
      return result;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      throw new Error(message);
    }
  }
}