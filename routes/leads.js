import express from "express";
import Lead from "../models/Lead.js";
import Note from "../models/Note.js";
import Archive from "../models/Archive.js";

const router = express.Router();

//   Middleware to handle retrieving assets by ID from DB
const getLead = async (req, res, next) => {
  let lead;
  try {
    lead = await Lead.findById(req.params.id)
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

// Add in time info (total length from first contact to trial to enrollment)
// Add in Group class percent
// Add in Average age/number of adults
router.get("/analytics", async (req, res) => {
  try {
    const total = await Lead.countDocuments();
    const bookedTrial = await Lead.countDocuments({ bookedTrial: true });
    const enrolled = await Lead.countDocuments({ enrolled: true });
    const analytics = { total, bookedTrial, enrolled };
    res.json(analytics);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.get("/due", async (req, res) => {
  const now = Date.now();
  try {
    const enquiries = await Lead.countDocuments({bookedTrial: false}).where('nextContactDate').lte(now);
    const trials = await Lead.countDocuments({ bookedTrial: true }).where('nextContactDate').lte(now);
    const notes = await Note.countDocuments().where('due').lte(now);
    const due = {enquiries, trials, notes};
    res.json(due);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route to find lead, send to Archive collection and delete original
router.delete("/archive/:id", getLead, async (req, res) => {
  try {
    const clonedLead = { ...res.lead.toObject() };
    const archive = await Archive.create(clonedLead);
    await archive.save();
    await res.lead.deleteOne();
    res.json(archive);
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

router.patch('/updatetrial/:id', getLead, async (req, res) => {
try {
      if (req.body.bookedTrial != null){
        res.lead.bookedTrial = req.body.bookedTrial
      }
      if (req.body.trialLesson != null) {
        res.lead.trialLesson = req.body.trialLesson;
      }
      const updatedLeadTrial = await res.lead.save();
      res.json(updatedLeadTrial)
    } catch (err) {
    res.status(500).json({ message: err.message });
  }
})

// Define ID Routes using router.route() - this chains all operations for cleaner/concise code
router
  .route("/:id")
  .get(getLead, (req, res) => {
    res.json(res.lead);
  })
  .patch(getLead, async (req, res) => {
    // if (req.query.updatetrial == true){
  
    //   try {
    //     if (req.body.bookedTrial != null){
    //       res.lead.bookedTrial = req.body.bookedTrial
    //     }
    //     if (req.body.trialLesson != null) {
    //       res.lead.trialLesson = req.body.trialLesson;
    //     }
    //     const updatedLeadTrial = await res.lead.save();
    //     res.json(updatedLeadTrial)
    //   } catch (err) {
    //   res.status(500).json({ message: err.message });
    // }

    // }
  })
  .delete(getLead, async (req, res) => {
    try {
      await res.lead.deleteOne();
      res.json({ message: `Deleted lead ${req.params.id}` });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

export default router;
