import { User } from "@prisma/client";
import prisma from "../utils/prisma";

export default class UsersModel {
  private prisma = prisma;

  async createUser(user: User): Promise<User> {
    const newUser = await this.prisma.user.create({
      data: user,
    });
    return newUser;
  }
  async getUserById(id: number): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    return user;
  }

    async getAllUsers(): Promise<User[]> {
        const users = await this.prisma.user.findMany();
        return users;
    }

    async updateUser(id: number, user: User): Promise<User> {
        const updatedUser = await this.prisma.user.update({
            where: { id },
            data: user.role ? { role: user.role } : { role: "USER" },
        });
        return updatedUser;
    }

    async deleteUser(id: number): Promise<User> {
        const deletedUser = await this.prisma.user.delete({
            where: { id },
        });
        return deletedUser;
    }

    async findByEmail(email: string): Promise<User | null> {
        const user = await this.prisma.user.findUnique({
            where: { email },
        });
        return user;
    }
}