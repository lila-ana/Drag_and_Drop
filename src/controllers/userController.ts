import { Request, Response } from "express";
import { createUserService } from "../services/userService";
import { CreateUserParams, UpdateUserParams } from "../types/userTypes";
import AppDataSource from "../config/database";

const userService = createUserService(AppDataSource.manager);

export async function createUser(req: Request, res: Response) {
  try {
    const { username, password }: CreateUserParams = req.body;
    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "Username and password are required" });
    }
    const user = await userService.createUser({ username, password });
    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json({ error: "Failed to create user" });
  }
}

export async function getUser(req: Request, res: Response) {
  try {
    const userId = req.params.id;
    const user = await userService.getUser(userId);
    if (!user) {
      console.log(res.status(404).json({ error: "User not found" }));
      return res.status(404).json({ error: "User not found" });
    }
    return res.json(user);
  } catch (error) {
    return res.status(500).json({ error: "Failed to get user" });
  }
}

export async function updateUser(req: Request, res: Response) {
  try {
    const userId = req.params.id;
    const { username, password }: UpdateUserParams = req.body;
    const user = await userService.updateUser({
      id: userId,
      username,
      password,
    });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.json(user);
  } catch (error) {
    return res.status(500).json({ error: "Failed to update user" });
  }
}

export async function deleteUser(req: Request, res: Response) {
  try {
    const userId = req.params.id;
    const success = await userService.deleteUser(userId);
    if (!success) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: "Failed to delete user" });
  }
}

export async function getAllUsers(req: Request, res: Response) {
  try {
    const users = await userService.getAllUsers();
    return res.json(users);
  } catch (error) {
    return res.status(500).json({ error: "Failed to get users" });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { username, password }: CreateUserParams = req.body;
    const loginResult = await userService.login({ username, password });

    if (loginResult) {
      const { user, token } = loginResult;
      req.session.userId = user.id;
      return res.json({ user, token });
    } else {
      res.status(401).json({ message: "Invalid Credentials" });
    }
  } catch (error: any) {
    return res.status(500).json({ error: "Invalid Username or password" });
  }
}
