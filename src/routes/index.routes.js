import { Router } from "express";

import { consulta } from "../controllers/index.controller.js";
const router = Router();

router.get("/", consulta);

export default router;
