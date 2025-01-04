/** @format */

import mongoose from "mongoose";

const locationSchema = new mongoose.Schema(
	{
		name: String,
		streetAddress: String,
		suburb: String,
		state: String,
		phone: String,
		description: String,
	},
	{
		virtuals: {
			address: {
				get() {
					return `${this.streetAddress} %0D%0A 
                            ${this.suburb}, ${this.state} %0D%0A 
                            ${this.phone} %0D%0A 
                            ${this.description}`;
				},
			},
		},
	}
);
const utilSchema = new mongoose.Schema({
	// Data used for forms/general information:
	// name to specify the role of the document
	name: String,
	// Instrument lessons offered:
	instruments: [String],
	phone: String,
	locations: [locationSchema],
	// Array of available group classes offered:
	groupClasses: [String],
	// Array of potential lead sources:
	leadSources: { type: Array || null },
	// store email templates
	emailTemplates: [String],
});

utilSchema.set("toJSON", { getters: true, virtuals: true });
locationSchema.set("toJSON", { getters: true, virtuals: true });

export default mongoose.model("Util", utilSchema);

