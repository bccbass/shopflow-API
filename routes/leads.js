import express from "express";
import Lead from "../models/Lead.js";
import Note from "../models/Note.js";
import Repair from "../models/Repair.js";
import Order from "../models/Order.js";
import Archive from "../models/Archive.js";
import { protect } from "../lib/authFuncs.js";

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
    const leads = await Lead.find().sort({ enrolled: 1, nextContactDate: 1 });
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
    const enquiries = await Lead.countDocuments({
      enrolled: false,
      bookedTrial: false,
    })
      .where("nextContactDate")
      .lte(now);

    const enrolled = await Lead.countDocuments({
      enrolled: true,
      $or: [
        { "enrolledAdmin.timetable": false },
        { "enrolledAdmin.status": false },
        { "enrolledAdmin.createInvoice": false },
        { "enrolledAdmin.sentInvoice": false },
        { nextContactDate: { $lte: now } },
      ],
    });
    const trials = await Lead.countDocuments({
      enrolled: false,
      bookedTrial: true,
      $or: [
        { "trialAdmin.timetable": false },
        { "trialAdmin.addToMms": false },
        { "trialAdmin.createInvoice": false },
        { "trialAdmin.sentConfirmation": false },
        { nextContactDate: { $lte: now } },
      ],
    });
    const notes = await Note.countDocuments({ completed: false })
      .where("due")
      .lte(now);
    const repairs = await Repair.countDocuments({ completed: false })
      .where("due")
      .lte(now);
    const orders = await Order.countDocuments({ completed: false })
      .where("due")
      .lte(now);
    const due = { enquiries, trials, enrolled, notes, repairs, orders };
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
    const lead = new Lead({ ...req.body });
    await lead.save();
    res.status(200).json(lead);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.patch("/updatetrial/:id", getLead, async (req, res) => {
  try {
    if (req.body.bookedTrial != null) {
      res.lead.bookedTrial = req.body.bookedTrial;
    }
    if (req.body.enrolled != null) {
      res.lead.enrolled = req.body.enrolled;
    }
    if (req.body.trialLesson != null) {
      res.lead.trialLesson = req.body.trialLesson;
    }
    if (req.body.paid != null) {
      res.lead.trialLesson.paid = req.body.paid;
    }
    if (req.body.nextContactDate != null) {
      res.lead.nextContactDate = req.body.nextContactDate;
    }

    const updatedLeadTrial = await res.lead.save();
    res.json(updatedLeadTrial);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.patch("/updatefollowup/:id", getLead, async (req, res) => {
  try {
    if (req.body?.trialLesson?.followUp != null) {
      res.lead.trialLesson.followUp = req.body.trialLesson.followUp;
    } else if (req.body?.followUp != null) {
      res.lead.followUp = req.body.followUp;
    }
    if (req.body?.nextContactDate != null) {
      res.lead.nextContactDate = req.body.nextContactDate;
    } else if (req.body?.enrolledAdmin?.timetable != null) {
      res.lead.enrolledAdmin.timetable = req.body.enrolledAdmin.timetable;
    } else if (req.body?.enrolledAdmin?.status != null) {
      res.lead.enrolledAdmin.status = req.body.enrolledAdmin.status;
    } else if (req.body?.enrolledAdmin?.createInvoice != null) {
      res.lead.enrolledAdmin.createInvoice =
        req.body.enrolledAdmin?.createInvoice;
    } else if (req.body.enrolledAdmin?.sentInvoice != null) {
      res.lead.enrolledAdmin.sentInvoice = req.body.enrolledAdmin.sentInvoice;
    } else if (req.body?.trialAdmin?.timetable != null) {
      res.lead.trialAdmin.timetable = req.body.trialAdmin.timetable;
    } else if (req.body?.trialAdmin?.addToMms != null) {
      res.lead.trialAdmin.addToMms = req.body.trialAdmin.addToMms;
    } else if (req.body?.trialAdmin?.createInvoice != null) {
      res.lead.trialAdmin.createInvoice = req.body.trialAdmin.createInvoice;
    } else if (req.body?.trialAdmin?.sentConfirmation != null) {
      res.lead.trialAdmin.sentConfirmation =
        req.body.trialAdmin.sentConfirmation;
    }
    const updatedLeadTrial = await res.lead.save();
    res.json(updatedLeadTrial);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Define ID Routes using router.route() - this chains all operations for cleaner/concise code
router
  .route("/:id")
  .get(getLead, (req, res) => {
    res.json(res.lead);
  })
  .put(async (req, res) => {
    try {
      const id = req.params.id;
      const updatedLeadData = req.body;
      if (updatedLeadData) {
        const updatedLead = await Lead.findByIdAndUpdate(id, updatedLeadData, {
          new: true,
          runValidators: true,
        });
        res.status(200).json(updatedLead);
      } else {
        res.json({ error: "No update data provided" });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  })
  .patch(getLead, async (req, res) => {
    try {
      if (req.body?.notes != null) {
        res.lead.notes = req.body.notes;
      } else if (req.body?.nextContactDate != null) {
        res.lead.nextContactDate = req.body.nextContactDate;
      } 
      const updatedLeadTrial = await res.lead.save();
      res.json(updatedLeadTrial);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
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
export { getLead };
