import express from "express";
import employeRoutes from "./routes/employes.routes.js";
import indexRoutes from "./routes/index.routes.js";
import { PORT } from "./config.js";
const app = express();
app.use(express.json());
//rutas
app.use(indexRoutes);
app.use("/api/", employeRoutes);
//middleware
app.use((req, res, next) => {
  res.status(404).json({ message: "Not Found" });
});
export default app;
