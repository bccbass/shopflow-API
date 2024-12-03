import mongoose from "mongoose";
import Note from "../models/Archive.js";
import { dbConnect, dbClose } from "./connection.js";


// Warning: RUNNING THIS WILL DELETE ENTIRE ARCHIVE!!
const deleteArchive = async () => {
  await Note.deleteMany();
  console.log("Archive deleted from DB");
};

dbConnect();
await deleteArchive();
dbClose();
