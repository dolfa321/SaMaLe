import express from "express";
import userRoutes from "./user.routes.js";
import chatRoutes from "./chat.routes.js";
import authRoutes from "./auth.routes.js";
import cors from "cors";

const router = express.Router();

router.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

router.use("/users", userRoutes);
router.use("/chat", chatRoutes);
router.use("/auth", authRoutes);

export default router;
