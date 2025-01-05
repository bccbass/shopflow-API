import express from "express";
import cors from 'cors'
import dotenv from "dotenv";
import mongoose from "mongoose";
import { dbConnect } from "./db/connection.js";

dotenv.config();


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// When ready add client url as config to only allow access form that url:
// app.use(cors({ origin: process.env.SHOPFLOW_CLIENT_URL }));

// Connect to the database
await dbConnect();

app.get("/", (req, res) => {
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

import repairsRouter from "./routes/repairs.js";
app.use("/repairs", repairsRouter);

import notesRouter from "./routes/notes.js";
app.use("/notes", notesRouter);

import utilsRouter from "./routes/utils.js";
app.use("/utils", utilsRouter);

export default app;
