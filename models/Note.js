import mongoose from "mongoose";
import { addDays } from "../lib/helperFuncs.js";

const NoteSchema = new mongoose.Schema({
	dateCreated: {
		required: true,
		type: Date,
		default: Date.now,
		immutable: true,
	},
	title: { type: String, trim: true },
	body: { type: String },
	createdBy: String,
	due: { type: Date, default: Date.now },
	completed: {type: Boolean, default: false}
},
{
    virtuals: {
      overdue: {
        get() {
         return (new Date(this.due) <= new Date(Date.now()));
        },
      },
    },
  });

  NoteSchema.set("toJSON", { getters: true, virtuals: true });

export default mongoose.model("Note", NoteSchema);
