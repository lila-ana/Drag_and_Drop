// import { Router } from "express";
// import { createUserController } from "../../controllers/userController";
// import { attachEntityManager } from "../../middlewares/attachEntityManager";

// const router = Router();

// router.post("/users", attachEntityManager, (req, res) => {
//   const controller = createUserController((req as any).entityManager);
//   controller.createUser(req, res);
// });

// export default router;

import { Router } from "express";
import {
  createUser,
  getUser,
  updateUser,
  deleteUser,
  getAllUsers,
} from "../../controllers/userController";

const router = Router();

// Define routes
router.post("/users", createUser);
router.get("/users/:id", getUser);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);
router.get("/users", getAllUsers);

export default router;
