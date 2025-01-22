import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    fullAccess: { type: Boolean, required: true, default: false },
    active: { type: Boolean, required: true, default: true },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      unique: true,
    },
    password: { type: String, required: true },
  },
  {
    virtuals: {
      initials: {
        get() {
          return `${this.firstName[0]}${this.lastName[0]}`;
        },
      },
    },
  }
);
// Hash the password before saving
userSchema.pre("save", async function (next) {
  // Check if password is diifferent than saved to not rewrite pw and use extra comp resources
  if (!this.isModified("password")) return next();
  //if new/different pw encrypt password
  this.password = await this.hashPassword(this.password);
  next();
});

// Compare passwords
userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};
userSchema.methods.hashPassword = async function (password) {
  const hashedPw = await bcrypt.hash(password, 10);
  return hashedPw;
};

userSchema.set("toJSON", { getters: true, virtuals: true });

export default mongoose.model("User", userSchema);
