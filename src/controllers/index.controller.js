import { pool } from "../db.js";
export const consulta = async (req, res) => {
  const consulta = await pool.query("SELECT 10+1 AS Result");
  res.json(consulta[0]);
};
