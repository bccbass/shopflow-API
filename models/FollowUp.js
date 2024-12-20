import mongoose from 'mongoose';

const followUpSchema = mongoose.Schema({
    dateCreated: {
      required: true,
      type: Date,
      default: Date.now,
      immutable: true,
    },
    admin: String,
    method: { chat: Boolean, text: Boolean, voicemail: Boolean, email: Boolean },
    notes: String,
  });

  export default followUpSchema