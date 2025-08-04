
import { IUserRepository } from '../../../domain/repositories/IUserRepository';
import { IUser } from '../../../domain/models/user';
import { UserModel } from '../schemas/userSchema';
import bcrypt from 'bcrypt';

export class UserRepository implements IUserRepository {
  async create(userData: IUser): Promise<string> {
    const existingUser = await UserModel.findOne({ email: userData.email });
    if (existingUser) {
      throw new Error('User already exists');
    }
    
  const existingPhone = await UserModel.findOne({ phone: userData.phone });
  if (existingPhone) {
    throw new Error('Phone number already in use');
  }

    const hashedPassword = await bcrypt.hash(userData.password as string, 10);

    const newUser = new UserModel({
      ...userData,
      password: hashedPassword,
    });

    await newUser.save();

    return 'User created successfully';
  }
  async getSingledetail(userId: string):Promise<IUser>
  {
    try{
       const user=await UserModel.findOne({_id:userId})
       if(!user)
       {
        throw new Error("user not found")
       }
       return user
    }
    catch(error)
    {
       if (error instanceof Error) throw new Error(error.message);
      throw new Error('Some error occurred in create');
    }
  }
  async changePassword(userId: string, newPassword: string): Promise<string>{
    const hashedPassword = await bcrypt.hash(newPassword as string, 10);
    await UserModel.updateOne({_id:userId},{$set:{password:hashedPassword}})
    return 'Password updated'
  }

  async updateProfile(userId: string, username: string, phone: string): Promise<string> {
  const phoneExists = await UserModel.findOne({ phone: phone, _id: { $ne: userId } });
  if (phoneExists) {
    throw new Error('Phone number already in use by another user');
  }

  await UserModel.updateOne(
    { _id: userId },
    { $set: { username: username, phone: phone } }
  );

  return 'Profile updated';
}


  async login(email: string, password: string): Promise<IUser> {
    const user = await UserModel.findOne({ email });

    if (!user) {
      throw new Error('User not found');
    }

    const isMatch = await bcrypt.compare(password, user.password as string);

    if (!isMatch) {
      throw new Error('Invalid credentials');
    }

    return {
      _id: user._id.toString(),
      username: user.username,
      email: user.email,
    };
  }
}
