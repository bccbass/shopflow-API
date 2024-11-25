import express from "express";

const router = express.Router();


// Define routes individually
router.get("/", (req, res) => {
  res.send({ success: "leadsRouterSuccess" });
});
router.post("/", (req, res) => {
  res.send({ success: "create new lead" });
});
// Define ID Routes using router.route() - this chains all operations for cleaner/concise code
router
  .route("/:id")
  .get((req, res) => {
    res.send({ success: `Lead ID ${req.params.id}` });
  })
  .put((req, res) => {
    res.send({ success: `Update ID ${req.params.id}` });
  })
  .delete((req, res) => {
    res.send({ success: `Delete ID ${req.params.id}` });
  });

export default router;
