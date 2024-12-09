import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema({
  dateCreated: { required: true, type: Date, default: Date.now, immutable: true },
  title: String,
  body: {type: String },
  createdBy: String,
  due: { type: Date},
});

export default mongoose.model("Note", NoteSchema);
