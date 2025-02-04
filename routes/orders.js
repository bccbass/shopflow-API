import express from "express";
import Order from "../models/Order.js";

const router = express.Router();

//   Middleware to handle retrieving assets by ID from DB
const getOrder = async (req, res, next) => {
  let order;
  try {
    order = await Order.findById(req.params.id);
    if (order == null) {
      return res.status(404).json({ message: "Cannot find order" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
  res.order = order;
  next();
};

// Define routes individually
router.get("/", async (req, res) => {
  const query = req.query.sort;
  try {
    const sortObj =
      query == "due"
        ? { completed: 1, due: 1 }
        : query == "new"
        ? { dateCreated: -1 }
        : query == "old"
        ? { dateCreated: 1 }
        : null;
    // const orders = await Order.find();
    const orders = await Order.find().sort(sortObj);
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const order = new Order({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      item: req.body.item,
      status: req.body.status,
      orderDescription: req.body.orderDescription,
      paid: req.body.paid,
      depositAmount: req.body.depositAmount,
      totalAmount: req.body.totalAmount,
      notes: req.body.notes,
      completed: req.body.completed,
      createdBy: req.body.createdBy,
      due: req.body.due,
    });
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
// Define ID Routes using router.route() - this chains all operations for cleaner/concise code
router
  .route("/:id")
  .get(getOrder, (req, res) => {
    res.json(res.order);
  })
  .patch(getOrder, async (req, res) => {
    if (req.body.firstName != null) {
      res.order.firstName = req.body.firstName;
    }
    if (req.body.lastName != null) {
      res.order.lastName = req.body.lastName;
    }
    if (req.body.email != null) {
      res.order.email = req.body.email;
    }
    if (req.body.phone != null) {
      res.order.phone = req.body.phone;
    }
    if (req.body.item != null) {
      res.order.item = req.body.item;
    }
    if (req.body.status != null) {
      res.order.status = req.body.status;
    }
    if (req.body.orderDescription != null) {
      res.order.orderDescription = req.body.orderDescription;
    }
    if (req.body.depositAmount != null) {
      res.order.depositAmount = req.body.depositAmount;
    }
    if (req.body.totalAmount != null) {
      res.order.totalAmount = req.body.totalAmount;
    }
    if (req.body.paid != null) {
      res.order.paid = req.body.paid;
    }
    if (req.body.notes != null) {
      res.order.notes = req.body.notes;
    }
    if (req.body.due != null) {
      res.order.due = req.body.due;
    }
    if (req.body.completed != null) {
      res.order.completed = req.body.completed;
    }
    try {
      const updatedOrder = await res.order.save();
      res.json(updatedOrder);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  })
  .delete(getOrder, async (req, res) => {
    try {
      await res.order.deleteOne();
      res.json({ message: `Deleted order ${req.params.id}` });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

export default router;
