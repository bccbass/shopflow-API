import Teacher from "../models/Teacher.js";
import teachers from "./teacherDataPrivate.js";
import { dbConnect, dbClose } from "./connection.js";

const seedTeachers = async () => {
  await Teacher.deleteMany();
  console.log("Teachers deleted from DB");

  await Teacher.insertMany(teachers);
  console.log("Teachers inserted to DB");
};

dbConnect();
await seedTeachers();
dbClose();