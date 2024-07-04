import "reflect-metadata"; // Import reflect-metadata for TypeORM
import app from "./app"; // Import the Express application
import AppDataSource from "./config/database";

// Initialize database connection
AppDataSource.initialize()
  .then(() => {
    console.log("Connected to database");
    // Start the server
    app.listen(3000, () => {
      console.log("Server is listening on port 3000");
    });
  })
  .catch((error) => {
    console.error("Error connecting to database:", error);
  });
