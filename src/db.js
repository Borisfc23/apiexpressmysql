import { createPool } from "mysql2/promise"; //el pool es para un conjunto de conexiones
import {
  DB_DATABASE,
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_PORT,
} from "./config.js";
const pool = createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  port: DB_PORT,
});
export { pool };
