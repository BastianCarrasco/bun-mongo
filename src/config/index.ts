// src/config/index.ts
// ELIMINA ESTA LÍNEA: import 'bun-dotenv';

export const config = {
  PORT: process.env.PORT || 3000,
  MONGODB_URI:
    process.env.MONGODB_URI || "mongodb://localhost:27017/my_database",
  JWT_SECRET: process.env.JWT_SECRET || "supersecretjwtkey",
  // Otros configs...
};
