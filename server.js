import express from "express";
import cors from 'cors'
import dotenv from "dotenv";
import mongoose from "mongoose";
import { dbConnect } from "./db/connection.js";

dotenv.config();


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: process.env.SHOPFLOW_API }));

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

import notesRouter from "./routes/notes.js";
app.use("/notes", notesRouter);

export default app;
