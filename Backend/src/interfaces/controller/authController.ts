import { Request, Response } from 'express';
import { ICreateUserUseCase } from '../../application/usecaseInterface/ICreateUserUseCase';
import { ILoginUseCase } from '../../application/usecaseInterface/ILoginUsecase';
import { IChangePasswordUseCase } from '../../application/usecaseInterface/IChangePasswordUseCase';
import { IUpdateUserUseCase } from '../../application/usecaseInterface/IUpdateUserUseCase ';
import {IGetUserUseCase} from '../../application/usecaseInterface/IgetUserUseCase'
interface IRequest extends Request {
  userId: string;
}
export class AuthController {
  constructor(
    private createUser: ICreateUserUseCase,
    private loginUser: ILoginUseCase,
    private changePassword: IChangePasswordUseCase,
    private updateUser: IUpdateUserUseCase,
    private getUser:IGetUserUseCase
  ) {}

  async register(req: Request, res: Response): Promise<void> {
    try {
      const { username, email, password, phone } = req.body;
      const user = await this.createUser.execute({ username, email, password, phone });

      res.status(201).json({
        success: true,
        message: 'User registered successfully',
        data: user,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Internal server error';
      res.status(500).json({ message });
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      console.log(req.body)
      const { email, password } = req.body;
      const result = await this.loginUser.execute(email, password);

      if (result.refreshToken) {
        res.cookie('refreshToken', result.refreshToken, {
          httpOnly: true,
          secure: true,
          maxAge: 7 * 24 * 60 * 60 * 1000,
        });
      }

      res.status(200).json({
        message: 'Login successful',
        accessToken: result.token,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Internal server error';
      res.status(400).json({ message });
    }
  }

  async changeUserPassword(req:  IRequest, res: Response): Promise<void> {
    try {
      const userId = req.userId; // assume you add user to req via middleware
      const {Password } = req.body;

      const message = await this.changePassword.execute(userId, Password);

      res.status(200).json({ success: true, message });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Internal server error';
      res.status(400).json({ success: false, message });
    }
  }

  async getDetails(req: IRequest, res: Response): Promise<void> {
    try {
      const userId = req.userId;
    
      const updatedUser = await this.getUser.execute(userId);
      res.status(200).json({
        success: true,
        data: updatedUser,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Internal server error';
      res.status(400).json({ success: false, message });
    }
  }

  async updateUserProfile(req: IRequest, res: Response): Promise<void> {
    try {
      const userId = req.userId;
      const updateData = req.body;

      const updatedUser = await this.updateUser.execute(userId, updateData.username,updateData.phone);

      res.status(200).json({
        success: true,
        message: updatedUser,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Internal server error';
      res.status(400).json({ success: false, message });
    }
  }
}
