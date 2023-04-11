import { Router } from "express";
import {
  getEmployees,
  getEmployeesByID,
  postEmployees,
  updateEmployees,
  deleteEmployees,
} from "../controllers/employees.controller.js";
const router = Router();
router.get("/employes", getEmployees);
router.get("/employes/:id", getEmployeesByID);
router.post("/employes", postEmployees);
// router.put("/employes/:id", updateEmployees);
router.patch("/employes/:id", updateEmployees);
router.delete("/employes/:id", deleteEmployees);
export default router;
// https://www.youtube.com/watch?v=3dSkc-DIM74&list=WL&index=2&t=10s&ab_channel=Fazt
