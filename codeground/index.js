import express from 'express';
import { connectDatabase } from './config/db.config.js';
import contentRouter from "./apis/content_management/routes/challenge.route.js";
import dotenv from 'dotenv'
import authRouter from './apis/auth/routes/auth.router.js';
import gradingRouter from './apis/grading/routes/grader.route.js';
import { PORT } from './config/server.config.js';

const app = express();
dotenv.config();

// connect to the database
connectDatabase();

app.get("/", (req, res) => {
  res.send("server running");
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/auth", authRouter)
app.use("/api/challenges", contentRouter)
app.use("/api/grading", gradingRouter);



app.listen(PORT, (_) =>
  console.log(`Server up and running on port ${PORT}`)
);
