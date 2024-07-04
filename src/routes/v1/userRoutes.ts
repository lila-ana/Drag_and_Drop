import { Router } from "express";
import {
  createUser,
  getUser,
  updateUser,
  deleteUser,
  getAllUsers,
} from "../../controllers/userController";
import { attachEntityManager } from "../../middlewares/attachEntityManager";

const router = Router();

router.post("/users", attachEntityManager, createUser);
router.get("/users/:id", attachEntityManager, getUser);
router.put("/users/:id", attachEntityManager, updateUser);
router.delete("/users/:id", attachEntityManager, deleteUser);
router.get("/users", attachEntityManager, getAllUsers);

export default router;
