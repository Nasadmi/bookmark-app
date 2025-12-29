import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router()

router.use(authMiddleware)

router.get('/links', (req, res) => {})

export { router as linkRoutes }