import express, { Router } from "express";
import TaskRoute from "./task.route";
import UserRoute from "./user.route";

const router: Router = express.Router();

interface RouteConfig {
  path?: string;
  route: express.Router;
}

const defaultRoutes: RouteConfig[] = [
  {
    // path: "",
    route: UserRoute,
  },
  {
    // path: "/task",
    route: TaskRoute,
  },
];

defaultRoutes.forEach((routeConfig) => {
  //   router.use(routeConfig.path, routeConfig.route);
  router.use(routeConfig.route);
});

export default router;
