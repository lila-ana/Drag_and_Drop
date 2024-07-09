import dotenv from "dotenv";

dotenv.config();

interface AppConfig {
  port: number;
  jwtSecret: string;
  nodeEnv: string;
  apiBaseUrl: string;
}

const config: AppConfig = {
  port: parseInt(process.env.PORT || "3000", 10),
  jwtSecret: process.env.JWT_SECRET || "ThisIsASampleSeCretTok3n",
  nodeEnv: process.env.NODE_ENV || "development",
  apiBaseUrl: process.env.API_BASE_URL || "http://localhost:3000/api",
};

export default config;
