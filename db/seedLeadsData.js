import { addDays } from "../lib/helperFuncs.js";

const leads = [
	{
		nextContactDate: addDays(2),
		leadSource: "walk-in",
		student: {
			firstName: "Ima Brand",
			lastName: "New Lead",
			instrument: "guitar",
			groupClass: "Guitar Class",
			age: 9
		},
		guardian: {
			firstName: "Constanzia",
			lastName: "Villanueva",
		},
		contact: { phone: "0426123123", email: "georgia@email.com" },
		followUp: [],
		trialLesson: {
			date: '',
			time: { hour: "", min: "", twelveHr: "" },
			location: "",
			instrument: "",
			teacher: "",
			followUp: [
				
			],
		},
	},
	{
		nextContactDate: addDays(2),
		leadSource: "walk-in",
		notes: 'lorem ipsum dolor sit amet, consectetur lorem ipsum dolor sit amet, consecteturlorem ipsum dolor sit amet, consecteturlorem ipsum dolor sit amet, consecteturlorem ipsum dolor sit amet, consecteturlorem ipsum dolor sit amet, consecteturlorem ipsum dolor sit amet, consecteturlorem ipsum dolor sit amet, consectetur',
		student: {
			firstName: "Trial Lesson",
			lastName: "Is Booked",
			instrument: "guitar",
			groupClass: "Guitar Class",
			age: 9
		},
		guardian: {
			firstName: "Georgia",
			lastName: "Alvarez",
		},
		contact: { phone: "0426123123", email: "georgia@email.com" },
		bookedTrial: true,
		followUp: [
			{
				admin: "AB",
				method: { voicemail: true },
				notes: "lorem ipsum dolor sit amet, consectetur",
			},
			{
				admin: "BC",
				method: { chat: true },
				notes: "lorem ipsum dolor sit amet, consectetur",
			},
			{
				admin: "CD",
				method: { email: true },
				notes: "lorem ipsum dolor sit amet, consectetur",
			},
		],
		trialLesson: {
			date: addDays(2),
			time: { hour: "2", min: "00", twelveHr: "pm" },
			location: "shop",
			instrument: "guitar",
			teacher: "Johnny Deepthoughts",
			followUp: [],
		},
	},
	{
		nextContactDate: addDays(2),
		leadSource: "web email",
		notes: 'lorem ipsum dolor sit amet, consectetur lorem ipsum dolor sit amet, consecteturlorem ipsum dolor sit amet, consecteturlorem ipsum dolor sit amet, consecteturlorem ipsum dolor sit amet, consecteturlorem ipsum dolor sit amet, consecteturlorem ipsum dolor sit amet, consecteturlorem ipsum dolor sit amet, consectetur',

		student: {
			firstName: "Fully Commited",
			lastName: "To Enrolling",
			instrument: "guitar",
			groupClass: "Guitar Class",
			age: 9
		},
		guardian: {
			firstName: "Barry",
			lastName: "Springer",
		},
		contact: { phone: "0421456456", email: "bigjerz@email.com" },
		bookedTrial: true,
		enrolled: true,
		followUp: [
			{
				admin: "AB",
				method: { voicemail: true },
				notes: "lorem ipsum dolor sit amet, consectetur",
			},
			{
				admin: "BC",
				method: { chat: true },
				notes: "lorem ipsum dolor sit amet, consectetur",
			},
			{
				admin: "CD",
				method: { email: true },
				notes: "lorem ipsum dolor sit amet, consectetur",
			},
			{
				admin: "CD",
				method: { text: true },
				notes: "lorem ipsum dolor sit amet, consectetur",
			}
		],
		trialLesson: {
			date: addDays(2),
			time: { hour: "2", min: "00", twelveHr: "pm" },
			location: "studio",
			instrument: "drums",
			teacher: "Jasmine Highnote",
			followUp: [
				{
					admin: "AB",
					method: { voicemail: true },
					notes: "lorem ipsum dolor sit amet, consectetur",
				},
				{
					admin: "BC",
					method: { chat: true },
					notes: "lorem ipsum dolor sit amet, consectetur",
				},
				{
					admin: "CD",
					method: { email: true },
					notes: "lorem ipsum dolor sit amet, consectetur",
				},
				{
					admin: "CD",
					method: { text: true },
					notes: "lorem ipsum dolor sit amet, consectetur",
				}
			],
		},
	},
];

export default leads;
