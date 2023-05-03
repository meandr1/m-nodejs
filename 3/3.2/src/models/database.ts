import mysql from "mysql2";
import { getEnv } from "./env";

const env = getEnv();

export const dbSettings = {
  host: env.host,
  user: env.dbUser || '',
  database: env.dbName || '',
  password: env.dbPass || '',
}

export const pool = mysql.createPool({
  ...dbSettings,
  multipleStatements: true,
}).promise();