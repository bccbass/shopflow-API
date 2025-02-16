import express from "express";
import Lead from "../models/Lead.js";
// import Note from "../models/Note.js";
// import Repair from "../models/Repair.js";
// import Order from "../models/Order.js";
import Archive from "../models/Archive.js";

const router = express.Router();

// Utility function to get the first day of a month
const getFirstDayOfMonth = (offset = 0) => {
  const date = new Date();
  date.setMonth(date.getMonth() - offset, 1);
  date.setHours(0, 0, 0, 0);
  return date;
};

router.get("/", async (req, res) => {
  // const fullHistory =  req.query.fullhistory === 'true';
  try {
    const currentLeads = await Lead.find({});
    const archivedLeads = await Archive.find({});
    const allLeads = [...currentLeads, ...archivedLeads];

    const parsedLeads = allLeads.map((lead) => {
      return {
        dateCreated: lead.dateCreated,
        status: lead.enrolled
          ? "enrolled"
          : lead.bookedTrial
          ? "trial"
          : "noTrial",
        contactEvents: lead.followUp.length + lead.trialLesson?.followUp.length,
        adult : !lead.isMinor
      };
    });
    // const lastYear = getFirstDayOfMonth(12);
    // const filteredLeads = parsedLeads.filter(
    //   (lead) => new Date(lead.dateCreated) >= lastYear
    // );
    const totalLeads = parsedLeads.length
    const noTrialLeads = parsedLeads.filter(lead => lead.status === 'noTrial');
    const trialLeads = parsedLeads.filter(lead => lead.status === 'trial');
    const enrolledLeads = parsedLeads.filter(lead => lead.status === 'enrolled');
    res.json({noTrialLeads, trialLeads, enrolledLeads, totalLeads});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.get("/notecontent", async (req, res) => {
  try {
    const currentLeads = await Lead.find({});
    const archivedLeads = await Archive.find({});
    const allLeads = [...currentLeads, ...archivedLeads];

    let noteContent = "";

    allLeads.forEach((lead) =>
      lead.notes?.length ? (noteContent += ` ${lead.notes}`) : ""
    );
    res.json(noteContent);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
