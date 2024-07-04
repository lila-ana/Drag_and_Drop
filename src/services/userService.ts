import { DeepPartial, EntityManager } from "typeorm";
import { User } from "../entities/user";
import { createBaseRepository } from "../repositories/baseRepository";
import { CreateUserParams, UpdateUserParams } from "../types/userTypes";

export function createUserService(entityManager: EntityManager) {
  const userRepository = createBaseRepository(entityManager, User);

  return {
    async createUser(params: CreateUserParams): Promise<User> {
      const { username, password } = params;
      return userRepository.create({ username, password } as DeepPartial<User>);
    },

    async getUser(id: string): Promise<User | null> {
      return userRepository.findOne(id);
    },

    async updateUser(params: UpdateUserParams): Promise<User | null> {
      const { id, username, password } = params;
      return userRepository.update(id, { username, password } as Partial<User>);
    },

    async deleteUser(id: string): Promise<boolean> {
      return userRepository.delete(id);
    },

    async getAllUsers(): Promise<User[]> {
      return userRepository.findAll();
    },
  };
}
