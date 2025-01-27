import Archive from "../models/Archive.js";
// import archive from "./seedArchiveData.js";
import { archivedLeads } from "./seedLeadsData.js";
import { dbConnect, dbClose } from "./connection.js";

const seedArchives = async () => {
  await Archive.deleteMany();
  console.log("Archives deleted from DB");

  await Archive.insertMany(archivedLeads);
  console.log("Archives inserted to DB");
};

dbConnect();
await seedArchives();
dbClose();
