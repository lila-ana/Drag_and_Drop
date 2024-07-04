import { Request, Response, NextFunction } from "express";
import AppDataSource from "../config/database";

export function attachEntityManager(
  req: Request,
  res: Response,
  next: NextFunction
) {
  (req as any).entityManager = AppDataSource.manager;
  next();
}
