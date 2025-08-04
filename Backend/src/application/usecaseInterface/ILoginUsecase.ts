import {IUser} from '../../domain/models/user'

export interface ILoginUseCase {
  execute(email:string,password:string): Promise<{token: string; refreshToken: string}>;
}

