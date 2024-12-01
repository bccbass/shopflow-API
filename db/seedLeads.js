/** @format */

import mongoose from "mongoose";
import Lead from "../models/lead.js";
import leads from "./seedLeadsData.js";
import { dbConnect, dbClose } from "./connection.js";

const seedLeads = async () => {
	await Lead.deleteMany();
	console.log("Leads deleted from DB");

	await Lead.insertMany(leads);
	console.log("Leads inserted to DB");
};

dbConnect();
await seedLeads();
dbClose();
