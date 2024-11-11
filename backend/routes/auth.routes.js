import express from "express";
import {
  createUser,
  getUserByEmail,
  getUserSession,
  removeUserSession,
} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/register", createUser);
router.post("/login", getUserByEmail);
router.post("/logout", removeUserSession);
router.get("/user", getUserSession);

export default router;
