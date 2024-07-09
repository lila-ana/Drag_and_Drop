import { error } from "console";
import AppDataSource from "../config/database";
import { createTaskService } from "../services/taskService";
import { TaskParams, UpdateTaskParams } from "../types/taskTypes";
import { Request, Response } from "express";

const taskService = createTaskService(AppDataSource.manager);

export async function createTask(req: Request, res: Response) {
  try {
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
    }: TaskParams = req.body;

    if (!title || !dueDate) {
      return res.status(400).json({ error: "Title and Due date required" });
    }

    const existingTask = await taskService.getTaskByTitle(title);
    if (existingTask) {
      return res.status(409).json({ error: "Title already exists" });
    }
    const task = await taskService.createTask({
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
    });
    return res.status(201).json(task);
  } catch (error) {
    return res.status(500).json({ error: "Failed to create Task" });
  }
}

export async function getTask(req: Request, res: Response) {
  try {
    const taskId = req.params.id;
    const task = await taskService.getTask(taskId);
    if (!task) {
      console.log(res.status(404).json({ error: "Task not found" }));
      return res.status(404).json({ error: "Task not found" });
    }
    return res.json(task);
  } catch (error) {
    return res.status(500).json({ error: "Failed to get task" });
  }
}

export async function updateTask(req: Request, res: Response) {
  try {
    const taskId = req.params.id;
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
      updatedDate,
    }: UpdateTaskParams = req.body;
    const task = await taskService.updateTask({
      id: taskId,
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
    });
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Failed to update task" });
  }
}

export async function deleteTask(req: Request, res: Response) {
  try {
    const taskId = req.params.id;
    const success = await taskService.deleteTask(taskId);

    if (!success) {
      return res.status(404).json({ error: "Task not found" });
    }
    return res.status(404).json({ error: "Task not found" });
  } catch (error) {
    return res.status(500).json({ error: "Failed to delete Task" });
  }
}

export async function getAllTasks(req: Request, res: Response) {
  try {
    const tasks = await taskService.getAllTasks();
    return res.json(tasks);
  } catch (error) {
    return res.status(500).json({ error: "Failed to get tasks" });
  }
}
