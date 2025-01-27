import { addDays } from "../lib/helperFuncs.js";
import { utils } from "./seedUtilData.js";
import teachers from "./teacherDataPrivate.js";
import users from "./userDataPrivate.js";
import { firstNames, lastNames } from "./names.js";

const info = utils[1];
const pickFromArray = (arr) => arr[Math.floor(Math.random() * arr.length)];

const leadWithoutTrial = () => {
  const contact = Math.floor(Math.random() * 100);
  const createdBy = pickFromArray(users);
  const created = Math.floor(Math.random() * 500) * -1;
  const lastName = pickFromArray(lastNames);
  const isAdult = Math.random() > 0.5;
  return {
    createdBy: createdBy.firstName[0] + createdBy.lastName[0],
    dateCreated: addDays(created),
    nextContactDate: addDays(contact),
    leadSource: pickFromArray(info.leadSources),
    student: {
      firstName: pickFromArray(firstNames),
      lastName: lastName,
      instrument: pickFromArray(info.instruments),
      groupClass: "",
      age: "",
    },
    guardian: {
      firstName: isAdult ? pickFromArray(firstNames) : "",
      lastName: isAdult ? lastName : "",
    },
    contact: { phone: "0123123123", email: "email@email.com" },
    followUp: [],
  };
};

const leadWithTrial = () => {
  const created = Math.floor(Math.random() * 500) * -1;
  const contact = Math.floor(Math.random() * 100);
  const lastName = pickFromArray(lastNames);
  const isAdult = Math.random() > 0.8;
  const instrument = pickFromArray(info.instruments);
  const teacher = pickFromArray(teachers);
  const enrolled = Math.random() > 0.5;

  return {
    dateCreated: addDays(created),
    nextContactDate: addDays(contact),
    leadSource: pickFromArray(info.leadSources),
    student: {
      firstName: pickFromArray(firstNames),
      lastName: lastName,
      instrument: instrument,
      groupClass: "",
      age: "",
    },
    guardian: {
      firstName: isAdult ? pickFromArray(firstNames) : "",
      lastName: isAdult ? lastName : "",
    },
    contact: { phone: "0123123123", email: "email@email.com" },
    followUp: [],
    enrolled: enrolled,
    bookedTrial: true,
    trialLesson: {
      date: addDays(created + 5),
      time: { hour: "4", min: "00", twelveHr: "PM" },
      location: pickFromArray(info.locations).name,
      instrument: instrument,
      teacher: teacher.firstName + " " + teacher.lastName,
      followUp: [],
    },
    trialAdmin: {
      timetable: Math.random() > 0.2,
      addToMms: Math.random() > 0.2,
      createInvoice: Math.random() > 0.2,
      sentConfirmation: Math.random() > 0.2,
    },
    enrolledAdmin: {
      timetable: !enrolled ? Math.random() > 0.2 : true,
      status: !enrolled ? Math.random() > 0.2 : true,
      createInvoice: !enrolled ? Math.random() > 0.2 : true,
      sentInvoice: !enrolled ? Math.random() > 0.2 : true,
    },
  };
};

const leadsWithoutTrial = Array.from({ length: 20 }).map(() => leadWithoutTrial());
const leadsWithTrial = Array.from({ length: 25 }).map(() => leadWithTrial());

const archiveWithoutTrial = Array.from({ length: 150 }).map(() => leadWithoutTrial());
const archiveWithTrial = Array.from({ length: 350 }).map(() => leadWithTrial());

const archivedLeads = archiveWithoutTrial.concat(archiveWithTrial);
const leads = leadsWithoutTrial.concat(leadsWithTrial);
export {leads, archivedLeads};
