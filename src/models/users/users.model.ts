import IUser from './users.interface';
import User from './users.mongo';

export async function registerNewUser(user: IUser): Promise<IUser> {
  const newUser = new User(user);
  await newUser.save();
  return newUser;
}

export async function loginUser(user: IUser) {
  return User.findOne({ email: user.email }).exec();
}
