import express from 'express';
import { connectDatabase } from './config/db.config.js';
import contentRouter from "./apis/content_management/routes/challenge.route.js";
import dotenv from 'dotenv'

const app = express();
dotenv.config();

// connect to the database
connectDatabase();

app.get("/", (req, res) => {
  res.send("server running");
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/challenges", contentRouter)


const PORT = process.env.PORT || 5000;

app.listen(PORT, (_) =>
  console.log(`server up and running on port ${PORT}`)
);
