import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  //role will be for admin/superuser
  role: { type: String, required: true },
  email: { type: String, required: true },
  // This needs to be encrypted:
  //password: String
});

export default mongoose.model("User", UserSchema);
