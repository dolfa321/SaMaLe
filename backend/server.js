import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import routes from "./routes/routes.js";

dotenv.config();

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/", routes);

app.listen(8080, () => {
  connectDB();
  console.log("Server started on port 8080");
});
