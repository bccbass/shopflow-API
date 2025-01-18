import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema(
	{
		firstName: { type: String, trim: true },
		lastName: { type: String, required: true, trim: true },
		email: { type: String, trim: true },
		phone: { type: String, trim: true },
		dateCreated: { type: Date, required: true, default: new Date },
		instruments: [String],
		active:{ type: Boolean, default: true }
		//   availability:
	},
	{
		virtuals: {
			firstLast: {
				get() {
					return `${this.firstName} ${this.lastName}`;
				},
			},
			lastFirst: {
				get() {
					return `${this.lastName}, ${this.firstName}`;
				},
			},
		},
	}
);

teacherSchema.set("toJSON", { getters: true, virtuals: true });

export default mongoose.model("Teacher", teacherSchema);