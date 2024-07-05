import { Router } from "express";
import {
  createUser,
  getUser,
  updateUser,
  deleteUser,
  getAllUsers,
  login,
  logout,
} from "../../controllers/userController";
import { attachEntityManager } from "../../middlewares/attachEntityManager";

const router = Router();

router.post("/register", attachEntityManager, createUser);
router.get("/users/:id", attachEntityManager, getUser);
router.put("/users/:id", attachEntityManager, updateUser);
router.delete("/users/:id", attachEntityManager, deleteUser);
router.get("/users", attachEntityManager, getAllUsers);

// ==========> AUTH <=========

router.post("/login", attachEntityManager, login);
router.post("/logout", attachEntityManager, logout);

export default router;
