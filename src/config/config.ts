import dotenv from "dotenv";

dotenv.config();

const SERVER_PORT: number = Number(process.env.SERVER_PORT) || 1337;

const DATABASE_URL: string = process.env.DATABASE_URL || "";

export const config = {
  server: {
    port: SERVER_PORT,
  },
  databaseUrl: DATABASE_URL,
};
