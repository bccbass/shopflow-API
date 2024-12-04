import mongoose from 'mongoose';

const followUpSchema = mongoose.Schema({
    dateCreated: {
      required: true,
      type: Date,
      default: Date.now,
      immutable: true,
    },
    admin: String,
    method: { call: Boolean, text: Boolean, voicemail: Boolean },
    notes: String,
  });

  export default followUpSchema