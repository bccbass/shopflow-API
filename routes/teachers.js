import express from "express";

const router = express.Router();


// Define routes individually
router.get("/", (req, res) => {
  res.send({ success: "teachersRouterSuccess" });
});
router.post("/", (req, res) => {
  res.send({ success: "create new teacher" });
});
// Define ID Routes using router.route() - this chains all operations for cleaner/concise code
router
  .route("/:id")
  .get((req, res) => {
    res.send({ success: `teacher ID ${req.params.id}` });
  })
  .put((req, res) => {
    res.send({ success: `Update teacher ID ${req.params.id}` });
  })
  .delete((req, res) => {
    res.send({ success: `Delete teacher ID ${req.params.id}` });
  });

export default router;
