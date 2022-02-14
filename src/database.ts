import * as dotenv from "dotenv";

export const Constants: { [key: string]: string } = {
  ADMIN: process.env.ADMIN,
  STREAM: process.env.STREAM,
};

dotenv.config();
