import express from "express";
import cors from 'cors'
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to the database
// await dbConnect().catch(console.dir);
mongoose.connect(process.env.ATLAS_DB_URL)
  .then(m => console.log(m.connection.readyState == 1 ? 'Mongoose connected!' : 'Mongoose failed to connect.'))
  // .catch(err => console.log(err))




app.get("/hello", (req, res) => {
  res.json({ success: "Hello" });
});

// Connect external routers to app
import leadsRouter from "./routes/leads.js";
app.use("/leads", leadsRouter);

import usersRouter from "./routes/users.js";
app.use("/users", usersRouter);

import teachersRouter from "./routes/teachers.js";
app.use("/teachers", teachersRouter);

import archiveRouter from "./routes/archive.js";
app.use("/archive", archiveRouter);

export default app;
