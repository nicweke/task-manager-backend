const getAllTasks = (req, res) => {
  res.send("Get all items");
};

const addNewTask = (req, res) => {
  res.json(req.body);
};

const getSingleTask = (req, res) => {
  res.json({ id: req.params.id });
};
const updateSingleTask = (req, res) => {
  res.send("update single task");
};

const deleteSingleTask = (req, res) => {
  res.send("delete single task");
};

module.exports = {
  getAllTasks,
  addNewTask,
  getSingleTask,
  updateSingleTask,
  deleteSingleTask,
};
