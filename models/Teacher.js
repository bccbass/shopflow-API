import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema({
  firstName: String,
  lastName: { type: String, required: true },
  email: String,
  phone: String,
  dateCreated: { type: Date, required: true, default: new Date() },
  instruments:  [String],
//   availability: 
});


export default mongoose.model("Teacher", teacherSchema);