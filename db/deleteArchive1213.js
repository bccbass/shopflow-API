import mongoose from "mongoose";
import Note from "../models/Archive.js";
import { dbConnect, dbClose } from "./connection.js";


// Warning: RUNNING THIS WILL DELETE ENTIRE ARCHIVE!!

//  *****TO RUN THIS CODE UNCOMMENT BEFORE EXECUTING *****
//  *****WHEN COMPLETE, RETURN TO SCRIPT TO COMMENT OUT FOR SAFETY*****


// const deleteArchive = async () => {
//   await Note.deleteMany();
//   console.log("Archive deleted from DB");
// };

// dbConnect();
// await deleteArchive();
// dbClose();
