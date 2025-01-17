import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import { dbConnect } from "./db/connection.js";
import { protect } from "./lib/authFuncs.js";


dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// app.use(cors());
// When ready add client url as config to only allow access form that url:
app.use(cors({ 
  origin: process.env.SHOPFLOW_CLIENT_URL, 
  credentials: true }));

// Connect to the database
await dbConnect();

app.get("/", (req, res) => {
  res.json({ success: "Hello" });
});

// Connect external routers to app
import leadsRouter from "./routes/leads.js";
app.use("/leads", protect, leadsRouter);

import usersRouter from "./routes/users.js";
app.use("/users", protect, usersRouter);

import teachersRouter from "./routes/teachers.js";
app.use("/teachers", protect, teachersRouter);

import archiveRouter from "./routes/archive.js";
app.use("/archive", protect,  archiveRouter);

import repairsRouter from "./routes/repairs.js";
app.use("/repairs", protect, repairsRouter);

import notesRouter from "./routes/notes.js";
app.use("/notes", protect, notesRouter);

import utilsRouter from "./routes/utils.js";
app.use("/utils", protect, utilsRouter);

import authRouter from "./routes/auth.js";
app.use("/auth", authRouter);

export default app;
