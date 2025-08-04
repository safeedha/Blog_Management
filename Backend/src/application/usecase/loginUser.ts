import jwt from 'jsonwebtoken';
import { ILoginUseCase } from '../usecaseInterface/ILoginUsecase';
import { IUser } from '../../domain/models/user';
import { IUserRepository } from '../../domain/repositories/IUserRepository';

export class LoginUser implements ILoginUseCase {
  constructor(private userRepo: IUserRepository) {}

  async execute(email: string, password: string): Promise<{  token: string; refreshToken: string }> {
    const user = await this.userRepo.login(email, password);

    if (!user) {
      throw new Error('Invalid email or password');
    }

    const payload = { id: user._id, email: user.email };

    const token = jwt.sign(payload, process.env.JWT_SECRET!, {
      expiresIn: '15m',
    });

   
    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET!, {
      expiresIn: '7d',
    });

    return { token, refreshToken };
  }
}
