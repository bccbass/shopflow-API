 import express from "express";
import Lead from "../models/lead.js";

const router = express.Router();

//   Middleware to handle retrieving assets by ID from DB
const getLead = async (req, res, next) => {
  let lead;
  try {
    lead = await Lead.findById(req.params.id);
    if (lead == null) {
      return res.status(404).json({ message: "Cannot find lead" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
  res.lead = lead;
  next();
};

// Define routes individually
router.get("/", async (req, res) => {
  try {
    const leads = await Lead.find();
    res.json(leads);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.get("/analytics", async (req, res) => {
  try {
    const total = await Lead.countDocuments();
    const bookedTrial = await Lead.countDocuments({bookedTrial: true});
    const enrolled = await Lead.countDocuments({enrolled: true});
    const analytics = {total, bookedTrial, enrolled}
    res.json(analytics);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    // const lead = new Lead({
    //   student: req.body.student,
    //   guardian: req.body.guardian,
    //   contact: { phone: req.body.contact.phone, email: req.body.contact.email },
    //   followup: [],
    //   trialLesson: {
    //     date: req.body.trialLesson.date,
    //     time: req.body.trialLesson.time,
    //     location: req.body.trialLesson.location,
    //     instrument: req.body.trialLesson.instrument,
    //     enrolling: req.body.trialLesson.enrolling,
    //     followup: [],
    //   },
    // });
    const lead = new Lead({ ...req.body });
    await lead.save();
    res.status(200).json(lead);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Define ID Routes using router.route() - this chains all operations for cleaner/concise code
router
  .route("/:id")
  .get(getLead, (req, res) => {
    res.json(res.lead);
  })
  .put((req, res) => {
    res.send({ success: `Update ID ${req.params.id}` });
  })
  .delete(getLead, async (req, res) => {
    try {
      await res.lead.deleteOne();
      res.json({ message: `Deleted lead ${req.params.id}` });
    } catch (err) {
      res.status(500).json({message: err.message})
    }
  });

export default router;
