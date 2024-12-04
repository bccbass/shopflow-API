const archive = [
  {
    dateCreated: new Date(),
    nextContactDate: 7 / 12 / 24,
    leadSource: "walk-in",
    student: {
      firstName: "Ima Old",
      lastName: "Lead",
      instrument: "guitar",
      groupClass: "",
    },
    guardian: {
      firstName: "Constanzia",
      lastName: "Villanueva",
    },
    contact: { phone: "0426123123", email: "georgia@email.com" },
    followUp: [],
    trialLesson: {},
  },
  {
    dateCreated: new Date(),
    nextContactDate: 7 / 12 / 24,
    leadSource: "walk-in",
    student: {
      firstName: "Johnny Archive",
      lastName: "Trial",
      instrument: "guitar",
      groupClass: "",
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
      followUp: [],
    },
  },
  {
    dateCreated: new Date(),

    nextContactDate: 7 / 12 / 2024,
    leadSource: "web email",
    student: {
      firstName: "Sally Archive",
      lastName: "I Enrolled",
      instrument: "guitar",
      groupClass: "",
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

export default archive;
