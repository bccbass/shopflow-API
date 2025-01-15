import mongoose from "mongoose";
import bcrypt from 'bcryptjs'

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true, trim: true},
  lastName: { type: String, required: true, trim: true},
  //role will be for admin/superuser
  manager: { type: Boolean, required: true, default: false },
  email: { type: String, required: true, lowercase: true, trim: true, unique: true },
  password: {type: String, required: true}
});

// Hash the password before saving
UserSchema.pre('save', async function (next) {
  // Check if password is diifferent than saved to not rewrite pw and use extra comp resources
  if (!this.isModified('password')) return next();
  //if new/different pw encrypt password
  this.password = await this.hashPassword(this.password);
  next();
});


// Compare passwords
UserSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};
UserSchema.methods.hashPassword = async function (password) {
  const hashedPw = await bcrypt.hash(password, 10);
  return hashedPw
};

export default mongoose.model("User", UserSchema);
