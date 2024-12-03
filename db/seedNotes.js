import mongoose from "mongoose";
import Note from "../models/Note.js";
import notes from "./seedNotesData.js";
import { dbConnect, dbClose } from "./connection.js";

const seedNotes = async () => {
  await Note.deleteMany();
  console.log("Notes deleted from DB");

  await Note.insertMany(notes);
  console.log("Notes inserted to DB");
};

dbConnect();
await seedNotes();
dbClose();