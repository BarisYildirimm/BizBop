import express from "express";
import bodyParser from "body-parser";
import mongoDbConnection from "./config/db.js";
import dotenv from "dotenv";

import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/posts", postRoutes);

app.use("/", (req, res) => {
  res.send("SA");
});

// app.use(notFound());
// app.use(errorHandler());

mongoDbConnection();
app.listen(5000);
