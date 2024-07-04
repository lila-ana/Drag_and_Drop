import express, { Application } from "express";
import userRoutes from "./routes/v1/userRoutes";
import { attachEntityManager } from "./middlewares/attachEntityManager";

// Initialize Express application
const app: Application = express();

// Middleware
app.use(express.json()); // For parsing application/json
app.use(attachEntityManager); // Custom middleware to attach EntityManager

// Routes
app.use("/api", userRoutes);

// Error handling middleware (optional)
app.use((err: any, req: any, res: any, next: any) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

export default app;
