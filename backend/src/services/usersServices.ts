import { User } from "@prisma/client";
import UsersModel from "../models/usersModel";
import { UserInterfaceCreate, UserReturnModel } from "../interface/user-interface";
import { ServiceResponse } from "../interface/services-response";
import JWT from "../utils/JWT";
import bcrypt from '../utils/bcrypt';

export default class UsersService {

    constructor(private usersModel = new UsersModel()) {}


    public async getAllUsers(): Promise<ServiceResponse<User[]>> {
        const users = await this.usersModel.getAllUsers();
        if (!users) return { status: 'notFound', data: { message: 'No users found' } };
        return { status: 'ok', data: users };
      }

    public async deleteUser(id: number): Promise<ServiceResponse<{ message: string }>> {
        const user = await this.usersModel.getUserById(id);
        if (!user) return { status: 'notFound', data: { message: 'User not found' } };
        await this.usersModel.deleteUser(id);
        return { status: 'ok', data: { message: 'User deleted successfully' } };
      }
    
    public async createUser(data: User): Promise<ServiceResponse<User>> {
        const hashPassword = bcrypt.createHash(data.password);
        const user = await this.usersModel.createUser({ ...data, password: hashPassword });
        //const token = UsersService.createToken(user);
        //if (!token) return { status: 'unauthorized', data: { message: 'Invalid email or password' } };
        return { status: 'created', data: user };
      }

    public async login(data: UserInterfaceCreate): Promise<ServiceResponse<User>> {
        const user = await this.verifyUser(data);
        if (!user) return { status: 'unauthorized', data: { message: 'Invalid email or password' } };
        return { status: 'ok', data: user };
      }

      private async verifyUser(data: UserInterfaceCreate): Promise<any> {
        const user = await this.usersModel.findByEmail(data.email);
        if (!user) return null;
        const isValidPassword = bcrypt.compareHash(data.password, user.password);
        if (!isValidPassword) return null;
        return user;
      }

      //static createToken(user: UserReturnModel): string {
      //  return JWT.sign(user);
      //}

};