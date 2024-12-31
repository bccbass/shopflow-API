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
      chat: Boolean,
      text: Boolean,
      voicemail: Boolean,
      email: Boolean,
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
