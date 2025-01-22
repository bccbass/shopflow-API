import mongoose from "mongoose";
import { localDate } from "../lib/helperFuncs.js";

const followUpSchema = mongoose.Schema(
  {
    dateCreated: {
      required: true,
      type: Date,
      default: Date.now,
      immutable: true,
    },
    admin: String,
    method: {
      call: { type: Boolean, default: false },
      chat: { type: Boolean, default: false },
      voicemail: { type: Boolean, default: false },
      email: { type: Boolean, default: false }
    },
    notes: String,
  },
  {
    virtuals: {
      followUpInitDate: {
        get() {
          return localDate(this.dateCreated);
        },
      },
    },
  }
);

followUpSchema.set("toJSON", { getters: true, virtuals: true });

export default followUpSchema;
