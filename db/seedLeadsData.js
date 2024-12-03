/** @format */

const leads = [
  {
    nextContactDate: 7 / 12 / 24,
    leadSource: "walk-in",
    student: {
      firstName: "Melinda",
      lastName: "Spates",
      instrument: "guitar",
      groupClass: "",
    },
    guardian: {
      firstName: "Georgia",
      lastName: "Alvarez",
    },
    contact: { phone: "0426123123", email: "georgia@email.com" },
    followUp: [
      {
        admin: "AB",
        method: { vm: true },
        notes: "lorem ipsum dolor sit amet, consectetur",
      },
      {
        admin: "BC",
        method: { call: true },
        notes: "lorem ipsum dolor sit amet, consectetur",
      },
      {
        admin: "CD",
        method: { email: true },
        notes: "lorem ipsum dolor sit amet, consectetur",
      },
    ],
    trialLesson: {
      followUp: [
        {
          admin: "AB",
          method: { vm: true },
          notes: "lorem ipsum dolor sit amet, consectetur",
        },
        {
          admin: "BC",
          method: { call: true },
          notes: "lorem ipsum dolor sit amet, consectetur",
        },
        {
          admin: "CD",
          method: { email: true },
          notes: "lorem ipsum dolor sit amet, consectetur",
        },
      ],
    },
  },
  {
    nextContactDate: 7 / 12 / 2024,
    leadSource: "web email",
    student: {
      firstName: "Jerry",
      lastName: "Springer",
      instrument: "guitar",
      groupClass: "",
    },
    guardian: {
      firstName: "Barry",
      lastName: "Springer",
    },
    contact: { phone: "0421456456", email: "bigjerz@email.com" },
    followUp: [
      {
        admin: "AB",
        method: { vm: true },
        notes: "lorem ipsum dolor sit amet, consectetur",
      },
      {
        admin: "BC",
        method: { call: true },
        notes: "lorem ipsum dolor sit amet, consectetur",
      },
      {
        admin: "CD",
        method: { email: true },
        notes: "lorem ipsum dolor sit amet, consectetur",
      },
    ],
    trialLesson: {
      followUp: [
        {
          admin: "AB",
          method: { vm: true },
          notes: "lorem ipsum dolor sit amet, consectetur",
        },
        {
          admin: "BC",
          method: { call: true },
          notes: "lorem ipsum dolor sit amet, consectetur",
        },
        {
          admin: "CD",
          method: { email: true },
          notes: "lorem ipsum dolor sit amet, consectetur",
        },
      ],
    },
  },
];

export default leads;
