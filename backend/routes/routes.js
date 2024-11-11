import express from "express";
import userRoutes from "./user.routes.js";
import chatRoutes from "./chat.routes.js";
import authRoutes from "./auth.routes.js";

const router = express.Router();

router.use("/users", userRoutes);
router.use("/chat", chatRoutes);
router.use("/auth", authRoutes);

export default router;
