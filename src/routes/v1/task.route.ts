import { Router } from "express";
import { attachEntityManager } from "../../middlewares/attachEntityManager";
import {
  createTask,
  deleteTask,
  getAllTasks,
  getTask,
  updateTask,
} from "../../controllers/taskController";

const router = Router();

router.post("/task", attachEntityManager, createTask);
router.get("/task/:id", attachEntityManager, getTask);
router.put("/task/:id", attachEntityManager, updateTask);
router.delete("/task/:id", attachEntityManager, deleteTask);
router.get("/task", attachEntityManager, getAllTasks);

export default router;
