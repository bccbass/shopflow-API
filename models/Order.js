import mongoose from "mongoose";
import { localDate } from "../lib/helperFuncs.js";

const orderSchema = new mongoose.Schema(
  {
    firstName: { type: String, trim: true },
    lastName: { type: String, trim: true },
    email: { type: String, trim: true },
    phone: { type: String, trim: true },
    dateCreated: { type: Date, required: true, default: new Date() },
    item: String,
    status: { type: String, default: "In Progress" },
    orderDescription: String,
    paid: { type: Boolean, default: false },
    depositAmount: String,
    totalAmount: String,
    notes: String,
    completed: { type: Boolean, default: false },
    createdBy: String,
    due: { type: Date, default: Date.now },
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
      overdue: {
        get() {
          if (new Date(this.due) < new Date("2020-01-01")) {
            return false;
          } else return new Date(this.due) <= new Date(Date.now());
        },
      },
      createdDate: {
        get() {
          return localDate(this.dateCreated);
        },
      },
      dueDate: {
        get() {
          return localDate(this.due);
        },
      },
    },
  }
);

orderSchema.set("toJSON", { getters: true, virtuals: true });

export default mongoose.model("Order", orderSchema);
