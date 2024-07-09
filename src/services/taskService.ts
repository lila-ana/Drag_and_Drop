import { createBaseRepository } from "../repositories/baseRepository";
import { TaskParams, UpdateTaskParams } from "../types/taskTypes";
import { Task } from "../entities/tasks";
import { DeepPartial, EntityManager } from "typeorm";

export function createTaskService(entityManager: EntityManager) {
  const TaskRepository = createBaseRepository(entityManager, Task);

  return {
    async createTask(params: TaskParams): Promise<Task> {
      const {
        title,
        description,
        status,
        priority,
        dueDate,
        createdDate,
        assignee,
        tags,
        subtasks,
        comments,
      } = params;

      return TaskRepository.create({
        title,
        description,
        status,
        priority,
        dueDate,
        createdDate,
        assignee,
        tags,
        subtasks,
        comments,
      } as DeepPartial<Task>);
    },

    async getTask(id: string): Promise<Task | null> {
      return TaskRepository.findOne(id);
    },

    async getTaskByTitle(title: string): Promise<Task | null> {
      return TaskRepository.findOneBy({ title });
    },

    async getAllTasks(): Promise<Task[] | null> {
      return TaskRepository.findAll();
    },

    async updateTask(params: UpdateTaskParams): Promise<Task | null> {
      const {
        id,
        title,
        description,
        status,
        priority,
        dueDate,
        createdDate,
        assignee,
        tags,
        subtasks,
        comments,
        updatedDate,
      } = params;

      const updates: Partial<Task> = {
        title,
        description,
        status,
        priority,
        dueDate,
        createdDate,
        assignee,
        tags,
        subtasks,
        comments,
        updatedDate,
      };
      return TaskRepository.customUpdate(id, updates);
    },

    async deleteTask(id: string): Promise<boolean> {
      return TaskRepository.delete(id);
    },
  };
}
