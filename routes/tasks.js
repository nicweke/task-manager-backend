const express = require("express");
const router = express.Router();

const {
  getAllTasks,
  addNewTask,
  getSingleTask,
  updateSingleTask,
  deleteSingleTask,
} = require("../controllers/tasks");

router.route("/").get(getAllTasks).post(addNewTask);
router
  .route("/:id")
  .get(getSingleTask)
  .patch(updateSingleTask)
  .delete(deleteSingleTask);

module.exports = router;
