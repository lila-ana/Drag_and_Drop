import { EntityManager } from "typeorm";
import "express-session";

declare global {
  namespace Express {
    interface Request {
      entityManager?: EntityManager;
    }
  }
}

declare module "express-session" {
  interface Session {
    // user: { [key: string]: any };

    userId?: string;
  }
}
