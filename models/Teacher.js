import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema({
	firstName: { type: String, trim: true },
	lastName: { type: String, required: true, trim: true },
	email: { type: String, trim: true },
	phone: { type: String, trim: true },
	dateCreated: { type: Date, required: true, default: new Date() },
	instruments: [String],
	//   availability:
});


export default mongoose.model("Teacher", teacherSchema);