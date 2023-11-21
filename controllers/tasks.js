const Task = require("../models/Task");

//importing async middleware
const asyncWrapper = require("../middlewares/async");

const { createCustomError } = require("../errors/custom-error");
//Get all tasks
const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({});
  res.status(200).json({ tasks });
  // Alternatives of the same statement
  // res.status(200).json({ tasks, amount: tasks.length });
  // res. status(200).json({success:true, data:{tasks, nbHits:tasks.length}}) - nbHits  - number of hits
  // res. status(200).json({status:"success", data:{tasks, nbHits:tasks.length}}) - nbHits  - number of hits
});

//Post new task to db
const addNewTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
});

//retrieve single task from db
const getSingleTask = asyncWrapper(async (req, res, next) => {
  const { id: taskId } = req.params;
  const task = await Task.findOne({ _id: taskId });
  if (!task) {
    const error = new Error("Not found");
    error.status = 404;
    return next(error);
    return res.status(404).json({ msg: `No task with id ${taskId} found` });
  }
  res.status(200).json({ task });
});

//delete single task
const deleteSingleTask = asyncWrapper(async (req, res) => {
  const { id: taskId } = req.params;
  const task = await Task.findOneAndDelete({ _id: taskId });
  if (!task) {
    return res.status(404).json({ msg: `No task with id ${taskId} found` });
  }
  res.status(200).json({ task });
  //res.status(200).send()
  //res.status(200).json({task:null, msg:"success"})
});

//the patch method updates only a single field and maintains the rest as is/update properties you are passing in
const updateSingleTask = asyncWrapper(async (req, res) => {
  const { id: taskId } = req.params;
  const task = await Task.findOneAndUpdate({ _id: taskId }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!task) {
    res.status(404).json(`No task with id ${taskId} found`);
  }
  res.status(200).json({ task });
});

//the put method updates the entire collection of fields in the model/replaces the entire item
// const editSingleTask = async (req, res) => {
//   try {
//     const { id: taskId } = req.params;
//     const task = await Task.findOneAndUpdate({ _id: taskId }, req.body, {
//       new: true,
//       runValidators: true,
//       overwrite: true,
//     });
//     if (!task) {
//       res.status(404).json(`No task with id ${taskId} found`);
//     }
//     res.status(200).json({ task });
//   } catch (error) {
//     res.status(500).json({ msg: error });
//   }
// };
module.exports = {
  getAllTasks,
  addNewTask,
  getSingleTask,
  updateSingleTask,
  deleteSingleTask,
  //editSingleTask,
};
