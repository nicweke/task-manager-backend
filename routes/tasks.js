const express = require("express");
const router = express.Router();

const {
  getAllTasks,
  addNewTask,
  getSingleTask,
  updateSingleTask,
  deleteSingleTask,
  // editSingleTask,
} = require("../controllers/tasks");

router.route("/").get(getAllTasks).post(addNewTask);
router
  .route("/:id")
  .get(getSingleTask)
  .patch(updateSingleTask)
  //.put(editSingleTask)
  .delete(deleteSingleTask);

module.exports = router;
