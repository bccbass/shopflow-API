import mongoose from "mongoose";

const repairSchema = new mongoose.Schema(
    {
        firstName: { type: String, trim: true },
        lastName: { type: String, trim: true },
        email: { type: String, trim: true },
        phone: { type: String, trim: true },
        dateCreated: { type: Date, required: true, default: new Date },
        instrument: String,
        status: {type: String, default: "In Progress"},
        jobDescription: String,
        notes: String,
        completed:{type: Boolean, default: false},
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
        },
    }
);

repairSchema.set("toJSON", { getters: true, virtuals: true });

export default mongoose.model("Repair", repairSchema);