import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { DeepPartial, EntityManager } from "typeorm";
import { User } from "../entities/user";
import { createBaseRepository } from "../repositories/baseRepository";
import { CreateUserParams, UpdateUserParams } from "../types/userTypes";

const SALT_ROUNDS = 10;
const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";
const TOKEN_EXPIRY = "1h";

export function createUserService(entityManager: EntityManager) {
  const userRepository = createBaseRepository(entityManager, User);

  return {
    async createUser(params: CreateUserParams): Promise<User> {
      const { username, password } = params;

      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

      return userRepository.create({
        username,
        password: hashedPassword,
      } as DeepPartial<User>);
    },

    async getUser(id: string): Promise<User | null> {
      return userRepository.findOne(id);
    },

    async updateUser(params: UpdateUserParams): Promise<User | null> {
      const { id, username, password } = params;
      const user = await userRepository.findOne(id);
      if (!user) {
        return null;
      }

      if (username) {
        user.username = username;
      }

      if (password) {
        user.password = await bcrypt.hash(password, SALT_ROUNDS);
      }
      return userRepository.update(id, user as Partial<User>);
    },

    async deleteUser(id: string): Promise<boolean> {
      return userRepository.delete(id);
    },

    async getAllUsers(): Promise<User[]> {
      return userRepository.findAll();
    },

    async verifyPassword(user: User, password: string): Promise<boolean> {
      return bcrypt.compare(password, user.password);
    },

    async login(
      params: CreateUserParams
    ): Promise<{ user: User; token: string } | null> {
      const { username, password } = params;

      const users = await userRepository.findAll();
      const user = users.find((user) => user.username === username);
      if (user && (await this.verifyPassword(user, password))) {
        const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
          expiresIn: TOKEN_EXPIRY,
        });
        return { user, token };
      }
      return null;
    },

    async logout(userID: String): Promise<void> {},
  };
}
