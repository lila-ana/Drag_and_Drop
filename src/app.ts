import express, { Application } from "express";
import { attachEntityManager } from "./middlewares/attachEntityManager";

import userRoutes from "./routes/v1/userRoutes";
import { notFoundHandler } from "./middlewares/notFoundHandler";
import { errorHandler } from "./middlewares/errorHandler";

// Initialize Express application
const app: Application = express();

// ===========> Middleware <============
app.use(express.json()); // For parsing application/json
app.use(attachEntityManager); // Custom middleware to attach EntityManager

// Routes
app.use("/api", userRoutes);

// =============> Error handling middleware <===========

// 404 Not Found Middleware
app.use(notFoundHandler);

// Global Error Handler Middleware
app.use(errorHandler);

export default app;
