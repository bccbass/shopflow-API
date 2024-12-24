import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true, trim: true},
  lastName: { type: String, required: true, trim: true},
  //role will be for admin/superuser
  role: { type: String, required: true },
  email: { type: String, required: true, lowercase: true, trim: true },
  // This needs to be encrypted:
  //password: String
});

export default mongoose.model("User", UserSchema);
