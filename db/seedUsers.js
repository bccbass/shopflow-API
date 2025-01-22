import User from "../models/User.js";
import users from "./seedUsersData.js";
// import users from "./userDataPrivate.js";
import { dbConnect, dbClose } from "./connection.js";

const seedUsers = async () => {
  await User.deleteMany();
  console.log("Users deleted from DB");

  await User.create(users);
  console.log("Users inserted to DB");
};

dbConnect();
await seedUsers();
dbClose();