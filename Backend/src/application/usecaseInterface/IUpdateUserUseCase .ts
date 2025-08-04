export interface IUpdateUserUseCase {
  execute(userId: string,username:string, phone:string): Promise<string>;
}