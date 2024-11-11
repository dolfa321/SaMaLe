import express from "express";
import { createUser, getUserByEmail } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/register", createUser);
router.post("/login", getUserByEmail);

export default router;
