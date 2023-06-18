import express from "express";
import { login } from "../controllers/auth.js";

const router = express.Router();

router.post("/login", login); // since we configured router above, we need not use app.use()

export default router;
