/** @format */

import Util from "../models/Util.js";
import {utils} from "./seedUtilData.js";
import { dbConnect, dbClose } from "./connection.js";

const seedUtils = async () => {
	await Util.deleteMany();
	console.log("Utils deleted from DB");

	await Util.insertMany(utils);
	console.log("Utils inserted to DB");
};

dbConnect();
await seedUtils();
dbClose();
